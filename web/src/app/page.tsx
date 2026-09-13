import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import type { Metadata } from "next";
import TrustBar from "@/components/TrustBar";
import ProblemSection from "@/components/ProblemSection";
import PlatformLifecycleTabs from "@/components/PlatformLifecycleTabs";
import ComparisonSection from "@/components/ComparisonSection";
import RolesSection from "@/components/RolesSection";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "THEODRA — Workplace Harassment Early-Warning System",
  description:
    "A privacy-preserving early-warning system for Internal Committees under the Indian POSH Act. Surfaces communication patterns without reading message content.",
};

const PREVIEW_PATTERNS = [
  {
    id: "GRP-8821",
    pairing: "Senior Lead → Associate",
    department: "Product Engineering",
    urgency: "Elevated",
    groupSize: "7 people",
    status: "Protected",
  },
  {
    id: "GRP-4402",
    pairing: "Manager → Junior Developer",
    department: "Technology Operations",
    urgency: "Elevated",
    groupSize: "5 people",
    status: "Protected",
  },
  {
    id: "GRP-6614",
    pairing: "Senior → Intern",
    department: "People Operations",
    urgency: "Moderate",
    groupSize: "8 people",
    status: "Protected",
  },
  {
    id: "GRP-3301",
    pairing: "Team Lead → Associate",
    department: "Client Success",
    urgency: "Moderate",
    groupSize: "6 people",
    status: "Protected",
  },
];

export default function HomePage() {
  return (
    <div className="pt-14">
      {/* ══════════════════════════════════════════════════════════════
          HERO — Left-aligned editorial layout with IC preview panel
          ════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Hero Narrative (7 cols) */}
          <div className="lg:col-span-7">
            <FadeIn>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-px bg-gold" />
                <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-text-muted">
                  Early Warning System · POSH Act 2013
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-[1.12] mb-6">
                Surface the patterns.<br />
                <span className="font-normal italic text-text-sec">
                  Protect the people.
                </span>
              </h1>

              <p className="font-serif text-lg sm:text-xl text-text-sec leading-relaxed mb-8 max-w-xl">
                THEODRA notices unusual patterns in how people communicate across an organization — such as late-night messaging spikes and severe hierarchy gaps — without ever reading a single word of what people say.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/system"
                  className="font-sans text-xs font-medium bg-gold text-dark px-5 py-2.5 hover:bg-gold/90 transition-colors"
                  style={{ borderRadius: "2px" }}
                >
                  See How It Works
                </Link>
                <Link
                  href="/dashboard"
                  className="font-sans text-xs font-medium border border-midblue text-text-sec px-5 py-2.5 hover:border-teal/50 hover:text-text transition-colors"
                  style={{ borderRadius: "2px" }}
                >
                  Explore Who Sees What
                </Link>
              </div>

              {/* Three plain-English founding metrics */}
              <div className="mt-12 pt-8 border-t border-midblue/30 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <div className="font-serif text-2xl font-bold text-gold tabular mb-1">
                    0 words read
                  </div>
                  <p className="font-serif text-xs text-text-muted leading-relaxed">
                    Message content is never opened, stored, or analyzed. Only timing, frequency, and hierarchy.
                  </p>
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-aqua tabular mb-1">
                    5+ person rule
                  </div>
                  <p className="font-serif text-xs text-text-muted leading-relaxed">
                    No pattern is ever displayed until at least five people share it, ensuring nobody can be singled out.
                  </p>
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-teal tabular mb-1">
                    2 IC members
                  </div>
                  <p className="font-serif text-xs text-text-muted leading-relaxed">
                    No individual can act alone. At least two committee members must agree before an inquiry begins.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Hero Panel — Preview of IC Anonymized Workspace (5 cols) */}
          <div className="lg:col-span-5">
            <FadeIn delay={0.1}>
              <div
                className="border border-midblue/50 bg-navy shadow-xl"
                style={{ borderRadius: "2px" }}
              >
                {/* Panel Header */}
                <div className="bg-dark/70 border-b border-midblue/40 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[10px] font-medium tracking-wider uppercase text-text-muted">
                      Internal Committee Workspace
                    </span>
                  </div>
                  <span className="font-sans text-[10px] text-aqua bg-aqua/10 px-2 py-0.5" style={{ borderRadius: "2px" }}>
                    Group Privacy Active (5+ rule)
                  </span>
                </div>

                {/* Descriptive subhead */}
                <div className="px-4 py-2.5 bg-navy/60 border-b border-midblue/25 text-[11px] font-serif text-text-sec">
                  Aggregated communication patterns · Individual identities withheld
                </div>

                {/* Table preview */}
                <div className="divide-y divide-midblue/20">
                  {PREVIEW_PATTERNS.map((p) => (
                    <div key={p.id} className="p-3.5 hover:bg-dark/20 transition-colors space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-[11px] font-medium text-text tabular">
                          {p.id} · {p.pairing}
                        </span>
                        <span className={`font-sans text-[10px] font-medium ${p.urgency === "Elevated" ? "text-gold" : "text-teal"}`}>
                          {p.urgency}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-text-muted font-sans">
                        <span>{p.department}</span>
                        <span className="text-aqua">{p.groupSize} (Protected)</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Panel Footer */}
                <div className="bg-dark/50 border-t border-midblue/30 p-3 flex items-center justify-between">
                  <span className="font-sans text-[10px] text-text-muted">
                    Small groups automatically withheld to protect privacy
                  </span>
                  <Link
                    href="/dashboard"
                    className="font-sans text-[11px] font-medium text-teal hover:text-aqua transition-colors"
                  >
                    Open Live Preview →
                  </Link>
                </div>
              </div>

              <p className="font-sans text-[10px] text-text-muted mt-3 leading-relaxed">
                Illustrative preview. Live interface is accessed by authorized Internal Committee members only.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          1. TRUST BAR (Real substance, not fake logos/numbers)
          ════════════════════════════════════════════════════════════ */}
      <TrustBar />

      {/* ══════════════════════════════════════════════════════════════
          2. THE PROBLEM (ZingHR pattern adapted: named sub-problems)
          ════════════════════════════════════════════════════════════ */}
      <ProblemSection />

      {/* ══════════════════════════════════════════════════════════════
          3. TABBED LIFECYCLE (ZingHR horizontal tab interaction)
          ════════════════════════════════════════════════════════════ */}
      <PlatformLifecycleTabs />

      {/* ══════════════════════════════════════════════════════════════
          4. "WHY US" COMPARISON (ZingHR two-column contrast rebuilt)
          ════════════════════════════════════════════════════════════ */}
      <ComparisonSection />

      {/* ══════════════════════════════════════════════════════════════
          5. ROLE-BASED ACCESS ("Who sees what" clear visual explainer)
          ════════════════════════════════════════════════════════════ */}
      <RolesSection />

      {/* ══════════════════════════════════════════════════════════════
          NAMING STORY & DIGNIFIED BRAND ROOTS
          ════════════════════════════════════════════════════════════ */}
      <section className="py-20 border-t border-midblue/30 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-px bg-gold" />
            <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-text-muted">
              Historical Origin
            </span>
          </div>

          <h2 className="font-serif text-3xl font-bold text-text leading-tight mb-5">
            The origin of THEODRA
          </h2>

          <div className="space-y-4 font-serif text-base text-text-sec leading-relaxed">
            <p>
              <strong className="text-text font-semibold">THEODRA</strong> stands for <em className="text-text">Threat & Harassment Early-warning system using Observational Data, Risk Analytics</em>.
            </p>
            <p>
              The system is named after Empress Theodora of Byzantium (c. 500–548 AD), who rose from an unprotected background to become one of the Roman Empire&apos;s most consequential reformers. Recognizing how institutional systems left vulnerable women without legal standing, she used institutional power to establish history&apos;s first legal safeguards against sexual exploitation, outlaw forced prostitution, and guarantee legal rights for women.
            </p>
            <p>
              THEODRA translates that legacy into modern institutional governance: providing Internal Committees with quiet, objective evidence so that workplace protection does not rely entirely on the courage of an isolated victim.
            </p>
          </div>

          <div className="pt-6">
            <Link
              href="/about"
              className="font-sans text-xs font-medium text-teal hover:text-aqua transition-colors inline-flex items-center"
            >
              Read more about the research lineage and author →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          7. FINAL CTA BAND (Calm, institutional, not high-pressure SaaS)
          ════════════════════════════════════════════════════════════ */}
      <CtaBand />

      {/* ══════════════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-midblue/40 bg-dark py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10">
            <div className="max-w-sm">
              <div className="font-serif text-lg font-bold text-text mb-2">
                THE<span className="text-gold">O</span>DRA
              </div>
              <p className="font-serif text-xs text-text-sec leading-relaxed mb-4">
                A privacy-preserving early-warning system for workplace harassment under the Indian POSH Act 2013.
              </p>
              <p className="font-sans text-[11px] text-text-muted">
                Engineered by Rushda Jagtap · B.Tech Computer Science & Engineering (Data Science).
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-sans">
              <div>
                <div className="font-medium text-text uppercase tracking-wider mb-3">
                  Platform
                </div>
                <ul className="space-y-2 text-text-muted">
                  <li><Link href="/problem" className="hover:text-text-sec transition-colors">The Problem</Link></li>
                  <li><Link href="/system" className="hover:text-text-sec transition-colors">How It Works</Link></li>
                  <li><Link href="/privacy" className="hover:text-text-sec transition-colors">Privacy & Trust</Link></li>
                </ul>
              </div>

              <div>
                <div className="font-medium text-text uppercase tracking-wider mb-3">
                  Access Portals
                </div>
                <ul className="space-y-2 text-text-muted">
                  <li><Link href="/report" className="hover:text-text-sec transition-colors">For Employees</Link></li>
                  <li><Link href="/dashboard" className="hover:text-text-sec transition-colors">For HR & IC</Link></li>
                  <li><Link href="/about" className="hover:text-text-sec transition-colors">About THEODRA</Link></li>
                </ul>
              </div>

              <div>
                <div className="font-medium text-text uppercase tracking-wider mb-3">
                  Legal Alignment
                </div>
                <ul className="space-y-2 text-text-muted">
                  <li>POSH Act 2013</li>
                  <li>Section 11 Due Process</li>
                  <li>Dual-Member Sign-off</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-midblue/25 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[10px] text-text-muted">
            <div>
              © THEODRA. Privacy-preserving workplace safety research.
            </div>
            <div>
              Zero message content read or stored · Group privacy protection · Multi-party governance
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
