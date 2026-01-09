import requests
import asyncio
import logging
from typing import Dict, Any

logger = logging.getLogger(__name__)

class FormspreeService:
    def __init__(self, endpoint_url: str):
        self.endpoint_url = endpoint_url
        self.timeout = 10  # seconds

    async def submit_form(self, form_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Submit form data to Formspree endpoint
        """
        try:
            # Run the synchronous request in a thread pool
            loop = asyncio.get_event_loop()
            response = await loop.run_in_executor(
                None, 
                lambda: requests.post(
                    self.endpoint_url,
                    json=form_data,
                    headers={
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    timeout=self.timeout
                )
            )
            
            if response.status_code == 200:
                logger.info(f"Formspree submission successful for email: {form_data.get('email', 'unknown')}")
                return {
                    "success": True,
                    "status_code": response.status_code,
                    "response": response.json() if response.content else {}
                }
            else:
                logger.warning(f"Formspree submission failed with status {response.status_code}: {response.text}")
                return {
                    "success": False,
                    "status_code": response.status_code,
                    "error": response.text
                }
                
        except requests.exceptions.Timeout:
            logger.error("Formspree request timed out")
            return {
                "success": False,
                "error": "Request timed out"
            }
        except requests.exceptions.ConnectionError:
            logger.error("Formspree connection error")
            return {
                "success": False,
                "error": "Connection error"
            }
        except Exception as e:
            logger.error(f"Unexpected error submitting to Formspree: {str(e)}")
            return {
                "success": False,
                "error": f"Unexpected error: {str(e)}"
            }

    async def submit_contact_form(self, contact_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Submit contact form data to Formspree
        """
        # Format data for Formspree
        formspree_data = {
            "name": contact_data.get("name"),
            "email": contact_data.get("email"),
            "company": contact_data.get("company", ""),
            "project_type": contact_data.get("project_type", ""),
            "budget": contact_data.get("budget", ""),
            "message": contact_data.get("message"),
            "form_type": "Contact Form",
            "_subject": f"New Contact Form Submission from {contact_data.get('name')}"
        }
        
        return await self.submit_form(formspree_data)

    async def submit_waitlist_form(self, waitlist_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Submit waitlist form data to Formspree
        """
        # Format data for Formspree
        formspree_data = {
            "name": waitlist_data.get("name"),
            "email": waitlist_data.get("email"),
            "interests": waitlist_data.get("interests", ""),
            "form_type": "AI Waitlist",
            "_subject": f"New AI Waitlist Signup from {waitlist_data.get('name')}"
        }
        
        return await self.submit_form(formspree_data)