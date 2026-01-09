#!/usr/bin/env python3
"""
CashCue Backend API Testing Suite
Tests all backend functionality including form submissions, database integration, and error handling.
"""

import requests
import json
import time
import uuid
from datetime import datetime
from typing import Dict, Any, List

# Backend URL from frontend environment
BACKEND_URL = "https://cashcue-future.preview.emergentagent.com"

class CashCueBackendTester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
        self.test_results = []
        
    def log_test(self, test_name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'details': details,
            'timestamp': datetime.now().isoformat(),
            'response_data': response_data
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {details}")
        
    def test_health_endpoint(self):
        """Test GET /health endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "healthy" and "service" in data:
                    self.log_test("Health Check", True, f"Status: {response.status_code}, Response: {data}")
                    return True
                else:
                    self.log_test("Health Check", False, f"Invalid response format: {data}")
                    return False
            else:
                self.log_test("Health Check", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Health Check", False, f"Exception: {str(e)}")
            return False
    
    def test_api_root_endpoint(self):
        """Test GET /api/ endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/api/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "CashCue API" in data["message"]:
                    self.log_test("API Root", True, f"Status: {response.status_code}, Response: {data}")
                    return True
                else:
                    self.log_test("API Root", False, f"Invalid response format: {data}")
                    return False
            else:
                self.log_test("API Root", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("API Root", False, f"Exception: {str(e)}")
            return False
    
    def test_contact_form_valid_submission(self):
        """Test POST /api/contact with valid data"""
        test_data = {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@techstartup.com",
            "company": "TechStartup Inc",
            "projectType": "website",
            "budget": "10k-25k",
            "message": "I need a futuristic website for my tech startup. We're looking for something that showcases our AI products with modern animations and interactive elements."
        }
        
        try:
            response = self.session.post(f"{self.base_url}/api/contact", json=test_data, timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "submission_id" in data and "message" in data:
                    self.log_test("Contact Form Valid", True, 
                                f"Status: {response.status_code}, ID: {data.get('submission_id')}, Message: {data.get('message')}")
                    return True, data.get('submission_id')
                else:
                    self.log_test("Contact Form Valid", False, f"Invalid response format: {data}")
                    return False, None
            else:
                self.log_test("Contact Form Valid", False, f"Status: {response.status_code}, Response: {response.text}")
                return False, None
                
        except Exception as e:
            self.log_test("Contact Form Valid", False, f"Exception: {str(e)}")
            return False, None
    
    def test_contact_form_missing_fields(self):
        """Test POST /api/contact with missing required fields"""
        test_data = {
            "name": "John Doe",
            # Missing email and message
            "company": "Test Company"
        }
        
        try:
            response = self.session.post(f"{self.base_url}/api/contact", json=test_data, timeout=10)
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_test("Contact Form Missing Fields", True, 
                            f"Correctly rejected invalid data with status: {response.status_code}")
                return True
            else:
                self.log_test("Contact Form Missing Fields", False, 
                            f"Should have returned 422, got: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Contact Form Missing Fields", False, f"Exception: {str(e)}")
            return False
    
    def test_contact_form_invalid_email(self):
        """Test POST /api/contact with invalid email format"""
        test_data = {
            "name": "Test User",
            "email": "invalid-email-format",
            "message": "This should fail due to invalid email format"
        }
        
        try:
            response = self.session.post(f"{self.base_url}/api/contact", json=test_data, timeout=10)
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_test("Contact Form Invalid Email", True, 
                            f"Correctly rejected invalid email with status: {response.status_code}")
                return True
            else:
                self.log_test("Contact Form Invalid Email", False, 
                            f"Should have returned 422, got: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Contact Form Invalid Email", False, f"Exception: {str(e)}")
            return False
    
    def test_waitlist_form_valid_submission(self):
        """Test POST /api/ai-waitlist with valid data"""
        test_data = {
            "name": "Michael Chen",
            "email": "michael.chen@entrepreneur.com",
            "interests": "I'm interested in using AI to create passive income streams through digital products and automated business processes."
        }
        
        try:
            response = self.session.post(f"{self.base_url}/api/ai-waitlist", json=test_data, timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "message" in data:
                    self.log_test("Waitlist Form Valid", True, 
                                f"Status: {response.status_code}, Message: {data.get('message')}")
                    return True, test_data["email"]
                else:
                    self.log_test("Waitlist Form Valid", False, f"Invalid response format: {data}")
                    return False, None
            else:
                self.log_test("Waitlist Form Valid", False, f"Status: {response.status_code}, Response: {response.text}")
                return False, None
                
        except Exception as e:
            self.log_test("Waitlist Form Valid", False, f"Exception: {str(e)}")
            return False, None
    
    def test_waitlist_form_duplicate_email(self, email: str):
        """Test POST /api/ai-waitlist with duplicate email"""
        test_data = {
            "name": "Michael Chen Again",
            "email": email,  # Same email as previous test
            "interests": "Trying to sign up again with same email"
        }
        
        try:
            response = self.session.post(f"{self.base_url}/api/ai-waitlist", json=test_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "already on our waitlist" in data.get("message", "").lower():
                    self.log_test("Waitlist Duplicate Email", True, 
                                f"Correctly handled duplicate email: {data.get('message')}")
                    return True
                else:
                    self.log_test("Waitlist Duplicate Email", False, 
                                f"Should have detected duplicate email: {data}")
                    return False
            else:
                self.log_test("Waitlist Duplicate Email", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Waitlist Duplicate Email", False, f"Exception: {str(e)}")
            return False
    
    def test_waitlist_form_missing_fields(self):
        """Test POST /api/ai-waitlist with missing required fields"""
        test_data = {
            "name": "Test User"
            # Missing email
        }
        
        try:
            response = self.session.post(f"{self.base_url}/api/ai-waitlist", json=test_data, timeout=10)
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_test("Waitlist Missing Fields", True, 
                            f"Correctly rejected invalid data with status: {response.status_code}")
                return True
            else:
                self.log_test("Waitlist Missing Fields", False, 
                            f"Should have returned 422, got: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Waitlist Missing Fields", False, f"Exception: {str(e)}")
            return False
    
    def test_malformed_json(self):
        """Test endpoints with malformed JSON"""
        malformed_data = '{"name": "Test", "email": invalid-json}'
        
        try:
            response = self.session.post(
                f"{self.base_url}/api/contact", 
                data=malformed_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            # Should return 422 for malformed JSON
            if response.status_code == 422:
                self.log_test("Malformed JSON", True, 
                            f"Correctly rejected malformed JSON with status: {response.status_code}")
                return True
            else:
                self.log_test("Malformed JSON", False, 
                            f"Should have returned 422, got: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Malformed JSON", False, f"Exception: {str(e)}")
            return False
    
    def test_admin_contact_submissions(self):
        """Test GET /api/admin/contact-submissions"""
        try:
            response = self.session.get(f"{self.base_url}/api/admin/contact-submissions", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "success" in data and "submissions" in data:
                    submissions_count = len(data["submissions"])
                    self.log_test("Admin Contact Submissions", True, 
                                f"Retrieved {submissions_count} contact submissions")
                    return True
                else:
                    self.log_test("Admin Contact Submissions", False, f"Invalid response format: {data}")
                    return False
            else:
                self.log_test("Admin Contact Submissions", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Admin Contact Submissions", False, f"Exception: {str(e)}")
            return False
    
    def test_admin_waitlist_submissions(self):
        """Test GET /api/admin/waitlist-submissions"""
        try:
            response = self.session.get(f"{self.base_url}/api/admin/waitlist-submissions", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "success" in data and "submissions" in data:
                    submissions_count = len(data["submissions"])
                    self.log_test("Admin Waitlist Submissions", True, 
                                f"Retrieved {submissions_count} waitlist submissions")
                    return True
                else:
                    self.log_test("Admin Waitlist Submissions", False, f"Invalid response format: {data}")
                    return False
            else:
                self.log_test("Admin Waitlist Submissions", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Admin Waitlist Submissions", False, f"Exception: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"\n🚀 Starting CashCue Backend API Tests")
        print(f"Backend URL: {self.base_url}")
        print("=" * 60)
        
        # 1. Basic Health Checks
        print("\n📋 Basic Health Checks")
        self.test_health_endpoint()
        self.test_api_root_endpoint()
        
        # 2. Contact Form Tests
        print("\n📝 Contact Form Tests")
        contact_success, submission_id = self.test_contact_form_valid_submission()
        self.test_contact_form_missing_fields()
        self.test_contact_form_invalid_email()
        
        # 3. AI Waitlist Tests
        print("\n🤖 AI Waitlist Tests")
        waitlist_success, test_email = self.test_waitlist_form_valid_submission()
        if waitlist_success and test_email:
            # Test duplicate email handling
            time.sleep(1)  # Brief delay to ensure first submission is processed
            self.test_waitlist_form_duplicate_email(test_email)
        self.test_waitlist_form_missing_fields()
        
        # 4. Error Handling Tests
        print("\n⚠️ Error Handling Tests")
        self.test_malformed_json()
        
        # 5. Admin Endpoint Tests
        print("\n👨‍💼 Admin Endpoint Tests")
        self.test_admin_contact_submissions()
        self.test_admin_waitlist_submissions()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        # Show failed tests
        failed_tests = [result for result in self.test_results if not result['success']]
        if failed_tests:
            print(f"\n❌ Failed Tests:")
            for test in failed_tests:
                print(f"  - {test['test']}: {test['details']}")
        
        return passed == total

def main():
    """Main test execution"""
    tester = CashCueBackendTester()
    success = tester.run_all_tests()
    
    if success:
        print(f"\n🎉 All tests passed! Backend is working correctly.")
        return 0
    else:
        print(f"\n💥 Some tests failed. Check the details above.")
        return 1

if __name__ == "__main__":
    exit(main())