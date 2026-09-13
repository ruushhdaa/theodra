import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Eye,
  Lock,
  ArrowRight,
  CheckCircle2,
  Users,
  Building,
  FileCheck,
  AlertTriangle,
  Clock,
  ChevronRight,
  Check,
} from "lucide-react";

export const LandingPage: React.FC = () => {
  const [activeStage, setActiveStage] = useState<"detect" | "protect" | "resolve">("detect");
  const [salesModalOpen, setSalesModalOpen] = useState(false);
  const [salesSubmitted, setSalesSubmitted] = useState(false);

  const problemCards = [
    {
      title: "Most incidents are never reported",
      desc: "Employees stay silent out of fear of retaliation, hierarchy pressure, or damaging their professional standing.",
      icon: AlertTriangle,
    },
    {
      title: "By the time a complaint arrives, the damage is done",
      desc: "Internal Committees can only act after a formal filing, leaving them blind to months of escalating pressure.",
      icon: Clock,
    },
    {
      title: "Paperwork tools offer zero detection",
      desc: "Standard HR software automates forms and policy storage, but cannot notice early warning signs.",
      icon: FileCheck,
    },
  ];

  const stages = [
    {
      id: "detect" as const,
      num: "01",
      name: "Detect",
      heading: "Notice communication stress without reading words",
      body: "THEODRA analyzes communication rhythms — such as late-night messaging spikes, response delay imbalances, and severe seniority gaps. It monitors interaction timing and hierarchy, never message text or email content.",
      points: [
        "Tracks late-night and weekend communication volume",
        "Flags severe response-delay pressure across role hierarchies",
        "Zero message text, attachments, or calls are ever read",
      ],
    },
    {
      id: "protect" as const,
      num: "02",
      name: "Protect",
      heading: "Group-level privacy before any human reviewer sees it",
      body: "We only ever surface a pattern once it involves enough people that no individual can be identified. If fewer than five people share the pattern, it is automatically withheld from view to protect privacy.",
      points: [
        "Strict 5-person minimum group threshold",
        "Names, emails, and identifiers replaced by broad role bands",
        "Timestamps rounded to calendar weeks to prevent event matching",
      ],
    },
    {
      id: "resolve" as const,
      num: "03",
      name: "Report & Resolve",
      heading: "Dual human authorization for every committee action",
      body: "The Internal Committee reviews anonymized patterns alongside an independent employee reporting portal. When escalation is needed, at least two committee members must independently agree before an inquiry proceeds.",
      points: [
        "Two-member sign-off required for all committee escalations",
        "Independent anonymous reporting channel for employees",
        "Zero automated punishments or algorithmic accusations",
      ],
    },
  ];

  const currentStage = stages.find((s) => s.id === activeStage)!;

  const comparisonRows = [
    {
      aspect: "Trigger for Action",
      today: "Purely reactive — committee must wait for a formal written complaint",
      theodra: "Proactive early warning — surfaces communication stress before harm escalates",
    },
    {
      aspect: "Employee Burden",
      today: "Victims must gather proof, risk retaliation, and file alone",
      theodra: "Objective pattern detection removes the personal burden of initial proof",
    },
    {
      aspect: "Privacy Standard",
      today: "Ad-hoc investigations often expose personal chats and email threads",
      theodra: "Zero message content read; patterns only shown when 5+ people share them",
    },
    {
      aspect: "Accountability",
      today: "Single HR managers or informal channels often handle cases in isolation",
      theodra: "Statutory multi-party governance requires at least two committee sign-offs",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E28] text-[#F4F1EB]">
      {/* ══════════════════════════════════════════════════════════════
          1. HERO — Logo prominently displayed, clear headline, single line subhead
          ════════════════════════════════════════════════════════════ */}
      <section className="pt-16 pb-20 px-4 sm:px-8 border-b border-[#262E5F]/60">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Logo prominently displayed */}
          <div className="mb-8 p-3 bg-[#13193A] border border-[#262E5F] rounded-[12px] shadow-2xl">
            <img
              src="/theodra-logo.png"
              alt="THEODRA Master Logo"
              className="h-20 sm:h-24 w-auto object-contain rounded-[8px]"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#13193A] border border-[#262E5F] rounded-[6px] mb-6">
            <Shield className="w-3.5 h-3.5 text-[#F0B83A]" />
            <span className="font-sans text-[11px] font-semibold tracking-wider uppercase text-[#E0A96D]">
              POSH Act 2013 Early-Warning SaaS
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F4F1EB] leading-[1.15] mb-5 tracking-tight max-w-4xl">
            Detect workplace harassment patterns before harm escalates.
          </h1>

          <p className="font-serif text-base sm:text-xl text-[#BDB9AD] leading-relaxed mb-8 max-w-2xl">
            THEODRA alerts Internal Committees to unusual communication rhythms across teams — without ever reading a single message.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setSalesModalOpen(true)}
              className="w-full sm:w-auto font-sans text-sm font-semibold bg-[#F0B83A] text-[#0A0E28] px-7 py-3 rounded-[8px] hover:bg-[#F0B83A]/90 transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              Talk to Sales <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto font-sans text-sm font-medium border border-[#262E5F] bg-[#13193A] text-[#F4F1EB] hover:border-[#E0A96D]/60 px-6 py-3 rounded-[8px] transition-colors flex items-center justify-center gap-2"
            >
              See How It Works
            </a>
            <Link
              to="/login"
              className="w-full sm:w-auto font-sans text-sm font-medium text-[#E0A96D] hover:underline px-4 py-3 text-center"
            >
              Try Demo Login →
            </Link>
          </div>

          {/* Quick credibility strip — one short factual sentence */}
          <div className="mt-12 pt-6 border-t border-[#1D244C] text-[#7A756B] font-sans text-xs max-w-xl">
            Over 50% of large Indian enterprises report zero annual POSH complaints — hiding fear of reporting behind clean paperwork.
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. THE PROBLEM — 3 short cards, one line each, plain language
          ════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-sans text-[11px] font-semibold tracking-wider uppercase text-[#E0A96D] block mb-2">
            The Structural Problem
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#F4F1EB]">
            Why workplace safety failures happen in silence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problemCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-[#13193A] border border-[#262E5F] p-6 rounded-[8px] flex flex-col justify-between hover:border-[#E0A96D]/40 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-[6px] bg-[#0A0E28] border border-[#262E5F] flex items-center justify-center mb-4 text-[#F0B83A]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#F4F1EB] mb-2 leading-snug">
                    {card.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#BDB9AD] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. HOW IT WORKS — The three-stage flow (Detect / Protect / Report & Resolve)
          ════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-20 px-4 sm:px-8 bg-[#13193A]/50 border-y border-[#262E5F]/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-sans text-[11px] font-semibold tracking-wider uppercase text-[#E0A96D] block mb-2">
              Three-Stage Architecture
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#F4F1EB]">
              How THEODRA operates in your organization
            </h2>
          </div>

          {/* Horizontal Tabs */}
          <div className="flex border-b border-[#262E5F] mb-8 overflow-x-auto gap-2">
            {stages.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setActiveStage(st.id)}
                className={`font-sans text-xs sm:text-sm font-semibold py-3 px-5 border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeStage === st.id
                    ? "border-[#F0B83A] text-[#F0B83A] bg-[#13193A]"
                    : "border-transparent text-[#7A756B] hover:text-[#BDB9AD]"
                }`}
              >
                <span className="text-[11px] opacity-75">{st.num}</span>
                <span>{st.name}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Card */}
          <div className="bg-[#13193A] border border-[#262E5F] p-6 sm:p-8 rounded-[8px]">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#E0A96D] mb-3">
              {currentStage.heading}
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#BDB9AD] leading-relaxed mb-6">
              {currentStage.body}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1D244C]">
              {currentStage.points.map((pt) => (
                <div key={pt} className="flex items-start gap-2 text-xs font-sans text-[#F4F1EB]">
                  <CheckCircle2 className="w-4 h-4 text-[#F0B83A] shrink-0 mt-0.5" />
                  <span className="leading-snug">{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. WHO USES IT — The three roles shown as simple 3-column visual
          ════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-sans text-[11px] font-semibold tracking-wider uppercase text-[#E0A96D] block mb-2">
            Role-Based Access
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#F4F1EB]">
            Explicit separation of duties by design
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Employee */}
          <div className="bg-[#13193A] border border-[#262E5F] p-6 rounded-[8px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-sans uppercase font-semibold text-[#E0A96D] tracking-wider">
                  Role 01
                </span>
                <span className="text-[10px] font-sans bg-[#0A0E28] border border-[#262E5F] px-2 py-0.5 rounded text-[#BDB9AD]">
                  No Login Required
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F4F1EB] mb-2">
                Employee
              </h3>
              <p className="font-sans text-xs text-[#BDB9AD] leading-relaxed mb-4">
                Accesses only the anonymous reporting portal. Cannot see any dashboard, organizational data, or other employees&apos; submissions.
              </p>
            </div>
            <Link
              to="/report"
              className="font-sans text-xs text-[#E0A96D] hover:underline pt-4 border-t border-[#1D244C] flex items-center gap-1"
            >
              Open Anonymous Portal <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* IC Member */}
          <div className="bg-[#13193A] border border-[#262E5F] p-6 rounded-[8px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-sans uppercase font-semibold text-[#F0B83A] tracking-wider">
                  Role 02
                </span>
                <span className="text-[10px] font-sans bg-[#0A0E28] border border-[#262E5F] px-2 py-0.5 rounded text-[#F0B83A]">
                  IC Credentials
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F4F1EB] mb-2">
                Internal Committee (IC)
              </h3>
              <p className="font-sans text-xs text-[#BDB9AD] leading-relaxed mb-4">
                Reviews flagged communication patterns grouped at the cohort level (5+ people). Can vote to escalate inquiries with two-member sign-off.
              </p>
            </div>
            <Link
              to="/dashboard/ic"
              className="font-sans text-xs text-[#E0A96D] hover:underline pt-4 border-t border-[#1D244C] flex items-center gap-1"
            >
              Preview IC Workspace <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* HR Admin */}
          <div className="bg-[#13193A] border border-[#262E5F] p-6 rounded-[8px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-sans uppercase font-semibold text-[#E0A96D] tracking-wider">
                  Role 03
                </span>
                <span className="text-[10px] font-sans bg-[#0A0E28] border border-[#262E5F] px-2 py-0.5 rounded text-[#BDB9AD]">
                  Admin Credentials
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F4F1EB] mb-2">
                HR Administrator
              </h3>
              <p className="font-sans text-xs text-[#BDB9AD] leading-relaxed mb-4">
                Manages committee member rosters and tracks annual filing deadlines. Strictly barred by system rules from viewing any case content or patterns.
              </p>
            </div>
            <Link
              to="/dashboard/admin"
              className="font-sans text-xs text-[#E0A96D] hover:underline pt-4 border-t border-[#1D244C] flex items-center gap-1"
            >
              Preview Admin Console <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. WHY THEODRA VS STATUS QUO — Clean two-column comparison
          ════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-8 bg-[#13193A]/40 border-y border-[#262E5F]/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-sans text-[11px] font-semibold tracking-wider uppercase text-[#E0A96D] block mb-2">
              Why THEODRA
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#F4F1EB]">
              Traditional compliance vs. Early detection
            </h2>
          </div>

          <div className="border border-[#262E5F] rounded-[8px] overflow-hidden bg-[#13193A]">
            <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#262E5F] bg-[#1C234E]/60 text-xs font-sans font-bold uppercase tracking-wider">
              <div className="p-4 text-[#7A756B]">Workplace Safety Today</div>
              <div className="p-4 text-[#F0B83A] bg-[#262E5F]/30 border-t md:border-t-0 md:border-l border-[#262E5F]">
                With THEODRA Platform
              </div>
            </div>

            <div className="divide-y divide-[#262E5F]">
              {comparisonRows.map((row) => (
                <div key={row.aspect} className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#262E5F]">
                  <div className="p-4 sm:p-5">
                    <div className="text-[10px] uppercase tracking-wider text-[#7A756B] mb-1 font-sans">
                      {row.aspect}
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#BDB9AD]">
                      {row.today}
                    </p>
                  </div>
                  <div className="p-4 sm:p-5 bg-[#0A0E28]/40">
                    <div className="text-[10px] uppercase tracking-wider text-[#E0A96D] mb-1 font-sans">
                      {row.aspect}
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#F4F1EB] font-medium">
                      {row.theodra}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          6. FINAL CTA BAND — One line, one button, link to sales/demo
          ════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-8 text-center max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F1EB] mb-4">
          Bring proactive workplace protection to your enterprise.
        </h2>
        <p className="font-serif text-base sm:text-lg text-[#BDB9AD] mb-8 max-w-xl mx-auto">
          Schedule a confidential conversation to see how THEODRA integrates into your POSH compliance workflow.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setSalesModalOpen(true)}
            className="w-full sm:w-auto font-sans text-sm font-semibold bg-[#F0B83A] text-[#0A0E28] px-8 py-3.5 rounded-[8px] hover:bg-[#F0B83A]/90 transition-colors shadow-lg cursor-pointer"
          >
            Talk to Sales
          </button>
          <Link
            to="/login"
            className="w-full sm:w-auto font-sans text-sm font-medium border border-[#262E5F] text-[#BDB9AD] hover:text-[#F4F1EB] px-8 py-3.5 rounded-[8px] transition-colors"
          >
            Launch Interactive Demo
          </Link>
        </div>
      </section>

      {/* Talk to Sales Modal */}
      {salesModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0E28]/80 px-4 py-8 overflow-y-auto"
          onClick={() => setSalesModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#13193A] border border-[#262E5F] p-6 sm:p-8 rounded-[8px] text-[#F4F1EB] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {salesSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-[#F0B83A] mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold text-[#F4F1EB] mb-2">
                  Request Received
                </h3>
                <p className="font-sans text-xs text-[#BDB9AD] mb-6 leading-relaxed">
                  Thank you. A representative from our enterprise advisory team will reach out within one business day to coordinate a confidential briefing.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSalesModalOpen(false);
                    setSalesSubmitted(false);
                  }}
                  className="font-sans text-xs font-semibold bg-[#F0B83A] text-[#0A0E28] px-6 py-2 rounded-[6px]"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#F4F1EB] mb-2">
                  Talk to Enterprise Sales
                </h3>
                <p className="font-sans text-xs text-[#BDB9AD] mb-6">
                  Learn how THEODRA fits within your organization&apos;s POSH framework.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSalesSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block font-sans text-[11px] font-medium text-[#7A756B] uppercase mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Priya Sharma"
                      className="w-full bg-[#0A0E28] border border-[#262E5F] px-3 py-2 text-sm text-[#F4F1EB] rounded-[6px] focus:outline-none focus:border-[#F0B83A]"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-[11px] font-medium text-[#7A756B] uppercase mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="p.sharma@company.com"
                      className="w-full bg-[#0A0E28] border border-[#262E5F] px-3 py-2 text-sm text-[#F4F1EB] rounded-[6px] focus:outline-none focus:border-[#F0B83A]"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-[11px] font-medium text-[#7A756B] uppercase mb-1">
                      Organization &amp; Headcount
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Larsen Tech · 1,500 employees"
                      className="w-full bg-[#0A0E28] border border-[#262E5F] px-3 py-2 text-sm text-[#F4F1EB] rounded-[6px] focus:outline-none focus:border-[#F0B83A]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setSalesModalOpen(false)}
                      className="font-sans text-xs text-[#BDB9AD] hover:text-[#F4F1EB] px-4 py-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="font-sans text-xs font-semibold bg-[#F0B83A] text-[#0A0E28] px-5 py-2.5 rounded-[6px] hover:bg-[#F0B83A]/90 transition-colors cursor-pointer"
                    >
                      Submit Inquiry
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
