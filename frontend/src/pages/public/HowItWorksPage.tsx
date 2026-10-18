import React from "react";
import { Link } from "react-router-dom";
import { Activity, ShieldCheck, Scale, Lock, ArrowRight, EyeOff, Users, Database } from "lucide-react";

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="bg-[#0A0E28] text-[#F4F1EB] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold block mb-2">
            Technical Architecture & Methodology
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4F1EB] leading-tight">
            How THEODRA Works
          </h1>
          <p className="font-serif text-base text-[#A87C56] mt-4 leading-relaxed">
            Privacy-by-design engineering combining communication telemetry, mathematical cohort aggregation, and Indian quasi-judicial statutory workflows.
          </p>
        </div>

        {/* Step 1: Communication Rhythms Telemetry */}
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-8 shadow-2xl space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-[#262E5F]">
            <span className="font-mono text-xs px-2.5 py-1 bg-[#0E1438] text-[#DDA162] font-bold border border-[#262E5F] rounded-full">
              STAGE 01
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#F4F1EB]">
              Passive Communication Telemetry Ingestion
            </h2>
          </div>
          <p className="font-serif text-xs sm:text-sm text-[#F4F1EB] opacity-90 leading-relaxed">
            THEODRA connects via read-only administrative metadata APIs into enterprise communication suites (Slack, Microsoft Teams, Google Workspace). It extracts four strict metadata primitives:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
            <div className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl hover:bg-[#262E5F] transition-colors">
              <span className="font-bold text-[#DDA162] block mb-1">1. Timestamp & Velocity</span>
              <p className="text-[#A87C56]">Interaction hour and day. Flags late-night messaging spikes between 9:30 PM and 7:00 AM.</p>
            </div>
            <div className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl hover:bg-[#262E5F] transition-colors">
              <span className="font-bold text-[#DDA162] block mb-1">2. Hierarchy Differential</span>
              <p className="text-[#A87C56]">Organizational chart seniority levels between interlocutors (e.g., VP to Associate).</p>
            </div>
            <div className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl hover:bg-[#262E5F] transition-colors">
              <span className="font-bold text-[#DDA162] block mb-1">3. Channel Exclusivity</span>
              <p className="text-[#A87C56]">Shift of interactions from public, observable channels into isolated 1:1 direct messaging threads.</p>
            </div>
            <div className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl hover:bg-[#262E5F] transition-colors">
              <span className="font-bold text-[#DDA162] block mb-1">4. Response Delay Imbalance</span>
              <p className="text-[#A87C56]">Asymmetric ping velocity where one party responds instantly under pressure while another persists.</p>
            </div>
          </div>
          <div className="p-3 bg-[#0E1438] border border-[#262E5F] rounded-xl text-xs text-[#EBBA4A] flex items-center gap-2">
            <EyeOff className="w-4 h-4 shrink-0" />
            <span>Absolute Guarantee: Zero message text, email bodies, subject lines, attachments, or audio files are ever ingested.</span>
          </div>
        </div>

        {/* Step 2: Cohort Privacy Guarantee */}
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-8 shadow-2xl space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-[#262E5F]">
            <span className="font-mono text-xs px-2.5 py-1 bg-[#0E1438] text-[#DDA162] font-bold border border-[#262E5F] rounded-full">
              STAGE 02
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#F4F1EB]">
              The Mathematical Cohort Privacy Guarantee
            </h2>
          </div>
          <p className="font-serif text-xs sm:text-sm text-[#F4F1EB] opacity-90 leading-relaxed">
            In data privacy science, cohort grouping guarantees that any released statistical pattern is aggregated across multiple peers. In THEODRA:
          </p>
          <div className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl space-y-3 font-serif text-xs leading-relaxed text-[#F4F1EB]">
            <p>
              • If an anomalous communication pattern is detected involving fewer than 5 people, <strong className="text-[#EBBA4A]">the system automatically withholds it from all human screens</strong>.
            </p>
            <p>
              • An IC member only ever reviews a cohort (e.g. PAT-8821) when at least 5 to 12 individuals share the same role pairing and after-hours frequency.
            </p>
            <p>
              • This mathematically prevents witch-hunts, gossip, or supervisory surveillance of individual team members.
            </p>
          </div>
        </div>

        {/* Step 3: Two-Vote Quorum & Statutory Resolution */}
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-8 shadow-2xl space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-[#262E5F]">
            <span className="font-mono text-xs px-2.5 py-1 bg-[#0E1438] text-[#DDA162] font-bold border border-[#262E5F] rounded-full">
              STAGE 03
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#F4F1EB]">
              Two-Vote Quorum & Statutory Resolution
            </h2>
          </div>
          <p className="font-serif text-xs sm:text-sm text-[#F4F1EB] opacity-90 leading-relaxed">
            No single reviewer can trigger an investigation. Before any cohort pattern can be escalated:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-xs">
            <div className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl hover:bg-[#262E5F] transition-colors">
              <span className="font-bold text-[#DDA162] block mb-1">Dual Consensus</span>
              <p className="text-[#A87C56]">Requires 2 independent IC members to cast verified votes before escalation.</p>
            </div>
            <div className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl hover:bg-[#262E5F] transition-colors">
              <span className="font-bold text-[#DDA162] block mb-1">Immutable Ledger</span>
              <p className="text-[#A87C56]">Every vote, disposition, and note is sealed with SHA-256 cryptographic hashes.</p>
            </div>
            <div className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl hover:bg-[#262E5F] transition-colors">
              <span className="font-bold text-[#DDA162] block mb-1">Retaliation Shield</span>
              <p className="text-[#A87C56]">Monitors employee appraisal and role changes to protect participants from harm.</p>
            </div>
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="pt-6 border-t border-[#262E5F] flex items-center justify-between">
          <Link
            to="/problem"
            className="text-xs text-[#A87C56] hover:text-[#F4F1EB] transition-colors"
          >
            ← Back to The Problem
          </Link>
          <Link
            to="/why-theodra"
            className="px-6 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-md"
          >
            <span>Why THEODRA</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
