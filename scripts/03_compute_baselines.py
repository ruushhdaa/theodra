import pandas as pd
import numpy as np
import json
from pathlib import Path

df = pd.read_csv(Path("data/processed/enron_metadata.csv"), parse_dates=["timestamp"])
print(f"Loaded {len(df):,} records")

pairs = df.groupby(["sender_id","receiver_id"]).agg(
    total=("sender_id","count"),
    after_hours=("after_hours","sum"),
    avg_len=("message_length_chars","mean"),
    avg_depth=("thread_depth","mean"),
    replies=("is_reply","sum"),
    days=("timestamp", lambda x: x.dt.date.nunique()),
    multi=("has_multiple_recipients","sum"),
).reset_index()

pairs["after_hours_ratio"] = pairs["after_hours"] / pairs["total"]
pairs["weekly_freq"] = pairs["total"] / np.maximum(pairs["days"]/7, 1)
pairs["exclusivity"] = (pairs["multi"] == 0).astype(float)

def s(col):
    return {k: float(v) for k,v in {
        "mean": col.mean(), "std": col.std(),
        "p85": col.quantile(0.85), "p93": col.quantile(0.93),
        "p98": col.quantile(0.98),
    }.items()}

out = {
    "n_pairs": int(len(pairs)),
    "n_emails": int(len(df)),
    "after_hours_ratio": s(pairs["after_hours_ratio"]),
    "weekly_freq_per_pair": s(pairs["weekly_freq"]),
    "avg_message_length": s(pairs["avg_len"]),
    "thread_depth": s(pairs["avg_depth"]),
    "exclusivity_score": s(pairs["exclusivity"]),
    "anomaly_thresholds": {
        "after_hours_ratio": {
            "watch": float(pairs["after_hours_ratio"].quantile(0.85)),
            "elevated": float(pairs["after_hours_ratio"].quantile(0.93)),
            "flagged": float(pairs["after_hours_ratio"].quantile(0.98)),
        },
        "weekly_freq": {
            "watch": float(pairs["weekly_freq"].quantile(0.85)),
            "elevated": float(pairs["weekly_freq"].quantile(0.93)),
            "flagged": float(pairs["weekly_freq"].quantile(0.98)),
        },
    }
}

Path("data/processed/baselines.json").write_text(__import__("json").dumps(out, indent=2))
print("Baselines saved.")
