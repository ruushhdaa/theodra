# Contributing to THEODRA

This is currently a solo academic project (course deliverable, 1.5-month build
window), but the repo is structured to accept contributions if that changes.

## Ground rules

1. **No real organizational data, ever.** All datasets in this repo must be
   synthetic or drawn from public research corpora used only for structural/
   statistical calibration (see `docs/spec.md` §1.2.1). Never commit real
   Slack/email exports, even anonymized ones, without an explicit ethics
   review documented in `docs/`.
2. **Privacy-by-default.** Any change touching `src/privacy/` or
   `src/portal/` must not reduce the k-anonymity threshold or reporting-portal
   anonymity guarantees without updating `docs/spec.md` and flagging the
   tradeoff explicitly in the PR description.
3. **Every model/feature change needs a justification comment.** Per the
   spec's design philosophy, features must encode behavioral asymmetry, not
   content judgment — new features need a one-line comment explaining what
   behavioral signal they capture and why it's relevant.

## Getting started

```bash
git clone https://github.com/ruushhdaa/theodra.git
cd theodra
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
pip install -r requirements-dev.txt
pytest
```

## Branch & commit conventions

- Branch names: `feature/<short-description>`, `fix/<short-description>`,
  `docs/<short-description>`
- Commits: imperative mood, present tense (`Add k-anonymity generalization
  layer`, not `Added` or `Adding`)
- Reference the relevant spec section in commit messages where applicable,
  e.g. `Implement cohort suppression per spec §3`

## Pull requests

- Keep PRs scoped to one layer (data generation, model, privacy, portal, or
  dashboard) where possible — this project is intentionally built in
  sequenced phases (see `docs/spec.md` §8), and cross-cutting PRs are harder
  to review against that sequence.
- Include test coverage for any new generator, feature, or anonymization
  logic.

## Code style

- Python: `black` for formatting, `ruff` for linting. Run both before
  committing:
  ```bash
  black src/ tests/
  ruff check src/ tests/
  ```
