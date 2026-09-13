import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "How It Works — THEODRA",
  description:
    "A plain-language guide for HR leaders and Internal Committees on how THEODRA detects communication stress, protects employee privacy, and enforces multi-party governance.",
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
  return <div className="h-px bg-midblue/30 my-14" />;
}

export default function HowItWorksPage() {
  const communicationSignals = [
    {
      signal: "After-Hours Timing",
      plainMeaning: "A high volume of messages sent late at night, on weekends, or outside established company working hours.",
      whyItMatters: "Repeated non-work-hour communication between senior and junior staff is one of the strongest early indicators of boundary overstepping.",
    },
    {
      signal: "Hierarchy Differential",
      plainMeaning: "Communication that spans significant levels of seniority (such as a Vice President contacting an entry-level associate or intern).",
      whyItMatters: "Power imbalances make it harder for junior staff to say no or set healthy conversational boundaries.",
    },
    {
      signal: "Response Delay Asymmetry",
      plainMeaning: "A persistent pattern where one party feels compelled to reply almost immediately, while the other controls the cadence.",
      whyItMatters: "Reflects conversational urgency and distress rather than balanced, voluntary peer collaboration.",
    },
    {
      signal: "Rapid Frequency Escalation",
      plainMeaning: "A sudden, sustained climb in direct messaging volume compared to normal departmental baselines.",
      whyItMatters: "Captures sudden intensification of contact over weeks, rather than healthy everyday workflow.",
    },
    {
      signal: "Channel Exclusivity & Isolation",
      plainMeaning: "A deliberate shift from public team channels or group email threads into exclusively private 1-on-1 messages.",
      whyItMatters: "Isolation of a team member away from peer visibility often precedes inappropriate behavior.",
    },
  ];

  return (
    <div className="pt-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="pt-16 pb-12 max-w-3xl">
          <FadeIn>
            <Label>Platform Architecture</Label>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-text leading-tight mb-4">
              How THEODRA works.
            </h1>
            <p className="font-serif text-lg sm:text-xl text-text-sec leading-relaxed">
              Designed for HR executives and Internal Committees with zero technical background. Our three-stage system surfaces early workplace communication friction while providing absolute mathematical privacy for every employee.
            </p>
          </FadeIn>
        </div>

        <Rule />

        {/* ══════════════════════════════════════════════════════════════
            STAGE 1: DETECTION WITHOUT CONTENT
            ════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 py-4">
          <div className="lg:col-span-4">
            <FadeIn>
              <div className="font-sans text-xs font-medium text-gold uppercase tracking-wider mb-2">
                Stage 01
              </div>
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-text mb-4 leading-snug">
                Detecting unusual communication patterns — never what is said.
              </h2>
              <p className="font-serif text-sm text-text-sec leading-relaxed mb-4">
                We look for unusual patterns in how people communicate — never what they actually say. Message text, emails, attachments, and call logs are never stored, inspected, or parsed.
              </p>
              <div className="border border-midblue/50 bg-navy/40 p-4 space-y-2 text-xs font-sans text-text-sec" style={{ borderRadius: "2px" }}>
                <div className="text-text font-medium text-[11px] uppercase tracking-wider">
                  The Content Shield
                </div>
                <p className="leading-relaxed">
                  THEODRA evaluates only the rhythm, frequency, and organizational hierarchy of interactions. Even if an investigator wanted to read a message, the software does not possess the data to show it.
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-8">
            <FadeIn delay={0.06}>
              <div className="border border-midblue/40 bg-navy/20 overflow-hidden" style={{ borderRadius: "2px" }}>
                <div className="p-4 bg-navy/60 border-b border-midblue/40 font-serif text-base font-bold text-text">
                  The Five Communication Rhythms We Evaluate
                </div>
                <table className="spec-table">
                  <thead>
                    <tr>
                      <th>Signal</th>
                      <th>Plain-Language Meaning</th>
                      <th>Why It Matters for IC Oversight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {communicationSignals.map((sig) => (
                      <tr key={sig.signal}>
                        <td className="font-medium text-text whitespace-nowrap">{sig.signal}</td>
                        <td className="text-text-sec leading-relaxed">{sig.plainMeaning}</td>
                        <td className="text-teal leading-relaxed">{sig.whyItMatters}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeIn>
          </div>
        </div>

        <Rule />

        {/* ══════════════════════════════════════════════════════════════
            STAGE 2: GROUP PRIVACY (THE 5-PERSON RULE)
            ════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 py-4">
          <div className="lg:col-span-4">
            <FadeIn>
              <div className="font-sans text-xs font-medium text-aqua uppercase tracking-wider mb-2">
                Stage 02
              </div>
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-text mb-4 leading-snug">
                Group privacy protection: The five-person rule.
              </h2>
              <p className="font-serif text-sm text-text-sec leading-relaxed mb-4">
                We only ever show a pattern once it involves enough people that no single person could be identified from it.
              </p>
              <p className="font-serif text-sm text-text-sec leading-relaxed">
                Before any signal reaches a human reviewer, identifying details are removed and generalized. If a pattern involves fewer than five people, it is automatically blocked from view.
              </p>
            </FadeIn>
          </div>

          <div className="lg:col-span-8">
            <FadeIn delay={0.06}>
              <div className="space-y-4">
                <div className="border border-midblue/40 bg-navy/30 p-5 space-y-2" style={{ borderRadius: "2px" }}>
                  <div className="font-serif text-base font-bold text-text flex items-center justify-between">
                    <span>1. Removal of Personal Identifiers</span>
                    <span className="font-sans text-[10px] text-aqua uppercase tracking-wider">Automated</span>
                  </div>
                  <p className="font-serif text-sm text-text-sec leading-relaxed">
                    Names, email addresses, employee IDs, and exact desks are replaced with generalized role bands (such as &ldquo;Senior Engineering Lead&rdquo; or &ldquo;Junior Associate&rdquo;).
                  </p>
                </div>

                <div className="border border-midblue/40 bg-navy/30 p-5 space-y-2" style={{ borderRadius: "2px" }}>
                  <div className="font-serif text-base font-bold text-text flex items-center justify-between">
                    <span>2. Time Rounding to Calendar Weeks</span>
                    <span className="font-sans text-[10px] text-aqua uppercase tracking-wider">Automated</span>
                  </div>
                  <p className="font-serif text-sm text-text-sec leading-relaxed">
                    Precise timestamps (e.g. &ldquo;Tuesday at 11:42 PM&rdquo;) are rounded to weekly aggregates. This prevents anyone from matching an alert to a specific calendar meeting or personal conversation.
                  </p>
                </div>

                <div className="border border-midblue/40 bg-navy/30 p-5 space-y-2" style={{ borderRadius: "2px" }}>
                  <div className="font-serif text-base font-bold text-text flex items-center justify-between">
                    <span>3. Automatic Withholding (Below-5 Rule)</span>
                    <span className="font-sans text-[10px] text-gold uppercase tracking-wider">Privacy Gate</span>
                  </div>
                  <p className="font-serif text-sm text-text-sec leading-relaxed">
                    If an unusual pattern is detected but fewer than five individuals share that generalized role and department profile, the system suppresses the alert entirely. It never enters the Internal Committee view, eliminating the risk of witch-hunts or targeted finger-pointing.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        <Rule />

        {/* ══════════════════════════════════════════════════════════════
            STAGE 3: COMMITTEE DELIBERATION & DUAL-SIGN OFF
            ════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 py-4">
          <div className="lg:col-span-4">
            <FadeIn>
              <div className="font-sans text-xs font-medium text-teal uppercase tracking-wider mb-2">
                Stage 03
              </div>
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-text mb-4 leading-snug">
                Dual human authorization for every escalation.
              </h2>
              <p className="font-serif text-sm text-text-sec leading-relaxed mb-4">
                No single person can act alone — at least two committee members must agree before anything is escalated into a formal inquiry.
              </p>
              <p className="font-serif text-sm text-text-sec leading-relaxed">
                THEODRA never acts as an accuser, judge, or jury. It simply brings objective pattern awareness to the humans legally mandated to protect the workplace.
              </p>
            </FadeIn>
          </div>

          <div className="lg:col-span-8">
            <FadeIn delay={0.06}>
              <div className="border border-midblue/40 bg-navy/20 p-6 space-y-6" style={{ borderRadius: "2px" }}>
                <div>
                  <h3 className="font-serif text-lg font-bold text-text mb-2">
                    The Escalation Protocol
                  </h3>
                  <p className="font-serif text-sm text-text-sec leading-relaxed">
                    When an elevated pattern is reviewed in the committee workspace:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-xs">
                  <div className="p-4 border border-midblue/40 bg-dark/40 space-y-2" style={{ borderRadius: "2px" }}>
                    <div className="text-gold font-medium text-[11px] uppercase tracking-wider">
                      Step 1 · Group Review
                    </div>
                    <p className="text-text-sec leading-relaxed">
                      Committee examines the grouped communication trend, department context, and duration.
                    </p>
                  </div>

                  <div className="p-4 border border-midblue/40 bg-dark/40 space-y-2" style={{ borderRadius: "2px" }}>
                    <div className="text-teal font-medium text-[11px] uppercase tracking-wider">
                      Step 2 · 1st Member Vote
                    </div>
                    <p className="text-text-sec leading-relaxed">
                      An authorized IC member logs a vote indicating the pattern warrants further investigation.
                    </p>
                  </div>

                  <div className="p-4 border border-midblue/40 bg-dark/40 space-y-2" style={{ borderRadius: "2px" }}>
                    <div className="text-aqua font-medium text-[11px] uppercase tracking-wider">
                      Step 3 · 2nd Concurrence
                    </div>
                    <p className="text-text-sec leading-relaxed">
                      Only when a second independent IC member confirms the assessment is any confidential inquiry initiated.
                    </p>
                  </div>
                </div>

                <div className="border-t border-midblue/30 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="font-serif text-xs text-text-muted">
                    Full audit logs track every committee vote for statutory compliance.
                  </span>
                  <Link
                    href="/dashboard"
                    className="font-sans text-xs font-medium text-teal hover:text-aqua transition-colors whitespace-nowrap"
                  >
                    Test the live dual-signoff flow in the dashboard →
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        <Rule />

        {/* Bottom CTA */}
        <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-sans text-xs text-text-muted mb-1">Explore Access Roles</div>
            <Link href="/dashboard" className="font-serif text-lg font-bold text-text hover:text-text-sec transition-colors">
              Experience the IC Member and HR Admin workspaces →
            </Link>
          </div>
          <Link
            href="/dashboard"
            className="font-sans text-xs font-medium bg-gold text-dark px-5 py-2.5 hover:bg-gold/90 transition-colors shrink-0"
            style={{ borderRadius: "2px" }}
          >
            Launch Role Preview
          </Link>
        </div>

      </div>

      <CtaBand />
    </div>
  );
}
