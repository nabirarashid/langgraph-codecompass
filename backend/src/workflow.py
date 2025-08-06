# workflow.py

import os
import json
from typing import Dict, Any
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from .models import StackRecommendationState, TechStack, ProjectRequirements, TechStackComponent
from .firecrawl import FirecrawlService
from .prompts import TechStackPrompts

# steps in the workflow: analyze_requirements, research_stacks, generate_recommendations

class Workflow:
    def __init__(self):
        self.firecrawl = FirecrawlService()
        self.llm = ChatOpenAI(
            model="deepseek-chat", 
            temperature=0.1,
            base_url="https://api.deepseek.com",
            api_key=os.getenv("DEEPSEEK_API_KEY")
        )
        self.prompts = TechStackPrompts()
        self.workflow = self._build_workflow()

    def _build_workflow(self):
        graph = StateGraph(StackRecommendationState)
        graph.add_node("analyze_requirements", self._analyze_requirements_step)
        graph.add_node("research_stacks", self._research_stacks_step)
        graph.add_node("generate_recommendations", self._generate_recommendations_step)
        graph.set_entry_point("analyze_requirements")
        graph.add_edge("analyze_requirements", "research_stacks")
        graph.add_edge("research_stacks", "generate_recommendations")
        graph.add_edge("generate_recommendations", END)
        return graph.compile()

    def _analyze_requirements_step(self, state: StackRecommendationState) -> Dict[str, Any]:
        print(f"Analyzing project requirements: {state.query}")

        messages = [
            SystemMessage(content=self.prompts.REQUIREMENTS_ANALYSIS_SYSTEM),
            HumanMessage(content=self.prompts.requirements_analysis_user(state.query))
        ]

        try:
            response = self.llm.invoke(messages)
            json_str = response.content.strip()
            
            # Clean up JSON response
            if json_str.startswith("```json"):
                json_str = json_str.replace("```json", "").replace("```", "").strip()
            elif json_str.startswith("```"):
                json_str = json_str.replace("```", "").strip()
            
            requirements_data = json.loads(json_str)
            
            requirements = ProjectRequirements(
                project_type=requirements_data.get("project_type", "Web App"),
                scale=requirements_data.get("scale", "Medium"),
                budget=requirements_data.get("budget", "Medium"),
                timeline=requirements_data.get("timeline", "Weeks"),
                team_experience=requirements_data.get("team_experience", "Intermediate"),
                performance_needs=requirements_data.get("performance_needs", "Basic"),
                special_requirements=requirements_data.get("special_requirements", [])
            )
            
            print(f"Project type: {requirements.project_type}, Scale: {requirements.scale}")
            return {"project_requirements": requirements}
            
        except Exception as e:
            print(f"Error analyzing requirements: {e}")
            # Fallback to basic requirements
            return {
                "project_requirements": ProjectRequirements(
                    project_type="Web App",
                    scale="Medium",
                    budget="Medium",
                    timeline="Weeks",
                    team_experience="Intermediate",
                    performance_needs="Basic"
                )
            }

    def _research_stacks_step(self, state: StackRecommendationState) -> Dict[str, Any]:
        requirements = state.project_requirements
        print(f"Researching tech stacks for {requirements.project_type}")

        # Search for relevant tech stack information
        search_queries = [
            f"best tech stack for {requirements.project_type.lower()} {requirements.scale.lower()} team",
            f"{requirements.project_type.lower()} technology choices 2024",
            f"tech stack comparison {requirements.project_type.lower()}"
        ]

        all_content = ""
        search_results = []

        for query in search_queries:
            try:
                results = self.firecrawl.search_companies(query, num_results=2)
                if hasattr(results, 'data') and results.data:
                    search_results.extend(results.data)
                    for result in results.data:
                        url = result.get("url", "")
                        scraped = self.firecrawl.scrape_company_pages(url)
                        if scraped and hasattr(scraped, 'markdown'):
                            all_content += scraped.markdown[:1000] + "\n\n"
            except Exception as e:
                print(f"Error searching for {query}: {e}")
                continue

        return {"search_results": search_results}

    def _generate_recommendations_step(self, state: StackRecommendationState) -> Dict[str, Any]:
        print("Generating tech stack recommendations...")

        requirements = state.project_requirements
        
        messages = [
            SystemMessage(content=self.prompts.STACK_RECOMMENDATION_SYSTEM),
            HumanMessage(content=self.prompts.stack_recommendation_user(
                state.query, 
                requirements.model_dump_json()
            ))
        ]

        try:
            response = self.llm.invoke(messages)
            json_str = response.content.strip()
            
            # Clean up JSON response
            if json_str.startswith("```json"):
                json_str = json_str.replace("```json", "").replace("```", "").strip()
            elif json_str.startswith("```"):
                json_str = json_str.replace("```", "").strip()
            
            recommendations_data = json.loads(json_str)
            
            # Parse recommended stacks
            stacks = []
            for stack_data in recommendations_data.get("recommended_stacks", []):
                components = []
                for comp_data in stack_data.get("components", []):
                    component = TechStackComponent(
                        name=comp_data.get("name", ""),
                        category=comp_data.get("category", ""),
                        description=comp_data.get("description", ""),
                        pros=comp_data.get("pros", []),
                        cons=comp_data.get("cons", []),
                        learning_curve=comp_data.get("learning_curve", "Medium"),
                        popularity=comp_data.get("popularity", "Medium"),
                        cost=comp_data.get("cost", "Free"),
                        use_cases=comp_data.get("use_cases", [])
                    )
                    components.append(component)
                
                stack = TechStack(
                    name=stack_data.get("name", ""),
                    description=stack_data.get("description", ""),
                    components=components,
                    complexity=stack_data.get("complexity", "Moderate"),
                    time_to_market=stack_data.get("time_to_market", "Medium"),
                    scalability=stack_data.get("scalability", "Medium"),
                    cost_estimate=stack_data.get("cost_estimate", ""),
                    team_size_fit=stack_data.get("team_size_fit", "Small"),
                    best_for=stack_data.get("best_for", []),
                    industries=stack_data.get("industries", []),
                    learning_resources=stack_data.get("learning_resources", [])
                )
                stacks.append(stack)
            
            analysis = recommendations_data.get("analysis", "Tech stack recommendations generated successfully.")
            
            return {
                "recommended_stacks": stacks,
                "analysis": analysis
            }
            
        except Exception as e:
            print(f"Error generating recommendations: {e}")
            return {
                "recommended_stacks": [],
                "analysis": "Unable to generate recommendations due to an error."
            }
    
    def run(self, query: str) -> StackRecommendationState:
        initial_state = StackRecommendationState(query=query)
        try:
            final_state = self.workflow.invoke(initial_state)
            return StackRecommendationState(**final_state)
        except Exception as e:
            print(f"Error running workflow: {e}")
            return StackRecommendationState(
                query=query,
                recommended_stacks=[],
                analysis="Workflow failed to complete due to an error."
            )