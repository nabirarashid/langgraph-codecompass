from typing import List, Optional, Dict, Any
from pydantic import BaseModel


class TechStackComponent(BaseModel):
    """Individual component of a tech stack"""
    name: str
    category: str  # frontend, backend, database, deployment, etc.
    description: str
    pros: List[str] = []
    cons: List[str] = []
    learning_curve: str  # Easy, Medium, Hard
    popularity: str  # Low, Medium, High
    cost: str  # Free, Paid, Enterprise
    use_cases: List[str] = []


class TechStack(BaseModel):
    """Complete tech stack recommendation"""
    name: str  # e.g., "MERN Stack", "LAMP Stack", "JAMStack"
    description: str
    components: List[TechStackComponent] = []
    
    # Stack characteristics
    complexity: str  # Simple, Moderate, Complex
    time_to_market: str  # Fast, Medium, Slow
    scalability: str  # Low, Medium, High
    cost_estimate: str  # $0-100/month, $100-500/month, etc.
    team_size_fit: str  # Solo, Small (2-5), Medium (5-15), Large (15+)
    
    # Specific benefits
    best_for: List[str] = []  # MVP, Startup, Enterprise, etc.
    industries: List[str] = []  # E-commerce, SaaS, Social Media, etc.
    
    # Tutorial/learning resources
    learning_resources: List[str] = []


class ProjectRequirements(BaseModel):
    """Analysis of project requirements from user input"""
    project_type: str  # Web App, Mobile App, API, Desktop, etc.
    scale: str  # MVP, Small, Medium, Large, Enterprise
    budget: str  # Low, Medium, High, Enterprise
    timeline: str  # Days, Weeks, Months, Long-term
    team_experience: str  # Beginner, Intermediate, Advanced
    performance_needs: str  # Basic, High, Enterprise
    special_requirements: List[str] = []  # Real-time, AI/ML, etc.


class StackRecommendationState(BaseModel):
    """State for the tech stack recommendation workflow"""
    query: str
    project_requirements: Optional[ProjectRequirements] = None
    recommended_stacks: List[TechStack] = []
    search_results: List[Dict[str, Any]] = []
    analysis: Optional[str] = None  # Overall recommendation explanation