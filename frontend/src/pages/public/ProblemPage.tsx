import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Clock, FileCheck, ShieldAlert, Users, ArrowRight } from "lucide-react";

export const ProblemPage: React.FC = () => {
  return (
    <div className="bg-[#0A0E28] text-[#F4F1EB] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold block mb-2">
            Systemic Failure of Passive Compliance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4F1EB] leading-tight">
            The Problem: Why Traditional Workplace Reporting Fails
          </h1>
          <p className="font-serif text-base text-[#A87C56] mt-4 leading-relaxed">
            In corporate India, 85% of workplace harassment incidents never result in a formal grievance. The existing system places 100% of the emotional burden on the victim.
          </p>
        </div>

        {/* Section 1: The Silence Trap */}
        <div className="bg-[#2C3259] border border-[#304A78] p-8 shadow-2xl space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-[#304A78]">
            <div className="p-2.5 bg-[#0A0E28] border border-[#304A78] text-[#DDA162]">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#F4F1EB]">
              1. The Asymmetry of Reporting Fear
            </h2>
          </div>
          <p className="font-serif text-xs sm:text-sm text-[#F4F1EB] opacity-90 leading-relaxed">
            When an employee experiences boundary violations — particularly from a senior leader, team lead, or high-performing commercial executive — the immediate rational calculation is not whether the conduct was unlawful, but whether lodging a complaint will destroy their career trajectory.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 font-sans text-xs">
            <div className="p-4 bg-[#0A0E28] border border-[#304A78]">
              <span className="text-xl font-serif font-bold text-[#EBBA4A] block">85%</span>
              <span className="text-[#A87C56] mt-1 block">Unreported workplace harassment rate in high-growth companies.</span>
            </div>
            <div className="p-4 bg-[#0A0E28] border border-[#304A78]">
              <span className="text-xl font-serif font-bold text-[#DDA162] block">6 Months</span>
              <span className="text-[#A87C56] mt-1 block">Average duration of off-hours pressure prior to an escalation.</span>
            </div>
            <div className="p-4 bg-[#0A0E28] border border-[#304A78]">
              <span className="text-xl font-serif font-bold text-[#F4F1EB] block">72%</span>
              <span className="text-[#A87C56] mt-1 block">Of victims report feared or experienced appraisal retaliation.</span>
            </div>
          </div>
        </div>

        {/* Section 2: Quasi-Judicial Blindness */}
        <div className="bg-[#2C3259] border border-[#304A78] p-8 shadow-2xl space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-[#304A78]">
            <div className="p-2.5 bg-[#0A0E28] border border-[#304A78] text-[#DDA162]">
              <Clock className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#F4F1EB]">
              2. Internal Committees Are Trapped in Blind Reactivity
            </h2>
          </div>
          <p className="font-serif text-xs sm:text-sm text-[#F4F1EB] opacity-90 leading-relaxed">
            Under India's POSH Act 2013, the Internal Committee holds quasi-judicial civil court powers. However, by legislative design, they are strictly prohibited from acting until a formal complaint is signed and delivered. By the time that document lands on the Presiding Officer's desk, trust has ruptured, reputations are damaged, and retention is lost.
          </p>
          <p className="font-serif text-xs sm:text-sm text-[#A87C56] leading-relaxed">
            Committees have zero visibility into escalating pressure: late-night Slack pings, exclusive 1:1 call clustering, or sudden team exclusion.
          </p>
        </div>

        {/* Section 3: The Surveillance Trap */}
        <div className="bg-[#2C3259] border border-[#304A78] p-8 shadow-2xl space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-[#304A78]">
            <div className="p-2.5 bg-[#0A0E28] border border-[#304A78] text-[#DDA162]">
              <FileCheck className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#F4F1EB]">
              3. The Surveillance Fallacy: Content Inspection Destroys Trust
            </h2>
          </div>
          <p className="font-serif text-xs sm:text-sm text-[#F4F1EB] opacity-90 leading-relaxed">
            Some organizations attempt to solve this with invasive employee monitoring software that scans message content, logs keystrokes, and reads private Slack messages. This backfires catastrophically: employees abandon internal communication platforms, trust evaporates, and compliance violates India's Digital Personal Data Protection (DPDP) Act 2023.
          </p>
          <div className="p-4 bg-[#0A0E28] border border-[#DDA162] text-xs text-[#DDA162]">
            <strong>The THEODRA Resolution:</strong> Monitor metadata rhythms (timing, frequency, hierarchy) with mathematical group privacy (k ≥ 5). Never inspect content.
          </div>
        </div>

        {/* Next link */}
        <div className="pt-6 border-t border-[#304A78] flex items-center justify-between">
          <Link
            to="/"
            className="text-xs text-[#A87C56] hover:text-[#F4F1EB] transition-colors"
          >
            ← Return to Overview
          </Link>
          <Link
            to="/how-it-works"
            className="px-6 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors inline-flex items-center gap-1.5"
          >
            <span>Explore How It Works</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
