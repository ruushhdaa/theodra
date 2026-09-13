import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { MOCK_PATTERN_COHORTS, PatternCohort } from "../data/mockData";
import {
  Shield,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Users,
  Clock,
  ArrowRight,
  X,
  FileText,
  UserCheck,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Area,
  AreaChart,
} from "recharts";

export const ICDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [cohorts, setCohorts] = useState<PatternCohort[]>(MOCK_PATTERN_COHORTS);
  const [selectedCohort, setSelectedCohort] = useState<PatternCohort | null>(null);
  const [escalationSuccessMsg, setEscalationSuccessMsg] = useState<string | null>(null);

  const handleEscalateFirst = (cohortId: string) => {
    setCohorts((prev) =>
      prev.map((c) => {
        if (c.id === cohortId) {
          return {
            ...c,
            escalatedByFirstMember: true,
            escalationStatus: "1 of 2 Members Confirmed",
            firstMemberName: `${user?.name || "Dr. Sunita Rao"} (${user?.title || "Presiding Officer"})`,
          };
        }
        return c;
      })
    );

    if (selectedCohort && selectedCohort.id === cohortId) {
      setSelectedCohort((prev) =>
        prev
          ? {
              ...prev,
              escalatedByFirstMember: true,
              escalationStatus: "1 of 2 Members Confirmed",
              firstMemberName: `${user?.name || "Dr. Sunita Rao"} (${user?.title || "Presiding Officer"})`,
            }
          : null
      );
    }
  };

  const handleEscalateSecond = (cohortId: string) => {
    setCohorts((prev) =>
      prev.map((c) => {
        if (c.id === cohortId) {
          return {
            ...c,
            escalationStatus: "Authorized for Inquiry",
          };
        }
        return c;
      })
    );

    setEscalationSuccessMsg(
      `Dual-member authorization completed for ${cohortId}. In accordance with Section 11 of the POSH Act, formal inquiry notice has been queued for committee review.`
    );

    if (selectedCohort && selectedCohort.id === cohortId) {
      setSelectedCohort((prev) =>
        prev
          ? {
              ...prev,
              escalationStatus: "Authorized for Inquiry",
            }
          : null
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E28] text-[#F4F1EB] py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Workspace Top Header */}
        <div className="bg-[#13193A] border border-[#262E5F] p-6 rounded-[8px] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#E0A96D]">
                Internal Committee (IC) Decision Workspace
              </span>
              <span className="text-[#7A756B] text-xs">·</span>
              <span className="font-sans text-[11px] text-[#F0B83A] bg-[#4E182A]/40 border border-[#E0A96D]/30 px-2 py-0.5 rounded-[4px]">
                Statutory POSH Jurisdiction
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F4F1EB]">
              Flagged Communication Cohorts
            </h1>
            <p className="font-sans text-xs text-[#BDB9AD] mt-1">
              Active Member: <strong className="text-[#F4F1EB]">{user?.name || "Dr. Sunita Rao"}</strong> ({user?.title || "Presiding Officer"})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-sans text-xs">
            <div className="bg-[#0A0E28] border border-[#262E5F] px-3.5 py-2 rounded-[6px]">
              <span className="text-[#7A756B] block text-[10px] uppercase">Group Privacy Rule</span>
              <span className="text-[#F0B83A] font-semibold">5+ Person Threshold Met</span>
            </div>
            <div className="bg-[#0A0E28] border border-[#262E5F] px-3.5 py-2 rounded-[6px]">
              <span className="text-[#7A756B] block text-[10px] uppercase">Message Content</span>
              <span className="text-[#E0A96D] font-semibold">Zero Words Stored</span>
            </div>
            <div className="bg-[#0A0E28] border border-[#262E5F] px-3.5 py-2 rounded-[6px]">
              <span className="text-[#7A756B] block text-[10px] uppercase">Escalation Policy</span>
              <span className="text-[#F4F1EB] font-semibold">2 Member Consensus</span>
            </div>
          </div>
        </div>

        {/* Feedback Alert Banner */}
        {escalationSuccessMsg && (
          <div className="bg-[#1C234E] border border-[#F0B83A]/60 p-4 rounded-[6px] text-xs text-[#F4F1EB] font-sans flex items-start justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#F0B83A] shrink-0" />
              <span>{escalationSuccessMsg}</span>
            </div>
            <button
              type="button"
              onClick={() => setEscalationSuccessMsg(null)}
              className="text-[#7A756B] hover:text-[#F4F1EB]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#13193A] border border-[#262E5F] p-4 rounded-[8px]">
            <div className="font-sans text-[10px] uppercase tracking-wider text-[#7A756B] mb-1">
              Active Cohorts
            </div>
            <div className="font-serif text-2xl font-bold text-[#F4F1EB] tabular">
              {cohorts.length}
            </div>
            <div className="font-sans text-[11px] text-[#E0A96D] mt-1">
              All meet 5+ person threshold
            </div>
          </div>

          <div className="bg-[#13193A] border border-[#262E5F] p-4 rounded-[8px]">
            <div className="font-sans text-[10px] uppercase tracking-wider text-[#7A756B] mb-1">
              Elevated Priority
            </div>
            <div className="font-serif text-2xl font-bold text-[#F0B83A] tabular">
              {cohorts.filter((c) => c.severity === "Elevated").length}
            </div>
            <div className="font-sans text-[11px] text-[#7A756B] mt-1">
              Requires committee review
            </div>
          </div>

          <div className="bg-[#13193A] border border-[#262E5F] p-4 rounded-[8px]">
            <div className="font-sans text-[10px] uppercase tracking-wider text-[#7A756B] mb-1">
              Dual Sign-Off Pending
            </div>
            <div className="font-serif text-2xl font-bold text-[#E0A96D] tabular">
              {cohorts.filter((c) => c.escalationStatus === "1 of 2 Members Confirmed").length}
            </div>
            <div className="font-sans text-[11px] text-[#7A756B] mt-1">
              Awaiting 2nd IC member
            </div>
          </div>

          <div className="bg-[#13193A] border border-[#262E5F] p-4 rounded-[8px]">
            <div className="font-sans text-[10px] uppercase tracking-wider text-[#7A756B] mb-1">
              Withheld Below Threshold
            </div>
            <div className="font-serif text-2xl font-bold text-[#BDB9AD] tabular">
              19
            </div>
            <div className="font-sans text-[11px] text-[#7A756B] mt-1">
              Blocked to protect anonymity
            </div>
          </div>
        </div>

        {/* Flagged Pattern Cohorts Table */}
        <div className="bg-[#13193A] border border-[#262E5F] rounded-[8px] overflow-hidden">
          <div className="p-5 border-b border-[#262E5F] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#F4F1EB]">
                Flagged Communication Patterns
              </h2>
              <p className="font-sans text-xs text-[#BDB9AD]">
                Click any row to inspect communication trend telemetry and cast an escalation vote.
              </p>
            </div>
            <span className="font-sans text-[11px] text-[#F0B83A] bg-[#4E182A]/30 border border-[#E0A96D]/30 px-3 py-1 rounded-[4px] self-start sm:self-auto">
              5-Person Privacy Guard Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs">
              <thead className="bg-[#0A0E28] border-b border-[#262E5F] text-[#7A756B] uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Cohort ID</th>
                  <th className="py-3.5 px-4 font-semibold">Department &amp; Pairing</th>
                  <th className="py-3.5 px-4 font-semibold">Severity</th>
                  <th className="py-3.5 px-4 font-semibold">Cohort Size</th>
                  <th className="py-3.5 px-4 font-semibold">Duration</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1D244C]">
                {cohorts.map((cohort) => {
                  const isSelected = selectedCohort?.id === cohort.id;
                  return (
                    <tr
                      key={cohort.id}
                      onClick={() => setSelectedCohort(cohort)}
                      className={`hover:bg-[#1C234E]/60 transition-colors cursor-pointer ${
                        isSelected ? "bg-[#1C234E]" : ""
                      }`}
                    >
                      <td className="py-4 px-4 font-semibold text-[#F4F1EB] tabular">
                        {cohort.id}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-serif text-sm font-bold text-[#F4F1EB]">
                          {cohort.rolePairing}
                        </div>
                        <div className="text-[11px] text-[#7A756B]">
                          {cohort.department}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`font-semibold text-[11px] px-2 py-0.5 rounded-[4px] ${
                            cohort.severity === "Elevated"
                              ? "text-[#F0B83A] bg-[#4E182A]/50 border border-[#E0A96D]/30"
                              : cohort.severity === "Moderate"
                              ? "text-[#E0A96D] bg-[#1C234E] border border-[#262E5F]"
                              : "text-[#BDB9AD] bg-[#0A0E28]"
                          }`}
                        >
                          {cohort.severity}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-[#F4F1EB] tabular">
                          {cohort.cohortSize} staff
                        </span>
                        <div className="text-[10px] text-[#E0A96D]">Group Protected</div>
                      </td>
                      <td className="py-4 px-4 text-[#BDB9AD]">
                        {cohort.duration}
                      </td>
                      <td className="py-4 px-4">
                        <div
                          className={`font-medium ${
                            cohort.escalationStatus === "Authorized for Inquiry"
                              ? "text-[#F0B83A]"
                              : cohort.escalationStatus === "1 of 2 Members Confirmed"
                              ? "text-[#E0A96D]"
                              : "text-[#7A756B]"
                          }`}
                        >
                          {cohort.escalationStatus}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCohort(cohort);
                          }}
                          className="font-sans text-xs font-semibold text-[#E0A96D] hover:text-[#F0B83A] border border-[#262E5F] px-3 py-1 rounded-[4px] hover:border-[#E0A96D]/60 transition-colors"
                        >
                          Inspect &amp; Vote
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cohort Detail & Escalation Inspector Modal */}
        {selectedCohort && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0E28]/85 p-4 overflow-y-auto"
            onClick={() => setSelectedCohort(null)}
          >
            <div
              className="w-full max-w-3xl bg-[#13193A] border border-[#262E5F] p-6 sm:p-8 rounded-[8px] text-[#F4F1EB] shadow-2xl space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-[#262E5F] pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-sans text-[10px] font-semibold text-[#F0B83A] uppercase tracking-wider">
                      Cohort Telemetry
                    </span>
                    <span className="text-[#7A756B] text-xs">·</span>
                    <span className="font-sans text-xs text-[#E0A96D]">
                      {selectedCohort.id}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#F4F1EB]">
                    {selectedCohort.rolePairing}
                  </h3>
                  <p className="font-sans text-xs text-[#BDB9AD]">
                    {selectedCohort.department} · {selectedCohort.duration}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCohort(null)}
                  className="text-[#7A756B] hover:text-[#F4F1EB] p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Stat grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#0A0E28] border border-[#262E5F] p-3.5 rounded-[6px]">
                  <div className="text-[10px] uppercase text-[#7A756B] font-sans">
                    Cohort Anonymity Size
                  </div>
                  <div className="font-serif text-xl font-bold text-[#F0B83A] tabular mt-0.5">
                    {selectedCohort.cohortSize} individuals
                  </div>
                  <div className="text-[10px] text-[#E0A96D] mt-0.5 font-sans">
                    No individual identifiable
                  </div>
                </div>

                <div className="bg-[#0A0E28] border border-[#262E5F] p-3.5 rounded-[6px]">
                  <div className="text-[10px] uppercase text-[#7A756B] font-sans">
                    Severity Tier
                  </div>
                  <div className="font-serif text-xl font-bold text-[#E0A96D] mt-0.5">
                    {selectedCohort.severity}
                  </div>
                  <div className="text-[10px] text-[#7A756B] mt-0.5 font-sans">
                    Based on frequency slope
                  </div>
                </div>

                <div className="bg-[#0A0E28] border border-[#262E5F] p-3.5 rounded-[6px]">
                  <div className="text-[10px] uppercase text-[#7A756B] font-sans">
                    Dual-Member Sign-off
                  </div>
                  <div className="font-serif text-xl font-bold text-[#F4F1EB] mt-0.5">
                    {selectedCohort.escalationStatus === "Authorized for Inquiry"
                      ? "2 of 2 Authorized"
                      : selectedCohort.escalatedByFirstMember
                      ? "1 of 2 Confirmed"
                      : "0 of 2 Confirmed"}
                  </div>
                  <div className="text-[10px] text-[#7A756B] mt-0.5 font-sans">
                    Two IC members must agree
                  </div>
                </div>
              </div>

              {/* Observed Communication Dynamics */}
              <div className="bg-[#0A0E28] border border-[#262E5F] p-4 rounded-[6px]">
                <h4 className="font-sans text-xs font-semibold text-[#E0A96D] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#F0B83A]" />
                  Observed Rhythm Telemetry (No Message Content Read)
                </h4>
                <p className="font-sans text-xs text-[#BDB9AD] leading-relaxed">
                  {selectedCohort.dynamicsDescription}
                </p>
              </div>

              {/* Recharts Trend Chart */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-serif text-sm font-bold text-[#F4F1EB]">
                    Weekly Communication Volume vs Department Baseline
                  </h4>
                  <span className="font-sans text-[10px] text-[#7A756B]">
                    Trailing weeks trend
                  </span>
                </div>

                <div className="h-56 w-full bg-[#0A0E28] border border-[#262E5F] rounded-[6px] p-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={selectedCohort.trendData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="volGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#E0A96D" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#E0A96D" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1D244C" />
                      <XAxis dataKey="week" stroke="#7A756B" fontSize={11} />
                      <YAxis stroke="#7A756B" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#13193A",
                          border: "1px solid #262E5F",
                          borderRadius: "4px",
                          fontSize: "11px",
                          color: "#F4F1EB",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "6px" }} />
                      <Area
                        type="monotone"
                        dataKey="volume"
                        name="Cohort Direct Volume"
                        stroke="#E0A96D"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#volGradient)"
                      />
                      <Line
                        type="monotone"
                        dataKey="baseline"
                        name="Org Baseline"
                        stroke="#7A756B"
                        strokeDasharray="4 4"
                        strokeWidth={1.5}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="afterHoursRatio"
                        name="After-Hours %"
                        stroke="#F0B83A"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Dual-Member Confirmation & Escalation Action Box */}
              <div className="p-5 bg-[#0A0E28] border border-[#262E5F] rounded-[8px] space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-sans text-[11px] font-semibold text-[#E0A96D] uppercase tracking-wider block">
                      Multi-Party Governance Rule
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#F4F1EB]">
                      Inquiry Authorization Protocol
                    </h4>
                    <p className="font-sans text-xs text-[#BDB9AD] mt-1 leading-relaxed">
                      No single person can act alone. At least two Internal Committee members must independently confirm before a formal inquiry is launched.
                    </p>
                  </div>
                  <UserCheck className="w-7 h-7 text-[#F0B83A] shrink-0" />
                </div>

                {/* Status Callout */}
                {selectedCohort.escalatedByFirstMember && selectedCohort.escalationStatus !== "Authorized for Inquiry" && (
                  <div className="p-3 bg-[#13193A] border border-[#E0A96D]/40 rounded-[6px] text-xs font-sans text-[#E0A96D]">
                    1st Signature Recorded by: <strong>{selectedCohort.firstMemberName || "Dr. Sunita Rao"}</strong>. A second member must concur to unlock formal escalation.
                  </div>
                )}

                {selectedCohort.escalationStatus === "Authorized for Inquiry" && (
                  <div className="p-3 bg-[#13193A] border border-[#F0B83A] rounded-[6px] text-xs font-sans text-[#F0B83A] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Formal inquiry authorized by 2 committee members. Statutory proceedings logged.
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCohort(null)}
                    className="w-full sm:w-auto font-sans text-xs text-[#BDB9AD] hover:text-[#F4F1EB] px-4 py-2"
                  >
                    Close
                  </button>

                  {/* Button state depending on dual-member confirmation */}
                  {!selectedCohort.escalatedByFirstMember && (
                    <button
                      type="button"
                      onClick={() => handleEscalateFirst(selectedCohort.id)}
                      className="w-full sm:w-auto font-sans text-xs font-semibold bg-[#E0A96D] text-[#0A0E28] px-5 py-2.5 rounded-[6px] hover:bg-[#E0A96D]/90 transition-colors cursor-pointer"
                    >
                      Cast 1st IC Member Vote
                    </button>
                  )}

                  {selectedCohort.escalatedByFirstMember && selectedCohort.escalationStatus !== "Authorized for Inquiry" && (
                    <button
                      type="button"
                      onClick={() => handleEscalateSecond(selectedCohort.id)}
                      className="w-full sm:w-auto font-sans text-xs font-semibold bg-[#F0B83A] text-[#0A0E28] px-5 py-2.5 rounded-[6px] hover:bg-[#F0B83A]/90 transition-colors shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Confirm as 2nd Member &amp; Authorize Inquiry
                    </button>
                  )}

                  {selectedCohort.escalationStatus === "Authorized for Inquiry" && (
                    <button
                      type="button"
                      disabled
                      className="w-full sm:w-auto font-sans text-xs font-semibold bg-[#262E5F] text-[#BDB9AD] px-5 py-2.5 rounded-[6px] cursor-not-allowed opacity-75"
                    >
                      Inquiry Already Authorized
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
