from bson import ObjectId
from models import ContactSubmission, WaitlistSubmission

def serialize_doc(doc):
    """Convert MongoDB document to JSON-serializable dict"""
    if not doc:
        return doc
    doc["_id"] = str(doc["_id"])  # convert ObjectId to string
    return doc

class DatabaseService:
    def __init__(self, db):
        self.db = db
        self.contact_collection = db["contact_submissions"]
        self.waitlist_collection = db["waitlist_submissions"]

    async def save_contact_submission(self, submission: ContactSubmission):
        result = await self.contact_collection.insert_one(submission.dict())
        return str(result.inserted_id)

    async def save_waitlist_submission(self, submission: WaitlistSubmission):
        result = await self.waitlist_collection.insert_one(submission.dict())
        return str(result.inserted_id)

    async def get_contact_submissions(self, limit: int = 50):
        cursor = self.contact_collection.find().sort("submitted_at", -1).limit(limit)
        docs = await cursor.to_list(length=limit)
        return [serialize_doc(d) for d in docs]   # ✅ serialize ObjectId

    async def get_waitlist_submissions(self, limit: int = 50):
        cursor = self.waitlist_collection.find().sort("submitted_at", -1).limit(limit)
        docs = await cursor.to_list(length=limit)
        return [serialize_doc(d) for d in docs]   # ✅ serialize ObjectId

    async def check_email_exists(self, email: str, collection: str):
        if collection == "waitlist":
            return await self.waitlist_collection.find_one({"email": email}) is not None
        elif collection == "contact":
            return await self.contact_collection.find_one({"email": email}) is not None
        return False

    async def update_contact_formspree_status(self, submission_id: str, status: str):
        await self.contact_collection.update_one({"_id": ObjectId(submission_id)}, {"$set": {"formspree_status": status}})

    async def update_waitlist_formspree_status(self, submission_id: str, status: str):
        await self.waitlist_collection.update_one({"_id": ObjectId(submission_id)}, {"$set": {"formspree_status": status}})
