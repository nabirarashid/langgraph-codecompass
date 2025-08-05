from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import os
from src.workflow import Workflow


app = FastAPI(title="DevTools Research API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://*.vercel.app", "http://localhost:3000", "https://your-actual-vercel-url.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize workflow
workflow = Workflow()


class SearchRequest(BaseModel):
    query: str


class Tool(BaseModel):
    name: str
    website: str
    pricing: str
    openSource: bool
    apiAvailable: bool
    description: str
    techStack: List[str]
    features: List[str]


class SearchResponse(BaseModel):
    tools: List[Tool]
    recommendation: str


@app.post("/api/search", response_model=SearchResponse)
async def search_tools(request: SearchRequest):
    """Search for developer tools based on query"""
    try:
        if not request.query.strip():
            raise HTTPException(status_code=400, detail="Query cannot be empty")
        
        # Run the workflow
        result = workflow.run(request.query)
        
        # Transform backend data to frontend format
        tools = []
        for company in result.companies:
            tool = Tool(
                name=company.name,
                website=company.website,
                pricing=company.pricing_model or "Unknown",
                openSource=company.is_open_source or False,
                apiAvailable=company.api_available or False,
                description=company.description or "",
                techStack=company.tech_stack or [],
                features=company.integration_capabilities or []
            )
            tools.append(tool)
        
        response = SearchResponse(
            tools=tools,
            recommendation=result.analysis or "No specific recommendation available."
        )
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "DevTools Research API is running"}


if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
