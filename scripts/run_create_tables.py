import httpx, os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()
sql = Path("scripts/create_tables.sql").read_text()

# Try endpoint 1: /rest/v1/rpc/exec_sql
print("Attempting exec_sql via REST RPC...")
try:
    response = httpx.post(
        f"{os.getenv('SUPABASE_URL')}/rest/v1/rpc/exec_sql",
        headers={
            "apikey": os.getenv("SUPABASE_SERVICE_KEY"),
            "Authorization": f"Bearer {os.getenv('SUPABASE_SERVICE_KEY')}",
            "Content-Type": "application/json",
        },
        json={"query": sql},
        timeout=30.0
    )
    print(f"RPC Response: {response.status_code} {response.text}")
except Exception as e:
    print(f"RPC Exception: {e}")
    response = None

# If not successful, try endpoint 2: Management API
if not response or response.status_code != 200:
    print("Attempting Management API...")
    project_ref = "orduiiynpdaicyjptrzy"
    try:
        response2 = httpx.post(
            f"https://api.supabase.com/v1/projects/{project_ref}/database/query",
            headers={
                "Authorization": f"Bearer {os.getenv('SUPABASE_SERVICE_KEY')}",
                "Content-Type": "application/json",
            },
            json={"query": sql},
            timeout=30.0
        )
        print(f"Management API Response: {response2.status_code} {response2.text}")
    except Exception as e:
        print(f"Management API Exception: {e}")
