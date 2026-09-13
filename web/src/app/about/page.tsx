import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About THEODRA — Governance & Academic Lineage",
  description: "The naming story, academic context, and lineage of the THEODRA project.",
};

function Rule() {
  return <div className="h-px bg-midblue/30 my-14" />;
}

export default function AboutPage() {
  return (
    <div className="pt-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Page header */}
        <div className="pt-16 pb-12 max-w-3xl">
          <FadeIn>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-gold" />
              <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-text-muted">
                About the Platform
              </span>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-text leading-tight mb-4">
              THEODRA
            </h1>
            <p className="font-serif text-xl text-text-sec leading-relaxed">
              Threat & Harassment Early-warning system using Observational Data, Risk Analytics.
            </p>
          </FadeIn>
        </div>

        <Rule />

        {/* Empress Theodora */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 py-4">
          <FadeIn className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-gold" />
              <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-text-muted">
                The Name
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-text mb-2 leading-snug">
              Empress Theodora of Byzantium
            </h2>
            <p className="font-serif text-sm italic text-text-muted">c. 500–548 AD</p>
          </FadeIn>

          <FadeIn delay={0.05} className="lg:col-span-3">
            <p className="font-serif text-base text-text-sec leading-relaxed mb-4">
              Theodora, Byzantine Empress and co-ruler alongside Justinian I, used her position to build the first systematic legal protections for women who had been exploited by structures more powerful than they were. She established shelters, enacted laws against forced marriage and trafficking, and used state power — not charity — as the mechanism of protection.
            </p>
            <p className="font-serif text-base text-text-sec leading-relaxed mb-4">
              The project is named for her because the analogy is structural, not decorative. THEODRA attempts to use institutional mechanism — the Internal Committee&apos;s legal authority under the POSH Act — to make visible what is currently invisible to institutions. Not as a replacement for human decision-making, but as an upstream signal that human decision-making currently cannot access.
            </p>
            <p className="font-serif text-base text-text-sec leading-relaxed">
              The name carries that story as a reminder that the goal is not technical novelty — it is institutional protection. The software is a means; the true outcome is whether the Internal Committee can intervene early to prevent harm.
            </p>

            <blockquote className="border-l-2 border-gold pl-5 mt-6 py-1">
              <p className="font-serif text-base italic text-text-sec leading-relaxed">
                &ldquo;Named after Empress Theodora of Byzantium, who used institutional power to protect the vulnerable.&rdquo;
              </p>
            </blockquote>
          </FadeIn>
        </div>

        <Rule />

        {/* Project lineage */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 py-4">
          <FadeIn className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-gold" />
              <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-text-muted">
                Design Lineage
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-text mb-4 leading-snug">
              NEITH · SHURI · THEODRA
            </h2>
          </FadeIn>

          <FadeIn delay={0.05} className="lg:col-span-3">
            <p className="font-serif text-base text-text-sec leading-relaxed mb-6">
              THEODRA is the third in a series of projects sharing a design lineage — strong typographic intention, restrained and deliberate color use, and historical naming treated with the gravity of its subject. Each project has a distinct palette and domain. What they share is a refusal to aestheticize technology for its own sake.
            </p>
            <div className="border border-midblue/40 overflow-hidden" style={{ borderRadius: "2px" }}>
              <table className="spec-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Domain</th>
                    <th>Named after</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium text-text">NEITH</td>
                    <td className="text-text-muted">Earlier project, separate domain</td>
                    <td className="text-text-muted">Neith — Egyptian goddess of weaving, war, and wisdom</td>
                  </tr>
                  <tr>
                    <td className="font-medium text-text">SHURI</td>
                    <td className="text-text-muted">Earlier project, separate domain</td>
                    <td className="text-text-muted">Shuri — innovative leadership operating within institutional structures</td>
                  </tr>
                  <tr>
                    <td className="font-medium text-text">THEODRA</td>
                    <td className="text-text-sec">Workplace harassment early warning, POSH Act 2013</td>
                    <td className="text-text-sec">Empress Theodora of Byzantium (c. 500–548 AD)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>

        <Rule />

        {/* Rushda */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 py-4">
          <FadeIn className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-gold" />
              <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-text-muted">
                Researcher & Author
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-text mb-2 leading-snug">
              Rushda Jagtap
            </h2>
            <p className="font-serif text-sm text-text-muted">
              B.Tech Computer Science & Engineering (Data Science)
            </p>
          </FadeIn>

          <FadeIn delay={0.05} className="lg:col-span-3">
            <p className="font-serif text-base text-text-sec leading-relaxed mb-4">
              THEODRA is a B.Tech Data Science capstone project. It is submitted as a serious academic and institutional deliverable, not as a hackathon demo. The design is grounded in corporate governance, statutory POSH obligations, rigorous privacy evaluations, and verified reporting gaps.
            </p>
            <p className="font-serif text-base text-text-sec leading-relaxed">
              The gap in institutional practice that THEODRA addresses — communication-rhythm-based early detection, upstream of a formal POSH complaint, with mathematical group privacy that withstands rigorous scrutiny — is real. Each component exists in isolation elsewhere; their synthesis for the Indian POSH compliance framework represents a new approach to employee protection.
            </p>
          </FadeIn>
        </div>

        <Rule />

        {/* Navigation */}
        <FadeIn>
          <div className="py-4 flex flex-wrap gap-4">
            <Link
              href="/system"
              className="font-sans text-xs font-medium border border-midblue text-text-sec px-5 py-2.5 hover:border-teal/50 hover:text-text transition-colors"
              style={{ borderRadius: "2px" }}
            >
              How It Works
            </Link>
            <Link
              href="/privacy"
              className="font-sans text-xs font-medium border border-midblue text-text-sec px-5 py-2.5 hover:border-teal/50 hover:text-text transition-colors"
              style={{ borderRadius: "2px" }}
            >
              Privacy & Trust
            </Link>
            <Link
              href="/dashboard"
              className="font-sans text-xs font-medium bg-gold text-dark px-5 py-2.5 hover:bg-gold/90 transition-colors"
              style={{ borderRadius: "2px" }}
            >
              For HR & IC Preview
            </Link>
          </div>
        </FadeIn>

        <footer className="border-t border-midblue/30 py-8 mt-6">
          <p className="font-sans text-[10px] text-text-muted">
            THEODRA · Built by Rushda Jagtap · B.Tech Computer Science & Engineering (Data Science).
            Named after Empress Theodora of Byzantium (c. 500–548 AD).
          </p>
        </footer>

      </div>

      <CtaBand />
    </div>
  );
}
