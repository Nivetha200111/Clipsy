from fastapi import APIRouter
from pydantic import BaseModel
from app.services.formatter import LinkedInFormatter
from app.services.validator import ContentValidator

router = APIRouter()

class FormatRequest(BaseModel):
    content: str
    preserve_formatting: bool = True

class AdvancedFormatRequest(BaseModel):
    content: str
    ranges: list[dict] = []  # List of formatting ranges with start, end, and styles

class FormatResponse(BaseModel):
    formatted_content: str
    character_count: int
    warnings: list[str] = []

class ValidateRequest(BaseModel):
    content: str

class ValidateResponse(BaseModel):
    is_valid: bool
    warnings: list[str] = []
    suggestions: list[str] = []

@router.post("/format", response_model=FormatResponse)
async def format_content(request: FormatRequest):
    """Format content for LinkedIn compatibility"""
    formatter = LinkedInFormatter()
    validator = ContentValidator()
    
    # Format the content
    formatted_content = formatter.format_for_linkedin(
        request.content, 
        preserve_formatting=request.preserve_formatting
    )
    
    # Validate the formatted content
    validation_result = validator.validate_content(formatted_content)
    
    return FormatResponse(
        formatted_content=formatted_content,
        character_count=len(formatted_content),
        warnings=validation_result.get("warnings", [])
    )

@router.post("/format-advanced", response_model=FormatResponse)
async def format_content_advanced(request: AdvancedFormatRequest):
    """Format content with specific text ranges for LinkedIn compatibility"""
    formatter = LinkedInFormatter()
    validator = ContentValidator()
    
    # Format the content with specific ranges
    formatted_content = formatter.format_with_ranges(request.content, request.ranges)
    
    # Validate the formatted content
    validation_result = validator.validate_content(formatted_content)
    
    return FormatResponse(
        formatted_content=formatted_content,
        character_count=len(formatted_content),
        warnings=validation_result.get("warnings", [])
    )

@router.post("/validate", response_model=ValidateResponse)
async def validate_content(request: ValidateRequest):
    """Validate content for LinkedIn compatibility"""
    validator = ContentValidator()
    result = validator.validate_content(request.content)
    
    return ValidateResponse(
        is_valid=result.get("is_valid", True),
        warnings=result.get("warnings", []),
        suggestions=result.get("suggestions", [])
    )
