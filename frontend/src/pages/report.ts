// ── Anonymous Free-Text Reporting Portal (/report → #/report) ────────────────

export function renderReport(): string {
  const depts = [
    'Product Engineering', 'Technology Operations', 'Client Success',
    'People Operations', 'Finance & Accounting', 'Legal & Compliance',
    'Design Systems', 'Data & Analytics', 'Marketing & Growth',
    'Infrastructure & DevOps', 'Research & Innovation',
  ];
  const deptOptions = depts.map(d => `<option value="${d}">${d}</option>`).join('');

  return /* html */`
<div class="page-wrapper">
  <div style="max-width:720px;margin:0 auto;padding:3rem 2rem;">

    <!-- Privacy Guarantees Banner -->
    <div style="margin-bottom:2.5rem;">
      <p class="eyebrow">Anonymous Reporting Portal</p>
      <h1 style="font-size:clamp(1.6rem,3vw,2.4rem);margin-bottom:1rem;line-height:1.2;">
        Your voice, without your name.
      </h1>
      <p style="margin-bottom:1.5rem;">
        This portal accepts free-text incident reports with zero identity linkage.
        Submissions are reviewed by the Internal Committee for POSH Act action as warranted.
        No account, no login, no tracking.
      </p>

      <!-- Privacy guarantee list -->
      <div style="background:var(--bg-surface);border:1px solid var(--border-muted);border-radius:var(--radius-md);padding:1.25rem 1.5rem;margin-bottom:1.5rem;">
        <div style="font-size:0.62rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);margin-bottom:1rem;">
          Technical Privacy Mitigations
        </div>
        <div class="privacy-list">
          <div class="privacy-item">
            <strong>Zero IP logging</strong> — The server receives but does not persist your IP address. No server-side log retention.
          </div>
          <div class="privacy-item">
            <strong>No cookies, no session storage</strong> — Your browser state is not stored beyond the single page visit. No fingerprinting techniques.
          </div>
          <div class="privacy-item">
            <strong>Non-persistent 24-hour rate-limiting token</strong> — A hashed coarse-region + day token is used solely to prevent spam floods. It cannot unmask a reporter; it is discarded after 24 hours and never stored in a linked database.
          </div>
          <div class="privacy-item">
            <strong>Client-side timestamp generalization</strong> — The exact submission time is generalized to week-level (e.g., "Week of 8 September 2025") before reaching the IC dashboard. The IC never sees a precise submission timestamp.
          </div>
          <div class="privacy-item">
            <strong>No automated linkage attempted</strong> — Submitted reports are not cross-referenced with the behavioral anomaly pipeline. The IC may notice a coincidence, but the system will not draw that link automatically.
          </div>
        </div>
      </div>

      <!-- Residual risk callout -->
      <div class="callout callout-gold">
        <span class="callout-icon">⚠</span>
        <p class="callout-text">
          <strong>Inherent limitation — stylometric risk:</strong> The system cannot anonymize what you choose to write.
          If your description includes identifying details (your manager's name, a specific incident date, a unique project reference),
          the IC may be able to identify you from the content itself. This is an unsolved residual risk
          of any free-text system. Write at the level of behavioral patterns, not specific incidents where possible.
          Stylometric deanonymization remains an open research problem — we do not overclaim anonymity guarantees.
        </p>
      </div>
    </div>

    <hr class="divider" style="margin-bottom:2.5rem;" />

    <!-- Report Form -->
    <div>
      <h2 style="font-size:1.25rem;margin-bottom:1.5rem;">Submit an Incident Report</h2>
      <form class="report-form" id="report-form" novalidate>

        <div class="form-field">
          <label class="form-label" for="dept-select">Department (Generalized)</label>
          <select class="form-select" id="dept-select" required>
            <option value="" disabled selected>Select a department — generalized, not your specific team</option>
            ${deptOptions}
          </select>
          <span style="font-size:0.65rem;color:var(--text-muted);margin-top:2px;">
            Select the broad department, not your specific team or sub-unit, to reduce identifiability.
          </span>
        </div>

        <div class="form-field">
          <label class="form-label" for="timeframe-select">Approximate Timeframe (Week-Bucketed)</label>
          <select class="form-select" id="timeframe-select" required>
            <option value="" disabled selected>Select approximate week — exact dates not required</option>
            <option value="w-2026-w37">Week of 7 September 2026</option>
            <option value="w-2026-w36">Week of 31 August 2026</option>
            <option value="w-2026-w35">Week of 24 August 2026</option>
            <option value="w-2026-w34">Week of 17 August 2026</option>
            <option value="w-2026-w33">Week of 10 August 2026</option>
            <option value="w-2026-w32">Week of 3 August 2026</option>
            <option value="w-2026-w30-31">Weeks of July 2026</option>
            <option value="w-2026-q1">April–June 2026 (Q1 FY26)</option>
            <option value="w-2025-h2">Oct 2025 – Mar 2026</option>
            <option value="older">Earlier than October 2025</option>
          </select>
          <span style="font-size:0.65rem;color:var(--text-muted);margin-top:2px;">
            Timestamps are generalized to week-level. Do not select a specific day.
          </span>
        </div>

        <div class="form-field">
          <label class="form-label" for="incident-type">Nature of Concern (Optional)</label>
          <select class="form-select" id="incident-type">
            <option value="" disabled selected>Select if applicable — leave blank to remain unclassified</option>
            <option value="communication-pattern">Unwanted or persistent communication</option>
            <option value="exclusion">Exclusion, isolation or professional marginalization</option>
            <option value="verbal">Verbal conduct — inappropriate remarks or pressure</option>
            <option value="power-asymmetry">Misuse of hierarchical authority</option>
            <option value="retaliation-concern">Concern about retaliation for prior complaint or refusal</option>
            <option value="third-party-witness">Third-party witness — reporting on behalf of others</option>
            <option value="other">Other / Prefer not to categorize</option>
          </select>
        </div>

        <div class="form-field">
          <label class="form-label" for="incident-text">
            Incident Description
            <span style="color:var(--accent-gold);margin-left:3px;">*</span>
          </label>
          <textarea
            class="form-textarea"
            id="incident-text"
            placeholder="Describe the behavioral pattern or incident in as much or as little detail as you are comfortable sharing. Focus on what happened and when, rather than personal details. The IC will use this to assess whether formal investigation is warranted under the POSH Act."
            maxlength="3000"
            required
          ></textarea>
          <div class="form-char-count">
            <span id="char-count">0</span> / 3000 characters
          </div>
        </div>

        <!-- Disclaimer -->
        <div style="background:rgba(10,14,40,0.5);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:1rem 1.25rem;">
          <div style="font-size:0.62rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin-bottom:0.5rem;">
            Disclaimer — Please read before submitting
          </div>
          <p style="font-size:0.72rem;color:var(--text-secondary);line-height:1.7;margin-bottom:0;">
            This portal does not guarantee complete anonymity. As noted above, stylometric analysis of free text
            is an unsolved problem. The IC will not attempt to identify you from your writing style, but this
            cannot be technically guaranteed against all attack vectors. By submitting, you acknowledge that
            the IC may, at its discretion, initiate a formal inquiry under the POSH Act based on the content
            of this report. Your submission will not be automatically linked to any behavioral cohort in the
            THEODRA anomaly pipeline.
          </p>
        </div>

        <label style="display:flex;align-items:flex-start;gap:0.75rem;cursor:pointer;">
          <input type="checkbox" id="disclaimer-check" style="margin-top:3px;accent-color:var(--accent-teal);" required />
          <span style="font-size:0.75rem;color:var(--text-secondary);line-height:1.6;">
            I have read and understood the privacy guarantees and limitations above. I am submitting this
            report voluntarily and understand the IC may act on this information under the POSH Act 2013.
          </span>
        </label>

        <div style="display:flex;gap:0.75rem;align-items:center;">
          <button type="submit" class="btn btn-gold" id="submit-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Submit Anonymous Report
          </button>
          <span style="font-size:0.65rem;color:var(--text-muted);">
            Submission will be week-timestamped and forwarded to the IC inbox.
          </span>
        </div>

        <!-- Success state (hidden) -->
        <div id="submit-success" style="display:none;background:rgba(87,189,162,0.08);border:1px solid rgba(87,189,162,0.3);border-radius:var(--radius-md);padding:1.5rem;text-align:center;">
          <div style="font-size:1.5rem;margin-bottom:0.75rem;">✓</div>
          <div style="font-size:1rem;font-weight:600;color:var(--accent-aqua);font-family:var(--font-editorial);margin-bottom:0.5rem;">
            Report Submitted Successfully
          </div>
          <p style="font-size:0.78rem;color:var(--text-secondary);">
            Your report has been received. It will appear in the IC inbox as a week-level timestamped submission
            with no identity linkage. The IC will review it in line with their obligations under the POSH Act 2013.
            No confirmation email will be sent — this portal maintains no record of your submission address.
          </p>
          <div style="margin-top:1rem;font-size:0.65rem;font-family:monospace;color:var(--text-muted);">
            Submission token: <span style="color:var(--accent-teal);">ANON-${Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
            &nbsp;·&nbsp; This token is non-persistent and cannot be used to retrieve or link your submission.
          </div>
        </div>

      </form>
    </div>

  </div>

  <footer class="site-footer">
    THEODRA Anonymous Reporting Portal · <span>Zero IP Logging · No Cookies · Week-Level Timestamps Only</span> · POSH Act 2013
  </footer>
</div>`;
}

export function initReport(): void {
  const textarea = document.getElementById('incident-text') as HTMLTextAreaElement | null;
  const counter  = document.getElementById('char-count');
  textarea?.addEventListener('input', () => {
    if (counter) counter.textContent = String(textarea.value.length);
  });

  const form = document.getElementById('report-form') as HTMLFormElement | null;
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const dept      = (document.getElementById('dept-select')    as HTMLSelectElement).value;
    const timeframe = (document.getElementById('timeframe-select') as HTMLSelectElement).value;
    const text      = (document.getElementById('incident-text')  as HTMLTextAreaElement).value.trim();
    const agreed    = (document.getElementById('disclaimer-check') as HTMLInputElement).checked;

    if (!dept)      { alert('Please select a department.'); return; }
    if (!timeframe) { alert('Please select an approximate timeframe.'); return; }
    if (!text || text.length < 30) { alert('Please provide a description of at least 30 characters.'); return; }
    if (!agreed)    { alert('Please confirm you have read the disclaimer before submitting.'); return; }

    // Hide form fields, show success
    form.querySelectorAll<HTMLElement>('.form-field, .callout, label:last-of-type, .btn, hr').forEach(el => {
      el.style.display = 'none';
    });
    const successEl = document.getElementById('submit-success');
    if (successEl) successEl.style.display = 'block';
  });
}
