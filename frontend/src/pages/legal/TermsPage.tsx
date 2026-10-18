import React from "react";
import { Link } from "react-router-dom";
import { Scale, ShieldCheck, ArrowLeft } from "lucide-react";

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-[#0A0E28] text-[#F4F1EB] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-[#A87C56] hover:text-[#DDA162] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Title */}
        <div className="border-b border-[#262E5F] pb-6">
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-mono font-semibold">
            Statutory Legal Framework
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4F1EB] mt-2">
            Terms of Service
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-2">
            Last Updated: 18 February 2026 • Governing Law: Republic of India
          </p>
        </div>

        {/* Full Document Sections in Editorial Lora */}
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-8 sm:p-12 shadow-2xl space-y-8 font-serif leading-relaxed text-xs sm:text-sm text-[#F4F1EB] opacity-95">
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">1. Acceptance of Terms</h2>
            <p>
              These Terms of Service ("Terms") constitute a legally binding agreement entered into between THEODRA Systems India Private Limited ("THEODRA", "Company", "we", "us", or "our") and the legal entity subscribing to or accessing the THEODRA platform ("Customer", "Employer", or "you"). By accessing our software, executing an Order Form, or permitting personnel or Internal Committee members to use our interfaces, Customer confirms full acceptance of these Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">2. Description of Service</h2>
            <p>
              THEODRA provides a specialized B2B software-as-a-service early-warning and statutory case management suite engineered to assist enterprise employers and Internal Committees ("IC") constituted under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 ("POSH Act"). The service analyzes communication interaction telemetry rhythms, facilitates secure anonymous employee grievance intake, manages statutory 90-day inquiry countdowns, and maintains tamper-evident audit records.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">3. B2B Subscription Model & Licensing</h2>
            <p>
              THEODRA is licensed strictly on a commercial enterprise subscription basis as set forth in the applicable Statement of Work or Order Form. Subscriptions grant Customer a non-exclusive, non-transferable, revocable license to utilize the cloud platform solely for internal corporate governance, workforce safety monitoring, and statutory POSH compliance during the active subscription term.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">4. Permitted Use & Authority</h2>
            <p>
              Customer warrants that: (a) it possesses full corporate authority to execute this agreement; (b) it has duly constituted an Internal Committee adhering strictly to Section 4 of the POSH Act; and (c) all employee communications metadata ingested into the service originates from employer-owned or employer-administered corporate collaboration suites where Customer holds lawful data processing authority.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">5. Strict Prohibited Use & Anti-Re-identification Covenants</h2>
            <p>
              Customer, its administrators, and its Internal Committee members shall not under any circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#A87C56]">
              <li>Attempt to reverse-engineer, de-anonymize, or perform linkage attacks on k-anonymity cohort groupings to identify individual participants;</li>
              <li>Circumvent the two-member escalation quorum required before a cohort review is authorized;</li>
              <li>Utilize THEODRA telemetry for employee performance surveillance, union suppression, or general disciplinary action unrelated to workplace harassment;</li>
              <li>Input forged, defamatory, or maliciously manufactured complaint dossiers;</li>
              <li>Grant HR administrators unauthorized read access to confidential IC case dockets, depositions, or evidence items.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">6. Statutory Data Processing Responsibilities (DPDP Act 2023)</h2>
            <p>
              Under the Digital Personal Data Protection Act, 2023 ("DPDP Act"):
            </p>
            <p>
              (a) <strong className="text-[#F4F1EB]">Customer as Data Fiduciary:</strong> The Employer operates as the Data Fiduciary possessing sole authority to determine the purpose of employee communications processing, issue statutory notices, and respond to data principal inquiries.
            </p>
            <p>
              (b) <strong className="text-[#F4F1EB]">THEODRA as Data Processor:</strong> THEODRA acts strictly as a Data Processor processing metadata only upon Customer instructions and in accordance with the mathematical k-anonymity constraints built into the software architecture.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">7. Regulatory Disclaimers: Prototype & Non-Legal Advice</h2>
            <p>
              THEODRA IS A SOFTWARE INSTRUMENT AND DOES NOT PROVIDE LEGAL OPINIONS, LEGAL REPRESENTATION, OR QUASI-JUDICIAL VERDICTS. The quasi-judicial authority to inquire, find facts, and recommend employer penalties resides exclusively with the Customer's duly constituted Internal Committee. Software recommendations, anomaly tiers, and compliance clocks are advisory aids and do not substitute for formal legal counsel.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">8. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, IN NO EVENT SHALL THEODRA BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS OF REPUTATION, REGULATORY FINES LEVIED AGAINST CUSTOMER UNDER SECTION 26 OF THE POSH ACT, OR WORKFORCE DISPUTES ARISING FROM EMPLOYER IMPLEMENTATION DECISIONS. THEODRA'S AGGREGATE LIABILITY SHALL BE CAPPED AT THE TOTAL FEES PAID BY CUSTOMER IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">9. Governing Law & Dispute Resolution</h2>
            <p>
              These Terms shall be governed by, construed, and enforced in accordance with the substantive laws of the Republic of India. Any dispute, controversy, or claim arising out of or relating to these Terms shall be referred to and finally resolved by binding arbitration under the Arbitration and Conciliation Act, 1996, seated in Bengaluru, Karnataka, conducted in the English language before a sole arbitrator mutually appointed by the parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">10. Contact & Inquiries</h2>
            <p>
              For legal inquiries, statutory notifications, or compliance correspondence, contact:
              <br />
              <span className="font-mono text-[#DDA162]">legal@theodra.in</span> • Office of the General Counsel, THEODRA Systems India Pvt Ltd.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
