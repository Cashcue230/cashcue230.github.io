import motor.motor_asyncio
import os
from dotenv import load_dotenv
from urllib.parse import quote_plus

# Load .env file
load_dotenv()

# Your Mongo Atlas credentials
username = "cashcue001_db_user"
password = "Gsyrd#%_x44RQQz"  # original password with special chars
escaped_password = quote_plus(password)  # ✅ escape automatically

MONGO_URL = "mongodb+srv://cashcue001_db_user:Gsyrd%23%25_x44RQQz@cluster0.vmuopb4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

DB_NAME = os.getenv("DB_NAME", "cashcue")

# Create MongoDB client
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

def get_db():
    return db

# Optional: Async function to check MongoDB connection when needed
import asyncio
from fastapi import FastAPI

async def check_mongo_connection():
    try:
        await client.server_info()
        print("MongoDB connection successful.")
    except Exception as e:
        print(f"MongoDB connection failed: {e}")

# Usage example (do not call at import time):
# asyncio.run(check_mongo_connection())

# FastAPI root route for testing

app = FastAPI()

@app.get("/")
async def root():
    return {"status": "Backend running!"}
