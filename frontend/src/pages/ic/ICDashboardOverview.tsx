import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Filter,
  Eye,
  TrendingUp,
} from "lucide-react";
import {
  MOCK_PATTERN_COHORTS,
  MOCK_KANBAN_CASES,
  MOCK_ANONYMOUS_REPORTS,
  MOCK_STATUTORY_CLOCKS,
  PatternCohort,
} from "../../data/mockData";
import { CardSkeleton, TableSkeleton } from "../../components/SkeletonLoader";

export const ICDashboardOverview: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState<string>("All");
  const [clockFilter, setClockFilter] = useState<"All" | "Overdue" | "Active">("All");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 bg-[#0A0E28] border border-[#262E5F] rounded-lg skeleton-shimmer" />
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
  const activePatternsCount = MOCK_PATTERN_COHORTS.length;
  const pendingReportsCount = MOCK_ANONYMOUS_REPORTS.filter((r) => r.status !== "Closed").length;
  const casesInProgressCount = MOCK_KANBAN_CASES.filter((c) => c.stage !== "Closed").length;
  const overdueActionsCount = MOCK_STATUTORY_CLOCKS.filter((c) => c.inquiryDeadline.isOverdue).length || 2;

  // Filtered patterns by tab
  const filteredPatterns = MOCK_PATTERN_COHORTS.filter((pat) => {
    if (severityFilter === "All") return true;
    return pat.severity === severityFilter;
  });

  // Filtered clocks
  const filteredClocks = MOCK_STATUTORY_CLOCKS.filter((clk) => {
    if (clockFilter === "Overdue") return clk.inquiryDeadline.isOverdue;
    if (clockFilter === "Active") return !clk.inquiryDeadline.isOverdue;
    return true;
  }).slice(0, 4);

  // Recent 8 actions with direct navigation
  const recentActions = [
    {
      id: "act-1",
      title: "Escalation Vote Recorded",
      target: "Cohort PAT-8821 (Core Platform Engineering)",
      actor: "Adv. Shalini Sen",
      time: "2 hours ago",
      link: "/ic/patterns/PAT-8821",
    },
    {
      id: "act-2",
      title: "Anonymous Report REP-8901 Ingested",
      target: "Reference TR-K8X2M9PQ",
      actor: "System Gateway",
      time: "4 hours ago",
      link: "/ic/reports",
    },
    {
      id: "act-3",
      title: "Statutory 90-Day Breach Warning",
      target: "Inquiry on CASE-2025-02 (+6 days overdue)",
      actor: "Compliance Clock",
      time: "6 hours ago",
      link: "/ic/clock",
    },
    {
      id: "act-4",
      title: "Interim Relief Measure Filed",
      target: "CASE-2026-08 (Complainant Team Reassignment)",
      actor: "Dr. Sunita Rao",
      time: "1 day ago",
      link: "/ic/cases/CASE-2026-08",
    },
    {
      id: "act-5",
      title: "Meeting Minutes Finalized",
      target: "Minutes MIN-2026-02",
      actor: "Anita Deshmukh",
      time: "2 days ago",
      link: "/ic/minutes",
    },
    {
      id: "act-6",
      title: "Witness Deposition Scheduled",
      target: "Witness B (CASE-2026-09)",
      actor: "Adv. Shalini Sen",
      time: "2 days ago",
      link: "/ic/cases/CASE-2026-09",
    },
    {
      id: "act-7",
      title: "Response Ledger Sealed",
      target: "Disposition on PAT-2290",
      actor: "Vikram Malhotra",
      time: "3 days ago",
      link: "/ic/ledger",
    },
    {
      id: "act-8",
      title: "Quarterly Review Concluded",
      target: "Full Committee Session",
      actor: "Internal Committee",
      time: "4 days ago",
      link: "/ic/minutes",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
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
            className="px-4 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#EBBA4A] transition-colors shadow-sm cursor-pointer"
          >
            Manage Cases
          </Link>
          <Link
            to="/ic/patterns"
            className="px-4 py-2.5 bg-[#0A0E28] border border-[#262E5F] text-[#F4F1EB] text-xs font-semibold rounded-lg hover:bg-[#262E5F] hover:text-[#DDA162] transition-colors cursor-pointer"
          >
            All Cohorts
          </Link>
        </div>
      </div>

      {/* Top Stat Cards (Dynamic & Clickable) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Patterns */}
        <button
          type="button"
          onClick={() => navigate("/ic/patterns")}
          className="group p-5 bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F] hover:border-[#DDA162] rounded-xl text-left transition-all duration-200 cursor-pointer shadow-lg flex items-start justify-between"
        >
          <div>
            <span className="text-xs font-medium text-[#A87C56] group-hover:text-[#DDA162] uppercase tracking-wider transition-colors">
              Active Patterns
            </span>
            <div className="font-serif text-3xl font-bold text-[#F4F1EB] mt-2 group-hover:scale-105 transition-transform origin-left">
              {activePatternsCount}
            </div>
            <span className="text-[11px] text-[#A87C56] mt-1 block group-hover:text-[#F4F1EB]/80 transition-colors">
              Across 5 departments (Click to view)
            </span>
          </div>
          <div className="p-3 bg-[#11173D] border border-[#262E5F] rounded-lg text-[#DDA162] group-hover:bg-[#0A0E28] group-hover:border-[#DDA162] transition-colors">
            <Activity className="w-5 h-5" />
          </div>
        </button>

        {/* Pending Reports */}
        <button
          type="button"
          onClick={() => navigate("/ic/reports")}
          className="group p-5 bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F] hover:border-[#DDA162] rounded-xl text-left transition-all duration-200 cursor-pointer shadow-lg flex items-start justify-between"
        >
          <div>
            <span className="text-xs font-medium text-[#A87C56] group-hover:text-[#DDA162] uppercase tracking-wider transition-colors">
              Pending Reports
            </span>
            <div className="font-serif text-3xl font-bold text-[#F4F1EB] mt-2 group-hover:scale-105 transition-transform origin-left">
              {pendingReportsCount}
            </div>
            <span className="text-[11px] text-[#A87C56] mt-1 block group-hover:text-[#F4F1EB]/80 transition-colors">
              3 requiring initial IC response
            </span>
          </div>
          <div className="p-3 bg-[#11173D] border border-[#262E5F] rounded-lg text-[#DDA162] group-hover:bg-[#0A0E28] group-hover:border-[#DDA162] transition-colors">
            <Inbox className="w-5 h-5" />
          </div>
        </button>

        {/* Cases in Progress */}
        <button
          type="button"
          onClick={() => navigate("/ic/cases")}
          className="group p-5 bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F] hover:border-[#DDA162] rounded-xl text-left transition-all duration-200 cursor-pointer shadow-lg flex items-start justify-between"
        >
          <div>
            <span className="text-xs font-medium text-[#A87C56] group-hover:text-[#DDA162] uppercase tracking-wider transition-colors">
              Cases in Progress
            </span>
            <div className="font-serif text-3xl font-bold text-[#F4F1EB] mt-2 group-hover:scale-105 transition-transform origin-left">
              {casesInProgressCount}
            </div>
            <span className="text-[11px] text-[#A87C56] mt-1 block group-hover:text-[#F4F1EB]/80 transition-colors">
              2 in formal inquiry, 1 conciliation
            </span>
          </div>
          <div className="p-3 bg-[#11173D] border border-[#262E5F] rounded-lg text-[#DDA162] group-hover:bg-[#0A0E28] group-hover:border-[#DDA162] transition-colors">
            <Briefcase className="w-5 h-5" />
          </div>
        </button>

        {/* Overdue Actions */}
        <button
          type="button"
          onClick={() => navigate("/ic/clock")}
          className="group p-5 bg-[#0A0E28] border-2 border-[#DDA162] hover:bg-[#262E5F] rounded-xl text-left transition-all duration-200 cursor-pointer shadow-lg flex items-start justify-between"
        >
          <div>
            <span className="text-xs font-bold text-[#EBBA4A] uppercase tracking-wider">
              Overdue Actions
            </span>
            <div className="font-serif text-3xl font-bold text-[#EBBA4A] mt-2 group-hover:scale-105 transition-transform origin-left">
              {overdueActionsCount}
            </div>
            <span className="text-[11px] text-[#DDA162] font-semibold mt-1 block">
              Statutory deadline alert (Click)
            </span>
          </div>
          <div className="p-3 bg-[#11173D] border border-[#EBBA4A] rounded-lg text-[#EBBA4A] group-hover:bg-[#0A0E28] transition-colors">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </button>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Left Column (60%): Pattern Preview with Interactive Filters */}
        <div className="lg:col-span-6 bg-[#0A0E28] border border-[#262E5F] rounded-xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#262E5F] mb-4 gap-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#DDA162]" />
                <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
                  Cohort Patterns Telemetry
                </h3>
              </div>
              <div className="flex items-center gap-1.5">
                {["All", "Flagged", "Elevated", "Watch"].map((sev) => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setSeverityFilter(sev)}
                    className={`text-[11px] px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                      severityFilter === sev
                        ? "bg-[#262E5F] text-[#DDA162] border border-[#DDA162]"
                        : "bg-[#0A0E28] text-[#A87C56] border border-[#262E5F] hover:bg-[#262E5F] hover:text-[#F4F1EB]"
                    }`}
                  >
                    {sev}
                  </button>
                ))}
                <Link
                  to="/ic/patterns"
                  className="text-xs font-semibold text-[#DDA162] hover:text-[#EBBA4A] ml-2 flex items-center gap-1"
                >
                  <span>All ({activePatternsCount})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Dynamic Pattern Table: Entire row is clickable */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#262E5F] text-[#A87C56] uppercase text-[10px]">
                    <th className="py-2.5 px-3">Cohort ID</th>
                    <th className="py-2.5 px-3">Department</th>
                    <th className="py-2.5 px-3">Severity</th>
                    <th className="py-2.5 px-3">Size</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262E5F]/60">
                  {filteredPatterns.slice(0, 5).map((pat) => (
                    <tr
                      key={pat.id}
                      onClick={() => navigate(`/ic/patterns/${pat.id}`)}
                      className="hover:bg-[#262E5F] transition-colors cursor-pointer group rounded-lg"
                    >
                      <td className="py-3 px-3 font-mono font-semibold text-[#F4F1EB] group-hover:text-[#DDA162]">
                        {pat.id}
                      </td>
                      <td className="py-3 px-3 text-[#F4F1EB] group-hover:text-[#F4F1EB]">
                        {pat.department}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                            pat.severity === "Flagged"
                              ? "bg-amber-950/80 text-[#EBBA4A] border-[#EBBA4A]"
                              : pat.severity === "Elevated"
                              ? "bg-[#1E2756] text-[#DDA162] border-[#262E5F]"
                              : "bg-[#0E1438] text-[#A87C56] border-[#262E5F]"
                          }`}
                        >
                          {pat.severity}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[#A87C56]">{pat.cohortSize}</td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0A0E28] border border-[#262E5F] group-hover:border-[#DDA162] text-[11px] font-semibold text-[#DDA162] group-hover:bg-[#DDA162] group-hover:text-[#0A0E28] transition-colors">
                          <Eye className="w-3 h-3" />
                          <span>Review</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (40%): Statutory Deadlines with Interactive Filter */}
        <div className="lg:col-span-4 bg-[#0A0E28] border border-[#262E5F] rounded-xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#262E5F] mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#DDA162]" />
                <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
                  Statutory Clocks
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {(["All", "Overdue", "Active"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setClockFilter(mode)}
                    className={`text-[10px] px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                      clockFilter === mode
                        ? "bg-[#262E5F] text-[#DDA162] border border-[#DDA162]"
                        : "text-[#A87C56] hover:text-[#F4F1EB]"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
                <Link
                  to="/ic/clock"
                  className="text-xs font-semibold text-[#DDA162] hover:text-[#EBBA4A] ml-1 flex items-center gap-1"
                >
                  <span>Full</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Clickable Deadline Items */}
            <div className="space-y-3">
              {filteredClocks.map((clk) => {
                const isOverdue = clk.inquiryDeadline.isOverdue;
                return (
                  <div
                    key={clk.caseId}
                    onClick={() => navigate(`/ic/cases/${clk.caseId}`)}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer group ${
                      isOverdue
                        ? "bg-[#0A0E28] border-[#EBBA4A] hover:bg-[#262E5F]"
                        : "bg-[#0A0E28] border-[#262E5F] hover:bg-[#262E5F] hover:border-[#DDA162]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono font-bold text-[#F4F1EB] group-hover:text-[#DDA162] transition-colors">
                        {clk.caseId}
                      </span>
                      {isOverdue ? (
                        <span className="text-[10px] font-bold text-[#EBBA4A] bg-amber-950/80 px-2 py-0.5 rounded-full border border-[#EBBA4A]">
                          OVERDUE (+6d)
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#DDA162] font-semibold">
                          {clk.inquiryDeadline.daysRemaining} days left
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#A87C56] line-clamp-1 group-hover:text-[#F4F1EB]/80">
                      {clk.caseTitle}
                    </p>
                    <div className="mt-2.5 w-full bg-[#11173D] h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
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

      {/* Recent Activity Feed (Clickable Actions) */}
      <div className="bg-[#0A0E28] border border-[#262E5F] rounded-xl p-6 shadow-xl">
        <div className="pb-4 border-b border-[#262E5F] mb-4 flex items-center justify-between">
          <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
            Recent Committee Activity Feed
          </h3>
          <span className="text-xs text-[#A87C56]">Tamper-evident statutory audit trail</span>
        </div>

        <div className="divide-y divide-[#262E5F]/60">
          {recentActions.map((act) => (
            <div
              key={act.id}
              onClick={() => navigate(act.link)}
              className="py-3 px-2 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs hover:bg-[#262E5F] transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#DDA162] mt-1.5 shrink-0 group-hover:scale-125 transition-transform" />
                <div>
                  <span className="font-semibold text-[#F4F1EB] group-hover:text-[#DDA162] transition-colors">
                    {act.title}:
                  </span>{" "}
                  <span className="text-[#A87C56] group-hover:text-[#F4F1EB]/80">
                    {act.target}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-[#A87C56] shrink-0">
                <span className="text-[#DDA162] font-semibold">{act.actor}</span>
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
