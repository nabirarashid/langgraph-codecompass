
class TechStackPrompts:
    """Collection of prompts for analyzing and recommending tech stacks"""

    # Requirements analysis prompts
    REQUIREMENTS_ANALYSIS_SYSTEM = """You are a technical consultant who analyzes project requirements to understand the technical needs.
                                   Extract structured project requirements from user queries to inform tech stack recommendations."""

    @staticmethod
    def requirements_analysis_user(query: str) -> str:
        return f"""User Query: {query}

                Analyze this project description and return a JSON object with these exact fields:
                - project_type: One of "Web App", "Mobile App", "Desktop App", "API/Backend", "Data Pipeline", "Machine Learning", "Game", "E-commerce", "Content Management", "Other"
                - scale: One of "Small", "Medium", "Large", "Enterprise"
                - budget: One of "Low", "Medium", "High", "Enterprise"
                - timeline: One of "Days", "Weeks", "Months", "Long-term"
                - team_experience: One of "Beginner", "Intermediate", "Advanced", "Expert"
                - performance_needs: One of "Basic", "Medium", "High", "Critical"
                - special_requirements: Array of strings for any specific needs (e.g., "Real-time", "Offline support", "AI/ML", "High security", "Mobile-first", "SEO important")

                Example:
                {{
                    "project_type": "Web App",
                    "scale": "Medium",
                    "budget": "Medium",
                    "timeline": "Weeks",
                    "team_experience": "Intermediate",
                    "performance_needs": "Medium",
                    "special_requirements": ["SEO important", "Mobile-first"]
                }}

                Return only valid JSON."""

    # Tech stack recommendation prompts
    STACK_RECOMMENDATION_SYSTEM = """You are a senior technical architect with expertise in modern software development.
                                  Recommend complete, practical tech stacks based on project requirements.
                                  
                                  Consider:
                                  - Project complexity and scale
                                  - Team experience level
                                  - Budget constraints
                                  - Time to market requirements
                                  - Long-term maintainability
                                  - Industry best practices
                                  
                                  Provide 2-3 different stack options ranging from simple to advanced."""

    @staticmethod
    def stack_recommendation_user(query: str, requirements: str) -> str:
        return f"""Project Description: {query}
                
                Project Requirements: {requirements}

                Based on these requirements, recommend 2-3 complete tech stacks. Return a JSON object with:

                {{
                    "recommended_stacks": [
                        {{
                            "name": "Stack name (e.g., 'MEAN Stack', 'JAMstack', 'Laravel + Vue')",
                            "description": "Brief description of the stack and why it fits",
                            "components": [
                                {{
                                    "name": "Technology name",
                                    "category": "Frontend/Backend/Database/DevOps/etc",
                                    "description": "What this technology does",
                                    "pros": ["Advantage 1", "Advantage 2"],
                                    "cons": ["Limitation 1", "Limitation 2"],
                                    "learning_curve": "Easy/Medium/Hard",
                                    "popularity": "Low/Medium/High",
                                    "cost": "Free/Paid/Enterprise",
                                    "use_cases": ["Use case 1", "Use case 2"]
                                }}
                            ],
                            "complexity": "Simple/Moderate/Complex",
                            "time_to_market": "Fast/Medium/Slow",
                            "scalability": "Low/Medium/High",
                            "cost_estimate": "Brief cost breakdown",
                            "team_size_fit": "Small/Medium/Large",
                            "best_for": ["Type of project 1", "Type of project 2"],
                            "industries": ["Industry 1", "Industry 2"],
                            "learning_resources": ["Resource 1", "Resource 2"]
                        }}
                    ],
                    "analysis": "Brief comparison and final recommendation (2-3 sentences)"
                }}

                Focus on practical, proven technology combinations that work well together.
                Consider the full development lifecycle including deployment, monitoring, and maintenance.
                
                Return only valid JSON."""

    # Alternative prompts for specific scenarios
    BEGINNER_STACK_SYSTEM = """You specialize in recommending tech stacks for beginner developers.
                              Focus on technologies that are easy to learn, have great documentation, and strong community support."""

    ENTERPRISE_STACK_SYSTEM = """You specialize in enterprise-grade tech stack recommendations.
                                Focus on scalability, security, maintainability, and long-term support."""

    STARTUP_STACK_SYSTEM = """You specialize in tech stacks for startups and fast-moving projects.
                             Focus on rapid development, cost-effectiveness, and flexibility."""