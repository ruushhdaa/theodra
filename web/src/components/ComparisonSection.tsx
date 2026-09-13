export default function ComparisonSection() {
  const comparisons = [
    {
      aspect: "Trigger for Action",
      oldWay: "Completely reactive: No action can occur until an employee gathers courage to file a formal, signed complaint.",
      theodraWay: "Proactive early warning: Surfaces escalating communication stress upstream, before harm becomes chronic.",
    },
    {
      aspect: "Burden of Evidence",
      oldWay: "Placed entirely on the employee: The vulnerable individual must produce chat logs, risk retaliation, and testify alone.",
      theodraWay: "Objective institutional signal: Highlights communication rhythms automatically, removing the personal burden of proof.",
    },
    {
      aspect: "Employee Privacy",
      oldWay: "Invasive when investigated: Ad-hoc reviews often involve reading personal emails, chat histories, or phone records.",
      theodraWay: "Zero content exposure: Operates exclusively on communication timing and hierarchy; words and messages are never read.",
    },
    {
      aspect: "Pattern Visibility",
      oldWay: "Siloed incidents: Repeat behavior targeting multiple junior team members is treated as disconnected one-off friction.",
      theodraWay: "Cross-departmental patterns: Aggregates structural dynamics over time while grouping records to protect identities.",
    },
    {
      aspect: "Decision Authority",
      oldWay: "Often isolated to a single HR manager or delayed until formal external legal involvement.",
      theodraWay: "Mandatory dual-signoff: At least two Internal Committee members must independently agree to authorize inquiry.",
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-6 lg:px-10">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-px bg-gold" />
        <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-text-muted">
          Institutional Contrast
        </span>
      </div>

      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text leading-tight mb-4">
        Rethinking workplace protection
      </h2>
      <p className="font-serif text-base text-text-sec max-w-2xl mb-12 leading-relaxed">
        Why traditional compliance paperwork leaves Internal Committees in the dark — and how THEODRA bridges the gap with quiet, privacy-first detection.
      </p>

      {/* Two-column contrast (ZingHR pattern adapted into serious institutional styling) */}
      <div className="border border-midblue/40 bg-navy/20" style={{ borderRadius: "2px" }}>
        {/* Column Headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-midblue/40 divide-y md:divide-y-0 md:divide-x divide-midblue/40 bg-navy/60">
          <div className="p-5 lg:p-6">
            <span className="font-sans text-[10px] font-medium uppercase tracking-wider text-text-muted block mb-1">
              The Current Reality
            </span>
            <h3 className="font-serif text-lg lg:text-xl font-bold text-text">
              How workplace safety usually works today
            </h3>
          </div>
          <div className="p-5 lg:p-6 bg-navy/80">
            <span className="font-sans text-[10px] font-medium uppercase tracking-wider text-teal block mb-1">
              The THEODRA Model
            </span>
            <h3 className="font-serif text-lg lg:text-xl font-bold text-gold">
              How THEODRA works
            </h3>
          </div>
        </div>

        {/* Comparison Rows */}
        <div className="divide-y divide-midblue/30">
          {comparisons.map((row, idx) => (
            <div
              key={row.aspect}
              className={`grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-midblue/30 ${
                idx % 2 === 1 ? "bg-dark/30" : ""
              }`}
            >
              {/* Old Way Column */}
              <div className="p-5 lg:p-6 space-y-1.5">
                <div className="font-sans text-[10px] font-medium tracking-wider uppercase text-text-muted">
                  {row.aspect}
                </div>
                <p className="font-serif text-sm text-text-sec leading-relaxed">
                  {row.oldWay}
                </p>
              </div>

              {/* THEODRA Way Column */}
              <div className="p-5 lg:p-6 space-y-1.5 bg-navy/10">
                <div className="font-sans text-[10px] font-medium tracking-wider uppercase text-teal">
                  {row.aspect}
                </div>
                <p className="font-serif text-sm text-text leading-relaxed font-normal">
                  {row.theodraWay}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
