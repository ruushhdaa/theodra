"use client";

import { useState } from "react";
import Link from "next/link";

interface PatternGroup {
  id: string;
  pairing: string;
  department: string;
  duration: string;
  groupSize: number;
  rhythm: string;
  urgency: "Elevated" | "Moderate" | "Watch";
  votesRecorded: number;
  votesRequired: number;
  status: string;
  trend: number[];
}

const INITIAL_PATTERNS: PatternGroup[] = [
  {
    id: "GRP-8821",
    pairing: "Senior Lead → Associate",
    department: "Product Engineering · Platform Services",
    duration: "Trailing 4 weeks",
    groupSize: 7,
    rhythm: "82% after-hours messages; sustained 1:1 direct messages; severe response-delay asymmetry",
    urgency: "Elevated",
    votesRecorded: 1,
    votesRequired: 2,
    status: "1 of 2 Sign-offs Recorded",
    trend: [12, 18, 34, 62],
  },
  {
    id: "GRP-4402",
    pairing: "Manager → Junior Developer",
    department: "Technology Operations · Infrastructure",
    duration: "Trailing 3 weeks",
    groupSize: 5,
    rhythm: "Exclusive 1:1 channel shift; 24x faster response pressure; late evening message clustering",
    urgency: "Elevated",
    votesRecorded: 0,
    votesRequired: 2,
    status: "Awaiting Initial IC Review",
    trend: [8, 14, 29, 48],
  },
  {
    id: "GRP-6614",
    pairing: "Senior → Intern",
    department: "People Operations · HR Infrastructure",
    duration: "Trailing 6 weeks",
    groupSize: 8,
    rhythm: "67% weekend and late-night communication ratio; pronounced hierarchy differential",
    urgency: "Moderate",
    votesRecorded: 0,
    votesRequired: 2,
    status: "Under Observation",
    trend: [10, 15, 18, 24],
  },
  {
    id: "GRP-3301",
    pairing: "Team Lead → Associate",
    department: "Client Success · Enterprise Accounts",
    duration: "Trailing 2 weeks",
    groupSize: 6,
    rhythm: "Frequency escalation slope 1.8x departmental baseline; transition away from shared team channels",
    urgency: "Moderate",
    votesRecorded: 0,
    votesRequired: 2,
    status: "Under Observation",
    trend: [5, 12, 22, 28],
  },
];

const COMMITTEE_ROSTER = [
  {
    position: "Presiding Officer",
    name: "Dr. Sunita Rao",
    title: "Senior Director, Legal Affairs",
    tenure: "Appointed Oct 2024 (Term: 3 Years)",
    statutoryRole: "Mandatory Senior Woman Employee (POSH Act §4)",
    status: "Active & Certified",
  },
  {
    position: "Internal Member",
    name: "Vikram Malhotra",
    title: "Head of Talent Development",
    tenure: "Appointed Jan 2025 (Term: 3 Years)",
    statutoryRole: "Employee Representative (Committed to gender equality)",
    status: "Active & Certified",
  },
  {
    position: "Internal Member",
    name: "Anita Deshmukh",
    title: "Principal Engineer",
    tenure: "Appointed Nov 2024 (Term: 3 Years)",
    statutoryRole: "Employee Representative (Technical & Engineering staff)",
    status: "Active & Certified",
  },
  {
    position: "External Member",
    name: "Adv. Shalini Sen",
    title: "Executive Director, Stree Chetna Foundation",
    tenure: "Appointed Sep 2024 (Term: 3 Years)",
    statutoryRole: "Mandatory Independent NGO / Legal Specialist (POSH Act §4)",
    status: "Active & Certified",
  },
];

export default function DashboardPage() {
  const [activeRole, setActiveRole] = useState<"ic" | "hr">("ic");
  const [patterns, setPatterns] = useState<PatternGroup[]>(INITIAL_PATTERNS);
  const [selectedPattern, setSelectedPattern] = useState<PatternGroup | null>(null);
  const [voteSuccess, setVoteSuccess] = useState<string | null>(null);

  function handleCastVote(patternId: string) {
    setPatterns((prev) =>
      prev.map((p) => {
        if (p.id === patternId) {
          const nextVotes = Math.min(p.votesRecorded + 1, p.votesRequired);
          return {
            ...p,
            votesRecorded: nextVotes,
            status:
              nextVotes >= p.votesRequired
                ? "Authorized by 2 Committee Members"
                : `${nextVotes} of ${p.votesRequired} Sign-offs Recorded`,
          };
        }
        return p;
      })
    );
    setVoteSuccess(
      "Your authorization has been recorded. The dual-member sign-off requirement ensures balanced and accountable oversight."
    );
    if (selectedPattern && selectedPattern.id === patternId) {
      setSelectedPattern((prev) =>
        prev
          ? {
              ...prev,
              votesRecorded: Math.min(prev.votesRecorded + 1, prev.votesRequired),
              status:
                prev.votesRecorded + 1 >= prev.votesRequired
                  ? "Authorized by 2 Committee Members"
                  : `${prev.votesRecorded + 1} of ${prev.votesRequired} Sign-offs Recorded`,
            }
          : null
      );
    }
  }

  return (
    <div className="pt-14 min-h-screen bg-dark">
      {/* Top Banner Explaining the Interactive Preview */}
      <div className="bg-navy border-b border-midblue/50 px-6 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-gold">
                Role-Based Interface Demonstration
              </span>
              <span className="text-text-muted text-xs">·</span>
              <span className="font-sans text-xs text-text-muted">
                Experience how access is separated by law
              </span>
            </div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-text">
              {activeRole === "ic"
                ? "Internal Committee (IC) Decision Workspace"
                : "HR Administrator Compliance Console"}
            </h1>
          </div>

          {/* Role Switcher Button Group */}
          <div className="flex items-center gap-2 p-1 bg-dark/80 border border-midblue/50" style={{ borderRadius: "2px" }}>
            <button
              type="button"
              onClick={() => {
                setActiveRole("ic");
                setVoteSuccess(null);
              }}
              className={[
                "font-sans text-xs font-medium px-3.5 py-1.5 transition-colors cursor-pointer",
                activeRole === "ic"
                  ? "bg-gold text-dark font-semibold"
                  : "text-text-sec hover:text-text",
              ].join(" ")}
              style={{ borderRadius: "2px" }}
            >
              IC Member View
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveRole("hr");
                setVoteSuccess(null);
              }}
              className={[
                "font-sans text-xs font-medium px-3.5 py-1.5 transition-colors cursor-pointer",
                activeRole === "hr"
                  ? "bg-teal text-dark font-semibold"
                  : "text-text-sec hover:text-text",
              ].join(" ")}
              style={{ borderRadius: "2px" }}
            >
              HR Admin View
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">

        {/* ══════════════════════════════════════════════════════════════
            ROLE 1: INTERNAL COMMITTEE VIEW
            ════════════════════════════════════════════════════════════ */}
        {activeRole === "ic" && (
          <div className="space-y-8">
            {/* Identity & Status Ribbon */}
            <div className="border border-midblue/40 bg-navy/50 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ borderRadius: "2px" }}>
              <div>
                <div className="font-sans text-[11px] text-text-muted uppercase tracking-wider mb-1">
                  Active Session
                </div>
                <div className="font-serif text-base font-bold text-text">
                  Dr. Sunita Rao <span className="font-normal text-text-sec text-sm">(Presiding Officer, Internal Committee)</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-sans">
                <div className="bg-dark/60 border border-midblue/30 px-3 py-1.5" style={{ borderRadius: "2px" }}>
                  <span className="text-text-muted mr-1.5">Group Protection:</span>
                  <span className="text-aqua font-medium">Enforced (5+ Rule)</span>
                </div>
                <div className="bg-dark/60 border border-midblue/30 px-3 py-1.5" style={{ borderRadius: "2px" }}>
                  <span className="text-text-muted mr-1.5">Message Content:</span>
                  <span className="text-gold font-medium">0 Words Accessible</span>
                </div>
                <div className="bg-dark/60 border border-midblue/30 px-3 py-1.5" style={{ borderRadius: "2px" }}>
                  <span className="text-text-muted mr-1.5">Escalation Rule:</span>
                  <span className="text-teal font-medium">2 IC Sign-Offs Required</span>
                </div>
              </div>
            </div>

            {/* Voting feedback banner if triggered */}
            {voteSuccess && (
              <div className="p-4 border border-teal/60 bg-teal/10 text-text font-serif text-sm flex items-center justify-between" style={{ borderRadius: "2px" }}>
                <span>{voteSuccess}</span>
                <button
                  onClick={() => setVoteSuccess(null)}
                  className="font-sans text-xs text-teal hover:underline ml-4"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-midblue/40 bg-navy/40 p-4 space-y-1" style={{ borderRadius: "2px" }}>
                <div className="font-sans text-[10px] uppercase tracking-wider text-text-muted">
                  Active Group Patterns
                </div>
                <div className="font-serif text-2xl font-bold text-text tabular">
                  {patterns.length}
                </div>
                <div className="font-sans text-[11px] text-teal">
                  All meet 5+ person threshold
                </div>
              </div>

              <div className="border border-midblue/40 bg-navy/40 p-4 space-y-1" style={{ borderRadius: "2px" }}>
                <div className="font-sans text-[10px] uppercase tracking-wider text-text-muted">
                  Sign-Off Required
                </div>
                <div className="font-serif text-2xl font-bold text-gold tabular">
                  {patterns.filter((p) => p.votesRecorded < p.votesRequired && p.urgency === "Elevated").length}
                </div>
                <div className="font-sans text-[11px] text-text-muted">
                  Requires 2 committee members
                </div>
              </div>

              <div className="border border-midblue/40 bg-navy/40 p-4 space-y-1" style={{ borderRadius: "2px" }}>
                <div className="font-sans text-[10px] uppercase tracking-wider text-text-muted">
                  Patterns Withheld (Below 5)
                </div>
                <div className="font-serif text-2xl font-bold text-aqua tabular">
                  19
                </div>
                <div className="font-sans text-[11px] text-text-muted">
                  Blocked to protect identity
                </div>
              </div>

              <div className="border border-midblue/40 bg-navy/40 p-4 space-y-1" style={{ borderRadius: "2px" }}>
                <div className="font-sans text-[10px] uppercase tracking-wider text-text-muted">
                  Independent Anonymous Reports
                </div>
                <div className="font-serif text-2xl font-bold text-text tabular">
                  2
                </div>
                <div className="font-sans text-[11px] text-text-muted">
                  From employee mobile portal
                </div>
              </div>
            </div>

            {/* Main Patterns Table */}
            <div className="border border-midblue/50 bg-navy/30 overflow-hidden" style={{ borderRadius: "2px" }}>
              <div className="p-5 bg-navy/70 border-b border-midblue/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="font-serif text-lg font-bold text-text">
                    Aggregated Communication Friction Patterns
                  </h2>
                  <p className="font-serif text-xs text-text-sec">
                    Showing generalized patterns meeting the 5-person privacy threshold. Individual names are withheld by system design.
                  </p>
                </div>
                <span className="font-sans text-[11px] text-aqua bg-aqua/10 px-2.5 py-1 self-start sm:self-auto" style={{ borderRadius: "2px" }}>
                  All 4 Groups Protected
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="spec-table">
                  <thead>
                    <tr>
                      <th>Pattern ID</th>
                      <th>Role Pairing & Department</th>
                      <th>Group Size</th>
                      <th>Communication Signals Observed</th>
                      <th>Urgency</th>
                      <th>Committee Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patterns.map((p) => (
                      <tr key={p.id}>
                        <td className="font-medium text-text tabular whitespace-nowrap">
                          {p.id}
                        </td>
                        <td>
                          <div className="font-medium text-text">{p.pairing}</div>
                          <div className="text-[11px] text-text-muted">{p.department}</div>
                        </td>
                        <td className="whitespace-nowrap">
                          <span className="text-aqua font-medium tabular">{p.groupSize} people</span>
                          <div className="text-[10px] text-text-muted">Threshold Met</div>
                        </td>
                        <td className="max-w-xs text-text-sec text-xs leading-relaxed">
                          {p.rhythm}
                        </td>
                        <td className="whitespace-nowrap">
                          <span
                            className={`font-sans text-[11px] font-medium ${
                              p.urgency === "Elevated" ? "text-gold" : "text-teal"
                            }`}
                          >
                            {p.urgency}
                          </span>
                        </td>
                        <td className="whitespace-nowrap">
                          <div className="font-sans text-xs text-text">{p.status}</div>
                          <div className="font-sans text-[10px] text-text-muted">
                            {p.votesRecorded}/{p.votesRequired} votes
                          </div>
                        </td>
                        <td className="whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => setSelectedPattern(p)}
                            className="font-sans text-xs font-medium border border-midblue text-teal hover:border-teal px-3 py-1 transition-colors cursor-pointer"
                            style={{ borderRadius: "2px" }}
                          >
                            Inspect & Vote
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal / Inspector Drawer for Selected Pattern */}
            {selectedPattern && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-dark/80 px-4 py-8 overflow-y-auto"
                onClick={() => setSelectedPattern(null)}
              >
                <div
                  className="w-full max-w-2xl bg-navy border border-midblue/60 p-6 sm:p-8 text-text shadow-2xl space-y-6"
                  style={{ borderRadius: "2px" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between border-b border-midblue/40 pb-4">
                    <div>
                      <div className="font-sans text-[10px] font-medium text-gold uppercase tracking-wider mb-1">
                        Pattern Investigation Details
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-text">
                        {selectedPattern.id} — {selectedPattern.pairing}
                      </h3>
                      <p className="font-sans text-xs text-text-muted mt-0.5">
                        {selectedPattern.department} · {selectedPattern.duration}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedPattern(null)}
                      className="font-sans text-xs text-text-muted hover:text-text"
                    >
                      Close [Esc]
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="border border-midblue/40 bg-dark/40 p-3 space-y-1" style={{ borderRadius: "2px" }}>
                      <div className="font-sans text-[10px] uppercase text-text-muted">Group Size</div>
                      <div className="font-serif text-lg font-bold text-aqua tabular">{selectedPattern.groupSize} individuals</div>
                      <div className="font-sans text-[10px] text-text-muted">Sufficient to protect anonymity</div>
                    </div>
                    <div className="border border-midblue/40 bg-dark/40 p-3 space-y-1" style={{ borderRadius: "2px" }}>
                      <div className="font-sans text-[10px] uppercase text-text-muted">Urgency Tier</div>
                      <div className="font-serif text-lg font-bold text-gold">{selectedPattern.urgency}</div>
                      <div className="font-sans text-[10px] text-text-muted">Based on frequency slope</div>
                    </div>
                    <div className="border border-midblue/40 bg-dark/40 p-3 space-y-1" style={{ borderRadius: "2px" }}>
                      <div className="font-sans text-[10px] uppercase text-text-muted">IC Sign-Offs</div>
                      <div className="font-serif text-lg font-bold text-text tabular">{selectedPattern.votesRecorded} of {selectedPattern.votesRequired}</div>
                      <div className="font-sans text-[10px] text-text-muted">2 independent members required</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-sm font-bold text-text mb-2">
                      Observed Communication Dynamics (No Content)
                    </h4>
                    <p className="font-serif text-sm text-text-sec leading-relaxed bg-dark/30 p-4 border border-midblue/30" style={{ borderRadius: "2px" }}>
                      {selectedPattern.rhythm}. Contact frequency between these senior and junior tiers has risen 2.4× over baseline during trailing 4 weeks, with 82% of interactions occurring after 9:30 PM.
                    </p>
                  </div>

                  <div className="border-t border-midblue/40 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="font-serif text-xs text-text-muted">
                      Casting your vote records an official digital signature in the statutory audit log.
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedPattern(null)}
                        className="font-sans text-xs text-text-sec hover:text-text px-4 py-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCastVote(selectedPattern.id)}
                        className="font-sans text-xs font-medium bg-gold text-dark px-5 py-2 hover:bg-gold/90 transition-colors cursor-pointer"
                        style={{ borderRadius: "2px" }}
                      >
                        Authorize Formal Inquiry ({selectedPattern.votesRecorded}/{selectedPattern.votesRequired})
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            ROLE 2: HR ADMINISTRATOR VIEW
            ════════════════════════════════════════════════════════════ */}
        {activeRole === "hr" && (
          <div className="space-y-8">
            {/* Identity & Statutory Access Boundary Banner */}
            <div className="border border-teal/50 bg-teal/10 p-5 space-y-2" style={{ borderRadius: "2px" }}>
              <div className="flex items-center justify-between">
                <span className="font-sans text-[10px] font-semibold tracking-wider uppercase text-teal">
                  Statutory Separation of Duties Active
                </span>
                <span className="font-sans text-[11px] text-text-sec">
                  Logged in as: Rajesh Menon (Chief HR Officer / System Admin)
                </span>
              </div>
              <p className="font-serif text-sm text-text leading-relaxed">
                Under the Indian POSH Act (Section 16 confidentiality mandates), HR administrators manage committee appointments, system operation, and annual filings — but are <strong className="text-gold font-semibold">strictly prohibited from viewing individual pattern details or employee reports</strong>. Case-relevant information is exclusively accessible to the Internal Committee.
              </p>
            </div>

            {/* Admin Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-midblue/40 bg-navy/40 p-4 space-y-1" style={{ borderRadius: "2px" }}>
                <div className="font-sans text-[10px] uppercase tracking-wider text-text-muted">
                  Internal Committee Quorum
                </div>
                <div className="font-serif text-2xl font-bold text-text tabular">
                  4 / 4
                </div>
                <div className="font-sans text-[11px] text-teal">
                  Full statutory composition met
                </div>
              </div>

              <div className="border border-midblue/40 bg-navy/40 p-4 space-y-1" style={{ borderRadius: "2px" }}>
                <div className="font-sans text-[10px] uppercase tracking-wider text-text-muted">
                  Workforce POSH Training
                </div>
                <div className="font-serif text-2xl font-bold text-aqua tabular">
                  94.2%
                </div>
                <div className="font-sans text-[11px] text-text-muted">
                  1,420 of 1,507 staff sensitized
                </div>
              </div>

              <div className="border border-midblue/40 bg-navy/40 p-4 space-y-1" style={{ borderRadius: "2px" }}>
                <div className="font-sans text-[10px] uppercase tracking-wider text-text-muted">
                  Annual Statutory Filing
                </div>
                <div className="font-serif text-2xl font-bold text-gold">
                  Ready
                </div>
                <div className="font-sans text-[11px] text-text-muted">
                  Calendar year 2025–26 draft prepared
                </div>
              </div>

              <div className="border border-midblue/40 bg-navy/40 p-4 space-y-1" style={{ borderRadius: "2px" }}>
                <div className="font-sans text-[10px] uppercase tracking-wider text-text-muted">
                  System Health & Privacy Gate
                </div>
                <div className="font-serif text-2xl font-bold text-teal">
                  Active
                </div>
                <div className="font-sans text-[11px] text-text-muted">
                  Zero message content stored
                </div>
              </div>
            </div>

            {/* Committee Roster Management Table */}
            <div className="border border-midblue/50 bg-navy/30 overflow-hidden" style={{ borderRadius: "2px" }}>
              <div className="p-5 bg-navy/70 border-b border-midblue/40 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-lg font-bold text-text">
                    Internal Committee Official Roster
                  </h2>
                  <p className="font-serif text-xs text-text-sec">
                    Statutory member list registered under Section 4 of the POSH Act 2013.
                  </p>
                </div>
                <span className="font-sans text-[10px] text-teal border border-teal/40 px-2 py-1" style={{ borderRadius: "2px" }}>
                  All Terms Compliant
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="spec-table">
                  <thead>
                    <tr>
                      <th>Statutory Role</th>
                      <th>Member Name & Corporate Title</th>
                      <th>Appointment Tenure</th>
                      <th>Legal Qualification</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMMITTEE_ROSTER.map((m) => (
                      <tr key={m.name}>
                        <td className="font-medium text-gold whitespace-nowrap">
                          {m.position}
                        </td>
                        <td>
                          <div className="font-medium text-text">{m.name}</div>
                          <div className="text-[11px] text-text-muted">{m.title}</div>
                        </td>
                        <td className="text-text-sec whitespace-nowrap">
                          {m.tenure}
                        </td>
                        <td className="text-text-sec text-xs max-w-xs">
                          {m.statutoryRole}
                        </td>
                        <td className="text-aqua font-sans text-xs whitespace-nowrap">
                          {m.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Annual Statutory POSH Report Summary */}
            <div className="border border-midblue/40 bg-navy/30 p-6 space-y-4" style={{ borderRadius: "2px" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-midblue/30 pb-4">
                <div>
                  <h3 className="font-serif text-base font-bold text-text">
                    Annual POSH Filing Summary (For District Officer)
                  </h3>
                  <p className="font-serif text-xs text-text-sec">
                    Automatically compiled pursuant to Section 21 of the POSH Act.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Statutory report draft exported to PDF.")}
                  className="font-sans text-xs font-medium bg-teal text-dark px-4 py-2 hover:bg-teal/90 transition-colors cursor-pointer self-start sm:self-auto"
                  style={{ borderRadius: "2px" }}
                >
                  Export Statutory Draft (PDF)
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
                <div className="p-3 border border-midblue/30 bg-dark/40 space-y-1" style={{ borderRadius: "2px" }}>
                  <div className="text-text-muted uppercase text-[10px]">Sensitization Workshops</div>
                  <div className="font-serif text-base font-bold text-text">4 Sessions Conducted</div>
                  <div className="text-text-muted">Coverage: 94.2% of workforce</div>
                </div>
                <div className="p-3 border border-midblue/30 bg-dark/40 space-y-1" style={{ borderRadius: "2px" }}>
                  <div className="text-text-muted uppercase text-[10px]">Committee Meetings Convened</div>
                  <div className="font-serif text-base font-bold text-text">6 Official Sessions</div>
                  <div className="text-text-muted">Quorum achieved in all meetings</div>
                </div>
                <div className="p-3 border border-midblue/30 bg-dark/40 space-y-1" style={{ borderRadius: "2px" }}>
                  <div className="text-text-muted uppercase text-[10px]">Statutory Complaints Status</div>
                  <div className="font-serif text-base font-bold text-text">0 Pending Inquiries</div>
                  <div className="text-text-muted">Early resolution protocols active</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Link to Employee View */}
        <div className="mt-12 p-5 border border-midblue/40 bg-navy/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderRadius: "2px" }}>
          <div>
            <div className="font-serif text-sm font-bold text-text mb-1">
              Want to experience the Employee Access Level?
            </div>
            <p className="font-serif text-xs text-text-sec max-w-xl">
              Employees have zero access to dashboards or reports. They interact only through the mobile-first anonymous reporting portal.
            </p>
          </div>
          <Link
            href="/report"
            className="font-sans text-xs font-medium bg-gold text-dark px-5 py-2.5 hover:bg-gold/90 transition-colors whitespace-nowrap shrink-0"
            style={{ borderRadius: "2px" }}
          >
            Open Employee Anonymous Portal →
          </Link>
        </div>

      </div>
    </div>
  );
}
