from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import os
from src.workflow import Workflow


app = FastAPI(title="Tech Stack Recommender API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize workflow
workflow = Workflow()


class SearchRequest(BaseModel):
    query: str


class TechComponent(BaseModel):
    name: str
    category: str
    description: str
    pros: List[str]
    cons: List[str]
    learningCurve: str
    popularity: str
    cost: str
    useCases: List[str]


class TechStackResponse(BaseModel):
    name: str
    description: str
    components: List[TechComponent]
    complexity: str
    timeToMarket: str
    scalability: str
    costEstimate: str
    teamSizeFit: str
    bestFor: List[str]
    industries: List[str]
    learningResources: List[str]


class SearchResponse(BaseModel):
    stacks: List[TechStackResponse]
    analysis: str


@app.post("/api/search", response_model=SearchResponse)
async def search_stacks(request: SearchRequest):
    """Get tech stack recommendations based on project description"""
    try:
        if not request.query.strip():
            raise HTTPException(status_code=400, detail="Query cannot be empty")
        
        # Run the workflow
        result = workflow.run(request.query)
        
        # Transform backend data to frontend format
        stacks = []
        for stack in result.recommended_stacks:
            components = []
            for comp in stack.components:
                component = TechComponent(
                    name=comp.name,
                    category=comp.category,
                    description=comp.description,
                    pros=comp.pros,
                    cons=comp.cons,
                    learningCurve=comp.learning_curve,
                    popularity=comp.popularity,
                    cost=comp.cost,
                    useCases=comp.use_cases
                )
                components.append(component)
            
            stack_response = TechStackResponse(
                name=stack.name,
                description=stack.description,
                components=components,
                complexity=stack.complexity,
                timeToMarket=stack.time_to_market,
                scalability=stack.scalability,
                costEstimate=stack.cost_estimate,
                teamSizeFit=stack.team_size_fit,
                bestFor=stack.best_for,
                industries=stack.industries,
                learningResources=stack.learning_resources
            )
            stacks.append(stack_response)
        
        response = SearchResponse(
            stacks=stacks,
            analysis=result.analysis or "Tech stack recommendations generated successfully."
        )
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "Tech Stack Recommender API is running"}


if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
