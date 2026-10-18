import urllib.request
from pathlib import Path
import tarfile
from tqdm import tqdm

RAW = Path("data/raw")
RAW.mkdir(parents=True, exist_ok=True)
Path("data/processed").mkdir(parents=True, exist_ok=True)
Path("data/synthetic").mkdir(parents=True, exist_ok=True)
Path("models").mkdir(parents=True, exist_ok=True)

class Progress(tqdm):
    def update_to(self, b=1, bsize=1, tsize=None):
        if tsize: self.total = tsize
        self.update(b * bsize - self.n)

dest = RAW / "enron.tar.gz"
if not dest.exists():
    print("Downloading Enron corpus (423MB)...")
    with Progress(unit='B', unit_scale=True, desc="Enron") as t:
        urllib.request.urlretrieve(
            "https://www.cs.cmu.edu/~enron/enron_mail_20150507.tar.gz",
            dest, reporthook=t.update_to
        )

enron_dir = RAW / "maildir"
if not enron_dir.exists():
    print("Extracting (2-3 min)...")
    with tarfile.open(RAW / "enron.tar.gz", "r:gz") as tar:
        tar.extractall(RAW)
    print("Done extracting.")

print("Download complete. Run: python scripts/02_extract_enron.py")
