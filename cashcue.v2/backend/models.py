from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid


# -------------------------
# Contact Form Models
# -------------------------
class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=100)
    project_type: Optional[str] = Field(None, max_length=50, alias="projectType")
    budget: Optional[str] = Field(None, max_length=50)
    message: str = Field(..., min_length=1, max_length=2000)

    class Config:
        populate_by_name = True  # ✅ allow projectType alias


class ContactSubmission(ContactSubmissionCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    formspree_status: str = "pending"  # 'sent', 'failed', 'pending'
    ip_address: Optional[str] = None


# -------------------------
# AI Waitlist Models
# -------------------------
class WaitlistSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    interests: Optional[str] = Field("", max_length=500)


class WaitlistSubmission(WaitlistSubmissionCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    formspree_status: str = "pending"  # 'sent', 'failed', 'pending'
    ip_address: Optional[str] = None


# -------------------------
# Service Model (future CMS)
# -------------------------
class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    features: List[str]
    order: int = 0
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)


# -------------------------
# Project Model (future CMS)
# -------------------------
class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    image: str  # URL
    category: str
    tech: List[str]
    is_active: bool = True
    order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)


# -------------------------
# Response Models
# -------------------------
class SubmissionResponse(BaseModel):
    success: bool
    message: str
    submission_id: Optional[str] = None
