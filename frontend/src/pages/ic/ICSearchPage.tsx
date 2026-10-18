import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Activity, Briefcase, Inbox, FileText, ArrowRight } from "lucide-react";
import {
  MOCK_PATTERN_COHORTS,
  MOCK_KANBAN_CASES,
  MOCK_ANONYMOUS_REPORTS,
  MOCK_POLICY_VAULT,
} from "../../data/mockData";

export const ICSearchPage: React.FC = () => {
  const [query, setQuery] = useState("");

  const trimmed = query.trim().toLowerCase();

  const matchedPatterns = trimmed
    ? MOCK_PATTERN_COHORTS.filter(
        (p) =>
          p.id.toLowerCase().includes(trimmed) ||
          p.department.toLowerCase().includes(trimmed) ||
          p.rolePairing.toLowerCase().includes(trimmed) ||
          p.dynamicsDescription.toLowerCase().includes(trimmed)
      )
    : MOCK_PATTERN_COHORTS.slice(0, 3);

  const matchedCases = trimmed
    ? MOCK_KANBAN_CASES.filter(
        (c) =>
          c.id.toLowerCase().includes(trimmed) ||
          c.title.toLowerCase().includes(trimmed) ||
          c.department.toLowerCase().includes(trimmed)
      )
    : MOCK_KANBAN_CASES.slice(0, 3);

  const matchedReports = trimmed
    ? MOCK_ANONYMOUS_REPORTS.filter(
        (r) =>
          r.id.toLowerCase().includes(trimmed) ||
          r.referenceCode.toLowerCase().includes(trimmed) ||
          r.concernTags.some((t) => t.toLowerCase().includes(trimmed)) ||
          r.description.toLowerCase().includes(trimmed)
      )
    : MOCK_ANONYMOUS_REPORTS.slice(0, 3);

  const matchedDocs = trimmed
    ? MOCK_POLICY_VAULT.filter(
        (d) =>
          d.name.toLowerCase().includes(trimmed) ||
          d.category.toLowerCase().includes(trimmed)
      )
    : MOCK_POLICY_VAULT;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[#262E5F]">
        <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
          Unified Information Retrieval
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
          Global Committee Search
        </h1>
        <p className="font-serif text-xs text-[#A87C56] mt-1">
          Real-time query across active cases, detected telemetry cohorts, anonymous reports, and statutory policies.
        </p>
      </div>

      {/* Large Search Bar */}
      <div className="relative bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-4 shadow-xl">
        <div className="relative">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type search terms, case references (CASE-2026-08), cohort patterns (PAT-8821), or report codes..."
            className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl pl-11 pr-4 py-3 text-sm text-[#F4F1EB] placeholder-[#A87C56] focus:outline-none focus:border-[#DDA162] transition-colors"
          />
          <Search className="w-5 h-5 text-[#DDA162] absolute left-3.5 top-3.5 pointer-events-none" />
        </div>
      </div>

      {/* Results Sections */}
      <div className="space-y-6">
        {/* Cases Section */}
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#262E5F]">
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4 text-[#DDA162]" />
              <h3 className="font-serif text-sm font-bold text-[#F4F1EB] uppercase tracking-wider">
                Cases ({matchedCases.length})
              </h3>
            </div>
            <Link to="/ic/cases" className="text-xs text-[#DDA162] hover:underline font-semibold">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {matchedCases.map((c) => (
              <Link
                key={c.id}
                to={`/ic/cases/${c.id}`}
                className="p-4 bg-[#0E1438] border border-[#262E5F] hover:border-[#DDA162] hover:bg-[#262E5F] rounded-xl text-xs transition-colors block group shadow-sm"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-bold text-[#F4F1EB] group-hover:text-[#DDA162]">{c.id}</span>
                  <span className="text-[10px] bg-[#161E48] text-[#DDA162] px-2 py-0.5 rounded-full border border-[#262E5F]">
                    {c.stage}
                  </span>
                </div>
                <h4 className="font-medium text-[#F4F1EB] line-clamp-1">{c.title}</h4>
                <div className="text-[10px] text-[#A87C56] mt-1.5">
                  Opened {c.dateOpened} • {c.department}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Patterns Section */}
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#262E5F]">
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4 text-[#EBBA4A]" />
              <h3 className="font-serif text-sm font-bold text-[#F4F1EB] uppercase tracking-wider">
                Telemetry Patterns ({matchedPatterns.length})
              </h3>
            </div>
            <Link to="/ic/patterns" className="text-xs text-[#DDA162] hover:underline font-semibold">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {matchedPatterns.map((p) => (
              <Link
                key={p.id}
                to={`/ic/patterns/${p.id}`}
                className="p-4 bg-[#0E1438] border border-[#262E5F] hover:border-[#DDA162] hover:bg-[#262E5F] rounded-xl text-xs transition-colors block group shadow-sm"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-bold text-[#F4F1EB] group-hover:text-[#DDA162]">{p.id}</span>
                  <span className="text-[10px] bg-amber-950/80 text-[#EBBA4A] px-2 py-0.5 rounded-full border border-[#EBBA4A]">
                    {p.severity}
                  </span>
                </div>
                <h4 className="font-medium text-[#F4F1EB] line-clamp-1">{p.rolePairing}</h4>
                <div className="text-[10px] text-[#A87C56] mt-1.5">
                  {p.department} • Updated {p.lastUpdated}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Reports Section */}
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#262E5F]">
            <div className="flex items-center gap-2.5">
              <Inbox className="w-4 h-4 text-[#DDA162]" />
              <h3 className="font-serif text-sm font-bold text-[#F4F1EB] uppercase tracking-wider">
                Anonymous Reports ({matchedReports.length})
              </h3>
            </div>
            <Link to="/ic/reports" className="text-xs text-[#DDA162] hover:underline font-semibold">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {matchedReports.map((r) => (
              <Link
                key={r.id}
                to={`/ic/reports/${r.id}`}
                className="p-4 bg-[#0E1438] border border-[#262E5F] hover:border-[#DDA162] hover:bg-[#262E5F] rounded-xl text-xs transition-colors block group shadow-sm"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-bold text-[#F4F1EB] group-hover:text-[#DDA162]">{r.id}</span>
                  <span className="font-mono text-[10px] text-[#DDA162]">[{r.referenceCode}]</span>
                </div>
                <h4 className="font-medium text-[#F4F1EB] line-clamp-1">
                  {r.concernTags.join(", ")}
                </h4>
                <div className="text-[10px] text-[#A87C56] mt-1.5">
                  {r.submissionWeek} • Status: {r.status}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#262E5F]">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-[#DDA162]" />
              <h3 className="font-serif text-sm font-bold text-[#F4F1EB] uppercase tracking-wider">
                Statutory Documents ({matchedDocs.length})
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {matchedDocs.map((d) => (
              <div
                key={d.id}
                className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl text-xs flex items-center justify-between shadow-sm"
              >
                <div>
                  <span className="font-semibold text-[#F4F1EB] block">{d.name}</span>
                  <span className="text-[10px] text-[#A87C56] block mt-1">
                    {d.category} • {d.version} • {d.uploadDate}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#DDA162]">{d.fileSize}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
