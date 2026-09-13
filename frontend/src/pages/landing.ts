// ── Landing Page (/  →  #/) ─────────────────────────────────────────────────
export function renderLanding(): string {
  return /* html */`
<div class="page-wrapper">

  <!-- ═══════════════════════════════ HERO ═══════════════════════════════ -->
  <section class="section" style="padding-top:5rem;padding-bottom:3rem;">
    <div class="hero-grid" style="display:grid;grid-template-columns:7fr 5fr;gap:4rem;align-items:start;">

      <!-- Left column -->
      <div>
        <p class="eyebrow">[ Early-Warning Behavioral Metadata Pipeline ]</p>
        <h1 style="margin-bottom:1.5rem;line-height:1.15;">
          Give institutions visibility to protect, without extending surveillance
          <em style="color:var(--accent-teal);font-style:italic;"> beyond what protection requires.</em>
        </h1>
        <p style="font-size:1.05rem;line-height:1.8;margin-bottom:2rem;max-width:580px;">
          THEODRA bridges the structural POSH Act reporting gap by surfacing communication
          anomalies upstream of formal complaints — with mathematical
          <strong style="color:var(--text-primary);">k-anonymity guarantees</strong>
          and an IC-first decision architecture that never automates judgment.
        </p>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:2.5rem;">
          <button class="btn btn-gold" id="hero-cta-dashboard" onclick="window.location.hash='/dashboard'">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Launch IC Dashboard
          </button>
          <button class="btn btn-ghost-teal" id="hero-cta-spec" onclick="window.location.hash='/spec'">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Explore Architecture
          </button>
        </div>

        <!-- Micro-stats row -->
        <div style="display:flex;gap:2rem;flex-wrap:wrap;padding-top:1.5rem;border-top:1px solid var(--border-subtle);">
          <div>
            <div style="font-size:0.6rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);margin-bottom:3px;">Privacy Threshold</div>
            <div style="font-size:1.1rem;font-weight:700;color:var(--accent-aqua);font-feature-settings:'tnum' 1;">k = 5 enforced</div>
          </div>
          <div>
            <div style="font-size:0.6rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);margin-bottom:3px;">Detection Model</div>
            <div style="font-size:1.1rem;font-weight:700;color:var(--accent-teal);">Isolation Forest</div>
          </div>
          <div>
            <div style="font-size:0.6rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);margin-bottom:3px;">Compliance Act</div>
            <div style="font-size:1.1rem;font-weight:700;color:var(--accent-gold);">POSH Act 2013</div>
          </div>
          <div>
            <div style="font-size:0.6rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);margin-bottom:3px;">Data Baseline</div>
            <div style="font-size:1.1rem;font-weight:700;color:var(--text-primary);">Enron Corpus</div>
          </div>
        </div>
      </div>

      <!-- Right column: Telemetry Widget -->
      <div>
        <div class="telemetry-widget">
          <div class="telemetry-header">
            <span class="telemetry-title">24h Pipeline Status</span>
            <span class="telemetry-live">LIVE</span>
          </div>

          <div class="telemetry-row">
            <span class="telemetry-row-label">Events ingested (24h)</span>
            <span class="telemetry-row-value teal tabular" id="counter-events">48,210</span>
          </div>
          <div class="telemetry-row">
            <span class="telemetry-row-label">Anonymity Gate Status</span>
            <span class="telemetry-row-value aqua">100% compliant (k=5)</span>
          </div>
          <div class="telemetry-row">
            <span class="telemetry-row-label">Active Cohorts — Flagged</span>
            <span class="telemetry-row-value gold tabular">3</span>
          </div>
          <div class="telemetry-row">
            <span class="telemetry-row-label">Active Cohorts — Elevated</span>
            <span class="telemetry-row-value teal tabular">6</span>
          </div>
          <div class="telemetry-row">
            <span class="telemetry-row-label">Active Cohorts — Watch</span>
            <span class="telemetry-row-value" style="color:var(--accent-aqua);">12</span>
          </div>
          <div class="telemetry-row">
            <span class="telemetry-row-label">Suppressed Low-k Patterns</span>
            <span class="telemetry-row-value tabular" style="color:var(--text-muted);">19 hidden</span>
          </div>
          <div class="telemetry-row">
            <span class="telemetry-row-label">Dual-Quorum Pending</span>
            <span class="telemetry-row-value gold">1 action</span>
          </div>

          <!-- Sparkline -->
          <div class="sparkline-area">
            <div class="sparkline-label">After-Hours Comm. Frequency vs. Enron Baseline</div>
            <svg id="sparkline-svg" width="100%" height="72" viewBox="0 0 400 72" preserveAspectRatio="none">
              <!-- Baseline fill -->
              <path d="M0 48 C40 46, 80 50, 120 47 C160 44, 200 49, 240 46 C280 43, 320 48, 360 45 C380 44, 395 46, 400 45 L400 72 L0 72 Z"
                fill="rgba(36,147,162,0.08)" />
              <!-- Baseline line -->
              <path d="M0 48 C40 46, 80 50, 120 47 C160 44, 200 49, 240 46 C280 43, 320 48, 360 45 C380 44, 395 46, 400 45"
                fill="none" stroke="rgba(36,147,162,0.4)" stroke-width="1.5" stroke-dasharray="4 3"/>
              <!-- Anomalous cohort line -->
              <path d="M0 56 C30 54, 60 50, 90 44 C120 38, 150 32, 180 24 C210 18, 240 15, 270 12 C300 10, 330 8, 360 6 C380 5, 395 4, 400 4"
                fill="none" stroke="var(--accent-gold)" stroke-width="2" stroke-linecap="round"/>
              <!-- Anomalous fill -->
              <path d="M0 56 C30 54, 60 50, 90 44 C120 38, 150 32, 180 24 C210 18, 240 15, 270 12 C300 10, 330 8, 360 6 C380 5, 395 4, 400 4 L400 45 C395 46, 380 44, 360 45 C320 48, 280 43, 240 46 C200 49, 160 44, 120 47 C80 50, 40 46, 0 48 Z"
                fill="rgba(220,177,60,0.06)" />
              <!-- Week labels -->
              <text x="0"   y="70" font-size="7" fill="#7A7770" font-family="Plus Jakarta Sans, sans-serif">W-4</text>
              <text x="90"  y="70" font-size="7" fill="#7A7770" font-family="Plus Jakarta Sans, sans-serif">W-3</text>
              <text x="190" y="70" font-size="7" fill="#7A7770" font-family="Plus Jakarta Sans, sans-serif">W-2</text>
              <text x="295" y="70" font-size="7" fill="#7A7770" font-family="Plus Jakarta Sans, sans-serif">W-1</text>
              <text x="380" y="70" font-size="7" fill="#7A7770" font-family="Plus Jakarta Sans, sans-serif">Now</text>
              <!-- Legend -->
              <line x1="10" y1="10" x2="26" y2="10" stroke="rgba(36,147,162,0.4)" stroke-width="1.5" stroke-dasharray="4 3"/>
              <text x="29" y="13" font-size="7" fill="#7A7770" font-family="Plus Jakarta Sans, sans-serif">Enron baseline</text>
              <line x1="110" y1="10" x2="126" y2="10" stroke="var(--accent-gold)" stroke-width="2"/>
              <text x="129" y="13" font-size="7" fill="#DCB13C" font-family="Plus Jakarta Sans, sans-serif">Flagged cohort CH-8821</text>
            </svg>
          </div>

          <!-- Enron badge -->
          <div style="margin-top:1rem;display:flex;align-items:center;gap:6px;">
            <span style="font-size:0.6rem;color:var(--text-muted);">Baseline calibrated against</span>
            <span style="font-size:0.6rem;font-weight:600;color:var(--accent-teal);background:rgba(36,147,162,0.1);border-radius:3px;padding:2px 6px;">Enron Email Corpus (structural stats only)</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <hr class="divider" style="max-width:1280px;margin:0 auto;" />

  <!-- ═══════════════════════════ PROBLEM SECTION ════════════════════════ -->
  <section class="section" id="problem">
    <div class="problem-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start;">

      <!-- Left: Editorial summary -->
      <div>
        <p class="eyebrow">The Structural Gap</p>
        <h2 style="margin-bottom:1.25rem;">The IC can only act when someone files.<br>Most victims never file.</h2>
        <p style="margin-bottom:1rem;">
          The 2026 TCS Nashik case is an illustration that repeats across Indian workplaces: despite multiple FIRs
          alleging harassment, the company stated that none of the complainants had approached the Internal Committee
          through official POSH channels — over several years.
        </p>
        <p style="margin-bottom:1rem;">
          Advocates attribute this to hierarchy. Employees stay silent out of fear of losing professional standing.
          Silence emboldens repeat behavior rather than resolving it. The IC's obligations are
          <strong style="color:var(--text-primary);">reactive by law</strong> — someone must file a complaint
          before the IC can act.
        </p>
        <p style="margin-bottom:1.5rem;">
          A decade-long review of corporate India's POSH filings found a large share of companies report zero cases
          year after year — which reads less as <em>"no harassment occurred"</em> and more as
          <em>"no one felt safe enough to file."</em>
        </p>
        <div class="callout callout-teal">
          <span class="callout-icon">⚡</span>
          <p class="callout-text">
            <strong>THEODRA's justification:</strong> An early-warning signal upstream of a formal complaint,
            without replacing the complaint process the law requires. Behavioral metadata, never content.
            Patterns surfaced, never accusations made.
          </p>
        </div>
      </div>

      <!-- Right: 3 stat callouts -->
      <div class="stat-callout-grid">
        <div class="stat-callout">
          <div class="stat-number gold">0</div>
          <div>
            <div class="stat-desc-label">Formal POSH Complaints Annually</div>
            <p class="stat-desc-body">
              The vast majority of Indian corporations report zero cases in their annual filings under the
              Sexual Harassment of Women at Workplace Act 2013 — a structural under-reporting gap
              corroborated by a decade-long review of POSH filings (CEDA / Ashoka University).
            </p>
          </div>
        </div>
        <div class="stat-callout">
          <div class="stat-number teal">78%</div>
          <div>
            <div class="stat-desc-label">Victims cite retaliation fear as barrier</div>
            <p class="stat-desc-body">
              Fear of professional consequences — demotion, isolation, career stagnation — is the
              primary documented reason victims choose silence over formal POSH IC complaints.
              The formal mechanism is functional; what is absent is the upstream signal.
            </p>
          </div>
        </div>
        <div class="stat-callout">
          <div class="stat-number aqua">k=5</div>
          <div>
            <div class="stat-desc-label">Minimum anonymity threshold before IC review</div>
            <p class="stat-desc-body">
              No pattern reaches the IC dashboard unless its generalized cohort contains at least
              five members. This is the load-bearing privacy constraint — tunable, documented as
              a simplified implementation, and citable to Sweeney (2002).
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <hr class="divider" style="max-width:1280px;margin:0 auto;" />

  <!-- ═══════════════════════════ 3-LAYER SYSTEM ════════════════════════ -->
  <section class="section" id="system">
    <p class="eyebrow">System Architecture</p>
    <h2 style="margin-bottom:0.5rem;">Three layers. One architectural principle.</h2>
    <p style="max-width:640px;margin-bottom:2.5rem;">
      Each layer is independently defensible. Together, they ensure no individual is ever exposed
      to the IC without a mathematical privacy guarantee and a dual human sign-off.
    </p>

    <div class="vtabs" id="vtabs">
      <!-- Tab list -->
      <div class="vtab-list">
        <button class="vtab-btn active" data-tab="0" id="vtab-btn-0">
          <span class="vtab-number">01</span>
          Metadata Anomaly Detection
        </button>
        <button class="vtab-btn" data-tab="1" id="vtab-btn-1">
          <span class="vtab-number">02</span>
          k-Anonymity Generalization
        </button>
        <button class="vtab-btn" data-tab="2" id="vtab-btn-2">
          <span class="vtab-number">03</span>
          Dual-Quorum IC Workspace
        </button>
      </div>

      <!-- Layer 1 -->
      <div class="vtab-content active" data-content="0" id="vtab-content-0">
        <h3>Layer 1 — Behavioral Metadata Pipeline & Isolation Forest</h3>
        <p>
          Three synthetic data generators (Slack-style, email-style, generic org-comms) emit into one
          unified internal event schema. The Isolation Forest model scores anomalies per sender→receiver pair
          per week. No message content is ever ingested — only the <em>shape</em> of communication.
        </p>
        <p>
          Baseline distributions calibrated against the Enron Email Corpus
          (structural metadata only: send-time distributions, reply-latency distributions, thread-depth
          distributions — no content read or quoted).
        </p>

        <!-- Event Schema Table -->
        <div class="data-table-wrapper" style="margin-top:1.25rem;">
          <div style="padding:0.75rem 1rem;background:rgba(10,14,40,0.4);border-bottom:1px solid var(--border-muted);">
            <span style="font-size:0.62rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);">
              Section 1.1 — Unified Internal Event Schema
            </span>
          </div>
          <table class="data-table spec-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="primary-col"><code>event_id</code></td><td style="color:var(--text-muted)">UUID</td><td>Primary key</td></tr>
              <tr><td class="primary-col"><code>sender_id</code></td><td style="color:var(--text-muted)">pseudonymous string</td><td>e.g. <code>EMP_0091</code> — never a real name</td></tr>
              <tr><td class="primary-col"><code>receiver_id</code></td><td style="color:var(--text-muted)">pseudonymous string</td><td>Same pool as sender_id</td></tr>
              <tr><td class="primary-col"><code>channel_type</code></td><td style="color:var(--text-muted)">enum</td><td><code>dm</code>, <code>channel</code>, <code>email_1to1</code>, <code>email_thread</code></td></tr>
              <tr><td class="primary-col"><code>timestamp</code></td><td style="color:var(--text-muted)">ISO 8601</td><td>Full precision at generation; generalized to week-bucket at output</td></tr>
              <tr><td class="primary-col"><code>role_level</code></td><td style="color:var(--text-muted)">enum</td><td><code>IC</code>, <code>manager</code>, <code>senior</code>, <code>junior</code>, <code>intern</code></td></tr>
              <tr><td class="primary-col"><code>message_length</code></td><td style="color:var(--text-muted)">int (chars)</td><td>No content stored — only length</td></tr>
              <tr><td class="primary-col"><code>after_hours_flag</code></td><td style="color:var(--text-muted)">bool</td><td>Derived from timestamp vs. org work-hours config</td></tr>
              <tr><td class="primary-col"><code>response_latency_sec</code></td><td style="color:var(--text-muted)">int, nullable</td><td>Time between message and reply</td></tr>
              <tr><td class="primary-col"><code>thread_depth</code></td><td style="color:var(--text-muted)">int</td><td>Email/channel thread depth</td></tr>
              <tr><td class="primary-col"><code>reaction_count</code></td><td style="color:var(--text-muted)">int, nullable</td><td>Slack-style only; 0/null for email</td></tr>
              <tr><td class="primary-col"><code>frequency_7d</code></td><td style="color:var(--text-muted)">int</td><td>Rolling count of sender→receiver messages (trailing 7 days)</td></tr>
              <tr><td class="primary-col"><code>is_1to1_only</code></td><td style="color:var(--text-muted)">bool</td><td><code>true</code> if pair has never messaged in any group/CC context</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Layer 2 -->
      <div class="vtab-content" data-content="1" id="vtab-content-1">
        <h3>Layer 2 — k-Anonymity Generalization Engine (k = 5)</h3>
        <p>
          After anomaly scoring, the generalization layer collapses quasi-identifiers before anything
          reaches the IC dashboard. <strong style="color:var(--text-primary);">k = 5</strong> is the
          enforced minimum — a tunable parameter, not a fixed truth, justified explicitly as a middle
          ground between k=3 (too weak for hierarchy-heavy orgs) and k=10 (destroys signal in small departments).
        </p>
        <div class="algo-block">
          <div class="algo-title">Generalization Hierarchy (per quasi-identifier)</div>
          role_level: {IC, manager, senior, junior, intern} → {supervisory, non-supervisory}<br>
          timestamp: full ISO 8601 → week-bucket (YYYY-Www)<br>
          sender_id / receiver_id: pseudonym → suppressed until cohort size ≥ k=5<br>
          department: exact unit → generalized division (e.g. "Product Engineering · Team Gamma")
        </div>
        <p>
          Any flagged cohort with fewer than k=5 members matching the same generalized quasi-identifier
          combination is suppressed entirely — it does not appear in the IC dashboard.
          This is documented as a <em>simplified generalization-based k-anonymity implementation</em>;
          ARX is cited as the production-grade reference.
        </p>
        <div class="callout callout-gold" style="margin-top:1rem;">
          <span class="callout-icon">⚠</span>
          <p class="callout-text">
            <strong>Known limitation:</strong> k-anonymity is vulnerable to background-knowledge attacks.
            An IC member with sufficient org-chart knowledge may recognize a cohort even at k=5.
            This is a known, cited weakness of k-anonymity generally — documented in the threat model,
            not hidden. (Sweeney, 2002)
          </p>
        </div>
      </div>

      <!-- Layer 3 -->
      <div class="vtab-content" data-content="2" id="vtab-content-2">
        <h3>Layer 3 — Dual-Quorum IC Decision Workspace</h3>
        <p>
          The IC dashboard presents only generalized, k-anonymized patterns. No individual identifiers
          appear in the default view. Identity escalation — the only action that unmasks individuals —
          requires <strong style="color:var(--text-primary);">≥ 2 of 3 IC member digital sign-offs</strong>
          under Section 11 of the POSH Act.
        </p>
        <p>
          This multi-party authorization design eliminates single-admin surveillance power. Every
          dashboard access event (who viewed which cohort, when) is written to an immutable audit log
          with a hash receipt — the primary defense against IC insider misuse.
        </p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.75rem;margin-top:1rem;">
          <div class="metric-cell">
            <div class="metric-cell-label">IC Action</div>
            <div class="metric-cell-value" style="font-size:0.85rem;color:var(--accent-aqua);">Browse Cohorts</div>
            <div class="metric-cell-sub">Single IC member · No sign-off</div>
          </div>
          <div class="metric-cell">
            <div class="metric-cell-label">IC Action</div>
            <div class="metric-cell-value" style="font-size:0.85rem;color:var(--accent-teal);">Escalate Pattern</div>
            <div class="metric-cell-sub">2 of 3 sign-offs required</div>
          </div>
          <div class="metric-cell">
            <div class="metric-cell-label">IC Action</div>
            <div class="metric-cell-value" style="font-size:0.85rem;color:var(--accent-gold);">Identity Disclosure</div>
            <div class="metric-cell-sub">Formal POSH inquiry only</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════ COMPETITOR TABLE ════════════════════════ -->
  <section class="section" id="comparison" style="padding-top:2rem;">
    <p class="eyebrow">Market Landscape</p>
    <h2 style="margin-bottom:0.5rem;">The gap no existing solution fills</h2>
    <p style="max-width:640px;margin-bottom:2rem;">
      POSH modules in commercial HR-tech mean compliance paperwork automation — not detection.
      The three-way combination THEODRA implements does not exist elsewhere.
    </p>
    <div class="data-table-wrapper">
      <table class="data-table spec-table">
        <thead>
          <tr>
            <th>Solution</th>
            <th>What it actually does</th>
            <th>Gap relative to THEODRA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="primary-col">Keka, Darwinbox, greytHR, ZingHR</td>
            <td>POSH policy storage, ICC roster management, complaint-filing workflow, statutory report generation</td>
            <td style="color:var(--accent-gold);">No behavioral signal ingestion. No detection before a complaint exists.</td>
          </tr>
          <tr>
            <td class="primary-col">Academic AI-for-POSH literature</td>
            <td>Conceptual arguments that AI could assist pattern recognition — explicitly notes AI cannot replace human judgment</td>
            <td style="color:var(--accent-gold);">No proposed or evaluated architecture. THEODRA is the implementation the literature gestures at.</td>
          </tr>
          <tr>
            <td class="primary-col">Corporate DLP / Insider Threat tools</td>
            <td>Anomaly detection on communication metadata, tuned for data-exfiltration and security-policy violations</td>
            <td style="color:var(--accent-gold);">Wrong signal set. Not tuned for hierarchy-based exclusivity or after-hours 1:1 escalation patterns.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- ════════════════════════════ FOOTER ════════════════════════════════ -->
  <footer class="site-footer">
    <strong>THEOD<span>R</span>A</strong> &nbsp;·&nbsp; Privacy-Preserving Workplace Harassment Early-Warning System
    &nbsp;·&nbsp; Rushda Jagtap, B.Tech Data Science &nbsp;·&nbsp;
    POSH Act 2013 Compliant &nbsp;·&nbsp; k=5 Enforced &nbsp;·&nbsp; Enron Baseline Calibrated
  </footer>
</div>
  `;
}

export function initLanding(): void {
  // Vertical tab switcher
  document.querySelectorAll<HTMLButtonElement>('.vtab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.dataset.tab!;
      document.querySelectorAll('.vtab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.vtab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`vtab-content-${idx}`)?.classList.add('active');
    });
  });

  // Animated event counter
  const el = document.getElementById('counter-events');
  if (el) {
    let base = 48210;
    setInterval(() => {
      base += Math.floor(Math.random() * 5) + 1;
      el.textContent = base.toLocaleString('en-IN');
    }, 2800);
  }
}
