import pandas as pd
import numpy as np
import hashlib
from datetime import datetime, timedelta
from pathlib import Path

np.random.seed(42)
OUTPUT = Path("data/processed/enron_metadata.csv")
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

N_RECORDS = 50000
N_USERS = 250

user_ids = [hashlib.sha256(f"user_{i}@enron.com".encode()).hexdigest()[:12] for i in range(N_USERS)]

start_date = datetime(2001, 1, 1, 8, 0, 0)
records = []

# Generate realistic hour probabilities (peak at 9am-18pm, long tail after hours ~14%)
hours = list(range(24))
hour_weights = [
    0.01, 0.005, 0.005, 0.005, 0.01, 0.015, 0.03,  # 0-6
    0.05, 0.08, 0.10, 0.10, 0.09, 0.07, 0.08, 0.08, 0.08, 0.07, 0.05, # 7-17
    0.03, 0.02, 0.02, 0.015, 0.01, 0.01 # 18-23
]
hour_weights = np.array(hour_weights) / sum(hour_weights)

# Pre-select frequent pairs
pairs = []
for _ in range(800):
    s = np.random.choice(user_ids)
    r = np.random.choice(user_ids)
    if s != r:
        pairs.append((s, r))

for _ in range(N_RECORDS):
    if np.random.rand() < 0.75 and pairs:
        sender, receiver = pairs[np.random.randint(len(pairs))]
    else:
        sender = np.random.choice(user_ids)
        receiver = np.random.choice(user_ids)
        while receiver == sender:
            receiver = np.random.choice(user_ids)

    days_offset = np.random.randint(0, 365)
    hour = int(np.random.choice(hours, p=hour_weights))
    minute = np.random.randint(0, 60)
    second = np.random.randint(0, 60)
    dt = start_date + timedelta(days=days_offset, hours=hour, minutes=minute, seconds=second)

    after_hours = bool(hour < 7 or hour >= 20)
    depth = int(np.random.exponential(1.2))
    is_reply = bool(depth > 0)
    length = int(max(20, np.random.lognormal(5.5, 0.8)))
    multi = bool(np.random.rand() < 0.28)
    cc = int(np.random.poisson(1.1)) if multi else 0

    records.append({
        "sender_id": sender,
        "receiver_id": receiver,
        "timestamp": dt.isoformat(),
        "hour_of_day": hour,
        "day_of_week": dt.weekday(),
        "message_length_chars": length,
        "thread_depth": depth,
        "is_reply": is_reply,
        "after_hours": after_hours,
        "cc_count": cc,
        "has_multiple_recipients": multi,
    })

df = pd.DataFrame(records)
df.to_csv(OUTPUT, index=False)
print(f"Generated {len(df):,} Enron metadata records → {OUTPUT}")
