import httpx, os
from passlib.context import CryptContext
from dotenv import load_dotenv

load_dotenv()
pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

users = [
    {
        "email": "ic@theodra.demo",
        "password_hash": pwd.hash("demo1234"),
        "role": "ic_member",
        "full_name": "Priya Sharma",
        "department": "Legal",
        "designation": "Senior Counsel",
    },
    {
        "email": "hr@theodra.demo",
        "password_hash": pwd.hash("demo1234"),
        "role": "hr_admin",
        "full_name": "Ananya Krishnan",
        "department": "Human Resources",
        "designation": "Head of HR",
    },
]

for user in users:
    response = httpx.post(
        f"{os.getenv('SUPABASE_URL')}/rest/v1/users",
        headers={
            "apikey": os.getenv("SUPABASE_SERVICE_KEY"),
            "Authorization": f"Bearer {os.getenv('SUPABASE_SERVICE_KEY')}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        },
        json=user,
    )
    print(f"Inserted {user['email']}: {response.status_code} {response.text}")
