import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0E28] text-[#F4F1EB] py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-sans text-xs text-[#E0A96D] hover:underline mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F0B83A]">
              Legal Governance
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4F1EB] leading-tight">
            Terms &amp; Conditions
          </h1>
          <p className="font-sans text-xs text-[#7A756B] mt-2">
            Effective Date: 1 January 2026 · Standard Enterprise B2B Agreement
          </p>
        </div>

        <div className="bg-[#13193A] border border-[#262E5F] p-8 rounded-[8px] space-y-8 font-serif text-sm text-[#BDB9AD] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#F4F1EB]">
              1. Platform Scope &amp; Purpose
            </h2>
            <p>
              THEODRA (&ldquo;the Platform&rdquo;) is an enterprise software-as-a-service solution developed to assist corporate organizations and their statutory Internal Committees (&ldquo;IC&rdquo;) in detecting workplace harassment communication patterns under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (&ldquo;POSH Act&rdquo;).
            </p>
            <p>
              The Platform provides early pattern awareness and an unlinked anonymous incident reporting intake portal. The Platform is not a law enforcement system, does not make legal determinations of culpability, and does not replace the quasi-judicial inquiry procedures established under Section 11 of the POSH Act.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#F4F1EB]">
              2. Independence of the Internal Committee
            </h2>
            <p>
              The Customer acknowledges that under Indian law, the Internal Committee operates with quasi-judicial independence. Corporate administrators and human resources executives cannot use THEODRA to override, alter, censor, or access confidential inquiry records managed by the Internal Committee.
            </p>
            <p>
              THEODRA enforces strict role-based data partitioning: HR Administrators have visibility into operational roster compliance and filing trackers, while case-level telemetry and reports are cryptographically restricted to appointed committee members.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#F4F1EB]">
              3. Data Processing &amp; Content Shield
            </h2>
            <p>
              THEODRA agrees that it shall never ingest, parse, inspect, or store the textual content of employee emails, direct messages, attachments, or voice communications. Processing is strictly limited to metadata properties (interaction timing, frequency volume, and organizational hierarchy differentials).
            </p>
            <p>
              All flagged communication patterns displayed to the Internal Committee are subject to a mandatory 5-person minimum group threshold. Patterns that do not involve at least five individuals sharing generalized attributes are automatically suppressed to prevent targeted identification.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#F4F1EB]">
              4. Multi-Party Authorization Rule
            </h2>
            <p>
              The Customer agrees that no individual user — whether an IC Presiding Officer, committee member, or executive — may unilaterally authorize an investigation or unmask underlying accounts through the platform. Every escalation requires the independent confirmation of at least two registered committee members in accordance with platform governance protocols.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#F4F1EB]">
              5. Limitation of Liability
            </h2>
            <p>
              While THEODRA provides objective pattern detection, it does not warrant that all instances of interpersonal misconduct will be detected, nor that communication patterns identified will inevitably result in statutory findings of harassment. Ultimate investigative and adjudicative responsibility remains solely with the Customer&apos;s appointed Internal Committee.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#F4F1EB]">
              6. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the substantive laws of the Republic of India. Any dispute, controversy, or claim arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
