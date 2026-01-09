from fastapi import APIRouter, HTTPException, Request
import logging

from models import ContactSubmission, WaitlistSubmission, ContactSubmissionCreate, WaitlistSubmissionCreate, SubmissionResponse
from services.database_service_fixed import DatabaseService
from services.formspree_service import FormspreeService
from core.db import db  # ✅ import the shared db

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["forms"])

# ✅ Initialize services ONCE here
FORMSPREE_ENDPOINT = "https://formspree.io/f/mvgrekqd"
formspree_service = FormspreeService(FORMSPREE_ENDPOINT)
database_service = DatabaseService(db)  # ✅ now database is ready

def get_client_ip(request: Request) -> str:
    if "x-forwarded-for" in request.headers:
        return request.headers["x-forwarded-for"].split(",")[0].strip()
    elif "x-real-ip" in request.headers:
        return request.headers["x-real-ip"]
    else:
        return request.client.host if request.client else "unknown"

@router.post("/contact", response_model=SubmissionResponse)
async def submit_contact_form(contact_data: ContactSubmissionCreate, request: Request):
    # Log the received data for debugging
    logger.info(f"Received contact form data: {contact_data.dict()}")
    logger.info(f"Raw request body: {await request.body()}")
    try:
        client_ip = get_client_ip(request)
        submission = ContactSubmission(
            name=contact_data.name,
            email=contact_data.email,
            company=contact_data.company,
            project_type=contact_data.project_type,
            budget=contact_data.budget,
            message=contact_data.message,
            ip_address=client_ip,
        )

        # Save to DB
        submission_id = None
        try:
            submission_id = await database_service.save_contact_submission(submission)
            logger.info(f"Contact saved: {submission_id}")
        except Exception as db_error:
            # Print the full error so we can see what went wrong
            import traceback
            traceback.print_exc()

            logger.error(f"Database save failed: {str(db_error)}")
            # Continue without database save

        # Send to Formspree
        formspree_result = await formspree_service.submit_contact_form(contact_data.dict(by_alias=True))
        status = "sent" if formspree_result.get("success") else "failed"
        if submission_id:
            await database_service.update_contact_formspree_status(submission_id, status)

        return SubmissionResponse(success=True, message="Thanks! We'll contact you soon.", submission_id=submission_id)

    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Unexpected error in /contact")
        raise HTTPException(status_code=500, detail="Unexpected server error")

@router.post("/ai-waitlist", response_model=SubmissionResponse)
async def submit_waitlist_form(waitlist_data: WaitlistSubmissionCreate, request: Request):
    try:
        client_ip = get_client_ip(request)

        logger.info(f"Received waitlist submission: {waitlist_data.dict()} from IP: {client_ip}")

        # Check duplicates
        try:
            email_exists = await database_service.check_email_exists(waitlist_data.email, "waitlist")
            if email_exists:
                return SubmissionResponse(success=True, message="You're already on the waitlist!")
        except Exception as db_error:
            logger.error(f"Database check failed: {str(db_error)}")
            # Continue without duplicate check

        # ✅ Build a WaitlistSubmission object (this was missing!)
        submission = WaitlistSubmission(
            name=waitlist_data.name,
            email=waitlist_data.email,
            interests=waitlist_data.interests,
            ip_address=client_ip,
        )

        # Save to DB
        submission_id = None
        try:
            submission_id = await database_service.save_waitlist_submission(submission)
            logger.info(f"Waitlist saved: {submission_id}")
        except Exception as db_error:
            import traceback
            traceback.print_exc()
            logger.error(f"Database save failed: {str(db_error)}")
            # Continue without database save

        # Send to Formspree
        try:
            formspree_result = await formspree_service.submit_waitlist_form(waitlist_data.dict())
            status = "sent" if formspree_result.get("success") else "failed"
            if submission_id:
                await database_service.update_waitlist_formspree_status(submission_id, status)
        except Exception as fs_error:
            import traceback
            traceback.print_exc()
            logger.error(f"Formspree submission failed: {str(fs_error)}")
            # Optionally update status as failed
            if submission_id:
                await database_service.update_waitlist_formspree_status(submission_id, "failed")

        return SubmissionResponse(success=True, message="Welcome to the waitlist!", submission_id=submission_id)

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        logger.exception("Unexpected error in /ai-waitlist")
        raise HTTPException(status_code=500, detail="Unexpected server error")


# Admin endpoints
@router.get("/admin/contact-submissions")
async def get_contact_submissions():
    try:
        submissions = await database_service.get_contact_submissions()
        return submissions
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch contact submissions: {str(e)}"
        )

@router.get("/admin/waitlist-submissions")
async def get_waitlist_submissions():
    try:
        subs = await database_service.get_waitlist_submissions(limit=50)
        return {"success": True, "submissions": subs}
    except Exception:
        logger.exception("Error fetching waitlist submissions")
        raise HTTPException(status_code=500, detail="Failed to fetch submissions")
