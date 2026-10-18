import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Briefcase,
  Inbox,
  AlertTriangle,
  ArrowRight,
  Clock,
  CheckCircle,
  Shield,
  Calendar,
  ExternalLink,
} from "lucide-react";
import {
  MOCK_PATTERN_COHORTS,
  MOCK_KANBAN_CASES,
  MOCK_ANONYMOUS_REPORTS,
  MOCK_STATUTORY_CLOCKS,
  MOCK_RESPONSE_LEDGER,
} from "../../data/mockData";
import { CardSkeleton, TableSkeleton } from "../../components/SkeletonLoader";

export const ICDashboardOverview: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 bg-[#2C3259] skeleton-shimmer" />
        <CardSkeleton count={4} />
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-6">
            <TableSkeleton rows={5} cols={5} />
          </div>
          <div className="lg:col-span-4">
            <TableSkeleton rows={4} cols={3} />
          </div>
        </div>
      </div>
    );
  }

  // Calculated Stats
  const activePatternsCount = MOCK_PATTERN_COHORTS.length; // 8
  const pendingReportsCount = MOCK_ANONYMOUS_REPORTS.filter((r) => r.status !== "Closed").length; // 5 or 6
  const casesInProgressCount = MOCK_KANBAN_CASES.filter((c) => c.stage !== "Closed").length; // 4
  const overdueActionsCount = 2; // Prompt: Overdue Actions: 2 (uses gold accent)

  // Top 5 patterns by severity
  const topPatterns = [...MOCK_PATTERN_COHORTS]
    .sort((a, b) => (a.severity === "Flagged" ? -1 : 1))
    .slice(0, 5);

  // Next 3 upcoming statutory deadlines
  const upcomingClocks = MOCK_STATUTORY_CLOCKS.slice(0, 3);

  // Recent 8 actions
  const recentActions = [
    {
      id: "act-1",
      title: "Escalation Vote Recorded",
      target: "Cohort PAT-8821 (Core Platform Engineering)",
      actor: "Adv. Shalini Sen",
      time: "2 hours ago",
    },
    {
      id: "act-2",
      title: "Anonymous Report REP-8901 Ingested",
      target: "Reference TR-K8X2M9PQ",
      actor: "System Gateway",
      time: "4 hours ago",
    },
    {
      id: "act-3",
      title: "Statutory 90-Day Breach Warning",
      target: "Inquiry on CASE-2025-02 (+6 days)",
      actor: "Compliance Clock",
      time: "6 hours ago",
    },
    {
      id: "act-4",
      title: "Interim Relief Measure Filed",
      target: "CASE-2026-08 (Complainant Team Reassignment)",
      actor: "Dr. Sunita Rao",
      time: "1 day ago",
    },
    {
      id: "act-5",
      title: "Meeting Minutes Finalized",
      target: "Minutes MIN-2026-02",
      actor: "Anita Deshmukh",
      time: "2 days ago",
    },
    {
      id: "act-6",
      title: "Witness Deposition Scheduled",
      target: "Witness B (CASE-2026-09)",
      actor: "Adv. Shalini Sen",
      time: "2 days ago",
    },
    {
      id: "act-7",
      title: "Response Ledger Sealed",
      target: "Disposition on PAT-2290",
      actor: "Vikram Malhotra",
      time: "3 days ago",
    },
    {
      id: "act-8",
      title: "Quarterly Review Concluded",
      target: "Full Committee Session",
      actor: "Internal Committee",
      time: "4 days ago",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
            Presiding Officer & Members Console
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            Committee Overview
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/ic/cases"
            className="px-4 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors"
          >
            Manage Cases
          </Link>
          <Link
            to="/ic/patterns"
            className="px-4 py-2 border border-[#304A78] text-[#F4F1EB] text-xs font-semibold hover:bg-[#2C3259] transition-colors"
          >
            All Cohorts
          </Link>
        </div>
      </div>

      {/* Top Stat Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Patterns */}
        <div className="bg-[#2C3259] border border-[#304A78] p-5 flex items-start justify-between">
          <div>
            <span className="text-xs font-medium text-[#A87C56] uppercase tracking-wider">
              Active Patterns
            </span>
            <div className="font-serif text-3xl font-bold text-[#F4F1EB] mt-2">
              {activePatternsCount}
            </div>
            <span className="text-[11px] text-[#A87C56] mt-1 block">
              Across 5 departments (k ≥ 5)
            </span>
          </div>
          <div className="p-2.5 bg-[#0A0E28] border border-[#304A78] text-[#DDA162]">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        {/* Pending Reports */}
        <div className="bg-[#2C3259] border border-[#304A78] p-5 flex items-start justify-between">
          <div>
            <span className="text-xs font-medium text-[#A87C56] uppercase tracking-wider">
              Pending Reports
            </span>
            <div className="font-serif text-3xl font-bold text-[#F4F1EB] mt-2">
              {pendingReportsCount}
            </div>
            <span className="text-[11px] text-[#A87C56] mt-1 block">
              3 requiring initial IC response
            </span>
          </div>
          <div className="p-2.5 bg-[#0A0E28] border border-[#304A78] text-[#DDA162]">
            <Inbox className="w-5 h-5" />
          </div>
        </div>

        {/* Cases in Progress */}
        <div className="bg-[#2C3259] border border-[#304A78] p-5 flex items-start justify-between">
          <div>
            <span className="text-xs font-medium text-[#A87C56] uppercase tracking-wider">
              Cases in Progress
            </span>
            <div className="font-serif text-3xl font-bold text-[#F4F1EB] mt-2">
              {casesInProgressCount}
            </div>
            <span className="text-[11px] text-[#A87C56] mt-1 block">
              2 in formal inquiry, 1 conciliation
            </span>
          </div>
          <div className="p-2.5 bg-[#0A0E28] border border-[#304A78] text-[#DDA162]">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        {/* Overdue Actions (Uses Gold Accent to draw attention) */}
        <div className="bg-[#2C3259] border-2 border-[#DDA162] p-5 flex items-start justify-between">
          <div>
            <span className="text-xs font-bold text-[#EBBA4A] uppercase tracking-wider">
              Overdue Actions
            </span>
            <div className="font-serif text-3xl font-bold text-[#EBBA4A] mt-2">
              {overdueActionsCount}
            </div>
            <span className="text-[11px] text-[#DDA162] font-semibold mt-1 block">
              Statutory deadline alert
            </span>
          </div>
          <div className="p-2.5 bg-[#0A0E28] border border-[#DDA162] text-[#EBBA4A]">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Two Column Layout: Left (60%) Pattern preview, Right (40%) Statutory clock summary */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Left Column (60% = 6 cols) */}
        <div className="lg:col-span-6 bg-[#2C3259] border border-[#304A78] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#304A78] mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#DDA162]" />
                <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
                  High Severity Cohort Patterns
                </h3>
              </div>
              <Link
                to="/ic/patterns"
                className="text-xs font-semibold text-[#DDA162] hover:text-[#EBBA4A] flex items-center gap-1"
              >
                <span>View all ({activePatternsCount})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pattern Table Preview */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#304A78] text-[#A87C56] uppercase text-[10px]">
                    <th className="py-2.5 px-2">Cohort ID</th>
                    <th className="py-2.5 px-2">Department</th>
                    <th className="py-2.5 px-2">Severity</th>
                    <th className="py-2.5 px-2">Size</th>
                    <th className="py-2.5 px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#304A78]/50">
                  {topPatterns.map((pat) => (
                    <tr key={pat.id} className="hover:bg-[#0A0E28]/40 transition-colors">
                      <td className="py-3 px-2 font-mono font-semibold text-[#F4F1EB]">
                        {pat.id}
                      </td>
                      <td className="py-3 px-2 text-[#F4F1EB]">{pat.department}</td>
                      <td className="py-3 px-2">
                        <span
                          className={`text-[10px] px-2 py-0.5 font-semibold ${
                            pat.severity === "Flagged"
                              ? "bg-amber-950/80 text-[#EBBA4A] border border-[#EBBA4A]"
                              : pat.severity === "Elevated"
                              ? "bg-[#304A78] text-[#DDA162]"
                              : "bg-[#0A0E28] text-[#A87C56]"
                          }`}
                        >
                          {pat.severity}
                        </span>
                      </td>
                      <td className="py-3 px-2 font-mono text-[#A87C56]">{pat.cohortSize}</td>
                      <td className="py-3 px-2 text-right">
                        <Link
                          to={`/ic/patterns/${pat.id}`}
                          className="px-2.5 py-1 bg-[#0A0E28] border border-[#304A78] text-[11px] font-semibold text-[#DDA162] hover:bg-[#DDA162] hover:text-[#0A0E28] transition-colors"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (40% = 4 cols) */}
        <div className="lg:col-span-4 bg-[#2C3259] border border-[#304A78] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#304A78] mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#DDA162]" />
                <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
                  Upcoming Statutory Deadlines
                </h3>
              </div>
              <Link
                to="/ic/clock"
                className="text-xs font-semibold text-[#DDA162] hover:text-[#EBBA4A] flex items-center gap-1"
              >
                <span>Full Clock</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingClocks.map((clk) => {
                const isOverdue = clk.inquiryDeadline.isOverdue;
                return (
                  <div
                    key={clk.caseId}
                    className={`p-3.5 border ${
                      isOverdue
                        ? "bg-[#0A0E28] border-[#EBBA4A]"
                        : "bg-[#0A0E28]/60 border-[#304A78]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono font-bold text-[#F4F1EB]">
                        {clk.caseId}
                      </span>
                      {isOverdue ? (
                        <span className="text-[10px] font-bold text-[#EBBA4A] bg-amber-950/80 px-2 py-0.5 border border-[#EBBA4A]">
                          OVERDUE (+6d)
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#DDA162] font-semibold">
                          {clk.inquiryDeadline.daysRemaining} days left
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#A87C56] line-clamp-1">{clk.caseTitle}</p>
                    <div className="mt-2.5 w-full bg-[#2C3259] h-1.5 overflow-hidden">
                      <div
                        className={`h-full ${
                          isOverdue ? "bg-[#EBBA4A]" : "bg-[#DDA162]"
                        }`}
                        style={{
                          width: `${Math.min(
                            100,
                            (clk.inquiryDeadline.daysElapsed / clk.inquiryDeadline.targetDays) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed (Last 8 IC actions) */}
      <div className="bg-[#2C3259] border border-[#304A78] p-6">
        <div className="pb-4 border-b border-[#304A78] mb-4 flex items-center justify-between">
          <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
            Recent Committee Activity Feed
          </h3>
          <span className="text-xs text-[#A87C56]">Tamper-evident statutory audit trail</span>
        </div>

        <div className="divide-y divide-[#304A78]/50">
          {recentActions.map((act) => (
            <div
              key={act.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#DDA162] mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-[#F4F1EB]">{act.title}:</span>{" "}
                  <span className="text-[#A87C56]">{act.target}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-[#A87C56] shrink-0">
                <span className="text-[#DDA162]">{act.actor}</span>
                <span>•</span>
                <span>{act.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
