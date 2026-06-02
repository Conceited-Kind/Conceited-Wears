#!/usr/bin/env python
import os
import django
import requests
import base64
from datetime import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.conf import settings

print("Testing M-Pesa Credentials...")
print(f"Consumer Key: {settings.MPESA_CONSUMER_KEY[:10]}...")
print(f"Consumer Secret: {settings.MPESA_CONSUMER_SECRET[:10]}...")
print()

auth_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

try:
    response = requests.get(
        auth_url,
        auth=(settings.MPESA_CONSUMER_KEY, settings.MPESA_CONSUMER_SECRET),
        timeout=10,
        verify=True
    )
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    print()
    
    if response.status_code == 200:
        data = response.json()
        access_token = data.get('access_token')
        print(f"✅ SUCCESS! Access Token: {access_token[:20]}...")
    else:
        print(f"❌ FAILED: Status {response.status_code}")
        print("Common issues:")
        print("1. Invalid credentials - check Daraja portal")
        print("2. Network blocked - check firewall/proxy")
        print("3. M-Pesa sandbox is down")
        
except Exception as e:
    print(f"❌ ERROR: {str(e)}")
