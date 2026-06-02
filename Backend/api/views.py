import requests
import base64
from datetime import datetime
from django.conf import settings
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer

# Set to False when you have valid M-Pesa credentials
MOCK_MPESA_MODE = False  # ← CHANGE TO FALSE FOR REAL M-PESA

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


@api_view(['POST'])
def stk_push(request):
    try:
        print("=== STK PUSH REQUEST RECEIVED ===")
        print("Raw Data:", request.data)

        phone = request.data.get('phone')
        amount = request.data.get('amount')
        order_id = request.data.get('order_id') or f"CW_{int(datetime.now().timestamp())}"

        if not phone or not amount:
            print("Error: Missing phone or amount")
            return Response({"error": "Phone number and amount are required"}, status=400)

        # Better Phone Formatting
        phone = str(phone).strip().replace(" ", "")
        if phone.startswith('0'):
            phone = '254' + phone[1:]
        elif not phone.startswith('254'):
            phone = '254' + phone

        if len(phone) != 12 or not phone.isdigit():
            print("Error: Invalid phone format")
            return Response({"error": "Invalid phone number. Use 07XXXXXXXX"}, status=400)

        amount = int(float(amount))

        print(f"Using Phone: {phone} | Amount: {amount}")

        # === MOCK MODE (for development without real M-Pesa) ===
        if MOCK_MPESA_MODE:
            print("⚠️  MOCK MODE ENABLED - Not calling real M-Pesa API")
            mock_response = {
                "MerchantRequestID": "12345-mock",
                "CheckoutRequestID": f"ws_CO_DMZ_123456_{int(datetime.now().timestamp())}",
                "ResponseCode": "0",
                "ResponseDescription": "Success. Request accepted for processing",
                "CustomerMessage": "Success. Request accepted for processing"
            }
            print("Mock Response:", mock_response)
            return Response(mock_response, status=200)

        # === REAL M-PESA MODE ===
        print("Using real M-Pesa API...")
        auth_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        auth_response = requests.get(
            auth_url, 
            auth=(settings.MPESA_CONSUMER_KEY, settings.MPESA_CONSUMER_SECRET),
            timeout=10
        )

        print(f"Auth Status: {auth_response.status_code}")

        if auth_response.status_code != 200:
            print("Auth Failed:", auth_response.text)
            return Response({"error": "M-Pesa Authentication Failed", "details": auth_response.text}, status=400)

        try:
            access_token = auth_response.json().get('access_token')
        except Exception as json_error:
            print("Error parsing auth response:", str(json_error))
            return Response({"error": "Failed to parse M-Pesa response", "details": str(json_error)}, status=400)

        # STK Push
        shortcode = settings.MPESA_SHORTCODE
        passkey = settings.MPESA_PASSKEY
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        password = base64.b64encode(f"{shortcode}{passkey}{timestamp}".encode()).decode()

        payload = {
            "BusinessShortCode": shortcode,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": phone,
            "PartyB": shortcode,
            "PhoneNumber": phone,
            "CallBackURL": settings.MPESA_CALLBACK_URL,
            "AccountReference": order_id,
            "TransactionDesc": "Conceited Wears Purchase"
        }

        headers = {'Authorization': f'Bearer {access_token}'}

        stk_response = requests.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            json=payload,
            headers=headers,
            timeout=15
        )

        print("M-Pesa Response:", stk_response.json())

        return Response(stk_response.json(), status=stk_response.status_code)

    except Exception as e:
        print("=== ERROR ===")
        print(str(e))
        return Response({"error": str(e)}, status=400)


@api_view(['POST'])
def mpesa_callback(request):
    """
    M-Pesa sends payment confirmation to this endpoint
    """
    print("=== MPESA CALLBACK RECEIVED ===")
    print("Callback Data:", request.data)
    
    # You can store the transaction result in your database here
    # For example:
    # Transaction.objects.create(
    #     result_code=request.data.get('ResultCode'),
    #     result_desc=request.data.get('ResultDesc'),
    #     checkout_request_id=request.data.get('CheckoutRequestID'),
    #     amount=request.data.get('Amount'),
    #     phone=request.data.get('PhoneNumber')
    # )
    
    # Return this exact response to acknowledge receipt
    return Response({
        "ResultCode": 0,
        "ResultDesc": "Success"
    }, status=200)