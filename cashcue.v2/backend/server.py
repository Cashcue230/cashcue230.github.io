from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime
import logging

logging.basicConfig(
    level=logging.DEBUG,  # 👈 show full debug logs
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')
# MongoDB connection setup
MONGO_URL = os.getenv("MONGO_URL","mongodb://localhost:27017/cashcue")
DB_NAME = os.getenv("DB_NAME", "cashcue")
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# Import forms and initialize services
from routes import forms


# Create the main app without a prefix
app = FastAPI(title="CashCue API", version="1.0.0")

# Create a router with the /api prefix for existing routes
api_router = APIRouter(prefix="/api")

# Define Models (keeping existing ones for compatibility)
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add existing routes to the router
@api_router.get("/")
async def root():
    return {"message": "CashCue API v1.0.0 - Ready to serve"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Health check endpoint (no prefix)
@app.get("/health")
@app.get("/health")
async def health_check():
    return {"status": "ok"}

app.include_router(api_router)  # Existing routes
app.include_router(forms.router)  # New forms routes
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("CashCue API starting up...")
    logger.info("Database connected successfully")

@app.on_event("shutdown")
async def shutdown_db_client():
    logger.info("CashCue API shutting down...")
    client.close()

# Add this block to run with uvicorn
import uvicorn

if __name__ == "__main__":
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)
    # No additional code needed; the script already contains the correct uvicorn run block.