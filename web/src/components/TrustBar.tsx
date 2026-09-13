export default function TrustBar() {
  const points = [
    {
      label: "Statutory Grounding",
      headline: "POSH Act 2013 Alignment",
      detail: "Engineered specifically to support mandatory Internal Committee oversight without disrupting statutory inquiry procedures.",
    },
    {
      label: "Group Privacy Standard",
      headline: "Minimum 5-Person Rule",
      detail: "Patterns are only surfaced when at least five people share identical characteristics, so no single individual can ever be identified.",
    },
    {
      label: "Empirical Research",
      headline: "50%+ Zero-Reporting Reality",
      detail: "CEDA Ashoka University research reveals that over half of large firms report zero annual cases — indicating silence, not safety.",
    },
    {
      label: "Dual Human Governance",
      headline: "Two-Member Authorization",
      detail: "No single person or algorithm can act alone. At least two committee members must independently review and agree to escalate.",
    },
  ];

  return (
    <section className="border-y border-midblue/40 bg-navy/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-5 h-px bg-gold" />
          <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-text-muted">
            Institutional Foundations & Integrity Guarantees
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-midblue/30 -mx-4 px-4">
          {points.map((pt, idx) => (
            <div key={pt.headline} className={`pt-4 md:pt-0 ${idx > 0 ? "md:pl-8" : ""}`}>
              <div className="font-sans text-[10px] font-medium text-teal uppercase tracking-wider mb-1">
                {pt.label}
              </div>
              <div className="font-serif text-base font-bold text-text mb-2">
                {pt.headline}
              </div>
              <p className="font-serif text-xs text-text-sec leading-relaxed">
                {pt.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
