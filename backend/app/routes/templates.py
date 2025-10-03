from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.services.templates import TemplateService

router = APIRouter()

class Template(BaseModel):
    id: str
    name: str
    content: str
    category: str
    description: Optional[str] = None

class CreateTemplateRequest(BaseModel):
    name: str
    content: str
    category: str
    description: Optional[str] = None

class TemplateResponse(BaseModel):
    id: str
    name: str
    content: str
    category: str
    description: Optional[str] = None

@router.get("/templates", response_model=List[TemplateResponse])
async def get_templates(category: Optional[str] = None):
    """Get available templates, optionally filtered by category"""
    template_service = TemplateService()
    templates = template_service.get_templates(category=category)
    return [TemplateResponse(**template) for template in templates]

@router.post("/templates", response_model=TemplateResponse)
async def create_template(request: CreateTemplateRequest):
    """Create a new custom template"""
    template_service = TemplateService()
    template = template_service.create_template(
        name=request.name,
        content=request.content,
        category=request.category,
        description=request.description
    )
    return TemplateResponse(**template)

@router.get("/templates/{template_id}", response_model=TemplateResponse)
async def get_template(template_id: str):
    """Get a specific template by ID"""
    template_service = TemplateService()
    template = template_service.get_template(template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return TemplateResponse(**template)
