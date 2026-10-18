import pandas as pd
import numpy as np
import json
import joblib
from pathlib import Path
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import precision_score, recall_score, f1_score

df = pd.read_csv(Path("data/synthetic/org_comms.csv"))
print(f"Loaded {len(df):,} rows")

pairs = df.groupby("pair_id").agg(
    freq_mean=("weekly_freq","mean"),
    freq_std=("weekly_freq","std"),
    freq_trend=("weekly_freq", lambda x: float(np.polyfit(range(len(x)), x, 1)[0])),
    after_hours_ratio=("after_hours_ratio","mean"),
    role_asymmetry=("role_asymmetry","first"),
    latency_asymmetry=("response_latency_asymmetry","mean"),
    exclusivity_score=("exclusivity_score","mean"),
    avg_message_length=("avg_message_length","mean"),
    is_anomaly=("is_anomaly","first"),
).reset_index()

FEATS = ["freq_mean","freq_std","freq_trend","after_hours_ratio",
         "role_asymmetry","latency_asymmetry","exclusivity_score","avg_message_length"]

X = pairs[FEATS].fillna(0).values
y = pairs["is_anomaly"].astype(int).values

scaler = StandardScaler()
Xs = scaler.fit_transform(X)

model = IsolationForest(n_estimators=200, contamination=0.05, random_state=42, n_jobs=-1)
model.fit(Xs)

raw = model.decision_function(Xs)
score = 1 - (raw - raw.min()) / (raw.max() - raw.min())

watch = float(np.percentile(score, 80))
elevated = float(np.percentile(score, 92))
flagged = float(np.percentile(score, 97))

pred = (score >= watch).astype(int)
print(f"Precision: {precision_score(y, pred):.3f}")
print(f"Recall:    {recall_score(y, pred):.3f}")
print(f"F1:        {f1_score(y, pred):.3f}")

models = Path("models")
models.mkdir(exist_ok=True)
joblib.dump(model, models / "isolation_forest.pkl")
joblib.dump(scaler, models / "feature_scaler.pkl")
json.dump({
    "watch": watch, "elevated": elevated, "flagged": flagged,
    "features": FEATS, "contamination": 0.05, "n_estimators": 200,
}, open(models / "thresholds.json", "w"), indent=2)

print(f"Model saved -> models/")
print(f"Thresholds: watch={watch:.3f} | elevated={elevated:.3f} | flagged={flagged:.3f}")
