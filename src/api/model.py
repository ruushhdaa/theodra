import joblib, json
import numpy as np
from pathlib import Path
from .config import settings

class THEODRAModel:
    def __init__(self):
        if not Path(settings.model_path).exists():
            raise FileNotFoundError(f"Model file not found at {settings.model_path}. Run scripts/05_train_model.py first.")
        self.model = joblib.load(settings.model_path)
        self.scaler = joblib.load(settings.scaler_path)
        self.thresholds = json.loads(Path(settings.thresholds_path).read_text())
        self.features = self.thresholds["features"]

    def predict(self, features: dict) -> dict:
        X = np.array([[features.get(f, 0) for f in self.features]])
        Xs = self.scaler.transform(X)
        raw = self.model.decision_function(Xs)[0]
        score = float(np.clip(1 - (raw + 0.5), 0, 1))
        tier = "normal"
        if score >= self.thresholds["flagged"]: tier = "flagged"
        elif score >= self.thresholds["elevated"]: tier = "elevated"
        elif score >= self.thresholds["watch"]: tier = "watch"
        return {"anomaly_score": round(score, 4), "tier": tier}

_model = None
def get_model():
    global _model
    if _model is None: _model = THEODRAModel()
    return _model
