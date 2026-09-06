# THEODRA

**Th**reat & Harassment **E**arly-warning system using **O**bservational **D**ata, **R**isk **A**nalytics

A three-layer early-warning system for workplace harassment (POSH Act context), built to surface behavioral communication anomalies for Internal Committee (IC) review — without ever exposing message content or identities below a formal k-anonymity threshold.

Named after Empress Theodora of Byzantium, who rose from social marginalization to use institutional power to build concrete legal and physical protections for exploited women. THEODRA applies the same logic in miniature: give the institution the visibility it needs to act, without exposing the vulnerable to more surveillance than protection requires.

## What this is

1. **Metadata anomaly detection** — Isolation Forest over synthetic, source-agnostic communication metadata (Slack-style, email-style, and generic org-comms generators), never message content.
2. **k-Anonymity layer** (k=5) — generalizes quasi-identifiers before any pattern reaches a human reviewer.
3. **Anonymous reporting portal** — no auth, no persistent identifiers, deliberately minimal data retention.
4. **IC dashboard** — aggregate/cohort views only; individual escalation requires multi-party sign-off.

This is a course project (SY, B.Tech CSE - Data Science) built on **synthetic data only**. It does not connect to real Slack/Gmail infrastructure, does not replace IC investigative authority, and does not claim to solve open problems like reporting-portal stylometric deanonymization. See `docs/spec.md` for the full specification, threat model, and explicit non-goals.

## Status

Early build — spec-complete, implementation in progress (1.5-month build window).

## Structure

```
theodra/
├── data/synthetic/     # generated datasets (not real company data)
├── src/
│   ├── generators/     # Slack-style / email-style / generic synthetic metadata generators
│   ├── model/          # Isolation Forest pipeline, feature engineering, evaluation
│   ├── privacy/        # k-anonymity generalization layer
│   ├── dashboard/       # Flask IC dashboard
│   └── portal/          # anonymous reporting portal
├── docs/               # spec, threat model, evaluation notes
└── tests/
```

## Non-goals (see docs/spec.md §7 for full list)

- Not a replacement for IC investigation or decision-making authority
- Not connected to real organizational data in this phase
- Not a production-grade ARX k-anonymity implementation
- Does not solve stylometric deanonymization risk on the reporting portal

## License

TBD
