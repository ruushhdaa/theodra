import Link from "next/link";

export default function RolesSection() {
  const roles = [
    {
      role: "1. Employee",
      access: "No Login Required",
      accessColor: "text-aqua",
      badge: "Public / Mobile Portal",
      who: "All employees, interns, contractors",
      whatTheySee: "Only the anonymous reporting portal. Cannot see any company dashboards, pattern data, or other employees' reports.",
      action: "Privately file an early concern from any smartphone or personal browser.",
      linkText: "Try Anonymous Portal →",
      linkHref: "/report",
    },
    {
      role: "2. IC Member",
      access: "Secure IC Credentials",
      accessColor: "text-gold",
      badge: "Committee Workspace",
      who: "Presiding Officer, IC members, External Member",
      whatTheySee: "Aggregated, grouped patterns only (at least 5 people per group). Never sees individual names unless two members vote to escalate.",
      action: "Review communication trends, log notes, and vote with peers to authorize an inquiry.",
      linkText: "Preview Committee View →",
      linkHref: "/dashboard?role=ic",
    },
    {
      role: "3. HR Administrator",
      access: "Executive / Admin Credentials",
      accessColor: "text-teal",
      badge: "Governance Console",
      who: "Head of HR, Compliance Officers, System Admin",
      whatTheySee: "System health, IC roster membership, training status, and statutory POSH filing reports. STRICTLY BLOCKED from seeing case content or patterns.",
      action: "Manage committee appointments, track compliance deadlines, and monitor system operation.",
      linkText: "Preview Admin View →",
      linkHref: "/dashboard?role=hr",
    },
  ];

  return (
    <section className="py-20 border-t border-midblue/30 bg-navy/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-px bg-gold" />
          <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-text-muted">
            Role-Based Access
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text leading-tight mb-4">
          Who sees what — strict separation of duties
        </h2>
        <p className="font-serif text-base text-text-sec max-w-2xl mb-12 leading-relaxed">
          HR leaders often ask: &ldquo;Will executives see private complaints? Will managers see who was flagged?&rdquo; The answer is strictly no. Access is partitioned into three isolated roles by design.
        </p>

        {/* 3 Role Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {roles.map((r) => (
            <div
              key={r.role}
              className="border border-midblue/50 bg-navy/70 p-6 flex flex-col justify-between"
              style={{ borderRadius: "2px" }}
            >
              <div>
                <div className="flex items-center justify-between border-b border-midblue/40 pb-3 mb-4">
                  <span className="font-sans text-[11px] font-medium text-text-muted uppercase tracking-wider">
                    {r.badge}
                  </span>
                  <span className={`font-sans text-[11px] font-medium ${r.accessColor}`}>
                    {r.access}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-text mb-2">
                  {r.role}
                </h3>

                <div className="space-y-4 my-4">
                  <div>
                    <div className="font-sans text-[10px] uppercase tracking-wider text-text-muted mb-1">
                      Who uses this
                    </div>
                    <p className="font-serif text-xs text-text-sec">
                      {r.who}
                    </p>
                  </div>

                  <div>
                    <div className="font-sans text-[10px] uppercase tracking-wider text-text-muted mb-1">
                      What they can see
                    </div>
                    <p className="font-serif text-xs text-text leading-relaxed">
                      {r.whatTheySee}
                    </p>
                  </div>

                  <div>
                    <div className="font-sans text-[10px] uppercase tracking-wider text-text-muted mb-1">
                      Key responsibility
                    </div>
                    <p className="font-serif text-xs text-text-sec leading-relaxed">
                      {r.action}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-midblue/30 mt-4">
                <Link
                  href={r.linkHref}
                  className="font-sans text-xs font-medium text-teal hover:text-aqua transition-colors inline-flex items-center"
                >
                  {r.linkText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Safeguard Callout */}
        <div className="mt-8 p-5 border border-midblue/40 bg-dark/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderRadius: "2px" }}>
          <div>
            <div className="font-serif text-sm font-bold text-text mb-1">
              Why this separation is required by law
            </div>
            <p className="font-serif text-xs text-text-sec leading-relaxed max-w-2xl">
              Under the POSH Act, Internal Committee proceedings are confidential and independent. HR administrators manage the operational framework, but only appointed committee members may review potential case-relevant information.
            </p>
          </div>
          <Link
            href="/privacy"
            className="font-sans text-xs font-medium text-teal hover:text-aqua whitespace-nowrap transition-colors"
          >
            Learn about confidentiality safeguards →
          </Link>
        </div>
      </div>
    </section>
  );
}
