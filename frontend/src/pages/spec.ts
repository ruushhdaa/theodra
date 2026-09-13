// ── Full Project Specification (/spec → #/spec) ──────────────────────────────

const SPEC_CONTENT = `
<section id="spec-s0">
<h1>Project Specification — THEODRA</h1>
<p style="color:var(--text-muted);font-size:0.8rem;margin-top:0.25rem;">
  Working name: THEODRA · Owner: Rushda Jagtap, B.Tech Data Science ·
  Type: Course project · Status: Draft v1
</p>

<h2 id="spec-s0-def">§0 — System Definition</h2>
<p>
  A three-layer system that flags <strong>behavioral communication anomalies</strong> correlated with workplace
  harassment patterns, without ever exposing raw message content or unmasking identities below a
  k-anonymity threshold. It routes only aggregated, statistically-flagged signals to an Internal
  Committee (IC) dashboard alongside a fully anonymous free-text reporting channel.
</p>
<p>
  The system never accuses. It surfaces patterns for human review, and the IC remains the sole
  decision-making authority under the POSH Act. The load-bearing ethical/technical argument is that
  every feature is a <em>behavioral</em> signal, not a <em>content</em> signal. The system is
  deliberately blind to what was said — only to the shape of communication.
</p>

<h2 id="spec-s0-1">§0.1 — Problem Grounding</h2>
<p>
  This isn't a hypothetical gap. Reporting under the POSH Act is chronically low relative to actual
  incidence. The 2026 TCS Nashik case is a live example: despite multiple FIRs alleging harassment,
  the company stated none of the complainants had approached the Internal Committee through official
  POSH channels — over several years.
</p>
<p>
  Advocates attribute this to hierarchy: employees stay silent out of fear of losing professional
  standing, and silence tends to embolden repeat behavior rather than resolve it. A decade-long review
  of corporate India's POSH filings (CEDA / Ashoka University) found that a large share of companies
  report <strong>zero cases year after year</strong> — which reads less as "no harassment occurred" and
  more as "no one felt safe enough to file."
</p>
<div class="callout callout-teal" style="margin:1rem 0;">
  <span class="callout-icon">⚡</span>
  <p class="callout-text">
    <strong>Structural tension:</strong> The IC's obligations are reactive by law — someone must file
    a complaint before the IC can act — but the actual harm frequently never reaches that stage.
    THEODRA's entire justification is that it gives the IC an <em>early-warning signal</em> upstream
    of a formal complaint, without replacing the complaint process the law requires.
  </p>
</div>

<h2 id="spec-s0-2">§0.2 — Literature Review & The Actual Gap</h2>
<p>
  <strong>Academic work:</strong> Emerging scholarship on AI applied to POSH enforcement stays at the
  level of "AI could help" rather than proposing or evaluating a working detection architecture. The
  same literature explicitly states that AI can recognize patterns but cannot substitute for human
  judgment and empathy in live cases. THEODRA is the implementation the literature gestures at — not
  a duplicate of it.
</p>
<p>
  <strong>Commercial HR-tech (Keka, Darwinbox, greytHR, ZingHR):</strong> POSH modules in these
  platforms consistently mean: POSH policy storage, ICC member composition tracking, a complaint-filing
  workflow, investigation-status tracking, and annual statutory report generation.
  This is <strong>compliance paperwork automation</strong>, not detection. None ingest communication
  metadata or surface a concerning pattern before a complaint is filed. That absence is THEODRA's wedge.
</p>
<p>
  <strong>Where that leaves the project:</strong> The gap is that no existing tool — commercial or
  academic — does behavioral-metadata-based early detection upstream of a formal complaint, with a
  privacy architecture that could survive scrutiny. Each piece alone exists somewhere; the combination,
  tuned for this specific legal/organizational context, does not.
</p>
</section>

<section id="spec-s1">
<h2 id="spec-s1-head">§1 — Layer 1: Metadata Schema</h2>
<p>
  Since real Slack/Gmail admin access is not obtainable as a student, THEODRA generates
  <strong>synthetic data that mimics three source types</strong>, making the pipeline source-agnostic
  and demonstrably portable. One unified internal schema; three small generators that each emit into it.
</p>

<h3 id="spec-s1-1">§1.1 — Unified Internal Event Schema</h3>
<div class="data-table-wrapper" style="margin:1rem 0;">
  <table class="data-table spec-table">
    <thead><tr><th>Field</th><th>Type</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td><code>event_id</code></td><td>UUID</td><td>Primary key</td></tr>
      <tr><td><code>sender_id</code></td><td>pseudonymous string</td><td>e.g. <code>EMP_0091</code> — never a real name</td></tr>
      <tr><td><code>receiver_id</code></td><td>pseudonymous string</td><td>Same pool as sender</td></tr>
      <tr><td><code>channel_type</code></td><td>enum</td><td><code>dm</code>, <code>channel</code>, <code>email_1to1</code>, <code>email_thread</code></td></tr>
      <tr><td><code>timestamp</code></td><td>ISO 8601</td><td>Full precision at generation; generalized to week-bucket at output</td></tr>
      <tr><td><code>role_level</code></td><td>enum</td><td><code>IC</code>, <code>manager</code>, <code>senior</code>, <code>junior</code>, <code>intern</code></td></tr>
      <tr><td><code>message_length</code></td><td>int (chars)</td><td>No content stored — length only</td></tr>
      <tr><td><code>after_hours_flag</code></td><td>bool</td><td>Derived from timestamp vs. org work-hours config</td></tr>
      <tr><td><code>response_latency_sec</code></td><td>int, nullable</td><td>Time between message and reply</td></tr>
      <tr><td><code>thread_depth</code></td><td>int</td><td>For email/channel threads</td></tr>
      <tr><td><code>reaction_count</code></td><td>int, nullable</td><td>Slack-style only; 0/null for email</td></tr>
      <tr><td><code>frequency_7d</code></td><td>int</td><td>Rolling count of sender→receiver messages in trailing 7 days</td></tr>
      <tr><td><code>is_1to1_only</code></td><td>bool</td><td><code>true</code> if pair has never messaged in any group/CC context</td></tr>
    </tbody>
  </table>
</div>

<h3 id="spec-s1-2">§1.2 — The Three Generators</h3>
<ul>
  <li><strong>Slack-style generator:</strong> channels + DMs, <code>reaction_count</code> populated, <code>thread_depth</code> shallow.</li>
  <li><strong>Email-style generator:</strong> to/cc fan-out collapsed into <code>channel_type=email_thread</code> vs <code>email_1to1</code>; <code>thread_depth</code> matters more; no reactions.</li>
  <li><strong>Generic org-comms generator:</strong> Abstracts both into a single stream — this is what the model is fed, since real deployments will mix sources.</li>
</ul>

<h3 id="spec-s1-2-1">§1.2.1 — Enron Corpus Grounding</h3>
<p>
  Baseline behavioral distributions calibrated against the <strong>Enron Email Corpus</strong>
  (Cohen, W. · CMU · ~500K real workplace emails, standard in organizational-communication research).
  Only structural statistics are extracted: send-time distributions, reply-latency distributions,
  thread-depth distributions, and normal after-hours ratios. Message bodies are never read or quoted.
  This sidesteps privacy/copyright concerns while making the baseline defensible as
  <em>"calibrated against real organizational communication patterns"</em>.
</p>
<div class="algo-block">
  <div class="algo-title">Baseline Extraction (Enron Corpus — structural stats only)</div>
  mean_response_latency_sec  ≈  3,240  (54 min) — business hours pairs<br>
  after_hours_ratio_baseline ≈  0.17   (17% of messages outside 09:00–18:00)<br>
  mean_thread_depth          ≈  4.2    (email threads)<br>
  mean_message_length        ≈  312    chars
</div>

<h3 id="spec-s1-3">§1.3 — Synthetic Anomaly Injection</h3>
<p>
  To provide labeled ground truth for evaluation, known patterns are deliberately injected into
  ~3–5% of synthetic sender/receiver pairs:
</p>
<ul>
  <li>Escalating <code>frequency_7d</code> from a senior→junior pair, skewed after-hours, low <code>reaction_count</code>, shrinking <code>response_latency_sec</code> from the junior (pattern: junior replying fast out of unease, not engagement).</li>
  <li><code>is_1to1_only=true</code> sustained over weeks between hierarchy-unequal pairs with no group-channel co-presence.</li>
</ul>
<p>This enables honest precision/recall reporting — what separates a real project from a demo.</p>
</section>

<section id="spec-s2">
<h2 id="spec-s2-head">§2 — Layer 1: Model & Features</h2>
<p>
  <strong>Model: Isolation Forest (unsupervised anomaly detection)</strong> — correct choice because
  real deployments have no labeled harassment data. You cannot supervise-train on something nobody
  labels for privacy/legal reasons. This constraint is stated explicitly — it is a strength,
  not a limitation being hidden.
</p>
<p>
  Output is an <strong>anomaly score per pair per week</strong>, not a binary "harassment/not."
  This score is thresholded into three tiers (<code>watch</code>, <code>elevated</code>, <code>flagged</code>)
  — never a single hard cutoff, because a hard cutoff is where false-positive harm concentrates.
</p>

<h3 id="spec-s2-features">§2.1 — Feature Vector (per sender→receiver pair, aggregated weekly)</h3>
<div class="algo-block">
  <div class="algo-title">Isolation Forest Feature Vector (6 dimensions)</div>
  1. frequency_7d_slope      — Trend slope over trailing 4 weeks (captures escalation, not just volume)<br>
  2. after_hours_ratio       — Proportion of messages outside work hours<br>
  3. role_asymmetry          — Encoded hierarchy gap (senior→intern weighted higher than peer→peer)<br>
  4. response_latency_asym   — Difference in how fast each party replies to the other<br>
  5. exclusivity_score       — Derived from is_1to1_only, sustained over time<br>
  6. reaction_sentiment_proxy — reaction_count trend (DM/channel only; imputed with pair-type median for email rows)
</div>
<p>
  Each feature encodes a <strong>behavioral asymmetry</strong>, not a content judgment.
  That distinction is what makes this defensible under a fairness/bias review (FAccT angle).
</p>

<h3 id="spec-s2-tiers">§2.2 — Anomaly Tier Thresholds</h3>
<div class="data-table-wrapper" style="margin:1rem 0;">
  <table class="data-table spec-table">
    <thead><tr><th>Tier</th><th>Isolation Forest Score</th><th>IC Action Triggered</th></tr></thead>
    <tbody>
      <tr>
        <td><span class="badge badge-watch">Watch</span></td>
        <td class="mono">0.20 – 0.44</td>
        <td>Logged; IC may browse; no sign-off required</td>
      </tr>
      <tr>
        <td><span class="badge badge-elevated">Elevated</span></td>
        <td class="mono">0.45 – 0.69</td>
        <td>Visible in dashboard; IC encouraged to review cohort detail</td>
      </tr>
      <tr>
        <td><span class="badge badge-flagged">Flagged</span></td>
        <td class="mono">≥ 0.70</td>
        <td>IC review required; identity escalation available (dual-quorum)</td>
      </tr>
    </tbody>
  </table>
</div>
</section>

<section id="spec-s3">
<h2 id="spec-s3-head">§3 — k-Anonymity (k = 5)</h2>
<p>
  <strong>Parameter: k = 5</strong> — defensible middle ground. k=3 is too weak for a hierarchy-heavy org;
  k=10 destroys signal in small departments. Justified explicitly in the report as a tunable parameter,
  not a fixed truth. Cite: <em>Sweeney, L. (2002). k-Anonymity: A Model for Protecting Privacy.</em>
</p>

<h3>What gets generalized before IC dashboard</h3>
<ul>
  <li><code>role_level</code> → collapsed to 2 tiers (<code>supervisory</code>, <code>non-supervisory</code>) if the raw 5-tier grouping doesn't meet k=5 in a given department</li>
  <li><code>timestamp</code> → generalized to week-bucket, never exact time</li>
  <li><code>sender_id</code> / <code>receiver_id</code> → never shown individually until a flagged pattern's cohort (the generalized group it falls into) has ≥ 5 members matching the same generalized quasi-identifiers</li>
</ul>

<div class="callout callout-gold" style="margin:1rem 0;">
  <span class="callout-icon">⚠</span>
  <p class="callout-text">
    <strong>Implementation note:</strong> This is a <em>simplified generalization-based k-anonymity implementation</em>,
    not a full ARX-style engine (which is research-grade). ARX is cited as the production-grade reference
    to migrate to. This honesty is what makes a technical reviewer trust the rest of the claims.
  </p>
</div>

<h2 id="spec-s3-5">§3.5 — Competitor Landscape</h2>
<div class="data-table-wrapper" style="margin:1rem 0;">
  <table class="data-table spec-table">
    <thead><tr><th>Solution</th><th>What it does</th><th>Gap relative to THEODRA</th></tr></thead>
    <tbody>
      <tr>
        <td class="primary-col">Keka, Darwinbox, greytHR, ZingHR</td>
        <td>POSH policy storage, ICC roster, complaint workflow, statutory reports</td>
        <td style="color:var(--accent-gold);">No behavioral signal ingestion. No detection before complaint exists.</td>
      </tr>
      <tr>
        <td class="primary-col">Academic AI-for-POSH literature</td>
        <td>Conceptual — AI could assist pattern recognition; AI cannot replace IC judgment</td>
        <td style="color:var(--accent-gold);">No architecture proposed or evaluated. THEODRA is the implementation.</td>
      </tr>
      <tr>
        <td class="primary-col">Corporate DLP / Insider Threat</td>
        <td>Anomaly detection on metadata, tuned for data-exfiltration / security violations</td>
        <td style="color:var(--accent-gold);">Wrong signal set. Not tuned for hierarchy-based 1:1 escalation patterns.</td>
      </tr>
    </tbody>
  </table>
</div>
</section>

<section id="spec-s4">
<h2 id="spec-s4-head">§4 — IC Dashboard</h2>
<p>Three screens. All content generalized to k ≥ 5 before display. IC is the sole decision authority.</p>
<ul>
  <li><strong>Screen 1 (Aggregate view):</strong> Cohort table — <code>Cohort ID | Role Pair | Dept | Tier | Duration | Cohort Size (≥5)</code>. No names. No exact timestamps. Click a row → Screen 2.</li>
  <li><strong>Screen 2 (Cohort detail):</strong> Trend chart — frequency/after-hours/exclusivity over time, generalized week-buckets. IC assesses pattern legitimacy before escalation. Escalate button requires ≥ 2 IC sign-offs.</li>
  <li><strong>Screen 3 (Anonymous reports inbox):</strong> Free-text submissions, week-generalized timestamp, no linkage to detected cohort unless reporter opts in.</li>
</ul>
</section>

<section id="spec-s5">
<h2 id="spec-s5-head">§5 — Anonymous Reporting Portal</h2>
<p>Be concrete, because "anonymous" is the word every reviewer will pressure-test.</p>
<h3>What is stripped / never collected</h3>
<ul>
  <li>No login, no auth, no account linkage</li>
  <li>No IP address logged (short-lived rate-limit token only; hashed coarse-IP + day; purged within 24h)</li>
  <li>No cookies, no session storage beyond the single submission</li>
  <li>No browser fingerprinting</li>
</ul>
<h3>What remains & why it's acceptable residual risk</h3>
<ul>
  <li><strong>Submission timestamp</strong> (needed for IC triage) — generalized to week</li>
  <li><strong>Free-text content itself</strong> — which the reporter controls. The system cannot anonymize what someone chooses to write. Stated explicitly as an inherent limitation.</li>
</ul>
</section>

<section id="spec-s6">
<h2 id="spec-s6-head">§6 — Threat Model</h2>
<div class="data-table-wrapper" style="margin:1rem 0;">
  <table class="data-table spec-table">
    <thead><tr><th>Component</th><th>Threat</th><th>Mitigation</th></tr></thead>
    <tbody>
      <tr>
        <td class="primary-col">Metadata pipeline</td>
        <td>Interception in transit</td>
        <td>TLS; field-level encryption before anonymizer stage in production</td>
      </tr>
      <tr>
        <td class="primary-col">k-Anonymity layer</td>
        <td>Re-identification via auxiliary data (IC cross-references cohort with org chart)</td>
        <td>k=5 minimum enforced; known weakness of k-anonymity cited — not hidden (Sweeney 2002)</td>
      </tr>
      <tr>
        <td class="primary-col">Reporting portal</td>
        <td>Deanonymization via timing correlation, writing-style stylometry</td>
        <td>Timestamp generalization; stylometry flagged as <em>unsolved</em> residual risk</td>
      </tr>
      <tr>
        <td class="primary-col">IC Dashboard</td>
        <td>Insider threat — IC member misuses access to surveil someone</td>
        <td>Multi-party sign-off for escalation; full audit log of every dashboard access</td>
      </tr>
      <tr>
        <td class="primary-col">ML model</td>
        <td>Adversarial gaming — someone manipulates their behavior to stay under threshold or falsely flag someone</td>
        <td>Fundamental arms-race property of behavioral anomaly systems — discussed as limitation, model retraining cadence proposed</td>
      </tr>
    </tbody>
  </table>
</div>
</section>

<section id="spec-s7">
<h2 id="spec-s7-head">§7 — Explicit Non-Goals</h2>
<ul>
  <li>Does <strong>not</strong> replace IC investigation or decision-making authority</li>
  <li>Does <strong>not</strong> claim certainty — output is a probabilistic signal for human review only</li>
  <li>Does <strong>not</strong> connect to real Slack/Gmail in this phase — synthetic data only, clearly labeled</li>
  <li>Does <strong>not</strong> implement production-grade ARX k-anonymity — simplified generalization, documented as such</li>
  <li>Does <strong>not</strong> solve stylometric deanonymization risk on the reporting portal — flagged as a known open problem</li>
</ul>
</section>

<section id="spec-s8">
<h2 id="spec-s8-head">§8 — Build Sequencing (1.5-month window)</h2>
<div class="data-table-wrapper" style="margin:1rem 0;">
  <table class="data-table spec-table">
    <thead><tr><th>Weeks</th><th>Deliverable</th></tr></thead>
    <tbody>
      <tr><td class="mono primary-col">1–2</td><td>Three synthetic data generators → unified schema → anomaly injection for ground truth</td></tr>
      <tr><td class="mono primary-col">3–4</td><td>Isolation Forest + feature pipeline; evaluate precision/recall against injected anomalies</td></tr>
      <tr><td class="mono primary-col">5</td><td>k-anonymity generalization layer on model output</td></tr>
      <tr><td class="mono primary-col">6</td><td>IC Dashboard (Screens 1–2) + anonymous reporting portal (basic form, rate-limit token)</td></tr>
      <tr><td class="mono primary-col">6.5 (buffer)</td><td>Audit logging, threat-model write-up, final report assembly</td></tr>
    </tbody>
  </table>
</div>
</section>

<section id="spec-s9">
<h2 id="spec-s9-head">§9 — Risk Matrix</h2>
<div class="data-table-wrapper" style="margin:1rem 0;">
  <table class="data-table spec-table">
    <thead><tr><th>Risk</th><th>Probability</th><th>Severity</th><th>Mitigation</th></tr></thead>
    <tbody>
      <tr>
        <td>False positives on legitimate power-asymmetric relationships (mentorship, deadline collab)</td>
        <td style="color:var(--accent-gold);">High</td><td style="color:var(--accent-teal);">Medium</td>
        <td>Tiered output — never binary; IC reviews pattern legitimacy before escalation</td>
      </tr>
      <tr>
        <td>Re-identification via background knowledge (IC member recognizes cohort)</td>
        <td style="color:var(--accent-teal);">Medium</td><td style="color:var(--accent-gold);">High</td>
        <td>k=5 enforced minimum; documented limitation of k-anonymity — not claimed as solved</td>
      </tr>
      <tr>
        <td>Low signal-to-noise in early deployment</td>
        <td style="color:var(--accent-gold);">High</td><td style="color:var(--accent-teal);">Medium</td>
        <td>Report openly as evaluation-phase limitation; propose longer pilot window</td>
      </tr>
      <tr>
        <td>Reporting portal deanonymization via stylometry</td>
        <td style="color:var(--accent-teal);">Low–Medium</td><td style="color:var(--accent-gold);">High</td>
        <td>Flagged explicitly as unsolved residual risk — anonymity not overclaimed</td>
      </tr>
      <tr>
        <td>IC dashboard insider misuse</td>
        <td style="color:var(--accent-teal);">Medium</td><td style="color:var(--accent-gold);">High</td>
        <td>Multi-party sign-off for escalation; full audit log with hash receipts</td>
      </tr>
      <tr>
        <td>Model gaming — threshold evasion or false-flagging</td>
        <td>Low (course-project timeframe)</td><td style="color:var(--accent-teal);">Medium</td>
        <td>Named as inherent arms-race property; out of scope in 1.5 months</td>
      </tr>
      <tr>
        <td>Scope creep — three half-built components</td>
        <td style="color:var(--accent-gold);">High</td><td style="color:var(--accent-gold);">High</td>
        <td>MVP discipline (§8 sequencing); ship Layer 1 + basic Layers 2/3 before polishing</td>
      </tr>
    </tbody>
  </table>
</div>
</section>

<section id="spec-s10">
<h2 id="spec-s10-head">§10 — References</h2>
<ul>
  <li>POSH Act, 2013 — <em>Sexual Harassment of Women at Workplace (Prevention, Prohibition & Redressal) Act</em> — Ministry of Women & Child Development / India Code</li>
  <li>Sweeney, L. (2002). <em>k-Anonymity: A Model for Protecting Privacy</em>. International Journal on Uncertainty, Fuzziness and Knowledge-based Systems. — cite when defining k=5</li>
  <li>Liu, F.T., Ting, K.M., & Zhou, Z.-H. (2008). <em>Isolation Forest</em>. IEEE ICDM. — cite when justifying model choice</li>
  <li>Cohen, W. (CMU). <em>Enron Email Corpus</em>. — cite as structural-statistics calibration source (§1.2.1)</li>
  <li>TCS Nashik case coverage (2026) — cite specific article for §0.1 structural gap evidence</li>
  <li>CEDA / Ashoka University decade-review of POSH filings — for the "many companies report zero cases" statistic</li>
</ul>
</section>

<section id="spec-s11">
<h2 id="spec-s11-head">§11 — Open Decisions</h2>
<ol>
  <li>Confirm k=5, or pick your own value and justify it in writing before building</li>
  <li>Decide the IP-logging policy for the reporting portal explicitly — log-and-purge-in-24h vs. never-log. THEODRA default: log-and-purge-24h (rate-limit only)</li>
  <li>Decide whether the audit log is in-scope for the course deadline or listed as future work — recommendation: build a minimal version; it is high credibility-per-hour-spent</li>
</ol>
</section>
`;

const TOC = [
  { id: 'spec-s0',         label: '§0 System Definition',            sub: false },
  { id: 'spec-s0-1',       label: '§0.1 Problem Grounding',           sub: true  },
  { id: 'spec-s0-2',       label: '§0.2 Literature Review',           sub: true  },
  { id: 'spec-s1',         label: '§1 Metadata Schema',               sub: false },
  { id: 'spec-s1-1',       label: '§1.1 Unified Event Schema',        sub: true  },
  { id: 'spec-s1-2',       label: '§1.2 Three Generators',            sub: true  },
  { id: 'spec-s1-2-1',     label: '§1.2.1 Enron Corpus Grounding',    sub: true  },
  { id: 'spec-s1-3',       label: '§1.3 Anomaly Injection',           sub: true  },
  { id: 'spec-s2',         label: '§2 Model & Features',              sub: false },
  { id: 'spec-s2-features', label: '§2.1 Feature Vector',             sub: true  },
  { id: 'spec-s2-tiers',   label: '§2.2 Anomaly Tiers',              sub: true  },
  { id: 'spec-s3',         label: '§3 k-Anonymity (k=5)',             sub: false },
  { id: 'spec-s3-5',       label: '§3.5 Competitor Landscape',        sub: true  },
  { id: 'spec-s4',         label: '§4 IC Dashboard',                  sub: false },
  { id: 'spec-s5',         label: '§5 Anonymous Reporting',           sub: false },
  { id: 'spec-s6',         label: '§6 Threat Model',                  sub: false },
  { id: 'spec-s7',         label: '§7 Non-Goals',                     sub: false },
  { id: 'spec-s8',         label: '§8 Build Sequencing',              sub: false },
  { id: 'spec-s9',         label: '§9 Risk Matrix',                   sub: false },
  { id: 'spec-s10',        label: '§10 References',                   sub: false },
  { id: 'spec-s11',        label: '§11 Open Decisions',               sub: false },
];

export function renderSpec(): string {
  const tocLinks = TOC.map(t => `
    <button class="toc-link${t.sub ? ' sub' : ''}" data-target="${t.id}" id="toc-${t.id}">
      ${t.label}
    </button>`).join('');

  return /* html */`
<div class="page-wrapper">
  <div class="page-header" style="padding-top:2rem;">
    <div class="page-header-meta">Full Project Specification · Draft v1 · Rushda Jagtap</div>
    <h1>System Architecture & Specification</h1>
    <p>Complete technical specification for the THEODRA workplace harassment early-warning system.</p>
  </div>

  <div class="section" style="padding-top:2rem;">
    <div class="spec-layout">

      <!-- TOC -->
      <nav class="spec-toc" id="spec-toc" aria-label="Table of Contents">
        <div class="spec-toc-title">Table of Contents</div>
        ${tocLinks}
      </nav>

      <!-- Body -->
      <article class="spec-body" id="spec-body">
        ${SPEC_CONTENT}
      </article>
    </div>
  </div>

  <footer class="site-footer">
    THEODRA Specification · <span>Rushda Jagtap, B.Tech Data Science</span> · Draft v1 · POSH Act 2013 Compliant
  </footer>
</div>`;
}

export function initSpec(): void {
  // Smooth scroll on TOC click
  document.querySelectorAll<HTMLButtonElement>('.toc-link').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target!);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Scrollspy
  const sections = TOC.map(t => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
        document.getElementById(`toc-${entry.target.id}`)?.classList.add('active');
      }
    });
  }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
}
