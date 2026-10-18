import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Activity, Search, Filter, ArrowUpDown, ArrowRight, ShieldCheck } from "lucide-react";
import { MOCK_PATTERN_COHORTS, PatternCohort, SeverityTier } from "../../data/mockData";
import { TableSkeleton } from "../../components/SkeletonLoader";

export const ICPatternsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [patterns, setPatterns] = useState<PatternCohort[]>(MOCK_PATTERN_COHORTS);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedSeverity, setSelectedSeverity] = useState("All");
  const [sortField, setSortField] = useState<keyof PatternCohort>("severity");
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const departments = ["All", ...Array.from(new Set(MOCK_PATTERN_COHORTS.map((p) => p.department)))];
  const severities = ["All", "Flagged", "Elevated", "Watch"];

  const filtered = patterns.filter((p) => {
    const matchesSearch =
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.rolePairing.toLowerCase().includes(search.toLowerCase()) ||
      p.department.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === "All" || p.department === selectedDept;
    const matchesSeverity = selectedSeverity === "All" || p.severity === selectedSeverity;
    return matchesSearch && matchesDept && matchesSeverity;
  });

  const sorted = [...filtered].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (aVal === undefined) return 0;
    if (bVal === undefined) return 0;
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  const handleSort = (field: keyof PatternCohort) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#304A78]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
            Telemetry Analysis Gateway
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            Cohort Pattern Detection
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            Privacy-preserving communication telemetry grouped by mathematical k-anonymity (k ≥ 5).
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-[#2C3259] px-3.5 py-2 border border-[#304A78] text-[#DDA162]">
          <ShieldCheck className="w-4 h-4" />
          <span>Zero Content Read • Pure Metadata</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#2C3259] border border-[#304A78] p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        {/* Search */}
        <div className="w-full md:w-72 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cohort ID, role, department..."
            className="w-full bg-[#0A0E28] border border-[#304A78] px-3.5 py-2 text-xs text-[#F4F1EB] placeholder-[#A87C56] focus:outline-none focus:border-[#DDA162]"
          />
          <Search className="w-3.5 h-3.5 text-[#A87C56] absolute right-3 top-2.5 pointer-events-none" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-[#A87C56]">Department:</span>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-[#0A0E28] border border-[#304A78] px-2.5 py-1.5 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#A87C56]">Severity:</span>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-[#0A0E28] border border-[#304A78] px-2.5 py-1.5 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
            >
              {severities.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <TableSkeleton rows={8} cols={8} />
      ) : (
        <div className="bg-[#2C3259] border border-[#304A78] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#0A0E28] border-b border-[#304A78] text-[#A87C56] uppercase text-[10px] tracking-wider">
                  <th
                    className="py-3 px-4 cursor-pointer hover:text-[#DDA162]"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center gap-1">
                      <span>Cohort ID</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    className="py-3 px-4 cursor-pointer hover:text-[#DDA162]"
                    onClick={() => handleSort("department")}
                  >
                    <div className="flex items-center gap-1">
                      <span>Department</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4">Role Pairing</th>
                  <th
                    className="py-3 px-4 cursor-pointer hover:text-[#DDA162]"
                    onClick={() => handleSort("severity")}
                  >
                    <div className="flex items-center gap-1">
                      <span>Severity Tier</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4">Duration</th>
                  <th
                    className="py-3 px-4 cursor-pointer hover:text-[#DDA162]"
                    onClick={() => handleSort("cohortSize")}
                  >
                    <div className="flex items-center gap-1">
                      <span>Cohort Size</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4">Last Updated</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#304A78]/50">
                {sorted.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-sm text-[#A87C56]">
                      No cohort patterns match the selected criteria.
                    </td>
                  </tr>
                ) : (
                  sorted.map((pat) => (
                    <tr key={pat.id} className="hover:bg-[#0A0E28]/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#F4F1EB]">
                        {pat.id}
                      </td>
                      <td className="py-3.5 px-4 text-[#F4F1EB]">{pat.department}</td>
                      <td className="py-3.5 px-4 font-medium text-[#F4F1EB]">
                        {pat.rolePairing}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] px-2.5 py-0.5 font-bold uppercase tracking-wider ${
                            pat.severity === "Flagged"
                              ? "bg-amber-950/80 text-[#EBBA4A] border border-[#EBBA4A]"
                              : pat.severity === "Elevated"
                              ? "bg-[#304A78] text-[#DDA162]"
                              : "bg-[#0A0E28] text-[#304A78] border border-[#304A78] text-[#A87C56]"
                          }`}
                        >
                          {pat.severity}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#A87C56]">{pat.duration}</td>
                      <td className="py-3.5 px-4 font-mono text-[#F4F1EB]">
                        <span className="text-[#DDA162] font-semibold">{pat.cohortSize}</span> (k ≥ 5)
                      </td>
                      <td className="py-3.5 px-4 text-[#A87C56]">{pat.lastUpdated}</td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          to={`/ic/patterns/${pat.id}`}
                          className="px-3 py-1.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors inline-flex items-center gap-1.5"
                        >
                          <span>Review</span>
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
      )}
    </div>
  );
};
