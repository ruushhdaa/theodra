from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .config import settings
from .database import supabase

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
bearer = HTTPBearer()

def hash_password(p): return pwd_context.hash(p)
def verify_password(p, h): return pwd_context.verify(p, h)

def create_token(user_id: str, role: str) -> str:
    exp = datetime.utcnow() + timedelta(minutes=settings.jwt_expiry_minutes)
    return jwt.encode({"sub": user_id, "role": role, "exp": exp},
                      settings.jwt_secret_key, algorithm=settings.jwt_algorithm)

async def get_current_user(creds: HTTPAuthorizationCredentials = Depends(bearer)):
    try:
        payload = jwt.decode(creds.credentials, settings.jwt_secret_key,
                             algorithms=[settings.jwt_algorithm])
        uid, role = payload.get("sub"), payload.get("role")
        if not uid or not role:
            raise HTTPException(status_code=401, detail="Invalid token")
        return {"user_id": uid, "role": role}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def require_ic(user=Depends(get_current_user)):
    if user["role"] not in ("ic_member", "hr_admin"):
        raise HTTPException(status_code=403, detail="IC access required")
    return user

def require_hr(user=Depends(get_current_user)):
    if user["role"] != "hr_admin":
        raise HTTPException(status_code=403, detail="HR Admin access required")
    return user
