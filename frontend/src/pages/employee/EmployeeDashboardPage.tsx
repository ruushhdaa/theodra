import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield,
  FileText,
  Clock,
  Eye,
  Lock,
  ArrowRight,
  MessageSquare,
  AlertTriangle,
  HeartHandshake,
  CheckCircle2,
  HelpCircle,
  PhoneCall,
  Search,
  ExternalLink,
  Sparkles,
  ChevronRight,
  Flame,
} from "lucide-react";

export const EmployeeDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [pulseSubmitted, setPulseSubmitted] = useState<string | null>(null);
  const [searchRefCode, setSearchRefCode] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "track" | "escrow" | "rights">("overview");

  // Mock tracked cases available for instant lookup
  const demoCases = [
    {
      refCode: "TR-K8X2M9PQ",
      category: "Off-Hours Communication & Boundary Violations",
      submittedDate: "12 Oct 2026",
      status: "Formal Inquiry Underway",
      stageNumber: 3,
      totalStages: 5,
      daysElapsed: 22,
      maxDays: 90,
      unreadMessages: 2,
      lastUpdate: "Presiding Officer Dr. Sunita Rao scheduled preliminary review session.",
    },
    {
      refCode: "TR-M4N8P2Q1",
      category: "Verbal Harassment & Hostile Evaluation Remarks",
      submittedDate: "28 Sep 2026",
      status: "Interim Relief Granted",
      stageNumber: 4,
      totalStages: 5,
      daysElapsed: 44,
      maxDays: 90,
      unreadMessages: 0,
      lastUpdate: "Interim team reassignment approved. Complainant transferred to Product Legal.",
    },
  ];

  const [selectedCase, setSelectedCase] = useState(demoCases[0]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRefCode) return;
    navigate(`/report/track?ref=${encodeURIComponent(searchRefCode.trim().toUpperCase())}`);
  };

  const handleQuickLookup = (ref: string) => {
    const found = demoCases.find((c) => c.refCode === ref);
    if (found) {
      setSelectedCase(found);
    } else {
      navigate(`/report/track?ref=${ref}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E28] text-[#F4F1EB] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* 1. Header Banner: Welcome & Confidentiality Notice */}
      <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#DDA162] font-semibold bg-[#11173D] border border-[#262E5F] px-2.5 py-0.5 rounded-full">
                Anonymous Employee Portal
              </span>
              <span className="text-[11px] text-[#A87C56]">•</span>
              <span className="text-[11px] text-[#EBBA4A] font-medium flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#EBBA4A]" /> Zero-Log Cryptographic Anonymity
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F1EB]">
              Confidential Workplace Portal
            </h1>
            <p className="font-serif text-xs sm:text-sm text-[#A87C56] mt-2 max-w-2xl leading-relaxed">
              Submit encrypted incident reports, coordinate through quiet flag escrow, track active cases in real-time, and access statutory protections under India&apos;s POSH Act 2013 without revealing your identity.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <Link
              to="/report"
              className="px-5 py-3 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#EBBA4A] transition-colors shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
            >
              <FileText className="w-4 h-4" />
              <span>File New Report</span>
            </Link>
            <Link
              to="/report/quiet-flag"
              className="px-5 py-3 bg-[#0A0E28] border border-[#262E5F] text-[#F4F1EB] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#262E5F] hover:text-[#DDA162] transition-colors flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Lock className="w-4 h-4 text-[#DDA162]" />
              <span>Quiet Escrow Flag</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Quick Navigation Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Track Submission */}
        <Link
          to="/report/track"
          className="group p-5 bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F] hover:border-[#DDA162] rounded-xl transition-all shadow-xl flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#11173D] border border-[#262E5F] group-hover:border-[#DDA162] text-[#DDA162] flex items-center justify-center mb-3 transition-colors">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#F4F1EB] group-hover:text-[#DDA162] transition-colors">
              Track My Case
            </h3>
            <p className="text-xs text-[#A87C56] mt-1 leading-relaxed">
              Look up your 8-character reference code and chat directly with the IC.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-[#DDA162] font-semibold">
            <span>Lookup Status</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Card 2: Quiet Flag Escrow */}
        <Link
          to="/report/quiet-flag"
          className="group p-5 bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F] hover:border-[#DDA162] rounded-xl transition-all shadow-xl flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#11173D] border border-[#262E5F] group-hover:border-[#DDA162] text-[#EBBA4A] flex items-center justify-center mb-3 transition-colors">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#F4F1EB] group-hover:text-[#EBBA4A] transition-colors">
              Quiet Escrow Matching
            </h3>
            <p className="text-xs text-[#A87C56] mt-1 leading-relaxed">
              Report safely. Your complaint only activates if another colleague flags the same pattern.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-[#EBBA4A] font-semibold">
            <span>Register Escrow</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Card 3: Statutory Rights */}
        <Link
          to="/report/rights"
          className="group p-5 bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F] hover:border-[#DDA162] rounded-xl transition-all shadow-xl flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#11173D] border border-[#262E5F] group-hover:border-[#DDA162] text-[#DDA162] flex items-center justify-center mb-3 transition-colors">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#F4F1EB] group-hover:text-[#DDA162] transition-colors">
              Your Legal Rights
            </h3>
            <p className="text-xs text-[#A87C56] mt-1 leading-relaxed">
              Understand interim relief, anti-retaliation guarantees, and inquiry rules under the POSH Act.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-[#DDA162] font-semibold">
            <span>Read Protections</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Card 4: Crisis Support */}
        <Link
          to="/report/resources"
          className="group p-5 bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F] hover:border-[#DDA162] rounded-xl transition-all shadow-xl flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#11173D] border border-[#262E5F] group-hover:border-[#DDA162] text-[#DDA162] flex items-center justify-center mb-3 transition-colors">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#F4F1EB] group-hover:text-[#DDA162] transition-colors">
              Crisis & Helplines
            </h3>
            <p className="text-xs text-[#A87C56] mt-1 leading-relaxed">
              24/7 national helplines, confidential mental health counseling, and pro-bono legal counsel.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-[#DDA162] font-semibold">
            <span>View Helplines</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* 3. Main Dashboard Panels: Case Tracker & Psychological Safety Pulse */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Live Case Tracker & Status Card */}
        <div className="lg:col-span-7 bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#262E5F] gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#DDA162]" />
                <h2 className="font-serif text-lg font-bold text-[#F4F1EB]">
                  Live Submission Tracker
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#A87C56]">Sample Trackers:</span>
                {demoCases.map((c) => (
                  <button
                    key={c.refCode}
                    type="button"
                    onClick={() => handleQuickLookup(c.refCode)}
                    className={`font-mono text-[10px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                      selectedCase.refCode === c.refCode
                        ? "bg-[#262E5F] text-[#DDA162] border-[#DDA162]"
                        : "bg-[#11173D] text-[#A87C56] border-[#262E5F] hover:text-[#F4F1EB]"
                    }`}
                  >
                    {c.refCode}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Ref Code Search Bar */}
            <form onSubmit={handleTrackSubmit} className="mb-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchRefCode}
                    onChange={(e) => setSearchRefCode(e.target.value)}
                    placeholder="Enter 8-character code (e.g. TR-K8X2M9PQ)..."
                    className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl px-4 py-2.5 text-xs text-[#F4F1EB] placeholder-[#A87C56] font-mono focus:outline-none focus:border-[#DDA162]"
                  />
                  <Search className="w-4 h-4 text-[#A87C56] absolute right-3 top-3 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold rounded-xl hover:bg-[#EBBA4A] transition-colors cursor-pointer shrink-0"
                >
                  Track
                </button>
              </div>
            </form>

            {/* Active Tracked Case Preview Card */}
            <div className="p-5 bg-[#0E1438] border border-[#262E5F] rounded-xl space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-base font-bold text-[#F4F1EB]">
                      {selectedCase.refCode}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950/80 text-[#EBBA4A] border border-[#EBBA4A]/60 font-semibold">
                      {selectedCase.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#A87C56] mt-1 font-serif">
                    {selectedCase.category}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-[#A87C56] block">Submitted</span>
                  <span className="text-xs font-mono text-[#F4F1EB]">{selectedCase.submittedDate}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-[11px] mb-1.5">
                  <span className="text-[#A87C56]">Statutory 90-Day Inquiry Clock:</span>
                  <span className="font-mono text-[#DDA162]">
                    Day {selectedCase.daysElapsed} of {selectedCase.maxDays} ({selectedCase.maxDays - selectedCase.daysElapsed} days remaining)
                  </span>
                </div>
                <div className="w-full bg-[#0A0E28] h-2 rounded-full overflow-hidden border border-[#262E5F]">
                  <div
                    className="bg-[#DDA162] h-full rounded-full transition-all duration-500"
                    style={{ width: `${(selectedCase.daysElapsed / selectedCase.maxDays) * 100}%` }}
                  />
                </div>
              </div>

              {/* Latest Update Callout */}
              <div className="p-3.5 bg-[#0A0E28] border border-[#262E5F] rounded-lg">
                <div className="flex items-center justify-between text-xs font-semibold text-[#DDA162] mb-1">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" /> Latest Committee Notice
                  </span>
                  {selectedCase.unreadMessages > 0 && (
                    <span className="text-[10px] bg-[#EBBA4A] text-[#0A0E28] font-bold px-2 py-0.2 rounded-full">
                      {selectedCase.unreadMessages} New Response
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#F4F1EB]/85 leading-relaxed">
                  {selectedCase.lastUpdate}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-[#262E5F] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-[#A87C56]">
              End-to-end encrypted under Section 16 POSH Act privacy mandate.
            </span>
            <Link
              to={`/report/track?ref=${selectedCase.refCode}`}
              className="px-4 py-2 bg-[#262E5F] hover:bg-[#DDA162] hover:text-[#0A0E28] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Open 2-Way Anonymous Channel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column (5 cols): Psychological Safety Sentiment Pulse */}
        <div className="lg:col-span-5 bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-[#262E5F] mb-4">
              <div className="flex items-center gap-2 text-[#EBBA4A] mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">
                  Confidential Pulse
                </span>
              </div>
              <h2 className="font-serif text-lg font-bold text-[#F4F1EB]">
                Workplace Safety & Comfort Pulse
              </h2>
              <p className="text-xs text-[#A87C56] mt-1 leading-relaxed">
                Voluntary anonymous sentiment signal. Aggregated across teams to calculate health scores without ever identifying individuals.
              </p>
            </div>

            {pulseSubmitted ? (
              <div className="p-5 bg-[#0E1438] border border-[#DDA162]/40 rounded-xl space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-[#DDA162]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="font-serif text-sm font-bold text-[#F4F1EB]">
                    Signal Securely Registered
                  </span>
                </div>
                <p className="text-xs text-[#A87C56] leading-relaxed">
                  Thank you for sharing your sentiment: <strong className="text-[#F4F1EB]">{pulseSubmitted}</strong>. Your feedback is blended into anonymized cohort metrics with zero metadata traces.
                </p>
                <div className="p-3 bg-[#0A0E28] border border-[#262E5F] rounded-lg text-xs space-y-1">
                  <p className="text-[#DDA162] font-semibold">Recommended Next Steps:</p>
                  <p className="text-[#A87C56]">
                    If you are experiencing boundary violations or distress, you can submit an escrow Quiet Flag or request free confidential advice from an IC member.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPulseSubmitted(null)}
                  className="text-xs text-[#DDA162] hover:underline cursor-pointer block"
                >
                  Change Response
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#F4F1EB]">
                  How safe and respected do you feel in your department this week?
                </p>
                {[
                  {
                    level: "Fully Safe & Respected",
                    desc: "Healthy boundaries, positive psychological safety across all interactions.",
                  },
                  {
                    level: "Mild Interpersonal Tension",
                    desc: "Occasional awkwardness, late-night expectations, or uncomfortable comments.",
                  },
                  {
                    level: "Unhealthy Pressure or Exclusion",
                    desc: "Pattern of hostility, subtle retaliation, or off-hours communication pressure.",
                  },
                  {
                    level: "Active Harassment / Crisis",
                    desc: "Direct misconduct, quid-pro-quo pressure, or fear of career retaliation.",
                  },
                ].map((opt) => (
                  <button
                    key={opt.level}
                    type="button"
                    onClick={() => setPulseSubmitted(opt.level)}
                    className="w-full text-left p-3.5 bg-[#0E1438] border border-[#262E5F] hover:bg-[#262E5F] hover:border-[#DDA162] rounded-xl transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#F4F1EB] group-hover:text-[#DDA162] transition-colors">
                        {opt.level}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#A87C56] group-hover:text-[#DDA162] transition-colors" />
                    </div>
                    <p className="text-[11px] text-[#A87C56] mt-1 leading-relaxed">
                      {opt.desc}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-[#262E5F] text-[11px] text-[#A87C56]">
            Never linked to your workstation, corporate email, or single IP.
          </div>
        </div>
      </div>

      {/* 4. Active Quiet Flags Escrow Status & Emergency Contacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quiet Flag Escrow Explainer & Active Flag */}
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#262E5F] mb-4">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#EBBA4A]" />
                <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
                  My Registered Quiet Flag
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#11173D] text-[#EBBA4A] border border-[#262E5F]">
                1 Active Escrow
              </span>
            </div>

            <div className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[#DDA162] font-semibold">Flag ID: ESC-8821</span>
                <span className="text-[10px] text-amber-400 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/40">
                  Awaiting Peer Match (1 of 2)
                </span>
              </div>
              <p className="text-xs text-[#F4F1EB]/85 leading-relaxed">
                Escrow Condition: <strong className="text-[#F4F1EB]">Department Team Lead boundary violations</strong>. The vault remains sealed. If a second colleague submits a matching flag on the same team, both reports automatically escalate to the IC.
              </p>
              <div className="text-[11px] text-[#A87C56]">
                Registered on 04 Oct 2026 • Valid for 180 days in encrypted escrow.
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#262E5F] flex items-center justify-between">
            <Link
              to="/report/quiet-flag"
              className="text-xs text-[#DDA162] hover:text-[#EBBA4A] flex items-center gap-1 font-semibold"
            >
              <span>Manage Escrow Conditions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Emergency Contacts & Direct Support */}
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#262E5F] mb-4">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#DDA162]" />
                <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
                  Immediate Confidential Helplines
                </h3>
              </div>
              <span className="text-[10px] text-[#A87C56]">24x7 Statutory Channels</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#0E1438] border border-[#262E5F] rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#F4F1EB] block">
                    National Commission for Women (NCW)
                  </span>
                  <span className="text-[11px] text-[#A87C56]">24/7 Harassment Crisis Helpline</span>
                </div>
                <a
                  href="tel:7827170170"
                  className="px-3 py-1.5 bg-[#262E5F] hover:bg-[#DDA162] hover:text-[#0A0E28] font-mono font-bold text-xs rounded-lg transition-colors"
                >
                  7827170170
                </a>
              </div>

              <div className="p-3 bg-[#0E1438] border border-[#262E5F] rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#F4F1EB] block">
                    Tele-MANAS Psychological Support
                  </span>
                  <span className="text-[11px] text-[#A87C56]">Toll-Free Govt Mental Health Services</span>
                </div>
                <a
                  href="tel:14416"
                  className="px-3 py-1.5 bg-[#262E5F] hover:bg-[#DDA162] hover:text-[#0A0E28] font-mono font-bold text-xs rounded-lg transition-colors"
                >
                  14416
                </a>
              </div>

              <div className="p-3 bg-[#0E1438] border border-[#262E5F] rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#F4F1EB] block">
                    National Legal Services Authority (NALSA)
                  </span>
                  <span className="text-[11px] text-[#A87C56]">Free Statutory Legal Aid Services</span>
                </div>
                <a
                  href="tel:15100"
                  className="px-3 py-1.5 bg-[#262E5F] hover:bg-[#DDA162] hover:text-[#0A0E28] font-mono font-bold text-xs rounded-lg transition-colors"
                >
                  15100
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#262E5F] flex items-center justify-between">
            <Link
              to="/report/resources"
              className="text-xs text-[#DDA162] hover:text-[#EBBA4A] flex items-center gap-1 font-semibold"
            >
              <span>View All Counseling & Legal Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
