import pandas as pd
import numpy as np
import json
from pathlib import Path

np.random.seed(42)
b = json.loads(Path("data/processed/baselines.json").read_text())

DEPTS = ["Engineering","Sales","Finance","Operations","Legal","HR","Product","Support"]
ROLES = ["intern","junior","senior","manager","ic"]
WEIGHTS = [0.10,0.35,0.30,0.20,0.05]
CHANNELS = ["slack_dm","email_1to1","slack_channel","email_thread"]
CHAN_W = [0.40,0.35,0.15,0.10]
N_PAIRS = 10000
ANOMALY_RATE = 0.05
WEEKS = 12

def role_dist(r1, r2):
    o = {"intern":0,"junior":1,"senior":2,"manager":3,"ic":4}
    return abs(o.get(r1,0)-o.get(r2,0))/4.0

records = []
n_anom = int(N_PAIRS * ANOMALY_RATE)
atypes = ["escalating_frequency","exclusive_hierarchy","after_hours_escalation"]

for i in range(N_PAIRS):
    dept = np.random.choice(DEPTS)
    sr = np.random.choice(ROLES, p=WEIGHTS)
    rr = np.random.choice(ROLES, p=WEIGHTS)
    ch = np.random.choice(CHANNELS, p=CHAN_W)
    is_anom = i < n_anom
    atype = atypes[i % 3] if is_anom else None

    freq = max(1, np.random.normal(b["weekly_freq_per_pair"]["mean"], b["weekly_freq_per_pair"]["std"]))
    ahr = np.clip(np.random.normal(b["after_hours_ratio"]["mean"], b["after_hours_ratio"]["std"]), 0, 1)
    excl = np.clip(np.random.normal(b["exclusivity_score"]["mean"], b["exclusivity_score"]["std"]), 0, 1)
    lat = np.random.normal(0, 0.15)

    if is_anom:
        if atype == "escalating_frequency":
            freq *= np.random.uniform(4, 8)
            ahr = np.clip(ahr * np.random.uniform(3, 6), 0, 1)
            lat = np.random.uniform(0.5, 0.9)
        elif atype == "exclusive_hierarchy":
            excl = np.random.uniform(0.90, 1.0)
            freq *= np.random.uniform(2, 4)
        elif atype == "after_hours_escalation":
            ahr = np.random.uniform(0.60, 0.95)
            freq *= np.random.uniform(3, 6)
            lat = np.random.uniform(0.4, 0.8)

    for week in range(WEEKS):
        wfreq = max(0, freq * (1 + 0.05*week if is_anom else 1) + np.random.normal(0, 0.5))
        records.append({
            "pair_id": f"PAIR-{i:05d}",
            "week": week,
            "department": dept,
            "sender_role": sr,
            "receiver_role": rr,
            "channel_type": ch,
            "role_asymmetry": round(role_dist(sr, rr), 4),
            "weekly_freq": round(wfreq, 4),
            "after_hours_ratio": round(np.clip(ahr + np.random.normal(0, 0.03), 0, 1), 4),
            "exclusivity_score": round(np.clip(excl + np.random.normal(0, 0.02), 0, 1), 4),
            "response_latency_asymmetry": round(lat + np.random.normal(0, 0.05), 4),
            "avg_message_length": round(max(10, np.random.normal(b["avg_message_length"]["mean"], b["avg_message_length"]["std"])), 1),
            "is_anomaly": is_anom,
            "anomaly_type": atype,
        })

df = pd.DataFrame(records)
df.to_csv(Path("data/synthetic/org_comms.csv"), index=False)
print(f"Generated {len(df):,} rows ({N_PAIRS} pairs x {WEEKS} weeks, {n_anom} anomalous pairs)")
