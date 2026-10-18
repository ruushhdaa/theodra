from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from pydantic import BaseModel
from typing import Optional
import uuid, secrets, hashlib
from datetime import datetime, date, timedelta
from .config import settings
from .database import supabase
from .auth import (hash_password, verify_password, create_token,
                   get_current_user, require_ic, require_hr)
from .model import get_model

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        model = get_model()
        t = model.thresholds
        print(f"THEODRA model loaded | watch={t['watch']:.3f} elevated={t['elevated']:.3f} flagged={t['flagged']:.3f}")
    except Exception as e:
        print(f"THEODRA backend initialized (model pending or loading: {e})")
    yield

app = FastAPI(title="THEODRA API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.frontend_url,
        "http://localhost:5173",
        "http://localhost:3000",
        "https://theodra.vercel.app",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def log_action(user_id, role, action, resource_type, resource_id=None):
    try:
        supabase.table("audit_log").insert({
            "user_id": user_id, "role": role, "action": action,
            "resource_type": resource_type,
            "resource_id": str(resource_id) if resource_id else None,
            "ip_masked": "XXX.XXX.X.X",
        }).execute()
    except Exception:
        pass

# ── AUTH ──────────────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/api/auth/login")
async def login(req: LoginRequest):
    res = supabase.table("users").select("*").eq("email", req.email).eq("is_active", True).execute()
    if not res.data:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    user = res.data[0]
    if not verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    supabase.table("users").update({"last_login": datetime.utcnow().isoformat()}).eq("id", user["id"]).execute()
    token = create_token(user["id"], user["role"])
    log_action(user["id"], user["role"], "login", "auth")
    return {"token": token, "user": {k: user[k] for k in ("id","email","role","full_name","department","designation")}}

@app.get("/api/auth/me")
async def me(user=Depends(get_current_user)):
    res = supabase.table("users").select("id,email,role,full_name,department,designation").eq("id", user["user_id"]).execute()
    if not res.data: raise HTTPException(404, "User not found")
    return res.data[0]

# ── ANONYMOUS PORTAL (no auth) ────────────────────────────────────────

class PortalSubmit(BaseModel):
    concern_types: list[str]
    channel: str
    timeframe_month: int
    timeframe_year: int
    description: str
    evidence_file_paths: list[str] = []
    notification_token: Optional[str] = None

@app.post("/api/portal/submit")
async def portal_submit(req: PortalSubmit):
    ref = "TR-" + secrets.token_urlsafe(6).upper()[:8]
    week = datetime.utcnow().strftime("%Y-W%V")
    token_hash = hashlib.sha256(req.notification_token.encode()).hexdigest() if req.notification_token else None
    supabase.table("anonymous_reports").insert({
        "reference_code": ref,
        "concern_types": req.concern_types,
        "channel": req.channel,
        "timeframe_month": req.timeframe_month,
        "timeframe_year": req.timeframe_year,
        "description": req.description,
        "evidence_file_paths": req.evidence_file_paths,
        "week_bucket": week,
        "notification_token_hash": token_hash,
    }).execute()
    return {"reference_code": ref, "week_bucket": week}

@app.get("/api/portal/track/{reference_code}")
async def portal_track(reference_code: str):
    res = supabase.table("anonymous_reports").select(
        "id,reference_code,concern_types,status,week_bucket,created_at"
    ).eq("reference_code", reference_code.upper()).execute()
    if not res.data: raise HTTPException(404, "Reference code not found")
    report = res.data[0]
    msgs = supabase.table("report_messages").select("sender_role,content,sent_at").eq("report_id", report["id"]).execute()
    return {**report, "messages": msgs.data or []}

class MessageBody(BaseModel):
    content: str

@app.post("/api/portal/track/{reference_code}/message")
async def portal_message(reference_code: str, body: MessageBody):
    res = supabase.table("anonymous_reports").select("id").eq("reference_code", reference_code.upper()).execute()
    if not res.data: raise HTTPException(404, "Not found")
    supabase.table("report_messages").insert({
        "report_id": res.data[0]["id"], "sender_role": "reporter", "content": body.content
    }).execute()
    return {"ok": True}

class FlagBody(BaseModel):
    department: str
    role_level: str
    concern_types: list[str]

@app.post("/api/portal/flag")
async def portal_flag(body: FlagBody):
    token = secrets.token_hex(32)
    week = datetime.utcnow().strftime("%Y-W%V")
    supabase.table("quiet_flags").insert({
        "department": body.department,
        "role_level": body.role_level,
        "concern_types": body.concern_types,
        "flag_token_hash": hashlib.sha256(token.encode()).hexdigest(),
        "week_bucket": week,
    }).execute()
    dept_flags = supabase.table("quiet_flags").select("id").eq("department", body.department).eq("week_bucket", week).execute()
    count = len(dept_flags.data or [])
    if count >= 2:
        supabase.table("notifications").insert({
            "user_id": None,
            "type": "quiet_flag_match",
            "title": "Quiet Flag Match Detected",
            "message": f"{count} independent flags in {body.department} this week.",
            "link": "/ic/patterns",
        }).execute()
    return {"ok": True, "match_count": count}

class PulseBody(BaseModel):
    department: str
    score: int

@app.post("/api/portal/pulse")
async def portal_pulse(body: PulseBody):
    if not 1 <= body.score <= 5: raise HTTPException(400, "Score must be 1-5")
    week = datetime.utcnow().strftime("%Y-W%V")
    supabase.table("wellness_pulse").insert({
        "department": body.department, "score": body.score, "week_bucket": week
    }).execute()
    return {"ok": True}

@app.post("/api/portal/upload")
async def portal_upload(file: UploadFile = File(...)):
    allowed = {"image/jpeg","image/png","image/webp","application/pdf",
               "video/mp4","video/quicktime",
               "application/msword",
               "application/vnd.openxmlformats-officedocument.wordprocessingml.document"}
    if file.content_type not in allowed:
        raise HTTPException(400, "File type not allowed")
    contents = await file.read()
    if len(contents) > 50 * 1024 * 1024:
        raise HTTPException(400, "File too large (max 50MB)")
    filename = f"{uuid.uuid4()}_{file.filename}"
    supabase.storage.from_("evidence").upload(filename, contents,
        file_options={"content-type": file.content_type})
    return {"file_path": filename, "filename": file.filename}

# ── REPORTS (IC auth) ─────────────────────────────────────────────────

@app.get("/api/reports")
async def list_reports(status: Optional[str] = None, user=Depends(require_ic)):
    q = supabase.table("anonymous_reports").select(
        "id,reference_code,concern_types,status,week_bucket,created_at"
    ).order("created_at", desc=True)
    if status: q = q.eq("status", status)
    res = q.execute()
    log_action(user["user_id"], user["role"], "list_reports", "anonymous_reports")
    return res.data or []

@app.get("/api/reports/{report_id}")
async def get_report(report_id: str, user=Depends(require_ic)):
    res = supabase.table("anonymous_reports").select("*").eq("id", report_id).execute()
    if not res.data: raise HTTPException(404, "Not found")
    msgs = supabase.table("report_messages").select("*").eq("report_id", report_id).execute()
    log_action(user["user_id"], user["role"], "view_report", "anonymous_reports", report_id)
    return {**res.data[0], "messages": msgs.data or []}

class StatusUpdate(BaseModel):
    status: str

@app.patch("/api/reports/{report_id}/status")
async def update_report_status(report_id: str, body: StatusUpdate, user=Depends(require_ic)):
    supabase.table("anonymous_reports").update({"status": body.status}).eq("id", report_id).execute()
    log_action(user["user_id"], user["role"], f"update_status_{body.status}", "anonymous_reports", report_id)
    return {"ok": True}

@app.post("/api/reports/{report_id}/messages")
async def send_report_message(report_id: str, body: MessageBody, user=Depends(require_ic)):
    supabase.table("report_messages").insert({
        "report_id": report_id, "sender_role": "ic_member", "content": body.content
    }).execute()
    supabase.table("anonymous_reports").update({"status": "responded"}).eq("id", report_id).execute()
    return {"ok": True}

# ── PATTERNS (IC auth) ────────────────────────────────────────────────

@app.get("/api/patterns")
async def list_patterns(severity_tier: Optional[str] = None,
                        department: Optional[str] = None,
                        user=Depends(require_ic)):
    q = supabase.table("detected_patterns").select("*").order("anomaly_score", desc=True)
    if severity_tier: q = q.eq("severity_tier", severity_tier)
    if department: q = q.eq("department", department)
    res = q.execute()
    log_action(user["user_id"], user["role"], "list_patterns", "detected_patterns")
    return res.data or []

@app.get("/api/patterns/{pattern_id}")
async def get_pattern(pattern_id: str, user=Depends(require_ic)):
    res = supabase.table("detected_patterns").select("*").eq("id", pattern_id).execute()
    if not res.data: raise HTTPException(404, "Not found")
    votes = supabase.table("escalation_votes").select("ic_member_id,voted_at").eq("pattern_id", pattern_id).execute()
    log_action(user["user_id"], user["role"], "view_pattern", "detected_patterns", pattern_id)
    return {**res.data[0], "votes": votes.data or [], "vote_count": len(votes.data or [])}

@app.post("/api/patterns/{pattern_id}/vote")
async def vote_escalate(pattern_id: str, user=Depends(require_ic)):
    try:
        supabase.table("escalation_votes").insert({
            "pattern_id": pattern_id, "ic_member_id": user["user_id"]
        }).execute()
    except Exception:
        raise HTTPException(400, "Already voted")
    votes = supabase.table("escalation_votes").select("id").eq("pattern_id", pattern_id).execute()
    count = len(votes.data or [])
    if count >= 2:
        supabase.table("detected_patterns").update({"status": "escalated"}).eq("id", pattern_id).execute()
    log_action(user["user_id"], user["role"], "vote_escalate", "detected_patterns", pattern_id)
    return {"vote_count": count, "escalated": count >= 2}

class DispositionBody(BaseModel):
    disposition: str
    reasoning: str
    resource_type: str = "pattern"

@app.post("/api/patterns/{pattern_id}/disposition")
async def record_disposition(pattern_id: str, body: DispositionBody, user=Depends(require_ic)):
    supabase.table("response_ledger").insert({
        "resource_type": body.resource_type,
        "resource_id": pattern_id,
        "reviewed_by": user["user_id"],
        "disposition": body.disposition,
        "reasoning": body.reasoning,
    }).execute()
    log_action(user["user_id"], user["role"], "record_disposition", "response_ledger", pattern_id)
    return {"ok": True}

@app.get("/api/patterns/run-detection")
async def run_detection(user=Depends(require_ic)):
    import pandas as pd, numpy as np
    from pathlib import Path as P
    model = get_model()
    df = pd.read_csv(P("data/synthetic/org_comms.csv"))
    pairs = df.groupby("pair_id").agg(
        freq_mean=("weekly_freq","mean"),
        freq_std=("weekly_freq","std"),
        freq_trend=("weekly_freq", lambda x: float(np.polyfit(range(len(x)), x, 1)[0])),
        after_hours_ratio=("after_hours_ratio","mean"),
        role_asymmetry=("role_asymmetry","first"),
        latency_asymmetry=("response_latency_asymmetry","mean"),
        exclusivity_score=("exclusivity_score","mean"),
        avg_message_length=("avg_message_length","mean"),
        department=("department","first"),
        sender_role=("sender_role","first"),
        receiver_role=("receiver_role","first"),
    ).reset_index()
    inserted = 0
    week = datetime.utcnow().strftime("%Y-W%V")
    for _, row in pairs.iterrows():
        result = model.predict(row.to_dict())
        if result["tier"] != "normal":
            size = max(5, int(5 + abs(result["anomaly_score"] * 10)))
            try:
                supabase.table("detected_patterns").insert({
                    "cohort_id": f"C-{row['pair_id']}-{week}",
                    "department": row["department"],
                    "role_pairing": f"{row['sender_role']} → {row['receiver_role']}",
                    "severity_tier": result["tier"],
                    "anomaly_score": result["anomaly_score"],
                    "duration_weeks": 1,
                    "cohort_size": size,
                    "frequency_trend": float(row["freq_trend"]),
                    "after_hours_ratio": float(row["after_hours_ratio"]),
                    "exclusivity_score": float(row["exclusivity_score"]),
                    "first_detected_week": week,
                    "last_updated_week": week,
                }).execute()
                inserted += 1
            except Exception:
                pass
    log_action(user["user_id"], user["role"], "run_detection", "detected_patterns")
    return {"patterns_inserted": inserted, "week": week}

# ── CASES (IC auth) ───────────────────────────────────────────────────

class CreateCase(BaseModel):
    department: str
    severity: str
    linked_pattern_id: Optional[str] = None
    linked_report_id: Optional[str] = None

@app.get("/api/cases")
async def list_cases(user=Depends(require_ic)):
    res = supabase.table("cases").select("*").order("opened_at", desc=True).execute()
    log_action(user["user_id"], user["role"], "list_cases", "cases")
    return res.data or []

@app.post("/api/cases")
async def create_case(body: CreateCase, user=Depends(require_ic)):
    num = "CASE-" + secrets.token_hex(3).upper()
    now = datetime.utcnow()
    res = supabase.table("cases").insert({
        "case_number": num,
        "department": body.department,
        "severity": body.severity,
        "linked_pattern_id": body.linked_pattern_id,
        "linked_report_id": body.linked_report_id,
        "inquiry_started_at": now.isoformat(),
        "inquiry_deadline": (now + timedelta(days=90)).isoformat(),
        "report_deadline": (now + timedelta(days=100)).isoformat(),
        "employer_action_deadline": (now + timedelta(days=160)).isoformat(),
        "assigned_ic_members": [user["user_id"]],
    }).execute()
    log_action(user["user_id"], user["role"], "create_case", "cases")
    return res.data[0] if res.data else {"case_number": num, "department": body.department}

@app.get("/api/cases/{case_id}")
async def get_case(case_id: str, user=Depends(require_ic)):
    res = supabase.table("cases").select("*").eq("id", case_id).execute()
    if not res.data: raise HTTPException(404, "Not found")
    events = supabase.table("case_events").select("*").eq("case_id", case_id).execute()
    notes = supabase.table("case_notes").select("*").eq("case_id", case_id).execute()
    witnesses = supabase.table("witnesses").select("*").eq("case_id", case_id).execute()
    retaliation = supabase.table("retaliation_events").select("*").eq("case_id", case_id).execute()
    log_action(user["user_id"], user["role"], "view_case", "cases", case_id)
    return {
        **res.data[0],
        "events": events.data or [],
        "notes": notes.data or [],
        "witnesses": witnesses.data or [],
        "retaliation_events": retaliation.data or [],
    }

@app.patch("/api/cases/{case_id}/status")
async def update_case_status(case_id: str, body: StatusUpdate, user=Depends(require_ic)):
    supabase.table("cases").update({"status": body.status}).eq("id", case_id).execute()
    supabase.table("case_events").insert({
        "case_id": case_id, "event_type": "status_change",
        "description": f"Status changed to {body.status}", "performed_by": user["user_id"]
    }).execute()
    log_action(user["user_id"], user["role"], f"case_status_{body.status}", "cases", case_id)
    return {"ok": True}

@app.post("/api/cases/{case_id}/notes")
async def add_case_note(case_id: str, body: MessageBody, user=Depends(require_ic)):
    supabase.table("case_notes").insert({
        "case_id": case_id, "author_id": user["user_id"], "content": body.content
    }).execute()
    return {"ok": True}

# ── HR ADMIN ──────────────────────────────────────────────────────────

@app.get("/api/hr/dashboard")
async def hr_dashboard(user=Depends(require_hr)):
    reports = supabase.table("anonymous_reports").select("id,status").execute()
    cases = supabase.table("cases").select("id,status").execute()
    patterns = supabase.table("detected_patterns").select("id,severity_tier").execute()
    training = supabase.table("training_records").select("id,status").execute()
    r = reports.data or []
    c = cases.data or []
    t = training.data or []
    log_action(user["user_id"], user["role"], "view_hr_dashboard", "hr")
    return {
        "total_reports": len(r),
        "active_cases": len([x for x in c if x["status"] != "closed"]),
        "flagged_patterns": len([x for x in (patterns.data or []) if x["severity_tier"] == "flagged"]),
        "training_completion_rate": round(len([x for x in t if x["status"] == "completed"]) / max(len(t), 1) * 100, 1),
        "compliance_score": 67,
    }

@app.get("/api/hr/roster")
async def hr_roster(user=Depends(require_hr)):
    res = supabase.table("users").select(
        "id,email,full_name,department,designation,role,is_active,created_at,last_login"
    ).execute()
    log_action(user["user_id"], user["role"], "view_roster", "users")
    return res.data or []

@app.get("/api/hr/health-score")
async def hr_health(user=Depends(require_hr)):
    return {
        "overall": 67,
        "sub_scores": {
            "reporting_rate": 45,
            "ic_response_time": 72,
            "training_completion": 80,
            "resolution_rate": 65,
            "policy_currency": 73,
        },
        "trend": [58, 61, 64, 67],
        "quarters": ["Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025"],
    }

@app.get("/api/hr/benchmarks")
async def hr_benchmarks(user=Depends(require_hr)):
    return [
        {"metric": "Reports per 1000 employees", "yours": 2.1, "industry_avg": 1.4, "top_quartile": 3.8},
        {"metric": "Avg resolution days", "yours": 47, "industry_avg": 68, "top_quartile": 32},
        {"metric": "IC training completion %", "yours": 80, "industry_avg": 61, "top_quartile": 94},
        {"metric": "Policy update frequency (months)", "yours": 14, "industry_avg": 18, "top_quartile": 10},
        {"metric": "Annual report submission rate %", "yours": 100, "industry_avg": 78, "top_quartile": 100},
    ]

@app.get("/api/hr/heatmap")
async def hr_heatmap(user=Depends(require_hr)):
    res = supabase.table("wellness_pulse").select("department,score").execute()
    data = res.data or []
    from collections import defaultdict
    dept_scores = defaultdict(list)
    for row in data:
        dept_scores[row["department"]].append(row["score"])
    depts = ["Engineering","Sales","Finance","Operations","Legal","HR","Product","Support"]
    return [
        {
            "department": d,
            "score": round(sum(dept_scores[d])/len(dept_scores[d]), 1) if dept_scores[d] else round(2.5 + hash(d) % 20 / 10, 1),
            "respondents": len(dept_scores[d]) or (5 + hash(d) % 20),
        }
        for d in depts
    ]

@app.get("/api/hr/audit-log")
async def hr_audit(user=Depends(require_hr)):
    res = supabase.table("audit_log").select("*").order("performed_at", desc=True).limit(100).execute()
    log_action(user["user_id"], user["role"], "view_audit_log", "audit_log")
    return res.data or []

@app.get("/api/hr/retaliation")
async def hr_retaliation(user=Depends(require_hr)):
    res = supabase.table("retaliation_events").select("*").order("created_at", desc=True).execute()
    return res.data or []

@app.post("/api/hr/annual-report")
async def hr_annual_report(user=Depends(require_hr)):
    reports = supabase.table("anonymous_reports").select("id,status").execute()
    cases = supabase.table("cases").select("id,status,opened_at,closed_at").execute()
    r, c = reports.data or [], cases.data or []
    log_action(user["user_id"], user["role"], "generate_annual_report", "hr")
    return {
        "period": "FY 2025-26",
        "organisation": "THEODRA Managed Enterprise",
        "complaints_received": len(r),
        "complaints_disposed": len([x for x in c if x["status"] == "closed"]),
        "complaints_pending": len([x for x in c if x["status"] != "closed"]),
        "pending_beyond_90_days": 1,
        "training_conducted": True,
        "policy_updated": True,
    }

# ── NOTIFICATIONS ─────────────────────────────────────────────────────

@app.get("/api/notifications")
async def list_notifications(user=Depends(get_current_user)):
    res = supabase.table("notifications").select("*").eq(
        "user_id", user["user_id"]
    ).order("created_at", desc=True).limit(50).execute()
    return res.data or []

@app.patch("/api/notifications/{notif_id}/read")
async def mark_read(notif_id: str, user=Depends(get_current_user)):
    supabase.table("notifications").update({"is_read": True}).eq("id", notif_id).execute()
    return {"ok": True}

@app.post("/api/notifications/mark-all-read")
async def mark_all_read(user=Depends(get_current_user)):
    supabase.table("notifications").update({"is_read": True}).eq("user_id", user["user_id"]).execute()
    return {"ok": True}

# ── HEALTH CHECK ──────────────────────────────────────────────────────

@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "THEODRA API"}
