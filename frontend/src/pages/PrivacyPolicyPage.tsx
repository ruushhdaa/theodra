import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const PrivacyPolicyPage: React.FC = () => {
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
              Statutory Privacy Architecture
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4F1EB] leading-tight">
            Privacy Policy &amp; Data Governance
          </h1>
          <p className="font-sans text-xs text-[#7A756B] mt-2">
            Compliant with DPDP Act 2023 &amp; POSH Act 2013 Confidentiality Mandates
          </p>
        </div>

        <div className="bg-[#13193A] border border-[#262E5F] p-8 rounded-[8px] space-y-8 font-serif text-sm text-[#BDB9AD] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#F4F1EB]">
              1. Fundamental Commitment: Metadata Only, Never Message Content
            </h2>
            <p>
              THEODRA is designed on an absolute privacy boundary: <strong className="text-[#F4F1EB]">we never read, store, index, or analyze the text, words, attachments, or audio of employee communications.</strong>
            </p>
            <p>
              Our pattern detection systems evaluate only non-content communication properties:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs font-sans text-[#F4F1EB]">
              <li>Message timestamp relative to organizational business hours (to observe late-night contact)</li>
              <li>Organizational seniority differential between participants (e.g. Senior Director to Junior Associate)</li>
              <li>Rolling 7-day communication volume trends (to identify sudden escalation)</li>
              <li>Response latency asymmetry (differences in how fast each party replies)</li>
              <li>Channel exclusivity (transition from peer-visible channels to exclusive direct messages)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#F4F1EB]">
              2. The Five-Person Group Privacy Rule
            </h2>
            <p>
              In accordance with mathematical privacy guarantees, THEODRA enforces a strict <strong className="text-[#F4F1EB]">minimum five-person group threshold</strong> before any communication pattern is made visible to human reviewers.
            </p>
            <p>
              In practice, this means a pattern is only shown once it involves enough people (at least five individuals sharing generalized role and department characteristics) that no single person could ever be singled out or identified from the alert. If a pattern involves fewer than five people, the platform automatically suppresses it from committee dashboards.
            </p>
            <p>
              Additionally, timestamps are generalized to weekly calendar intervals, and exact employee identifiers are stripped and replaced with broad job tier classifications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#F4F1EB]">
              3. Anonymous Reporting &amp; Data Retention Limits
            </h2>
            <p>
              The employee reporting portal operates on a zero-login architecture. No employee account, user credentials, IP address, device fingerprint, or persistent tracking cookies are recorded upon submission.
            </p>
            <p>
              Data retention timelines are structured strictly around statutory requirements:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs font-sans text-[#F4F1EB]">
              <li><strong>Temporary Anti-Abuse Rate Tokens:</strong> Discarded and purged from memory within 24 hours of submission.</li>
              <li><strong>Anonymous Incident Submissions:</strong> Retained within the confidential Internal Committee queue for the statutory duration of an inquiry (maximum 90 days under Section 11 of the POSH Act) plus any statutory appeal period, after which records are cryptographically expunged or archived in accordance with employer policy.</li>
              <li><strong>Withheld Below-Threshold Telemetry:</strong> Rolling communication aggregates that never meet the 5-person group threshold are purged after 30 rolling calendar days.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#F4F1EB]">
              4. Data Controller vs. Data Processor Responsibilities
            </h2>
            <p>
              Under India&apos;s Digital Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;):
            </p>
            <div className="space-y-2 text-xs font-sans">
              <div className="p-3 bg-[#0A0E28] border border-[#262E5F] rounded-[6px]">
                <strong className="text-[#F0B83A] block mb-1">Customer Organization as Data Fiduciary (Controller):</strong>
                The Customer organization determines the lawful basis for processing employee communication telemetry for POSH Act compliance, manages employee notices, and fulfills legal inquiry obligations.
              </div>
              <div className="p-3 bg-[#0A0E28] border border-[#262E5F] rounded-[6px]">
                <strong className="text-[#E0A96D] block mb-1">THEODRA as Data Processor:</strong>
                THEODRA processes communication metadata strictly on the documented instructions of the Customer. THEODRA does not sell, commercialize, or cross-reference employee data across corporate tenants.
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#F4F1EB]">
              5. Statutory Confidentiality under POSH Act Section 16
            </h2>
            <p>
              Section 16 of the POSH Act mandates that complaints, identity of victims, respondents, and witnesses, and inquiry proceedings shall not be published, communicated, or made known to the public, press, or unauthorized corporate staff.
            </p>
            <p>
              THEODRA enforces this confidentiality requirement at the database and application layer. HR administrators are technically restricted from accessing the content of employee reports or case telemetry, preserving the legal boundary between employer management and committee inquiries.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
