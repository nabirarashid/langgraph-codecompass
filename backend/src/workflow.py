# workflow.py

import os
import json
from typing import Dict, Any
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from .models import ResearchState, CompanyInfo, CompanyAnalysis
from .firecrawl import FirecrawlService
from .prompts import DeveloperToolsPrompts

# steps in the workflow: extract, research & analyze

class Workflow:
    def __init__(self):
        self.firecrawl = FirecrawlService()
        self.llm = ChatOpenAI(
            model="deepseek-chat", 
            temperature=0.1,
            base_url="https://api.deepseek.com",
            api_key=os.getenv("DEEPSEEK_API_KEY")
        )
        self.prompts = DeveloperToolsPrompts()
        self.workflow = self._build_workflow()

    def _build_workflow(self):
        graph = StateGraph(ResearchState)
        graph.add_node("extract_tools", self._extract_tools_step)
        graph.add_node("research", self._research_step)
        graph.add_node("analyze", self._analyze_step)
        graph.set_entry_point("extract_tools")
        graph.add_edge("extract_tools", "research")
        graph.add_edge("research", "analyze")
        graph.add_edge("analyze", END)
        return graph.compile()

    def _extract_tools_step(self, state: ResearchState) -> Dict[str, Any]:
        print(f"Finding articles about: {state.query}")

        article_query = f"{state.query} tools comparison alternatives"
        search_results = self.firecrawl.search_companies(article_query, num_results=3)

        all_content = ""
        if hasattr(search_results, 'data') and search_results.data:
            for result in search_results.data:
                url = result.get("url", "")
                scraped = self.firecrawl.scrape_company_pages(url)
                if scraped and hasattr(scraped, 'markdown'):
                    all_content += scraped.markdown[:1500] + "\n\n"

        messages = [
            SystemMessage(content=self.prompts.TOOL_EXTRACTION_SYSTEM),
            HumanMessage(content=self.prompts.tool_extraction_user(state.query, all_content))
        ]

        try:
            response = self.llm.invoke(messages)
            tool_names = [
                name.strip()
                for name in response.content.strip().split("\n")
                if name.strip()
            ]
            print(f"Extracted tools: {', '.join(tool_names[:5])}")
            return {"extracted_tools": tool_names}
        except Exception as e:
            print(f"Error in extract_tools_step: {e}")
            return {"extracted_tools": []}
    
    def _analyze_company_content(self, company_name: str, content: str) -> CompanyAnalysis:
        # Instead of using structured_output, we'll use a JSON prompt
        analysis_prompt = f"""
        Analyze the following company information and return a JSON object with these exact fields:
        - pricing_model: string (e.g., "Free", "Freemium", "Subscription", "Pay-as-you-go", "Unknown")
        - is_open_source: boolean or null
        - tech_stack: array of strings
        - description: string (brief description)
        - api_available: boolean
        - language_support: array of strings
        - integration_capabilities: array of strings

        Company: {company_name}
        Content: {content[:2000]}

        Return only valid JSON:
        """

        messages = [
            SystemMessage(content="You are a helpful assistant that analyzes company information and returns structured JSON data."),
            HumanMessage(content=analysis_prompt)
        ]

        try:
            response = self.llm.invoke(messages)
            # Try to parse JSON from response
            json_str = response.content.strip()
            
            # Clean up the response if it has markdown formatting
            if json_str.startswith("```json"):
                json_str = json_str.replace("```json", "").replace("```", "").strip()
            elif json_str.startswith("```"):
                json_str = json_str.replace("```", "").strip()
            
            analysis_data = json.loads(json_str)
            
            return CompanyAnalysis(
                pricing_model=analysis_data.get("pricing_model", "Unknown"),
                is_open_source=analysis_data.get("is_open_source"),
                tech_stack=analysis_data.get("tech_stack", []),
                description=analysis_data.get("description", ""),
                api_available=analysis_data.get("api_available", False),
                language_support=analysis_data.get("language_support", []),
                integration_capabilities=analysis_data.get("integration_capabilities", [])
            )
        
        except Exception as e:
            print(f"Error analyzing company content for {company_name}: {e}")
            return CompanyAnalysis(
                pricing_model="Unknown",
                is_open_source=None,
                tech_stack=[],
                description="Analysis failed",
                api_available=False,
                language_support=[],
                integration_capabilities=[]
            )
        
    def _research_step(self, state: ResearchState) -> Dict[str, Any]:
        extracted_tools = getattr(state, "extracted_tools", [])
        if not extracted_tools:
            print("No tools extracted, falling back to direct search.")
            # as a backup, search for companies directly
            search_results = self.firecrawl.search_companies(state.query, num_results=4)
            if hasattr(search_results, 'data') and search_results.data:
                tool_names = [
                    result.get("metadata", {}).get("title", "Unknown")
                    for result in search_results.data
                ]
            else:
                tool_names = []
        else:
            tool_names = extracted_tools[:4]

        print(f"Researching specific tools: {', '.join(tool_names)}")

        companies = []

        for tool_name in tool_names:
            try:
                tool_search_results = self.firecrawl.search_companies(tool_name + " official site", num_results=1)

                if tool_search_results and hasattr(tool_search_results, 'data') and tool_search_results.data:
                    result = tool_search_results.data[0]
                    url = result.get("url", "")

                    company = CompanyInfo(
                        name=tool_name,
                        description=result.get("markdown", ""),
                        website=url,
                        tech_stack=[],
                        competitors=[]
                    )

                    scraped = self.firecrawl.scrape_company_pages(url)

                    if scraped and hasattr(scraped, 'markdown'):
                        content = scraped.markdown
                        analysis = self._analyze_company_content(company.name, content)

                        company.pricing_model = analysis.pricing_model
                        company.is_open_source = analysis.is_open_source
                        company.tech_stack = analysis.tech_stack
                        company.description = analysis.description
                        company.api_available = analysis.api_available
                        company.language_support = analysis.language_support
                        company.integration_capabilities = analysis.integration_capabilities

                    companies.append(company)
            except Exception as e:
                print(f"Error researching {tool_name}: {e}")
                continue
            
        return {"companies": companies}
    
    def _analyze_step(self, state: ResearchState) -> Dict[str, Any]:
        print("Generating recommendations...")

        company_data = []
        for company in state.companies:
            try:
                company_data.append(company.model_dump_json())
            except Exception as e:
                print(f"Error serializing company data: {e}")
                # Fallback to basic info
                company_data.append(f"Company: {company.name}, Website: {company.website}")

        messages = [
            SystemMessage(content=self.prompts.RECOMMENDATIONS_SYSTEM),
            HumanMessage(content=self.prompts.recommendations_user(state.query, "\n".join(company_data)))
        ]

        try:
            response = self.llm.invoke(messages)
            return {"analysis": response.content}
        except Exception as e:
            print(f"Error generating recommendations: {e}")
            return {"analysis": "Unable to generate recommendations due to an error."}
    
    def run(self, query: str) -> ResearchState:
        initial_state = ResearchState(query=query)
        try:
            final_state = self.workflow.invoke(initial_state)
            return ResearchState(**final_state)
        except Exception as e:
            print(f"Error running workflow: {e}")
            # Return a basic state with empty results
            return ResearchState(
                query=query,
                extracted_tools=[],
                companies=[],
                analysis="Workflow failed to complete due to an error."
            )