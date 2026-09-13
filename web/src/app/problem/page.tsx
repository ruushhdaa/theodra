import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "The Problem — THEODRA",
  description:
    "The POSH Act reporting gap, why the Internal Committee's obligations are reactive by law, and why that matters for workplace safety in India.",
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-6 h-px bg-gold" />
      <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-text-muted">
        {children}
      </span>
    </div>
  );
}

function Rule() {
  return <div className="h-px bg-midblue/30 my-12" />;
}

export default function ProblemPage() {
  return (
    <div className="pt-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Page Header */}
        <div className="pt-16 pb-12 max-w-3xl">
          <FadeIn>
            <Label>The Structural Gap</Label>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-text leading-tight mb-4">
              The gap between harm and action.
            </h1>
            <p className="font-serif text-lg sm:text-xl text-text-sec leading-relaxed">
              The POSH Act 2013 created clear statutory obligations for Internal Committees. It did not create a mechanism for committees to notice patterns before someone submits a formal complaint. That is an intentional statutory safeguard — but in practice, it creates a persistent blind spot.
            </p>
          </FadeIn>
        </div>

        <Rule />

        {/* Section 1: The Filing Gap & CEDA Research */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 py-4">
          <FadeIn className="lg:col-span-2">
            <Label>Section 01</Label>
            <h2 className="font-serif text-2xl font-bold text-text mb-4 leading-snug">
              The reporting gap is widespread and documented.
            </h2>
            <p className="font-sans text-xs text-text-muted leading-relaxed">
              Research by the Centre for Economic Data and Analysis (CEDA) at Ashoka University.
            </p>
          </FadeIn>
          <FadeIn delay={0.05} className="lg:col-span-3">
            <p className="font-serif text-base text-text-sec leading-relaxed mb-4">
              A comprehensive review of corporate POSH filings in India revealed that a majority of companies report zero sexual harassment complaints year after year. This pattern is observed consistently across industries, corporate sizes, and geographic regions.
            </p>
            <p className="font-serif text-base text-text-sec leading-relaxed mb-4">
              Zero reported complaints does not signify the absence of harassment. It signifies the absence of <strong className="text-text font-semibold">formal reporting</strong>. When workplace friction goes unreported, organizations operate under a false sense of compliance while vulnerable team members quietly suffer or resign.
            </p>
            <p className="font-serif text-base text-text-sec leading-relaxed">
              Legal practitioners and HR compliance specialists cite three core drivers for this silence: fear of career retaliation, severe hierarchy differentials between junior and senior staff, and fear of being labeled a troublemaker. Silence does not resolve misconduct; it emboldens repeat behavior.
            </p>
          </FadeIn>
        </div>

        <Rule />

        {/* Section 2: Why the IC is Structurally Reactive */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 py-4">
          <FadeIn className="lg:col-span-2">
            <Label>Section 02</Label>
            <h2 className="font-serif text-2xl font-bold text-text mb-4 leading-snug">
              The committee is reactive by law.
            </h2>
          </FadeIn>
          <FadeIn delay={0.05} className="lg:col-span-3">
            <p className="font-serif text-base text-text-sec leading-relaxed mb-4">
              Section 11 of the POSH Act establishes a structured, quasi-judicial inquiry process. This requirement exists for good reason: accusations without formal complaint procedures could lead to arbitrary action and unfair outcomes.
            </p>
            <p className="font-serif text-base text-text-sec leading-relaxed mb-4">
              However, this creates an operational paradox: <strong className="text-text font-medium">the Internal Committee has substantial authority to resolve complaints, but zero mandate or tooling to notice patterns before a complaint is filed.</strong>
            </p>
            <p className="font-serif text-base text-text-sec leading-relaxed">
              THEODRA bridges this gap upstream. It provides the committee with early, aggregated pattern signals without replacing the statutory complaint process, without reading employee messages, and without making automated accusations.
            </p>

            <blockquote className="border-l-2 border-gold pl-5 mt-6">
              <p className="font-serif text-base italic text-text-sec leading-relaxed">
                &ldquo;The IC&apos;s obligations are reactive by law — someone must file a complaint before the IC can act — but the actual harm frequently never reaches that stage.&rdquo;
              </p>
              <cite className="font-sans text-[10px] text-text-muted mt-2 block not-italic">
                — THEODRA Research Specification, Problem Grounding
              </cite>
            </blockquote>
          </FadeIn>
        </div>

        <Rule />

        {/* Section 3: Commercial HR Software vs THEODRA */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 py-4">
          <FadeIn className="lg:col-span-2">
            <Label>Section 03</Label>
            <h2 className="font-serif text-2xl font-bold text-text mb-4 leading-snug">
              What existing HR systems do — and what they miss.
            </h2>
          </FadeIn>
          <FadeIn delay={0.05} className="lg:col-span-3">
            <p className="font-serif text-base text-text-sec leading-relaxed mb-6">
              Leading enterprise HR suites (such as Darwinbox, ZingHR, and Keka) provide valuable POSH compliance modules. They track committee member composition, store organizational policies, record complaints when submitted, and generate annual statutory filing summaries.
            </p>
            <p className="font-serif text-base text-text-sec leading-relaxed mb-8">
              This is essential paperwork automation. However, it offers zero early-warning detection. If an employee stays quiet, these systems remain completely blank. THEODRA was created to provide that missing early-warning layer.
            </p>

            {/* Comparison Table */}
            <div className="border border-midblue/40 overflow-hidden" style={{ borderRadius: "2px" }}>
              <table className="spec-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>What it provides</th>
                    <th>What it lacks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium text-text whitespace-nowrap">Enterprise HR Suites (Darwinbox, ZingHR, etc.)</td>
                    <td>Policy repository, complaint intake workflow, annual statutory reports</td>
                    <td className="text-gold/90">Zero visibility before a formal complaint is submitted</td>
                  </tr>
                  <tr>
                    <td className="font-medium text-text whitespace-nowrap">Traditional IT Security & DLP Tools</td>
                    <td>Monitors data leaks, downloads, unauthorized file transfers</td>
                    <td className="text-gold/90">Wrong signal set: misses human hierarchy, communication isolation, and after-hours pressure</td>
                  </tr>
                  <tr>
                    <td className="font-medium text-text whitespace-nowrap">Ad-Hoc Surveys & Pulse Polls</td>
                    <td>Aggregated annual feedback on general company sentiment</td>
                    <td className="text-gold/90">Too infrequent, subjective, and unable to protect individuals from identification</td>
                  </tr>
                  <tr>
                    <td className="font-medium text-text whitespace-nowrap">THEODRA Early-Warning</td>
                    <td>Rhythm-based pattern detection + 5-person privacy threshold + IC dual-signoff</td>
                    <td className="text-aqua">Built specifically to provide objective early signals while strictly preserving privacy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>

        <Rule />

        {/* Navigation to How It Works */}
        <FadeIn>
          <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-sans text-xs text-text-muted mb-1">Next Step</div>
              <Link href="/system" className="font-serif text-lg font-bold text-text hover:text-text-sec transition-colors">
                Learn how the three-stage system works →
              </Link>
            </div>
            <Link
              href="/system"
              className="font-sans text-xs font-medium bg-gold text-dark px-5 py-2.5 hover:bg-gold/90 transition-colors shrink-0"
              style={{ borderRadius: "2px" }}
            >
              Explore How It Works
            </Link>
          </div>
        </FadeIn>

      </div>

      <CtaBand />
    </div>
  );
}
