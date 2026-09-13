// ── Statutory Compliance & POSH Reporting (/compliance → #/compliance) ──────

const AUDIT_LOG = [
  { time: '2026-09-13 · 14:52 IST', actor: 'Dr. Priya Nair (Presiding Officer)', action: 'Viewed cohort detail', target: 'CH-8821', hash: '3a7f9c2e' },
  { time: '2026-09-13 · 14:48 IST', actor: 'Dr. Priya Nair (Presiding Officer)', action: 'Signed escalation authorization', target: 'CH-8821', hash: 'b12d8e41' },
  { time: '2026-09-13 · 13:21 IST', actor: 'Mr. Rahul Desai (HR Representative)', action: 'Viewed cohort detail', target: 'CH-4402', hash: '9c3a1f77' },
  { time: '2026-09-13 · 12:10 IST', actor: 'Dr. Priya Nair (Presiding Officer)', action: 'Applied tier filter: Flagged', target: 'Dashboard', hash: 'e44b2c19' },
  { time: '2026-09-13 · 11:45 IST', actor: 'Adv. Meera Krishnan (External Member)', action: 'Viewed cohort detail', target: 'CH-6614', hash: '7f1d5a88' },
  { time: '2026-09-13 · 10:00 IST', actor: 'SYSTEM', action: 'Pipeline run complete — 48,210 events ingested', target: 'All cohorts', hash: '0d9f3c66' },
  { time: '2026-09-13 · 06:00 IST', actor: 'SYSTEM', action: 'Isolation Forest scoring complete — anomaly index updated', target: 'All cohorts', hash: 'a3e871b2' },
  { time: '2026-09-12 · 18:30 IST', actor: 'Mr. Rahul Desai (HR Representative)', action: 'Viewed cohort detail', target: 'CH-9910', hash: 'c7b4d193' },
  { time: '2026-09-12 · 16:05 IST', actor: 'Dr. Priya Nair (Presiding Officer)', action: 'Viewed cohort detail', target: 'CH-3301', hash: '2e5a9f34' },
  { time: '2026-09-12 · 14:20 IST', actor: 'SYSTEM', action: 'k-anonymity suppression: 19 low-k cohorts hidden from dashboard', target: 'Suppression Layer', hash: 'f8c2a047' },
  { time: '2026-09-11 · 09:15 IST', actor: 'Adv. Meera Krishnan (External Member)', action: 'Viewed cohort detail', target: 'CH-8821', hash: '1b6d7e52' },
  { time: '2026-09-10 · 06:00 IST', actor: 'SYSTEM', action: 'Weekly pipeline run — Enron baseline recalibration skipped (within tolerance)', target: 'Baseline Layer', hash: '4c8f0a91' },
];

export function renderCompliance(): string {
  const auditRows = AUDIT_LOG.map(e => `
    <div class="audit-entry">
      <span class="audit-time">${e.time}</span>
      <span class="audit-desc">
        <strong>${e.actor}</strong> — ${e.action}
        <span style="color:var(--accent-teal);margin-left:6px;">[${e.target}]</span>
      </span>
      <span class="audit-hash" title="SHA-256 hash receipt (irreversible)">${e.hash}</span>
    </div>`).join('');

  return /* html */`
<div class="page-wrapper">
  <div class="page-header" style="padding-top:2rem;">
    <div class="page-header-meta">Statutory Compliance · POSH Act 2013 · Annual Reporting</div>
    <h1>Statutory Compliance & Audit</h1>
    <p>POSH Act annual filing format · Audit trail with hash receipts · ZingHR-grade statutory generator</p>
  </div>

  <div class="section" style="padding-top:1.5rem;">

    <!-- Export bar -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem;">
      <div>
        <div style="font-size:0.65rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin-bottom:4px;">
          Reporting Period
        </div>
        <div style="font-size:1rem;font-weight:600;color:var(--text-primary);font-family:var(--font-editorial);">
          1 April 2025 — 31 March 2026 &nbsp;·&nbsp; Financial Year 2025–26
        </div>
      </div>
      <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
        <button class="btn btn-ghost-teal btn-sm" id="btn-export-excel">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          Export as Excel
        </button>
        <button class="btn btn-gold btn-sm" id="btn-export-pdf">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Generate Statutory Report (PDF)
        </button>
      </div>
    </div>

    <!-- Statutory Summary Table -->
    <div style="margin-bottom:2rem;">
      <h2 style="font-size:1.1rem;margin-bottom:1rem;">
        Annual Filing — Sexual Harassment of Women at Workplace Act 2013
        <span style="font-size:0.7rem;font-family:var(--font-ui);font-weight:400;color:var(--text-muted);margin-left:0.75rem;">
          Format prescribed under Section 21 · Ministry of Women &amp; Child Development
        </span>
      </h2>
      <div class="data-table-wrapper">
        <table class="data-table stat-table">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Statutory Parameter</th>
              <th>Q1 (Apr–Jun)</th>
              <th>Q2 (Jul–Sep)</th>
              <th>Q3 (Oct–Dec)</th>
              <th>Q4 (Jan–Mar)</th>
              <th>Annual Total</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="mono">1</td>
              <td class="primary-col">Cases received by IC under POSH Act</td>
              <td class="mono">0</td><td class="mono">0</td><td class="mono">0</td><td class="mono">0</td>
              <td class="mono text-gold" style="font-weight:700;">0</td>
              <td style="font-size:0.7rem;color:var(--text-muted);">Consistent with national under-reporting pattern</td>
            </tr>
            <tr>
              <td class="mono">2</td>
              <td class="primary-col">Cases disposed / resolved by IC</td>
              <td class="mono">0</td><td class="mono">0</td><td class="mono">0</td><td class="mono">0</td>
              <td class="mono">0</td>
              <td style="font-size:0.7rem;color:var(--text-muted);">No formal complaints filed this period</td>
            </tr>
            <tr>
              <td class="mono">3</td>
              <td class="primary-col">Cases pending &gt; 90 days</td>
              <td class="mono">0</td><td class="mono">0</td><td class="mono">0</td><td class="mono">0</td>
              <td class="mono text-aqua">0</td>
              <td style="font-size:0.7rem;color:var(--text-muted);">Compliant — no cases older than 90 days</td>
            </tr>
            <tr>
              <td class="mono">4</td>
              <td class="primary-col">IC member composition review</td>
              <td class="mono">—</td><td class="mono">—</td><td class="mono">Reviewed</td><td class="mono">—</td>
              <td class="mono text-aqua">Compliant</td>
              <td style="font-size:0.7rem;color:var(--text-muted);">≥50% women members; external member in place</td>
            </tr>
            <tr>
              <td class="mono">5</td>
              <td class="primary-col">Organizational awareness workshops conducted</td>
              <td class="mono">1</td><td class="mono">1</td><td class="mono">2</td><td class="mono">1</td>
              <td class="mono text-aqua">5</td>
              <td style="font-size:0.7rem;color:var(--text-muted);">Includes POSH policy sensitization and IC role briefings</td>
            </tr>
            <tr>
              <td class="mono">6</td>
              <td class="primary-col">Employees trained on POSH Act provisions</td>
              <td class="mono">142</td><td class="mono">89</td><td class="mono">201</td><td class="mono">76</td>
              <td class="mono text-teal" style="font-weight:700;">508</td>
              <td style="font-size:0.7rem;color:var(--text-muted);">All new hires + refresher for existing employees</td>
            </tr>
            <tr>
              <td class="mono">7</td>
              <td class="primary-col">THEODRA early-warning flags reviewed by IC</td>
              <td class="mono">—</td><td class="mono">3</td><td class="mono">5</td><td class="mono">6</td>
              <td class="mono text-gold" style="font-weight:700;">14</td>
              <td style="font-size:0.7rem;color:var(--text-muted);">Anonymous pattern review only — no identity disclosure triggered</td>
            </tr>
            <tr>
              <td class="mono">8</td>
              <td class="primary-col">THEODRA identity disclosures authorized (dual-quorum)</td>
              <td class="mono">0</td><td class="mono">0</td><td class="mono">0</td><td class="mono">0</td>
              <td class="mono text-aqua">0</td>
              <td style="font-size:0.7rem;color:var(--text-muted);">No pattern met escalation threshold + dual sign-off this period</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- IC Composition Table -->
    <div style="margin-bottom:2rem;">
      <h2 style="font-size:1.1rem;margin-bottom:1rem;">Internal Committee Composition (Section 4 Compliance)</h2>
      <div class="data-table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Designation</th>
              <th>IC Role</th>
              <th>Appointment Date</th>
              <th>Term Expires</th>
              <th>Gender</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="primary-col">Dr. Priya Nair</td>
              <td>VP People & Culture</td>
              <td><span class="badge badge-elevated">Presiding Officer</span></td>
              <td class="mono">01 Apr 2024</td>
              <td class="mono">31 Mar 2027</td>
              <td>F</td>
              <td><span class="badge badge-watch">Active</span></td>
            </tr>
            <tr>
              <td class="primary-col">Adv. Meera Krishnan</td>
              <td>Legal Advocate (External)</td>
              <td><span class="badge badge-teal">External Member</span></td>
              <td class="mono">01 Apr 2024</td>
              <td class="mono">31 Mar 2026</td>
              <td>F</td>
              <td><span class="badge badge-watch">Active</span></td>
            </tr>
            <tr>
              <td class="primary-col">Mr. Rahul Desai</td>
              <td>HR Business Partner</td>
              <td><span class="badge badge-teal">IC Member</span></td>
              <td class="mono">15 Jul 2024</td>
              <td class="mono">14 Jul 2027</td>
              <td>M</td>
              <td><span class="badge badge-watch">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="callout callout-teal" style="margin-top:1rem;">
        <span class="callout-icon">✓</span>
        <p class="callout-text">
          <strong>Section 4 Compliant:</strong> IC has ≥ 3 members, &gt; 50% are women (2/3 = 67%),
          and a qualified external member from an NGO/legal background is appointed. All terms within the
          3-year statutory limit. Next review: 01 April 2027.
        </p>
      </div>
    </div>

    <!-- Audit Trail Log -->
    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
        <h2 style="font-size:1.1rem;margin-bottom:0;">Dashboard Audit Trail</h2>
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <div class="status-dot"></div>
          <span style="font-size:0.65rem;color:var(--text-muted);">Immutable · Hash-anchored · Real-time</span>
        </div>
      </div>
      <div class="data-table-wrapper">
        <div style="padding:0.6rem 1rem;background:rgba(10,14,40,0.4);border-bottom:1px solid var(--border-muted);display:flex;align-items:center;gap:6px;">
          <span style="font-size:0.6rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);">
            All IC dashboard interactions logged with SHA-256 hash receipts · Irreversible · Tamper-evident
          </span>
        </div>
        <div class="audit-log">
          ${auditRows}
        </div>
      </div>
    </div>

  </div>

  <footer class="site-footer">
    THEODRA Statutory Compliance Module · POSH Act 2013 · <span>Sexual Harassment of Women at Workplace (Prevention, Prohibition & Redressal) Act</span>
  </footer>
</div>`;
}

export function initCompliance(): void {
  document.getElementById('btn-export-pdf')?.addEventListener('click', () => {
    alert('Statutory Annual Report (PDF) generation queued.\n\nIn a production deployment, this would generate a PDF conforming to the Ministry of Women & Child Development annual filing format under Section 21 of the POSH Act 2013.');
  });
  document.getElementById('btn-export-excel')?.addEventListener('click', () => {
    alert('Excel export queued.\n\nIn a production deployment, this would generate an XLSX conforming to the statutory filing format with one sheet per quarter and a summary annual totals sheet.');
  });
}
