# Project Specification — Workplace Harassment Pattern Detector
### Working name: SENTINEL-IC (placeholder — rename freely)
**Owner:** Rushda Jagtap | **Type:** Course project (SY, 1.5-month build window) | **Status:** Draft v1

---

## 0. One-paragraph system definition

A three-layer system that flags *behavioral communication anomalies* correlated with workplace harassment patterns, without ever exposing raw message content or unmasking identities below a k-anonymity threshold, and routes only aggregated, statistically-flagged signals to an Internal Committee (IC) dashboard alongside a fully anonymous free-text reporting channel. The system never accuses; it surfaces patterns for human review, and the IC remains the sole decision-making authority under the POSH Act.

---

## 0.1 Problem Grounding (why this isn't a solved problem)

This isn't a hypothetical gap. Reporting under the POSH Act is chronically low relative to actual incidence — recent coverage of the 2026 TCS Nashik case is a live example: despite multiple FIRs alleging harassment, the company stated none of the complainants had approached the Internal Committee through official PoSH channels at all, over several years. Advocates working on this directly attribute this to hierarchy: employees stay silent out of fear of losing professional standing, and silence tends to embolden repeat behavior rather than resolve it. Separately, a decade-long review of corporate India's POSH filings found that a large share of companies report zero cases year after year — which reads less as "no harassment occurred" and more as "no one felt safe enough to file." State this tension explicitly in your report: **the IC's obligations are reactive by law — someone must file a complaint before the IC can act — but the actual harm frequently never reaches that stage.** Your system's entire justification is that it gives the IC an *early-warning signal* upstream of a formal complaint, without replacing the complaint process the law requires.

## 0.2 Literature Review — what already exists, and the actual gap

**Academic work:** there is emerging scholarship specifically on AI applied to POSH enforcement, but it stays at the level of "AI could help" rather than proposing or evaluating a working detection architecture — and the same literature is explicit that AI can recognize patterns but cannot substitute for the human judgment and empathy an IC needs when handling a live case. That's a useful citation for your own "human-in-the-loop, IC stays the decision authority" design principle — you're not contradicting the literature, you're implementing what it says is missing: the pattern-recognition layer, kept strictly separate from the human judgment layer.

**Commercial HR-tech (Keka, Darwinbox, greytHR, ZingHR, and similar):** POSH modules in these platforms consistently mean the same handful of things — storing the POSH policy with version control, tracking ICC member composition, a complaint-filing workflow, investigation-status tracking, and annual statutory report generation. This is **compliance paperwork automation**, not detection. None of them ingest communication metadata or attempt to surface a concerning pattern before a complaint is filed. That absence is your wedge, and now you can cite it as an observed market gap rather than an assumption.

**Where that leaves your project:** you are not competing with HR-tech (they'd be a plausible downstream integration partner, not a competitor), and you are not duplicating the academic literature (which is conceptual, not architectural). The gap is: no existing tool, commercial or academic, does behavioral-metadata-based early detection upstream of a formal complaint, with a privacy architecture that could survive scrutiny. State that plainly in your report — it's your actual novelty claim, and it's now backed by sources, not asserted.

---

## 1. Layer 1 — Metadata Schema (what data goes in)

Since real Slack/Gmail admin access is not obtainable as a student, you generate **synthetic data that mimics three source types**, so the pipeline is source-agnostic and demonstrably portable. Build one unified internal schema; write three small generators that each emit into it.

### 1.1 Unified internal event schema

| Field | Type | Notes |
|---|---|---|
| `event_id` | UUID | primary key |
| `sender_id` | pseudonymous string (e.g. `EMP_0091`) | never a real name |
| `receiver_id` | pseudonymous string | same pool as sender |
| `channel_type` | enum: `dm`, `channel`, `email_1to1`, `email_thread` | source-agnostic bucket |
| `timestamp` | ISO 8601 | full precision at generation, generalized later |
| `role_level` | enum: `IC`, `manager`, `senior`, `junior`, `intern` | org hierarchy — this is a core feature |
| `message_length` | int (chars) | never store content, only length |
| `after_hours_flag` | bool | derived from timestamp vs. org work-hours config |
| `response_latency_sec` | int, nullable | time between a message and its reply |
| `thread_depth` | int | for email/channel threads |
| `reaction_count` | int, nullable | Slack-style only; 0/null for email |
| `frequency_7d` | int | rolling count of sender→receiver messages in trailing 7 days |
| `is_1to1_only` | bool | true if this pair has never messaged in any group/CC context |

**Why this schema, explicitly:** every field is chosen because it's a *behavioral* signal, not a *content* signal. This is the load-bearing design decision of the whole project — you are deliberately blind to what was said, only to the shape of communication. State this explicitly in your report; it's your strongest ethical/technical argument.

### 1.2 The three generators (satisfies "all three" scope)
- **Slack-style generator:** channels + DMs, `reaction_count` populated, `thread_depth` shallow.
- **Email-style generator:** `to/cc` fan-out collapsed into `channel_type=email_thread` vs `email_1to1`, `thread_depth` matters more, no reactions.
- **Generic org-comms generator:** abstracts both into a single stream — this is what you actually feed the model, since real deployments will mix sources. Frame this as: "the two source-specific generators exist to prove the schema generalizes; the model trains on the unified stream."

### 1.2.1 Grounding the synthetic generator in something real
Don't invent distributions out of thin air — cite a real basis so a reviewer can't wave the dataset away as arbitrary:
- **Enron Email Corpus** (public, ~500K real workplace emails, standard in organizational-communication research) — use it to calibrate realistic baseline distributions for `message_length`, `thread_depth`, `response_latency_sec`, and normal after-hours ratios, *before* you inject synthetic anomalies. You're not using Enron's content (never read/quote message bodies — extract only structural statistics: send-time distributions, reply-latency distributions, thread-depth distributions), only its statistical shape, which sidesteps privacy/copyright concerns entirely while making your baseline defensible as "calibrated against real organizational communication patterns" rather than invented.
- State this explicitly in your report: "Baseline behavioral distributions calibrated against the Enron Email Corpus (structural metadata only, no content used); anomaly patterns synthetically injected per Section 1.3."

### 1.3 Synthetic anomaly injection
You need labeled ground truth to evaluate the model, so you deliberately inject known patterns into ~3–5% of synthetic sender/receiver pairs:
- Escalating `frequency_7d` from a senior→junior pair, skewed after-hours, low `reaction_count`, shrinking `response_latency_sec` from the junior (pattern: junior replying fast out of unease, not engagement).
- `is_1to1_only=true` sustained over weeks between hierarchy-unequal pairs with no group-channel co-presence.

This lets you report precision/recall honestly, which is what separates a real project from a demo.

---

## 2. Layer 1 — Model & Features (justified, not just named)

**Model:** Isolation Forest (unsupervised anomaly detection) — correct choice because real deployments have no labeled harassment data; you can't supervise-train on something nobody labels for privacy/legal reasons. State this constraint explicitly — it's a strength, not a limitation you're hiding.

**Feature vector per sender→receiver pair (aggregated weekly):**
1. `frequency_7d` trend (slope over trailing 4 weeks) — captures escalation, not just volume
2. `after_hours_ratio` — proportion of messages outside work hours
3. `role_asymmetry` — encoded hierarchy gap (e.g. senior→intern = higher weight than peer→peer)
4. `response_latency_asymmetry` — difference in how fast each party replies to the other
5. `exclusivity_score` — derived from `is_1to1_only`, sustained over time
6. `reaction_sentiment_proxy` — reaction_count trend only where channel_type=dm/channel (0 for email rows, don't let missing data skew this — impute with pair-type median, document it)

Each feature is justified because it encodes a **behavioral asymmetry**, not a content judgment. That distinction is what makes this defensible under a fairness/bias review later (your FAccT angle).

**Output:** an anomaly score per pair per week, not a binary "harassment/not." You threshold this into three tiers (`watch`, `elevated`, `flagged`) — never a single hard cutoff, because a hard cutoff is where false-positive harm concentrates.

---

## 3. k-Anonymity — concrete, not gestured at

**Parameter: k = 5** for this project (defensible middle ground — k=3 is too weak for a hierarchy-heavy org, k=10 destroys signal in small departments; justify k=5 explicitly in your report as a tunable parameter, not a fixed truth).

**What gets generalized before anything reaches the IC dashboard:**
- `role_level` → collapsed to 2 tiers (`supervisory`, `non-supervisory`) instead of 5, if the raw 5-tier grouping doesn't meet k=5 in a given department
- `timestamp` → generalized to week-bucket, never exact time
- `sender_id`/`receiver_id` → never shown individually until a flagged pattern's *cohort* (the generalized group it falls into) has ≥5 members matching the same generalized quasi-identifiers

**Implementation approach:** don't hand-roll a full ARX-style engine for the course project — that's a research-grade undertaking. Instead:
1. Build a small generalization hierarchy for each quasi-identifier (role_level, timestamp, department)
2. After anomaly scoring, group flagged pairs by their generalized quasi-identifier combination
3. Suppress (don't display) any group with fewer than k=5 members
4. Document that this is a *simplified generalization-based k-anonymity implementation*, and cite ARX as the production-grade reference you'd migrate to — this honesty is what makes a technical reviewer trust the rest of your claims.

---

## 3.5 Competitor / Existing-Solution Landscape

| Solution | What it actually does | Gap relative to your project |
|---|---|---|
| Keka, Darwinbox, greytHR, ZingHR (HR compliance suites) | POSH policy storage + version control, ICC member roster management, complaint-filing workflow, investigation-status tracking, annual statutory report generation | Pure paperwork/workflow automation. No behavioral signal ingestion, no detection before a complaint exists. |
| Academic AI-for-POSH literature | Conceptual arguments that AI could assist pattern recognition in harassment cases, explicitly noting AI cannot replace human judgment in casework | No proposed or evaluated system architecture — stays at the "this would help" level. Your project is the implementation the literature gestures at, not a duplicate of it. |
| Generic corporate DLP / insider-threat tools | Anomaly detection on communication metadata, but tuned for data-exfiltration and security-policy violations | Wrong signal set entirely — not looking for hierarchy-based exclusivity or after-hours 1:1 escalation patterns; would need a full feature-set redesign to repurpose, which is effectively building your system anyway |

**The gap your project targets:** no existing tool combines (a) behavioral-metadata anomaly detection tuned specifically to harassment-relevant signals, (b) formal privacy guarantees (k-anonymity) on what reaches a human reviewer, and (c) a design that keeps the IC as sole decision authority rather than trying to automate judgment. State this three-way combination explicitly in your report — each piece alone exists somewhere; the combination, tuned for this specific legal/organizational context, does not.

---

## 4. IC Dashboard — wireframe-in-text

**Screen 1 — Aggregate view (default landing)**
- A table: `Cohort ID | Generalized Role Pair | Department | Anomaly Tier | Pattern Duration | Cohort Size (≥5)`
- No names. No exact timestamps. Sorted by tier severity.
- Click a row → Screen 2.

**Screen 2 — Cohort detail (still anonymous)**
- Trend chart: frequency/after-hours/exclusivity over time, generalized week-buckets, for that cohort
- No individual identifiers surfaced here either — this screen exists so IC members can assess *pattern legitimacy* (is this a genuine concerning pattern, or a false positive like "two people on the same late-shift project") before anything escalates
- A button: **"Escalate for review"** — this is the only action that would trigger identity disclosure, and it must require ≥2 IC members' sign-off (multi-party authorization, not single-admin power) — build this even as a stub, because its *absence* is a security flaw you'd be asked about in any serious review

**Screen 3 — Anonymous reports inbox**
- Separate from the pattern-detection side entirely — free-text submissions, no linkage attempted between a report and any detected cohort unless the reporter opts to reference one
- IC sees: submission text, submission timestamp (week-generalized), nothing else

---

## 5. Anonymous Reporting Portal — what "anonymous" actually means here

Be concrete, because "anonymous" is the word every reviewer will pressure-test.

**What is stripped/never collected:**
- No login, no auth, no account linkage
- No IP address logged (or logged only as a coarse region for abuse-rate-limiting, purged within 24h — decide and state which)
- No cookies, no session storage beyond the single submission
- No browser fingerprinting

**What remains, and why it's an acceptable residual risk:**
- Submission timestamp (needed for IC triage) — generalized to week
- Free-text content itself, which the reporter controls — you cannot anonymize what someone chooses to write (e.g. "my manager X did Y"); state this explicitly as an inherent limitation, not a flaw in your system

**Rate-limiting without identity:** use a short-lived, non-persistent token (e.g. hashed coarse-IP + day, discarded after 24h) purely to prevent spam floods — document that this is a security necessity, not a tracking mechanism, and that it cannot be used to unmask a reporter after the fact because it's never stored.

---

## 6. Threat Model (this is your cybersecurity layer — make it explicit)

| Component | Threat | Mitigation |
|---|---|---|
| Metadata pipeline | Interception in transit (if real API were connected) | TLS, and in production: field-level encryption before the anonymizer stage so even a pipeline breach doesn't expose linkable raw pairs |
| Anonymizer/k-anon layer | Re-identification via auxiliary data (an IC member cross-references a "flagged cohort" with org chart knowledge) | k=5 minimum enforced at generalization; document known limits of k-anonymity against background-knowledge attacks — this is a real, known weakness of k-anonymity generally, cite it, don't hide it |
| Reporting portal | Deanonymization via metadata (timing correlation, writing-style stylometry) | Timestamp generalization; note stylometry as an *unsolved* residual risk — this is genuinely hard and admitting it is more credible than pretending it's solved |
| IC Dashboard | Insider threat — an IC member misuses access to surveil someone, or a compromised account browses freely | Multi-party sign-off for escalation (Screen 2), full audit log of every dashboard access (who viewed which cohort, when) — build the audit log, it's cheap and it's exactly what a security reviewer will ask for |
| ML model | Adversarial gaming — someone learns the feature set and deliberately manipulates their own behavior to stay under threshold, or games it to falsely flag someone else | Discuss as a limitation section: model retraining cadence, feature obfuscation, and that this is fundamentally an arms-race property of any behavioral anomaly system — this is your strongest "Security Data Scientist" framing, use it |

---

## 7. Explicit non-goals (state these in your report — scoping discipline signals maturity)

- Does **not** replace IC investigation or decision-making authority
- Does **not** claim certainty — output is a probabilistic signal for human review only
- Does **not** connect to real Slack/Gmail in this phase — synthetic data only, clearly labeled
- Does **not** implement production-grade ARX k-anonymity — simplified generalization approach, documented as such
- Does **not** solve stylometric deanonymization risk on the reporting portal — flagged as a known open problem

---

## 8. What to build in the 1.5-month window (sequencing)

**Weeks 1–2:** Three synthetic data generators → unified schema → anomaly injection for ground truth
**Weeks 3–4:** Isolation Forest + feature pipeline, evaluate precision/recall against injected anomalies
**Week 5:** k-anonymity generalization layer on model output
**Week 6:** Flask dashboard (Screens 1–2) + anonymous reporting portal (basic form, rate-limit token)
**Weeks 6.5 (buffer):** audit logging, threat-model write-up, final report assembly

---

## 9. Risk Matrix (probability × severity — put this in your report, reviewers look for it)

| Risk | Probability | Severity | Mitigation |
|---|---|---|---|
| False positives on legitimate power-asymmetric relationships (mentorship, tight deadline collaboration) | High | Medium | Tiered output (`watch/elevated/flagged`), never a binary accusation; IC reviews pattern legitimacy before any escalation (Screen 2) |
| Re-identification via background knowledge (an IC member recognizes a cohort from org context) | Medium | High | k=5 enforced minimum; documented as a known limitation of k-anonymity generally, not claimed as solved |
| Low signal-to-noise in early deployment (too few real patterns, mostly noise) | High | Medium | Report this openly as an evaluation-phase limitation; propose a longer pilot window before any production claim |
| Reporting portal deanonymization via writing-style/stylometry | Low-Medium | High | Flagged explicitly as an unsolved residual risk (Section 6) — do not overclaim anonymity guarantees |
| IC dashboard insider misuse | Medium | High | Multi-party sign-off for escalation, full audit log of dashboard access |
| Model gaming — someone learns thresholds and adjusts behavior to stay under them | Low (course-project timeframe) | Medium | Note as inherent arms-race property of behavioral anomaly systems; out of scope to solve in 1.5 months, but must be named |
| Scope creep — three half-built components instead of one complete one | High | High | MVP discipline (Section 8 sequencing); cut ruthlessly, ship Layer 1 + basic Layer 2/3 before polishing any one deeper |

---

## 10. References (cite these, don't just name-drop the concepts)

- POSH Act, 2013 — full text and IC obligations: Ministry of Women & Child Development / India Code
- Sweeney, L. (2002). *k-Anonymity: A Model for Protecting Privacy* — the original k-anonymity paper; cite this when you define k=5, don't just assert the concept
- Liu, F. T., Ting, K. M., & Zhou, Z.-H. (2008). *Isolation Forest* — original paper, cite when justifying the model choice in Section 2
- Enron Email Corpus — Cohen, W. (CMU) — cite as the structural-statistics calibration source (Section 1.2.1)
- Recent POSH reporting-gap coverage (2026 TCS Nashik case context) — for Section 0.1, cite the specific article you draw from rather than paraphrasing without attribution
- CEDA / Ashoka University decade-review of POSH filings — for the "many companies report zero cases" statistic in Section 0.1

---

## 11. Open decisions for you to lock before building

1. Confirm k=5, or pick your own value and justify it in writing
2. Decide the IP-logging policy for the reporting portal explicitly (log-and-purge-in-24h vs. never-log) — pick one, document the tradeoff
3. Decide whether the audit log (Section 6, IC Dashboard row) is in-scope for the course deadline or listed as future work — recommend: build a minimal version, it's high credibility-per-hour-spent
