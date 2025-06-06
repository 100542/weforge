import os
import requests
import json
from dotenv import load_dotenv
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE = os.getenv("SUPABASE_SERVICE_ROLE")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")


@csrf_exempt
def supabase_register(request):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request method"}, status=405)

    try:
        data = json.loads(request.body)
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()
        name = data.get("name", "").strip()

        if not email or not password:
            return JsonResponse({"error": "Email and password are required"}, status=400)

        headers = {
            "apikey": SUPABASE_SERVICE_ROLE,
            "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE}",
            "Content-Type": "application/json",
        }

        payload = {
            "email": email,
            "password": password,
            "data": {"name": name}
        }

        response = requests.post(
            f"{SUPABASE_URL}/auth/v1/admin/users",
            json=payload,
            headers=headers,
        )

        if response.status_code in [200, 201]:
            return JsonResponse({"success": True})

        try:
            error = response.json()
        except Exception:
            error = {"msg": response.text}

        return JsonResponse({"error": error.get("msg", "Failed to register user")}, status=400)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def supabase_login(request):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request method"}, status=405)

    try:
        data = json.loads(request.body)
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()

        if not email or not password:
            return JsonResponse({"error": "Email and password are required"}, status=400)

        headers = {
            "apikey": SUPABASE_ANON_KEY,
            "Content-Type": "application/json",
        }

        payload = {
            "email": email,
            "password": password,
        }

        response = requests.post(
            f"{SUPABASE_URL}/auth/v1/token?grant_type=password",
            json=payload,
            headers=headers,
        )

        if response.status_code == 200:
            user_data = response.json()
            return JsonResponse({
                "success": True,
                "access_token": user_data.get("access_token"),
                "user": user_data.get("user", {})
            })

        try:
            error = response.json()
        except Exception:
            error = {"msg": response.text}

        return JsonResponse({"error": error.get("msg", "Login failed")}, status=401)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
