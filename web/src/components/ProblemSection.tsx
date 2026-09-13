import Link from "next/link";

export default function ProblemSection() {
  const problems = [
    {
      number: "01",
      title: "Fear of speaking up",
      description:
        "Employees stay silent out of fear of losing professional standing, retaliation from superiors, or complete loss of control over their narrative.",
    },
    {
      number: "02",
      title: "No way to flag it quietly",
      description:
        "Existing compliance channels offer only an all-or-nothing formal complaint, leaving no safe middle ground to raise early concerns without launching a high-stakes investigation.",
    },
    {
      number: "03",
      title: "Reports that go nowhere",
      description:
        "When an isolated complaint is finally made, it is frequently dismissed as a one-off personality dispute because the committee lacks historical context on chronic communication patterns.",
    },
    {
      number: "04",
      title: "Committees trapped in reaction",
      description:
        "By law, Internal Committees can only act after a formal complaint is filed — leaving oversight teams blind to recurring misconduct until deep harm has already taken place.",
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-6 lg:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left column: Context & thesis */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-px bg-gold" />
            <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-text-muted">
              The Structural Reality
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text leading-tight mb-5">
            The gap between harm and action.
          </h2>

          <p className="font-serif text-base text-text-sec leading-relaxed mb-6">
            Under India&apos;s POSH Act, Internal Committees are legally structured to respond to complaints. But most employees who experience harassment never file a complaint. The result is a corporate record that looks clean while communication friction escalates silently.
          </p>

          <blockquote className="border-l border-gold pl-4 my-6">
            <p className="font-serif text-sm italic text-text-sec leading-relaxed">
              &ldquo;The IC&apos;s obligations are reactive by law — someone must file a complaint before the committee can act — but the actual harm frequently never reaches that stage.&rdquo;
            </p>
          </blockquote>

          <Link
            href="/problem"
            className="inline-flex items-center font-sans text-xs font-medium text-teal hover:text-aqua transition-colors"
          >
            Read the full empirical analysis on the POSH reporting gap →
          </Link>
        </div>

        {/* Right column: Named sub-problems (ZingHR pattern adapted) */}
        <div className="lg:col-span-7 space-y-4">
          {problems.map((p) => (
            <div
              key={p.title}
              className="border border-midblue/40 bg-navy/40 p-6 transition-colors hover:border-midblue/80"
              style={{ borderRadius: "2px" }}
            >
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-serif text-lg font-bold text-text">
                  {p.title}
                </h3>
                <span className="font-sans text-[11px] font-medium text-teal tabular">
                  {p.number}
                </span>
              </div>
              <p className="font-serif text-sm text-text-sec leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
