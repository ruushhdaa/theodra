import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Activity,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Vote,
  FileSearch,
  Lock,
  Clock,
  Users,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MOCK_PATTERN_COHORTS, PatternCohort } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";

export const ICPatternDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  // Find or fallback
  const initialCohort = MOCK_PATTERN_COHORTS.find((p) => p.id === id) || MOCK_PATTERN_COHORTS[0];
  const [cohort, setCohort] = useState<PatternCohort>(initialCohort);

  // Assessment panel state
  const [assessmentNote, setAssessmentNote] = useState(cohort.assessmentNote || "");
  const [disposition, setDisposition] = useState<"No action required" | "Monitor" | "Escalate">(
    cohort.disposition || "Monitor"
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Escalation Modals State
  const [escalateModalOpen, setEscalateModalOpen] = useState(false);
  const [escalationStep, setEscalationStep] = useState<"initial" | "second" | "confirmed">(
    cohort.votesCount === 1 ? "second" : "initial"
  );

  // Pair Review Modal State
  const [pairReviewModalOpen, setPairReviewModalOpen] = useState(false);
  const [pairCaseRef, setPairCaseRef] = useState(cohort.pairReviewCaseRef || "");
  const [pairReviewSubmitted, setPairReviewSubmitted] = useState(cohort.pairReviewRequested);

  const handleSaveAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (disposition === "Escalate") {
      setEscalateModalOpen(true);
      return;
    }
    setCohort((prev) => ({
      ...prev,
      assessmentNote,
      disposition,
    }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleCastSecondVote = () => {
    setCohort((prev) => ({
      ...prev,
      votesCount: 2,
      escalationStatus: "Escalated",
      disposition: "Escalate",
      votedMembers: [...prev.votedMembers, user?.name || "Dr. Sunita Rao (Presiding Officer)"],
    }));
    setEscalationStep("confirmed");
  };

  const handleCastFirstVote = () => {
    setCohort((prev) => ({
      ...prev,
      votesCount: 1,
      escalationStatus: "1 of 2 Votes Received",
      disposition: "Escalate",
      votedMembers: [user?.name || "Dr. Sunita Rao (Presiding Officer)"],
    }));
    setEscalationStep("initial");
  };

  const handlePairReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCohort((prev) => ({
      ...prev,
      pairReviewRequested: true,
      pairReviewCaseRef: pairCaseRef,
    }));
    setPairReviewSubmitted(true);
    setPairReviewModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Back navigation */}
      <div>
        <Link
          to="/ic/patterns"
          className="inline-flex items-center gap-2 text-xs text-[#A87C56] hover:text-[#DDA162] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cohort Patterns</span>
        </Link>
      </div>

      {/* Top: Cohort Metadata Card */}
      <div className="bg-[#2C3259] border border-[#304A78] p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#304A78]">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#0A0E28] border border-[#304A78] text-[#DDA162]">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-[#F4F1EB]">{cohort.id}</h1>
                <span
                  className={`text-[10px] px-2.5 py-0.5 font-bold uppercase tracking-wider ${
                    cohort.severity === "Flagged"
                      ? "bg-amber-950/80 text-[#EBBA4A] border border-[#EBBA4A]"
                      : cohort.severity === "Elevated"
                      ? "bg-[#304A78] text-[#DDA162]"
                      : "bg-[#0A0E28] text-[#A87C56]"
                  }`}
                >
                  {cohort.severity} Severity
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-[#0A0E28] text-[#DDA162] font-mono border border-[#304A78]">
                  {cohort.escalationStatus}
                </span>
              </div>
              <p className="text-xs text-[#A87C56] mt-0.5">
                Department: <span className="text-[#F4F1EB]">{cohort.department}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPairReviewModalOpen(true)}
              className="px-4 py-2 bg-[#0A0E28] border border-[#304A78] text-xs font-semibold text-[#DDA162] hover:border-[#DDA162] transition-colors flex items-center gap-2"
            >
              <FileSearch className="w-4 h-4" />
              <span>{cohort.pairReviewRequested ? "Pair Review Active" : "Request Pair Review"}</span>
            </button>
          </div>
        </div>

        {/* Metadata Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-xs">
          <div className="p-3 bg-[#0A0E28] border border-[#304A78]">
            <span className="text-[10px] uppercase text-[#A87C56] block">Role Pairing</span>
            <span className="font-semibold text-[#F4F1EB] block mt-1">{cohort.rolePairing}</span>
          </div>

          <div className="p-3 bg-[#0A0E28] border border-[#304A78]">
            <span className="text-[10px] uppercase text-[#A87C56] block">First Detected</span>
            <span className="font-semibold text-[#F4F1EB] block mt-1">{cohort.firstDetected}</span>
          </div>

          <div className="p-3 bg-[#0A0E28] border border-[#304A78]">
            <span className="text-[10px] uppercase text-[#A87C56] block">Duration Window</span>
            <span className="font-semibold text-[#F4F1EB] block mt-1">{cohort.duration}</span>
          </div>

          <div className="p-3 bg-[#0A0E28] border border-[#304A78]">
            <span className="text-[10px] uppercase text-[#A87C56] block">Privacy Cohort Size</span>
            <span className="font-semibold text-[#DDA162] block mt-1 font-mono">
              {cohort.cohortSize} individuals (k ≥ 5)
            </span>
          </div>
        </div>

        {/* Dynamics Description */}
        <div className="mt-4 p-4 bg-[#0A0E28] border border-[#304A78] text-xs text-[#F4F1EB] leading-relaxed">
          <span className="font-semibold text-[#DDA162] block mb-1">Algorithmic Telemetry Observation:</span>
          {cohort.dynamicsDescription}
        </div>
      </div>

      {/* Middle: Three Line Charts Side by Side (Recharts) */}
      <div>
        <div className="pb-3 border-b border-[#304A78] mb-4 flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-[#F4F1EB]">
            Weekly Communication Telemetry Trends
          </h3>
          <span className="text-xs text-[#A87C56]">Trailing weekly intervals</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1: Communication Frequency */}
          <div className="bg-[#2C3259] border border-[#304A78] p-4 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#DDA162]">
                1. Communication Frequency
              </span>
              <p className="text-[11px] text-[#A87C56] mb-3">
                Direct ping velocity & call occurrence index
              </p>
            </div>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cohort.trendData}>
                  <CartesianGrid stroke="#304A78" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" stroke="#A87C56" fontSize={10} tickLine={false} />
                  <YAxis stroke="#A87C56" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0A0E28",
                      borderColor: "#304A78",
                      fontSize: "11px",
                      color: "#F4F1EB",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="volume"
                    stroke="#DDA162"
                    strokeWidth={2}
                    dot={{ fill: "#DDA162", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: After-Hours Ratio */}
          <div className="bg-[#2C3259] border border-[#304A78] p-4 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#EBBA4A]">
                2. After-Hours Ratio (%)
              </span>
              <p className="text-[11px] text-[#A87C56] mb-3">
                Share of messaging between 9:30 PM & 7:00 AM
              </p>
            </div>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cohort.trendData}>
                  <CartesianGrid stroke="#304A78" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" stroke="#A87C56" fontSize={10} tickLine={false} />
                  <YAxis stroke="#A87C56" fontSize={10} tickLine={false} unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0A0E28",
                      borderColor: "#304A78",
                      fontSize: "11px",
                      color: "#F4F1EB",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="afterHoursRatio"
                    stroke="#EBBA4A"
                    strokeWidth={2}
                    dot={{ fill: "#EBBA4A", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Exclusivity Score */}
          <div className="bg-[#2C3259] border border-[#304A78] p-4 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#DDA162]">
                3. Exclusivity Score
              </span>
              <p className="text-[11px] text-[#A87C56] mb-3">
                Channel isolation & exclusion of team peers
              </p>
            </div>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cohort.trendData}>
                  <CartesianGrid stroke="#304A78" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" stroke="#A87C56" fontSize={10} tickLine={false} />
                  <YAxis stroke="#A87C56" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0A0E28",
                      borderColor: "#304A78",
                      fontSize: "11px",
                      color: "#F4F1EB",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="exclusivityScore"
                    stroke="#304A78"
                    strokeWidth={2}
                    dot={{ fill: "#304A78", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Pattern Assessment Panel */}
      <div className="bg-[#2C3259] border border-[#304A78] p-6 shadow-2xl">
        <div className="pb-4 border-b border-[#304A78] mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#DDA162]" />
            <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
              Statutory Pattern Assessment & Disposition
            </h3>
          </div>
          <span className="text-xs text-[#A87C56]">Seals directly to Response Ledger</span>
        </div>

        {savedSuccess && (
          <div className="mb-4 p-3 bg-[#0A0E28] border border-[#DDA162] text-xs text-[#DDA162] flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#EBBA4A]" />
            <span>Assessment successfully recorded in Response Ledger.</span>
          </div>
        )}

        <form onSubmit={handleSaveAssessment} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#F4F1EB] mb-1.5">
              Confidential IC Reviewer Notes
            </label>
            <textarea
              rows={4}
              value={assessmentNote}
              onChange={(e) => setAssessmentNote(e.target.value)}
              placeholder="Record observations regarding after-hours ping clustering, hierarchy differentials, or contextual correlation with anonymous reports..."
              className="w-full bg-[#0A0E28] border border-[#304A78] p-3 text-xs text-[#F4F1EB] placeholder-[#A87C56] focus:outline-none focus:border-[#DDA162] leading-relaxed"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-[#F4F1EB]">Recommended Disposition:</span>
              <div className="flex items-center gap-2">
                {(["No action required", "Monitor", "Escalate"] as const).map((disp) => (
                  <button
                    key={disp}
                    type="button"
                    onClick={() => setDisposition(disp)}
                    className={`px-3 py-1.5 text-xs font-semibold border transition-colors ${
                      disposition === disp
                        ? "bg-[#0A0E28] border-[#DDA162] text-[#DDA162]"
                        : "bg-[#0A0E28]/40 border-[#304A78] text-[#A87C56] hover:text-[#F4F1EB]"
                    }`}
                  >
                    {disp}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors cursor-pointer"
            >
              {disposition === "Escalate" ? "Proceed to Escalation Vote" : "Save Assessment"}
            </button>
          </div>
        </form>
      </div>

      {/* Escalation Two-Vote Modal */}
      {escalateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0E28]/80 backdrop-blur-none">
          <div className="bg-[#2C3259] border border-[#304A78] max-w-lg w-full p-6 text-[#F4F1EB] shadow-2xl space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#304A78]">
              <Vote className="w-6 h-6 text-[#EBBA4A]" />
              <h3 className="font-serif text-lg font-bold text-[#F4F1EB]">
                Two-Member Statutory Escalation Protocol
              </h3>
            </div>

            {cohort.votesCount === 0 && (
              <div className="space-y-4 text-xs leading-relaxed">
                <p className="text-[#F4F1EB]">
                  Escalating a cohort triggers investigative inquiry authorization. Under Section 4 operating guidelines, this requires independent concurrence from two Internal Committee members.
                </p>
                <div className="p-3.5 bg-[#0A0E28] border border-[#304A78] text-[#DDA162]">
                  <p className="font-semibold">Current State: 0 of 2 Votes Recorded</p>
                  <p className="text-[11px] text-[#A87C56] mt-1">
                    Casting your vote will record 1 of 2 required votes. The cohort will be marked "1 of 2 Votes Received" until a second member reviews it.
                  </p>
                </div>
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#304A78]">
                  <button
                    type="button"
                    onClick={() => setEscalateModalOpen(false)}
                    className="px-4 py-2 border border-[#304A78] text-xs text-[#A87C56] hover:text-[#F4F1EB]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleCastFirstVote();
                      setEscalateModalOpen(false);
                    }}
                    className="px-5 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A]"
                  >
                    Cast 1st Escalation Vote
                  </button>
                </div>
              </div>
            )}

            {cohort.votesCount === 1 && (
              <div className="space-y-4 text-xs leading-relaxed">
                <div className="p-3.5 bg-[#0A0E28] border border-[#EBBA4A] text-[#EBBA4A]">
                  <p className="font-semibold">
                    1 of 2 votes received — awaiting second vote
                  </p>
                  <p className="text-[11px] text-[#F4F1EB] mt-1">
                    First vote cast by:{" "}
                    <span className="text-[#DDA162]">
                      {cohort.votedMembers[0] || "Adv. Shalini Sen"}
                    </span>
                  </p>
                </div>
                <p className="text-[#F4F1EB]">
                  As an independent IC member, confirming your vote satisfies the statutory quorum requirement and will immediately flip this cohort status to <span className="text-[#EBBA4A] font-bold">Escalated</span>.
                </p>
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#304A78]">
                  <button
                    type="button"
                    onClick={() => setEscalateModalOpen(false)}
                    className="px-4 py-2 border border-[#304A78] text-xs text-[#A87C56] hover:text-[#F4F1EB]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleCastSecondVote();
                      setEscalateModalOpen(false);
                    }}
                    className="px-5 py-2 bg-[#EBBA4A] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#DDA162]"
                  >
                    Confirm 2nd Vote & Escalate
                  </button>
                </div>
              </div>
            )}

            {cohort.votesCount >= 2 && (
              <div className="space-y-4 text-xs leading-relaxed text-center py-4">
                <CheckCircle className="w-10 h-10 text-[#EBBA4A] mx-auto" />
                <h4 className="font-serif text-base font-bold text-[#F4F1EB]">
                  Cohort Formally Escalated
                </h4>
                <p className="text-[#A87C56]">
                  Two independent votes have been recorded. Case authorization has been delivered and recorded in the Response Ledger.
                </p>
                <button
                  type="button"
                  onClick={() => setEscalateModalOpen(false)}
                  className="px-5 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-semibold"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pair Review Modal */}
      {pairReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0E28]/80 backdrop-blur-none">
          <div className="bg-[#2C3259] border border-[#304A78] max-w-lg w-full p-6 text-[#F4F1EB] shadow-2xl space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#304A78]">
              <FileSearch className="w-6 h-6 text-[#DDA162]" />
              <h3 className="font-serif text-lg font-bold text-[#F4F1EB]">
                Request Pair Telemetry Review
              </h3>
            </div>

            <p className="text-xs text-[#F4F1EB] leading-relaxed">
              Pair reviews inspect interaction timing for a specific reported pair rather than cohort averages. To prevent surveillance abuse, pair review requires formal linkage to an active case reference number and approval from 2 IC members.
            </p>

            <form onSubmit={handlePairReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                  Active Case Reference Number
                </label>
                <input
                  type="text"
                  required
                  value={pairCaseRef}
                  onChange={(e) => setPairCaseRef(e.target.value)}
                  placeholder="e.g. CASE-2026-09"
                  className="w-full bg-[#0A0E28] border border-[#304A78] px-3.5 py-2 text-xs text-[#EBBA4A] font-mono focus:outline-none focus:border-[#DDA162]"
                />
              </div>

              <div className="p-3 bg-[#0A0E28] border border-[#304A78] text-[11px] text-[#A87C56]">
                Notice: All pair telemetry requests are permanently recorded in the immutable audit log and response ledger.
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#304A78]">
                <button
                  type="button"
                  onClick={() => setPairReviewModalOpen(false)}
                  className="px-4 py-2 border border-[#304A78] text-xs text-[#A87C56] hover:text-[#F4F1EB]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A]"
                >
                  Submit Pair Review Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
