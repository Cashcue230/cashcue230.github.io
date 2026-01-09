import asyncio
from core.db import client, db

async def test_db():
    try:
        # Test connection
        await client.server_info()
        print("MongoDB connection successful.")

        # Test database access
        collections = await db.list_collection_names()
        print(f"Collections in database: {collections}")

        # Test insert
        test_doc = {"test": "value", "timestamp": "now"}
        result = await db.test_collection.insert_one(test_doc)
        print(f"Test insert successful: {result.inserted_id}")

        # Clean up
        await db.test_collection.delete_one({"_id": result.inserted_id})
        print("Test cleanup successful.")

    except Exception as e:
        print(f"Database test failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_db())
