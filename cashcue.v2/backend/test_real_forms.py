import requests
import json

BASE_URL = "http://127.0.0.1:8000/api"

# Test contact form
contact_data = {
    "name": "Test User",
    "email": "test@example.com",
    "company": "",
    "projectType": "",
    "budget": "",
    "message": "Test message"
}

print("Testing contact form...")
try:
    response = requests.post(f"{BASE_URL}/contact", json=contact_data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
    if response.status_code == 422:
        print(f"Validation errors: {response.json()}")
except Exception as e:
    print(f"Error: {e}")

# Test waitlist form
waitlist_data = {
    "name": "Test User",
    "email": "test@example.com",
    "interests": ""
}

print("\nTesting waitlist form...")
try:
    response = requests.post(f"{BASE_URL}/ai-waitlist", json=waitlist_data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
    if response.status_code == 422:
        print(f"Validation errors: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
