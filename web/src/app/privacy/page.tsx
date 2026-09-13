import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Privacy & Trust — THEODRA",
  description:
    "Institutional privacy safeguards, statutory POSH alignment, and explicit ethical non-goals stated plainly for HR and compliance leaders.",
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

export default function PrivacyPage() {
  const collectedSignals = [
    { label: "Interaction timing", desc: "Whether a message is sent during business hours or late at night / weekends." },
    { label: "Seniority differential", desc: "Broad role levels (e.g. Senior Leader to Junior Associate) to observe hierarchy." },
    { label: "Communication cadence", desc: "Rolling volume trends to identify sudden escalation over weeks." },
    { label: "Response delays", desc: "Differences in how quickly parties reply to each other over time." },
    { label: "Channel context", desc: "Whether an exchange occurs in a public team channel or private 1-on-1 direct message." },
  ];

  const neverCollected = [
    { label: "Message text & email body", desc: "We never read, store, index, or parse the words written in any communication." },
    { label: "Attachments & files", desc: "Documents, images, slides, and shared files are completely untouched and unread." },
    { label: "Voice & video calls", desc: "Zero access to call audio, transcripts, recordings, or video meetings." },
    { label: "Personal browsing & keystrokes", desc: "Zero employee keystroke monitoring, screen scraping, or browser tracking." },
    { label: "Private devices & cameras", desc: "Zero access to personal phones, home webcams, or location tracking." },
  ];

  const nonGoals = [
    {
      title: "Not an employee productivity tracker",
      desc: "THEODRA does not evaluate how hard people work, how long they spend at their desks, or their performance. It is tuned exclusively to protect human safety and professional boundaries.",
    },
    {
      title: "Not an automated judge or jury",
      desc: "The system never issues disciplinary actions, accuses employees, or determines guilt. It simply flags communication friction for human committee review.",
    },
    {
      title: "Not a replacement for statutory POSH inquiries",
      desc: "Section 11 of the POSH Act guarantees full due process, written notices, and fair hearings. THEODRA provides early visibility; the human committee conducts the formal statutory inquiry.",
    },
    {
      title: "Not visible to managers or department heads",
      desc: "Direct supervisors and division leads have zero access to THEODRA. Information is strictly compartmentalized to appointed Internal Committee members.",
    },
  ];

  return (
    <div className="pt-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Page Header */}
        <div className="pt-16 pb-12 max-w-3xl">
          <FadeIn>
            <Label>Privacy & Institutional Trust</Label>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-text leading-tight mb-4">
              Privacy by design. Stated plainly.
            </h1>
            <p className="font-serif text-lg sm:text-xl text-text-sec leading-relaxed">
              When an organization monitors communication for harassment, employee privacy must be the primary constraint — not an afterthought. Here is our exact boundary between institutional safety and personal privacy.
            </p>
          </FadeIn>
        </div>

        <Rule />

        {/* Section 1: Collected vs Never Collected */}
        <div className="py-4">
          <FadeIn>
            <Label>Data Boundaries</Label>
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-text mb-3 leading-snug">
              What we look at — and what we never touch.
            </h2>
            <p className="font-serif text-base text-text-sec max-w-2xl mb-8 leading-relaxed">
              Every signal evaluated by THEODRA is an objective property of the communication exchange itself — timing, frequency, and organizational level. The content of what people say is never accessible.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* What we evaluate */}
            <FadeIn delay={0.04}>
              <div className="border border-midblue/50 bg-navy/40 p-6 h-full space-y-4" style={{ borderRadius: "2px" }}>
                <div className="flex items-center justify-between border-b border-midblue/30 pb-3">
                  <span className="font-serif text-base font-bold text-text">
                    What THEODRA Evaluates
                  </span>
                  <span className="font-sans text-[10px] font-medium text-teal uppercase tracking-wider">
                    Interaction Rhythms Only
                  </span>
                </div>
                <div className="space-y-3">
                  {collectedSignals.map((item) => (
                    <div key={item.label} className="border-l-2 border-teal/60 pl-3">
                      <div className="font-sans text-xs font-semibold text-text">{item.label}</div>
                      <div className="font-serif text-xs text-text-sec leading-relaxed">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* What we never touch */}
            <FadeIn delay={0.08}>
              <div className="border border-midblue/50 bg-navy/40 p-6 h-full space-y-4" style={{ borderRadius: "2px" }}>
                <div className="flex items-center justify-between border-b border-midblue/30 pb-3">
                  <span className="font-serif text-base font-bold text-text">
                    What We NEVER Touch
                  </span>
                  <span className="font-sans text-[10px] font-medium text-gold uppercase tracking-wider">
                    Strictly Shielded
                  </span>
                </div>
                <div className="space-y-3">
                  {neverCollected.map((item) => (
                    <div key={item.label} className="border-l-2 border-gold/60 pl-3">
                      <div className="font-sans text-xs font-semibold text-text">{item.label}</div>
                      <div className="font-serif text-xs text-text-sec leading-relaxed">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        <Rule />

        {/* Section 2: Core Privacy Safeguards */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 py-4">
          <FadeIn className="lg:col-span-2">
            <Label>Institutional Guarantees</Label>
            <h2 className="font-serif text-2xl font-bold text-text mb-4 leading-snug">
              Four structural privacy safeguards.
            </h2>
            <p className="font-serif text-sm text-text-sec leading-relaxed">
              These principles are embedded in the software&apos;s code and architecture, not just in policy promises.
            </p>
          </FadeIn>

          <FadeIn delay={0.05} className="lg:col-span-3 space-y-5">
            <div className="border border-midblue/40 bg-navy/20 p-5 space-y-2" style={{ borderRadius: "2px" }}>
              <div className="font-serif text-base font-bold text-text flex items-center justify-between">
                <span>1. The Minimum 5-Person Protection Rule</span>
                <span className="font-sans text-[10px] text-aqua uppercase tracking-wider">Group Rule</span>
              </div>
              <p className="font-serif text-sm text-text-sec leading-relaxed">
                We only ever show a pattern once it involves enough people that no single person could be identified from it. If fewer than five individuals share the generalized characteristics of an alert, the system automatically withholds it from committee view.
              </p>
            </div>

            <div className="border border-midblue/40 bg-navy/20 p-5 space-y-2" style={{ borderRadius: "2px" }}>
              <div className="font-serif text-base font-bold text-text flex items-center justify-between">
                <span>2. Mandatory Dual-Committee Authorization</span>
                <span className="font-sans text-[10px] text-gold uppercase tracking-wider">Governance</span>
              </div>
              <p className="font-serif text-sm text-text-sec leading-relaxed">
                No single person can act alone. At least two authorized Internal Committee members must independently review pattern signals and agree before any formal inquiry can be initiated.
              </p>
            </div>

            <div className="border border-midblue/40 bg-navy/20 p-5 space-y-2" style={{ borderRadius: "2px" }}>
              <div className="font-serif text-base font-bold text-text flex items-center justify-between">
                <span>3. Strict Separation of Administrative & Case Roles</span>
                <span className="font-sans text-[10px] text-teal uppercase tracking-wider">Access Control</span>
              </div>
              <p className="font-serif text-sm text-text-sec leading-relaxed">
                HR administrators manage committee appointments and compliance filings, but are strictly prohibited from viewing case patterns or employee reports. Only the appointed Internal Committee accesses case-relevant information.
              </p>
            </div>

            <div className="border border-midblue/40 bg-navy/20 p-5 space-y-2" style={{ borderRadius: "2px" }}>
              <div className="font-serif text-base font-bold text-text flex items-center justify-between">
                <span>4. Anonymous Mobile Reporting Without Credentials</span>
                <span className="font-sans text-[10px] text-aqua uppercase tracking-wider">Confidentiality</span>
              </div>
              <p className="font-serif text-sm text-text-sec leading-relaxed">
                Employees can submit concerns from their personal mobile devices without logging into corporate single-sign-on or revealing device IP addresses.
              </p>
            </div>
          </FadeIn>
        </div>

        <Rule />

        {/* Section 3: Explicit Non-Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 py-4">
          <FadeIn className="lg:col-span-2">
            <Label>Ethical Non-Goals</Label>
            <h2 className="font-serif text-2xl font-bold text-text mb-4 leading-snug">
              What THEODRA will never do.
            </h2>
            <p className="font-serif text-sm text-text-sec leading-relaxed">
              We define what our software deliberately avoids just as clearly as what it accomplishes.
            </p>
          </FadeIn>

          <FadeIn delay={0.05} className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {nonGoals.map((ng) => (
              <div
                key={ng.title}
                className="border border-midblue/40 bg-navy/30 p-5 space-y-2"
                style={{ borderRadius: "2px" }}
              >
                <div className="font-serif text-sm font-bold text-text">
                  {ng.title}
                </div>
                <p className="font-serif text-xs text-text-sec leading-relaxed">
                  {ng.desc}
                </p>
              </div>
            ))}
          </FadeIn>
        </div>

        <Rule />

        {/* Navigation to Dashboard preview */}
        <FadeIn>
          <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-sans text-xs text-text-muted mb-1">Experience the Access Roles</div>
              <Link href="/dashboard" className="font-serif text-lg font-bold text-text hover:text-text-sec transition-colors">
                Explore the Internal Committee and HR Administrator views →
              </Link>
            </div>
            <Link
              href="/dashboard"
              className="font-sans text-xs font-medium bg-gold text-dark px-5 py-2.5 hover:bg-gold/90 transition-colors shrink-0"
              style={{ borderRadius: "2px" }}
            >
              Open Dashboard Preview
            </Link>
          </div>
        </FadeIn>

      </div>

      <CtaBand />
    </div>
  );
}
