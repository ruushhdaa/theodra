// ── IC Intelligence Dashboard (/dashboard  →  #/dashboard) ─────────────────

const COHORTS = [
  {
    id: 'CH-8821', rolePair: 'Senior Lead → Associate', dept: 'Product Engineering · Team Gamma',
    tier: 'flagged', tierLabel: 'Flagged', duration: '4 consecutive weeks', k: 7,
    driver: '82% After-Hours Escalation + High Exclusivity', anomalyIdx: '0.847',
    afterHours: 82, exclusivity: 91, freqTrend: [3,5,7,11,14], latencySup: 4, latencyNon: 98,
    presiding: true, external: false,
  },
  {
    id: 'CH-4402', rolePair: 'Manager → Junior Developer', dept: 'Technology Operations · Backend',
    tier: 'flagged', tierLabel: 'Flagged', duration: '3 consecutive weeks', k: 5,
    driver: 'Sustained 1:1 Exclusivity + Shrinking Non-Sup Latency', anomalyIdx: '0.791',
    afterHours: 71, exclusivity: 88, freqTrend: [4,5,6,9,12], latencySup: 6, latencyNon: 72,
    presiding: true, external: false,
  },
  {
    id: 'CH-6614', rolePair: 'Senior → Intern', dept: 'People Operations · HR Infra',
    tier: 'elevated', tierLabel: 'Elevated', duration: '6 consecutive weeks', k: 8,
    driver: 'Elevated After-Hours Ratio (67%) + Role Asymmetry Score 0.72', anomalyIdx: '0.613',
    afterHours: 67, exclusivity: 74, freqTrend: [2,3,4,5,7], latencySup: 9, latencyNon: 55,
    presiding: false, external: false,
  },
  {
    id: 'CH-3301', rolePair: 'Team Lead → Associate', dept: 'Client Success · Enterprise',
    tier: 'elevated', tierLabel: 'Elevated', duration: '2 consecutive weeks', k: 6,
    driver: 'Frequency Escalation Slope 1.8x Baseline', anomalyIdx: '0.542',
    afterHours: 58, exclusivity: 62, freqTrend: [2,3,4,6,8], latencySup: 12, latencyNon: 44,
    presiding: false, external: false,
  },
  {
    id: 'CH-9910', rolePair: 'Manager → Junior Analyst', dept: 'Finance · Reporting Unit',
    tier: 'elevated', tierLabel: 'Elevated', duration: '3 consecutive weeks', k: 5,
    driver: 'After-Hours DM Volume 3.4x Dept Baseline', anomalyIdx: '0.489',
    afterHours: 61, exclusivity: 69, freqTrend: [1,2,3,5,7], latencySup: 8, latencyNon: 60,
    presiding: false, external: false,
  },
  {
    id: 'CH-2277', rolePair: 'Senior → Junior', dept: 'Design Systems · Mobile',
    tier: 'watch', tierLabel: 'Watch', duration: '5 consecutive weeks', k: 9,
    driver: 'Mild Latency Asymmetry + Below-Threshold After-Hours', anomalyIdx: '0.341',
    afterHours: 38, exclusivity: 45, freqTrend: [2,2,3,3,4], latencySup: 15, latencyNon: 38,
    presiding: false, external: false,
  },
  {
    id: 'CH-5589', rolePair: 'IC Member → Senior', dept: 'Legal & Compliance',
    tier: 'watch', tierLabel: 'Watch', duration: '2 consecutive weeks', k: 7,
    driver: 'Frequency Slope Mild Upward — Under Evaluation', anomalyIdx: '0.287',
    afterHours: 31, exclusivity: 40, freqTrend: [1,1,2,2,3], latencySup: 22, latencyNon: 30,
    presiding: false, external: false,
  },
];

function tierBadge(tier: string, label: string): string {
  return `<span class="badge badge-${tier}">${label}</span>`;
}

function buildChart(cohort: typeof COHORTS[0]): string {
  const pts = cohort.freqTrend;
  const max = Math.max(...pts) * 1.2;
  const w = 360, h = 80;
  const toX = (i: number) => Math.round((i / (pts.length - 1)) * (w - 40)) + 20;
  const toY = (v: number) => Math.round(h - (v / max) * (h - 14)) ;

  const pathD = pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(v)}`).join(' ');
  const areaD = pathD + ` L${toX(pts.length - 1)},${h} L${toX(0)},${h} Z`;

  // Baseline (flat at 3)
  const baseY = toY(3);
  const basePath = `M20,${baseY} L${w - 20},${baseY}`;

  const dots = pts.map((v, i) =>
    `<circle cx="${toX(i)}" cy="${toY(v)}" r="3" fill="var(--accent-gold)" />`
  ).join('');
  const weeks = ['W-4', 'W-3', 'W-2', 'W-1', 'Now'];
  const labels = pts.map((_, i) =>
    `<text x="${toX(i)}" y="${h + 12}" font-size="7" fill="#7A7770" text-anchor="middle" font-family="Plus Jakarta Sans,sans-serif">${weeks[i]}</text>`
  ).join('');

  return `
    <svg width="100%" height="${h + 20}" viewBox="0 0 ${w} ${h + 20}" preserveAspectRatio="none">
      <path d="${areaD}" fill="rgba(220,177,60,0.08)" />
      <path d="${pathD}" fill="none" stroke="var(--accent-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="${basePath}" fill="none" stroke="rgba(36,147,162,0.4)" stroke-width="1.5" stroke-dasharray="4 3"/>
      ${dots}
      ${labels}
      <text x="20" y="10" font-size="7" fill="#57BDA2" font-family="Plus Jakarta Sans,sans-serif">— Dept baseline</text>
      <text x="110" y="10" font-size="7" fill="#DCB13C" font-family="Plus Jakarta Sans,sans-serif">— Cohort frequency</text>
    </svg>`;
}

function buildDrawer(cohort: typeof COHORTS[0]): string {
  const quorumCount = (cohort.presiding ? 1 : 0) + (cohort.external ? 1 : 0);
  const quorumMet = quorumCount >= 2;
  return `
  <div class="drawer-overlay" id="drawer-overlay"></div>
  <aside class="drawer" id="cohort-drawer" aria-label="Cohort Inspector">
    <div class="drawer-header">
      <div>
        <div class="drawer-title">Cohort ${cohort.id}</div>
        <div class="drawer-subtitle">
          ${cohort.rolePair} &nbsp;·&nbsp; ${cohort.dept}
          &nbsp;&nbsp;<span class="badge badge-verified">k=${cohort.k} verified</span>
        </div>
      </div>
      <button class="drawer-close" id="drawer-close-btn" aria-label="Close inspector">✕</button>
    </div>
    <div class="drawer-body">

      <!-- Tier + duration -->
      <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
        ${tierBadge(cohort.tier, cohort.tierLabel)}
        <span style="font-size:0.72rem;color:var(--text-muted);">${cohort.duration}</span>
        <span style="font-size:0.72rem;font-feature-settings:'tnum' 1;color:var(--text-muted);">Anomaly Index: <strong style="color:var(--text-primary);">${cohort.anomalyIdx}</strong></span>
      </div>

      <!-- Metrics grid -->
      <div>
        <div class="drawer-section-label">Behavioral Metrics</div>
        <div class="metric-grid">
          <div class="metric-cell">
            <div class="metric-cell-label">After-Hours Ratio</div>
            <div class="metric-cell-value text-gold">${cohort.afterHours}%</div>
            <div class="metric-cell-sub">Dept baseline ~28%</div>
          </div>
          <div class="metric-cell">
            <div class="metric-cell-label">Exclusivity Score</div>
            <div class="metric-cell-value text-gold">${cohort.exclusivity}%</div>
            <div class="metric-cell-sub">1:1-only interaction ratio</div>
          </div>
          <div class="metric-cell">
            <div class="metric-cell-label">Supervisory Latency</div>
            <div class="metric-cell-value text-aqua tabular">${cohort.latencySup} min</div>
            <div class="metric-cell-sub">Avg response time</div>
          </div>
          <div class="metric-cell">
            <div class="metric-cell-label">Non-Sup Latency</div>
            <div class="metric-cell-value text-gold tabular">${cohort.latencyNon} min</div>
            <div class="metric-cell-sub">Junior party avg</div>
          </div>
        </div>
      </div>

      <!-- Chart -->
      <div>
        <div class="drawer-section-label">Message Frequency Trend (Trailing 4 Weeks)</div>
        <div class="chart-container">
          ${buildChart(cohort)}
          <div style="margin-top:0.5rem;font-size:0.65rem;color:var(--text-muted);">
            Primary driver: <span style="color:var(--text-secondary);">${cohort.driver}</span>
          </div>
        </div>
      </div>

      <!-- Latency asymmetry callout -->
      <div class="callout callout-gold">
        <span class="callout-icon">⚠</span>
        <p class="callout-text">
          <strong>Hierarchical Distance & Latency Ratio:</strong> Supervisory party responds in 
          <strong>${cohort.latencySup} min</strong> on average; non-supervisory party responds in 
          <strong>${cohort.latencyNon} min</strong>.
          A latency ratio of <strong>${(cohort.latencyNon / cohort.latencySup).toFixed(1)}×</strong> 
          is consistent with documented patterns of junior-party compliance under relational pressure.
        </p>
      </div>

      <!-- Dual Quorum -->
      <div>
        <div class="drawer-section-label">Dual-Quorum Identity Escalation Module</div>
        <div class="callout callout-gold" style="margin-bottom:1rem;">
          <span class="callout-icon">🔒</span>
          <p class="callout-text">
            <strong>Escalation unmasks individual identities</strong> for formal inquiry under
            Section 11 of the POSH Act. Requires <strong>2 of 3 IC member digital sign-offs</strong>.
            Current status: <strong>${quorumCount}/3 signed</strong>.
          </p>
        </div>

        <div class="quorum-member">
          <div>
            <div class="quorum-member-name">Dr. Priya Nair</div>
            <div class="quorum-member-role">Presiding Officer · IC</div>
          </div>
          ${cohort.presiding
            ? `<span class="quorum-signed">✓ Signed · ${new Date(Date.now() - 7200000).toLocaleTimeString('en-IN', {hour:'2-digit',minute:'2-digit'})}</span>`
            : `<span class="quorum-pending">⏳ Pending</span>`}
        </div>

        <div class="quorum-member">
          <div>
            <div class="quorum-member-name">Adv. Meera Krishnan</div>
            <div class="quorum-member-role">External Member · POSH Expert</div>
          </div>
          ${cohort.external
            ? `<span class="quorum-signed">✓ Signed</span>`
            : `<span class="quorum-pending">⏳ Pending Signature…</span>`}
        </div>

        <div class="quorum-member">
          <div>
            <div class="quorum-member-name">Mr. Rahul Desai</div>
            <div class="quorum-member-role">IC Member · HR Representative</div>
          </div>
          <span class="quorum-pending">⏳ Pending</span>
        </div>

        <button
          class="btn btn-gold"
          style="width:100%;margin-top:1rem;justify-content:center;${quorumMet ? '' : 'opacity:0.35;cursor:not-allowed;'}"
          ${quorumMet ? '' : 'disabled'}
          title="${quorumMet ? 'Authorize identity disclosure' : `Quorum not met — ${quorumCount}/2 signatures obtained`}"
        >
          🔓 Authorize Disclosure (${quorumCount}/2 Signatures)
        </button>
        ${!quorumMet ? `<p style="font-size:0.65rem;color:var(--text-muted);text-align:center;margin-top:0.4rem;">
          Awaiting ${2 - quorumCount} additional IC member signature(s) to meet dual-quorum threshold.
        </p>` : ''}
      </div>

    </div>
  </aside>`;
}

export function renderDashboard(): string {
  const rows = COHORTS.map((c, i) => `
    <tr data-cohort="${i}" id="cohort-row-${i}">
      <td class="primary-col mono">${c.id}</td>
      <td class="primary-col">${c.rolePair}</td>
      <td>${c.dept}</td>
      <td>${tierBadge(c.tier, c.tierLabel)}</td>
      <td class="mono">${c.duration}</td>
      <td><span class="text-aqua" style="font-weight:600;font-feature-settings:'tnum' 1;">k = ${c.k}</span></td>
      <td style="max-width:240px;font-size:0.72rem;color:var(--text-muted);">${c.driver}</td>
      <td>
        <button class="btn btn-ghost btn-sm inspect-btn" data-cohort="${i}">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          Inspect
        </button>
      </td>
    </tr>`).join('');

  return /* html */`
<div class="page-wrapper" style="background:var(--bg-dark);">
  <div class="page-header" style="padding-top:2rem;">
    <div class="page-header-meta">IC Intelligence Dashboard · Confidential</div>
    <h1>Behavioral Anomaly Monitor</h1>
    <p>High-density cohort surveillance workspace. All patterns generalized to k ≥ 5 before display. IC decision authority preserved.</p>
  </div>

  <div class="section" style="padding-top:1.5rem;">
    <!-- KPI Ribbon -->
    <div class="kpi-ribbon" style="margin-bottom:2rem;">
      <div class="kpi-card teal">
        <div class="kpi-label">Monitored Cohorts (k ≥ 5)</div>
        <div class="kpi-value tabular">14</div>
        <div class="kpi-delta">+2 this week</div>
        <div class="kpi-subtext">Across 6 departments</div>
      </div>
      <div class="kpi-card gold">
        <div class="kpi-label">Suppressed Low-k Patterns</div>
        <div class="kpi-value tabular">19</div>
        <div class="kpi-delta negative">Protecting individual identities</div>
        <div class="kpi-subtext">Below k=5 threshold — not displayed</div>
      </div>
      <div class="kpi-card aqua">
        <div class="kpi-label">30-Day Anomaly Index</div>
        <div class="kpi-value tabular">0.342</div>
        <div class="kpi-delta">Normalized Isolation Forest score</div>
        <div class="kpi-subtext">+0.04 vs prior month</div>
      </div>
      <div class="kpi-card gold">
        <div class="kpi-label">Pending Dual-Quorum Actions</div>
        <div class="kpi-value tabular">1</div>
        <div class="kpi-delta negative">Requires IC sign-off</div>
        <div class="kpi-subtext">CH-8821 · CH-4402 under review</div>
      </div>
    </div>

    <!-- Filter Toolbar + Table -->
    <div class="data-table-wrapper">
      <div class="filter-toolbar">
        <input class="filter-input" type="text" id="cohort-search" placeholder="Search cohort ID, department, role pairing…" />
        <span class="filter-label">Tier</span>
        <select class="filter-select" id="tier-filter">
          <option value="">All Tiers</option>
          <option value="flagged">Flagged</option>
          <option value="elevated">Elevated</option>
          <option value="watch">Watch</option>
        </select>
        <span class="filter-label">Role Pairing</span>
        <select class="filter-select" id="role-filter">
          <option value="">All Pairings</option>
          <option value="supervisory">Supervisory ↔ Non-Supervisory</option>
          <option value="peer">Peer ↔ Peer</option>
        </select>
        <span class="filter-label">Window</span>
        <select class="filter-select" id="window-filter">
          <option value="30">Trailing 30 Days</option>
          <option value="14">Trailing 14 Days</option>
          <option value="7">Trailing 7 Days</option>
          <option value="90">Trailing 90 Days</option>
        </select>
        <span style="flex:1;"></span>
        <span style="font-size:0.65rem;color:var(--text-muted);font-feature-settings:'tnum' 1;" id="row-count">${COHORTS.length} cohorts shown</span>
      </div>

      <div style="overflow-x:auto;">
        <table class="data-table" id="cohort-table">
          <thead>
            <tr>
              <th>Cohort ID</th>
              <th>Generalized Role Pairing</th>
              <th>Department / Unit</th>
              <th>Anomaly Tier</th>
              <th>Duration</th>
              <th>Cohort Size</th>
              <th>Primary Driver</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="cohort-tbody">
            ${rows}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Audit summary -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:1rem;padding:0.75rem 1rem;background:rgba(44,50,89,0.3);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);">
      <span style="font-size:0.7rem;color:var(--text-muted);">
        Last full pipeline run: <strong style="color:var(--text-secondary);">Today 06:00 IST</strong> ·
        Next scheduled: <strong style="color:var(--text-secondary);">Tomorrow 06:00 IST</strong> ·
        Enron baseline recalibration: <strong style="color:var(--text-secondary);">Monthly</strong>
      </span>
      <button class="btn btn-ghost btn-sm" onclick="window.location.hash='/compliance'">
        View Audit Log →
      </button>
    </div>
  </div>

  <!-- Drawer (initially rendered hidden) -->
  <div id="drawer-mount"></div>

  <footer class="site-footer">
    THEODRA IC Dashboard · All data generalized (k ≥ 5) · Dashboard access logged with hash receipt · <span>POSH Act 2013 Compliant</span>
  </footer>
</div>`;
}

export function initDashboard(): void {
  let activeRow: HTMLTableRowElement | null = null;

  function openDrawer(idx: number): void {
    const cohort = COHORTS[idx];
    const mount = document.getElementById('drawer-mount')!;
    mount.innerHTML = buildDrawer(cohort);

    // Highlight active row
    activeRow?.classList.remove('active-row');
    activeRow = document.getElementById(`cohort-row-${idx}`) as HTMLTableRowElement;
    activeRow?.classList.add('active-row');

    requestAnimationFrame(() => {
      document.getElementById('drawer-overlay')?.classList.add('open');
      document.getElementById('cohort-drawer')?.classList.add('open');
    });

    document.getElementById('drawer-close-btn')?.addEventListener('click', closeDrawer);
    document.getElementById('drawer-overlay')?.addEventListener('click', closeDrawer);
  }

  function closeDrawer(): void {
    document.getElementById('drawer-overlay')?.classList.remove('open');
    document.getElementById('cohort-drawer')?.classList.remove('open');
    activeRow?.classList.remove('active-row');
    setTimeout(() => {
      document.getElementById('drawer-mount')!.innerHTML = '';
    }, 280);
  }

  // Inspect buttons
  document.querySelectorAll<HTMLButtonElement>('.inspect-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openDrawer(Number(btn.dataset.cohort));
    });
  });

  // Row click
  document.querySelectorAll<HTMLTableRowElement>('[data-cohort]').forEach(row => {
    if (row.tagName === 'TR') {
      row.addEventListener('click', () => openDrawer(Number(row.dataset.cohort)));
    }
  });

  // Filters
  function filterRows(): void {
    const search = (document.getElementById('cohort-search') as HTMLInputElement).value.toLowerCase();
    const tier   = (document.getElementById('tier-filter') as HTMLSelectElement).value;
    let shown = 0;
    document.querySelectorAll<HTMLTableRowElement>('#cohort-tbody tr').forEach((row, i) => {
      const c = COHORTS[i];
      const text = `${c.id} ${c.dept} ${c.rolePair}`.toLowerCase();
      const matchSearch = !search || text.includes(search);
      const matchTier   = !tier   || c.tier === tier;
      const visible = matchSearch && matchTier;
      row.style.display = visible ? '' : 'none';
      if (visible) shown++;
    });
    const rc = document.getElementById('row-count');
    if (rc) rc.textContent = `${shown} cohort${shown !== 1 ? 's' : ''} shown`;
  }

  document.getElementById('cohort-search')?.addEventListener('input', filterRows);
  document.getElementById('tier-filter')?.addEventListener('change', filterRows);
  document.getElementById('role-filter')?.addEventListener('change', filterRows);
  document.getElementById('window-filter')?.addEventListener('change', filterRows);
}
