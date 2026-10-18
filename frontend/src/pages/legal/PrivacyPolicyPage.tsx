import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, EyeOff, Lock, ArrowLeft } from "lucide-react";

export const PrivacyPolicyPage: React.FC = () => {
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
        <div className="border-b border-[#304A78] pb-6">
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-mono font-semibold">
            Data Protection Architecture
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4F1EB] mt-2">
            Privacy Policy
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-2">
            Last Updated: 18 February 2026 • Compliant with DPDP Act 2023 & POSH Act 2013
          </p>
        </div>

        {/* Document Body in Editorial Lora */}
        <div className="bg-[#2C3259] border border-[#304A78] p-8 sm:p-12 shadow-2xl space-y-8 font-serif leading-relaxed text-xs sm:text-sm text-[#F4F1EB] opacity-95">
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">1. Privacy Philosophy & Overview</h2>
            <p>
              THEODRA Systems India Private Limited ("THEODRA", "we", "us") operates on a foundational commitment: <strong className="text-[#F4F1EB]">workplace safety must never require invasive surveillance</strong>. This Privacy Policy details our technical data handling architecture under the Digital Personal Data Protection Act, 2023 ("DPDP Act") and Section 16 of the Sexual Harassment of Women at Workplace Act, 2013 ("POSH Act").
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">2. What Data THEODRA Collects (Metadata Fields Only)</h2>
            <p>
              Our platform ingests strictly bounded interaction telemetry from enterprise collaboration platforms (Slack, Microsoft Teams, Google Workspace) via read-only APIs:
            </p>
            <div className="p-4 bg-[#0A0E28] border border-[#304A78] font-mono text-xs space-y-2 text-[#A87C56]">
              <p>• <span className="text-[#DDA162]">Interaction Timestamp Bucket:</span> Hourly aggregate buckets (e.g., 22:00–23:00) identifying off-hours or weekend frequency.</p>
              <p>• <span className="text-[#DDA162]">Seniority / Hierarchy Delta:</span> Numerical delta between corporate chart seniority levels of interlocutors.</p>
              <p>• <span className="text-[#DDA162]">Channel Type Topology:</span> Classification of interaction surface (Public Team Channel, Private Multi-User Group, Direct 1:1 Message).</p>
              <p>• <span className="text-[#DDA162]">Response Latency Ratio:</span> Directional velocity of conversational ping-to-response elapsed minutes.</p>
              <p>• <span className="text-[#DDA162]">Anonymous Report Form Fields:</span> Nature of concern categories, approximate month/year, voluntary statement, and uploaded evidence files encrypted at rest.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">3. What THEODRA Explicitly Does NOT Collect</h2>
            <p>
              Our ingest filters sit prior to any database write. The following data classes are programmatically dropped and never stored:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#EBBA4A]">
              <li><strong className="text-[#F4F1EB]">Zero Message Content:</strong> We never inspect, scan, parse, or store the body text of emails, chat messages, documents, or attachments.</li>
              <li><strong className="text-[#F4F1EB]">Zero IP Addresses on Reporting Portals:</strong> When an employee visits /report or /report/track, incoming IP addresses and HTTP referrers are stripped in memory and discarded.</li>
              <li><strong className="text-[#F4F1EB]">Zero Audio / Video Telephony Streams:</strong> No voice call recordings, screen sharing buffers, or video frames are ingested.</li>
              <li><strong className="text-[#F4F1EB]">Zero Tracking Cookies for Reporters:</strong> The anonymous employee portal sets zero persistent tracking or advertising cookies.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">4. The Mathematical k-Anonymity Guarantee (k ≥ 5)</h2>
            <p>
              In plain English: <strong className="text-[#F4F1EB]">No pattern is ever shown to an Internal Committee reviewer unless at least five people share that exact pattern</strong>.
            </p>
            <p>
              If our algorithms detect an unusual after-hours interaction spike between a specific lead and associate, that dynamic is mathematically suppressed from view. It will only surface as an observable cohort if at least four other individuals in that department exhibit equivalent role pairings and after-hours messaging ratios. This mathematically prevents witch-hunts, gossip, or targeted supervisory retaliation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">5. Statutory Data Retention Periods</h2>
            <p>
              Telemetry interaction metadata is maintained for a rolling trailing window of ninety (90) days, after which raw interaction counts are permanently purged. Completed case files, Response Ledger records, and Section 21 Annual Report compilations are retained for seven (7) years in accordance with Indian statutory corporate compliance mandates and tax audit requirements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">6. Third-Party Sub-Processors & Data Sovereignty</h2>
            <p>
              All primary compute, database clusters, and cryptographic keystores are hosted strictly within sovereign Indian data centers (MeitY-empanelled cloud infrastructure located in Mumbai and Hyderabad, India). No personal data or employee metadata is transferred across international borders without explicit regulatory authorization.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">7. Data Subject Rights Under DPDP Act 2023</h2>
            <p>
              Employees and committee members retain the right to: (a) obtain confirmation of whether their personal data is being processed; (b) request summary information of processing activities; (c) demand correction or erasure of outdated personal data; and (d) nominate a representative in the event of incapacity. Because anonymous reporters are identified solely by one-way cryptographic codes (e.g. TR-K8X2M9PQ), rights requests require presentation of the valid reference code.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">8. Data Protection Officer Contact</h2>
            <p>
              In accordance with Section 8(1) of the DPDP Act 2023, THEODRA has designated a qualified Data Protection Officer for regulatory inquiries:
            </p>
            <div className="p-4 bg-[#0A0E28] border border-[#304A78] font-sans text-xs space-y-1">
              <p><span className="text-[#A87C56]">Designation:</span> Data Protection & Privacy Officer</p>
              <p><span className="text-[#A87C56]">Email Contact:</span> <strong className="text-[#DDA162] font-mono">privacy@theodra.in</strong></p>
              <p><span className="text-[#A87C56]">Address:</span> THEODRA Systems India Pvt. Ltd., Tech Corridor, Bengaluru, Karnataka 560103</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
