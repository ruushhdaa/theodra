from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="allow", protected_namespaces=())

    supabase_url: str
    supabase_anon_key: str
    supabase_service_key: str
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_expiry_minutes: int = 60
    model_path: Path = Path("models/isolation_forest.pkl")
    scaler_path: Path = Path("models/feature_scaler.pkl")
    thresholds_path: Path = Path("models/thresholds.json")
    frontend_url: str = "https://theodra.vercel.app"

settings = Settings()
