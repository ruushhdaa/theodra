import React from "react";
import { Link } from "react-router-dom";
import { Clock, AlertTriangle, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import { MOCK_STATUTORY_CLOCKS, StatutoryClockItem } from "../../data/mockData";

export const ICClockPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262E5F]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
            Statutory Mandates Compliance Engine
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            Statutory Compliance Clock
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            Active tracking for 90-day inquiry, 10-day findings report, and 60-day employer implementation rules under POSH Act §11–13.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-[#0E1438] px-3.5 py-2 border border-[#262E5F] rounded-xl text-[#DDA162]">
          <Clock className="w-4 h-4 text-[#DDA162]" />
          <span>Real-time Calendar Tracking</span>
        </div>
      </div>

      {/* Overview statutory mandate boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-5 text-xs space-y-1.5 shadow-xl">
          <span className="font-mono text-[#DDA162] font-bold block">1. POSH Act §11(4)</span>
          <span className="font-serif text-sm font-semibold text-[#F4F1EB] block">
            90-Day Inquiry Ceiling
          </span>
          <p className="text-[#A87C56] leading-relaxed">
            Inquiry must be concluded within ninety calendar days from the date of complaint receipt.
          </p>
        </div>

        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-5 text-xs space-y-1.5 shadow-xl">
          <span className="font-mono text-[#DDA162] font-bold block">2. POSH Act §13(1)</span>
          <span className="font-serif text-sm font-semibold text-[#F4F1EB] block">
            10-Day Report Submission
          </span>
          <p className="text-[#A87C56] leading-relaxed">
            Report of findings and recommendations must be provided to the employer within 10 days of inquiry conclusion.
          </p>
        </div>

        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-5 text-xs space-y-1.5 shadow-xl">
          <span className="font-mono text-[#DDA162] font-bold block">3. POSH Act §13(4)</span>
          <span className="font-serif text-sm font-semibold text-[#F4F1EB] block">
            60-Day Employer Action
          </span>
          <p className="text-[#A87C56] leading-relaxed">
            Employer must act on the recommendations and report back to the IC within sixty days of receipt.
          </p>
        </div>
      </div>

      {/* Active Case Statutory Clocks List */}
      <div className="space-y-6">
        <h3 className="font-serif text-lg font-bold text-[#F4F1EB]">
          Active Case Statutory Timelines
        </h3>

        {MOCK_STATUTORY_CLOCKS.map((clk) => {
          const hasOverdue =
            clk.inquiryDeadline.isOverdue ||
            clk.reportDeadline.isOverdue ||
            clk.actionDeadline.isOverdue;

          return (
            <div
              key={clk.caseId}
              className={`bg-[#0A0E28] border rounded-2xl p-6 shadow-2xl transition-all ${
                hasOverdue ? "border-[#EBBA4A]" : "border-[#262E5F]"
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#262E5F]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base font-bold text-[#F4F1EB]">
                      {clk.caseId}
                    </span>
                    <span className="text-xs text-[#A87C56]">({clk.department})</span>
                    {hasOverdue && (
                      <span className="text-[10px] bg-amber-950 text-[#EBBA4A] font-bold px-2.5 py-0.5 rounded-full border border-[#EBBA4A]">
                        STATUTORY OVERDUE
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-[#F4F1EB] mt-1">
                    {clk.caseTitle}
                  </h4>
                </div>
                <Link
                  to={`/ic/cases/${clk.caseId}`}
                  className="px-4 py-2 bg-[#0E1438] border border-[#262E5F] rounded-xl text-xs font-semibold text-[#DDA162] hover:bg-[#262E5F] hover:border-[#DDA162] transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
                >
                  <span>Open Case File</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* 3 Countdown Progress Bars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* 1. 90-Day Inquiry Countdown */}
                <div className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#F4F1EB]">90-Day Inquiry</span>
                    {clk.inquiryDeadline.isOverdue ? (
                      <span className="text-[10px] font-bold text-[#EBBA4A] bg-amber-950 px-2 py-0.5 rounded-full border border-[#EBBA4A]">
                        OVERDUE (+{Math.abs(clk.inquiryDeadline.daysRemaining)}d)
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#DDA162] font-semibold">
                        {clk.inquiryDeadline.daysRemaining} days remaining
                      </span>
                    )}
                  </div>

                  <div className="w-full bg-[#11173D] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        clk.inquiryDeadline.isOverdue ? "bg-[#EBBA4A]" : "bg-[#DDA162]"
                      }`}
                      style={{
                        width: `${Math.min(
                          100,
                          (clk.inquiryDeadline.daysElapsed / clk.inquiryDeadline.targetDays) * 100
                        )}%`,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#A87C56] font-mono">
                    <span>Elapsed: {clk.inquiryDeadline.daysElapsed} days</span>
                    <span>Ceiling: 90 days</span>
                  </div>
                </div>

                {/* 2. 10-Day Findings Report Countdown */}
                <div className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#F4F1EB]">10-Day Report</span>
                    {clk.reportDeadline.isOverdue ? (
                      <span className="text-[10px] font-bold text-[#EBBA4A] bg-amber-950 px-2 py-0.5 rounded-full border border-[#EBBA4A]">
                        OVERDUE (+{Math.abs(clk.reportDeadline.daysRemaining)}d)
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#DDA162] font-semibold">
                        {clk.reportDeadline.daysRemaining} days remaining
                      </span>
                    )}
                  </div>

                  <div className="w-full bg-[#11173D] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        clk.reportDeadline.isOverdue ? "bg-[#EBBA4A]" : "bg-[#DDA162]"
                      }`}
                      style={{
                        width: `${Math.min(
                          100,
                          (clk.reportDeadline.daysElapsed / clk.reportDeadline.targetDays) * 100
                        )}%`,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#A87C56] font-mono">
                    <span>Elapsed: {clk.reportDeadline.daysElapsed} days</span>
                    <span>Ceiling: 10 days</span>
                  </div>
                </div>

                {/* 3. 60-Day Employer Action Countdown */}
                <div className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#F4F1EB]">60-Day Employer Action</span>
                    {clk.actionDeadline.isOverdue ? (
                      <span className="text-[10px] font-bold text-[#EBBA4A] bg-amber-950 px-2 py-0.5 rounded-full border border-[#EBBA4A]">
                        OVERDUE
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#DDA162] font-semibold">
                        {clk.actionDeadline.daysRemaining} days remaining
                      </span>
                    )}
                  </div>

                  <div className="w-full bg-[#11173D] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        clk.actionDeadline.isOverdue ? "bg-[#EBBA4A]" : "bg-[#DDA162]"
                      }`}
                      style={{
                        width: `${Math.min(
                          100,
                          (clk.actionDeadline.daysElapsed / clk.actionDeadline.targetDays) * 100
                        )}%`,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#A87C56] font-mono">
                    <span>Elapsed: {clk.actionDeadline.daysElapsed} days</span>
                    <span>Ceiling: 60 days</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
