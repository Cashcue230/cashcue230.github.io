# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from core.db import db, client
from routes.forms import router as forms_router

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("cashcue.main")

app = FastAPI(title="CashCue API", version="1.0.0")

# CORS: restrict for production, allow all for local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# include router (forms_router already contains prefix "/api")
app.include_router(forms_router)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "CashCue API"}

@app.on_event("shutdown")
def shutdown_db_client():
    try:
        client.close()
        logger.info("Mongo client closed")
    except Exception:
        logger.exception("Error closing Mongo client")
