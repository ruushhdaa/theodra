import React from "react";
import { Link } from "react-router-dom";
import { Scale, Check, X, Shield, ArrowRight, Zap, Lock } from "lucide-react";

export const WhyTheodraPage: React.FC = () => {
  const comparisonRows = [
    {
      dimension: "Detection Timing",
      oldWay: "Purely reactive: actions begin only after formal signed grievance is submitted (often months into severe trauma).",
      theodraWay: "Proactive telemetry: detects late-night messaging and exclusivity imbalances weeks before formal complaint escalates.",
    },
    {
      dimension: "Content Privacy & Surveillance",
      oldWay: "Either total blindness or invasive keyword scrapers reading private email/chat message bodies.",
      theodraWay: "Pure metadata rhythm telemetry: zero words, attachments, or emails inspected; cohort aggregate verification.",
    },
    {
      dimension: "Employee Fear & Trust",
      oldWay: "Single reporting individual carries entire burden of proof and fears immediate career retaliation.",
      theodraWay: "Quiet Flag escrow matching: reports trigger notifications only after independent corroborating flags occur.",
    },
    {
      dimension: "Separation of Duties",
      oldWay: "HR executives often oversee or influence IC proceedings, causing conflict of interest.",
      theodraWay: "Enforced code-level guard: HR Admin console renders aggregate scores only. Zero individual case access.",
    },
    {
      dimension: "Statutory Deadlines",
      oldWay: "Spreadsheet tracking frequently breaches the mandatory 90-day inquiry ceiling under POSH Section 11.",
      theodraWay: "Automated countdown clocks with visual overdue alerts and tamper-evident Response Ledger.",
    },
    {
      dimension: "Post-Report Protections",
      oldWay: "Complainant is vulnerable to quiet performance review downgrades, project demotions, or exclusion.",
      theodraWay: "Retaliation Shield: monitors and flags unexplained HR rating drops or shift changes during active inquiries.",
    },
  ];

  return (
    <div className="bg-[#0A0E28] text-[#F4F1EB] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold block mb-2">
            The Structural Advantage
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4F1EB] leading-tight">
            Why THEODRA: Transforming Workplace Safety
          </h1>
          <p className="font-serif text-base text-[#A87C56] mt-4 leading-relaxed">
            A comprehensive architectural comparison between traditional passive grievance tools and THEODRA's privacy-preserving early-warning infrastructure.
          </p>
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#0E1438] border-b border-[#262E5F] text-[#A87C56] uppercase text-[10px] tracking-wider font-sans">
                  <th className="py-4 px-6 w-1/4">Operational Dimension</th>
                  <th className="py-4 px-6 w-3/8">The Old Way (Legacy Portals & Hotlines)</th>
                  <th className="py-4 px-6 w-3/8 text-[#DDA162]">The THEODRA Paradigm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262E5F]/50 font-serif">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#262E5F] transition-colors">
                    <td className="py-5 px-6 font-semibold text-[#F4F1EB] font-sans">
                      {row.dimension}
                    </td>
                    <td className="py-5 px-6 text-[#A87C56] leading-relaxed">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{row.oldWay}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-[#F4F1EB] leading-relaxed">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#EBBA4A] shrink-0 mt-0.5" />
                        <span className="font-medium text-[#F4F1EB]">{row.theodraWay}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Three Core Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-2xl space-y-3 hover:bg-[#262E5F] transition-colors">
            <div className="w-10 h-10 bg-[#0E1438] border border-[#262E5F] text-[#DDA162] rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#F4F1EB]">
              Zero-Friction Early Warning
            </h3>
            <p className="font-serif text-xs text-[#A87C56] leading-relaxed">
              Detects patterns in trailing fortnights before interpersonal breakdown occurs, saving corporate reputations and retaining top talent.
            </p>
          </div>

          <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-2xl space-y-3 hover:bg-[#262E5F] transition-colors">
            <div className="w-10 h-10 bg-[#0E1438] border border-[#262E5F] text-[#DDA162] rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#F4F1EB]">
              Mathematical Integrity
            </h3>
            <p className="font-serif text-xs text-[#A87C56] leading-relaxed">
              Protects every employee through proven cohort aggregation. No single employee's identity is ever exposed to algorithmic bias or supervisory review.
            </p>
          </div>

          <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-2xl space-y-3 hover:bg-[#262E5F] transition-colors">
            <div className="w-10 h-10 bg-[#0E1438] border border-[#262E5F] text-[#DDA162] rounded-xl flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#F4F1EB]">
              Statutory Quasi-Judicial Design
            </h3>
            <p className="font-serif text-xs text-[#A87C56] leading-relaxed">
              Crafted strictly to fulfill Section 4, 11, 13, and 21 mandates of the Sexual Harassment of Women at Workplace Act 2013.
            </p>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="pt-6 border-t border-[#262E5F] flex items-center justify-between">
          <Link to="/how-it-works" className="text-xs text-[#A87C56] hover:text-[#F4F1EB] transition-colors">
            ← How It Works
          </Link>
          <Link
            to="/pricing"
            className="px-6 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#EBBA4A] transition-colors inline-flex items-center gap-1.5 shadow-sm"
          >
            <span>View Pricing & Tiers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
