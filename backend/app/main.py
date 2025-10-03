from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import formatter, templates

app = FastAPI(
    title="LinkedIn Content Formatter API",
    description="API for formatting content to be LinkedIn-compatible",
    version="1.0.0"
)

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(formatter.router, prefix="/api", tags=["formatter"])
app.include_router(templates.router, prefix="/api", tags=["templates"])

@app.get("/")
async def root():
    return {"message": "LinkedIn Content Formatter API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
