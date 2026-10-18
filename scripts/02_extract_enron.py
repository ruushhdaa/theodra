import mailparser
import pandas as pd
import hashlib
from pathlib import Path
from tqdm import tqdm

MAILDIR = Path("data/raw/maildir")
OUTPUT = Path("data/processed/enron_metadata.csv")

if OUTPUT.exists():
    print(f"Already exists: {OUTPUT}")
    exit(0)

def hash_addr(addr):
    return hashlib.sha256(addr.lower().encode()).hexdigest()[:12]

def parse_file(fp):
    try:
        mail = mailparser.parse_from_file(str(fp))
        if not mail.from_ or not mail.to or not mail.date:
            return None
        sender = mail.from_[0][1]
        receiver = mail.to[0][1]
        dt = mail.date
        hour = dt.hour
        return {
            "sender_id": hash_addr(sender),
            "receiver_id": hash_addr(receiver),
            "timestamp": dt.isoformat(),
            "hour_of_day": hour,
            "day_of_week": dt.weekday(),
            "message_length_chars": len(mail.body or ""),
            "thread_depth": (mail.subject or "").lower().count("re:"),
            "is_reply": (mail.subject or "").lower().count("re:") > 0,
            "after_hours": hour < 7 or hour >= 20,
            "cc_count": len(mail.cc or []),
            "has_multiple_recipients": len(mail.to) > 1,
        }
    except Exception:
        return None

files = [f for f in Path("data/raw/maildir").rglob("*") if f.is_file()]
print(f"Processing {len(files):,} files...")
records = [r for f in tqdm(files) if (r := parse_file(f))]
df = pd.DataFrame(records)
df.to_csv(OUTPUT, index=False)
print(f"Done: {len(df):,} records → {OUTPUT}")
