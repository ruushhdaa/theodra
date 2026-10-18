import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Inbox, ArrowRight, Search, ShieldCheck } from "lucide-react";
import { MOCK_ANONYMOUS_REPORTS, AnonymousReport } from "../../data/mockData";

export const ICReportsPage: React.FC = () => {
  const [reports, setReports] = useState<AnonymousReport[]>(MOCK_ANONYMOUS_REPORTS);
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = reports.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.referenceCode.toLowerCase().includes(search.toLowerCase()) ||
      r.concernTags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#304A78]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
            Confidential Reporting Inbox
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            Anonymous Reports
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            Unidentified submissions filed through the public anonymous employee portal.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-[#2C3259] px-3.5 py-2 border border-[#304A78] text-[#DDA162]">
          <ShieldCheck className="w-4 h-4" />
          <span>k-Anonymity Verified</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#2C3259] border border-[#304A78] p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="w-full md:w-72 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search report ID, tag, keyword..."
            className="w-full bg-[#0A0E28] border border-[#304A78] px-3.5 py-2 text-xs text-[#F4F1EB] placeholder-[#A87C56] focus:outline-none focus:border-[#DDA162]"
          />
          <Search className="w-3.5 h-3.5 text-[#A87C56] absolute right-3 top-2.5 pointer-events-none" />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-[#A87C56]">Status Filter:</span>
          <div className="flex items-center gap-1.5">
            {["All", "New", "Under Review", "Responded", "Closed"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 text-xs font-semibold border transition-colors ${
                  filterStatus === st
                    ? "bg-[#0A0E28] border-[#DDA162] text-[#DDA162]"
                    : "bg-[#0A0E28]/40 border-[#304A78] text-[#A87C56] hover:text-[#F4F1EB]"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reports List View */}
      <div className="bg-[#2C3259] border border-[#304A78] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0A0E28] border-b border-[#304A78] text-[#A87C56] uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Report ID</th>
                <th className="py-3 px-4">Reference Code</th>
                <th className="py-3 px-4">Submission Week</th>
                <th className="py-3 px-4">Nature of Concern</th>
                <th className="py-3 px-4">Evidence</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#304A78]/50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-[#A87C56]">
                    No anonymous reports matching the search or status filter.
                  </td>
                </tr>
              ) : (
                filtered.map((rep) => (
                  <tr key={rep.id} className="hover:bg-[#0A0E28]/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#F4F1EB]">
                      {rep.id}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#DDA162]">
                      {rep.referenceCode}
                    </td>
                    <td className="py-3.5 px-4 text-[#A87C56]">{rep.submissionWeek}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {rep.concernTags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] bg-[#0A0E28] text-[#F4F1EB] px-2 py-0.5 border border-[#304A78]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#A87C56]">
                      {rep.evidenceItems.length > 0 ? (
                        <span className="text-[#EBBA4A] font-semibold">
                          {rep.evidenceItems.length} file(s)
                        </span>
                      ) : (
                        <span>None</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] px-2.5 py-0.5 font-bold uppercase tracking-wider ${
                          rep.status === "New"
                            ? "bg-amber-950/80 text-[#EBBA4A] border border-[#EBBA4A]"
                            : rep.status === "Under Review"
                            ? "bg-[#304A78] text-[#DDA162]"
                            : rep.status === "Responded"
                            ? "bg-[#0A0E28] text-[#DDA162] border border-[#304A78]"
                            : "bg-[#0A0E28] text-[#A87C56]"
                        }`}
                      >
                        {rep.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/ic/reports/${rep.id}`}
                        className="px-3 py-1.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Open & Reply</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
