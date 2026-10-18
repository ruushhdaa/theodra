import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  EyeOff,
  Users,
  Lock,
  ArrowRight,
  Check,
  AlertTriangle,
  Clock,
  FileCheck,
  Scale,
  Activity,
  HeartPulse,
  Sparkles,
  KeyRound,
  FileText,
  ShieldCheck,
  Cpu,
} from "lucide-react";

export const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"detect" | "protect" | "resolve">("detect");
  const [telemetryMode, setTelemetryMode] = useState<"theodra" | "invasive">("theodra");

  const problemCards = [
    {
      title: "Most incidents are never formally reported",
      desc: "Employees stay silent out of fear of career retaliation, seniority pressure, or isolation. Less than 15% of workplace pressure ever reaches an official complaint form.",
      icon: AlertTriangle,
    },
    {
      title: "By the time a complaint arrives, the damage is done",
      desc: "Internal Committees are legally forced to react only after traumatic escalation, leaving them entirely blind to months of compounding after-hours pressure.",
      icon: Clock,
    },
    {
      title: "Standard HR software offers zero early warning",
      desc: "Traditional HR tools manage passive leave slips and annual policy PDFs. They cannot notice behavioral anomalies, response imbalances, or team exclusion.",
      icon: FileCheck,
    },
  ];

  const howItWorksTabs = {
    detect: {
      num: "01",
      title: "Detect Telemetry Anomalies",
      subtitle: "Notice communication stress without inspecting words",
      description:
        "THEODRA continuously analyzes interaction metadata — such as sudden spikes in late-night direct messaging, response delay imbalances across role hierarchies, and weekend call surges. Zero message bodies, attachments, or audio recordings are ever ingested or read.",
      features: [
        "Tracks off-hours messaging density (9:30 PM – 7:00 AM)",
        "Measures response delay pressure across seniority gradients",
        "Zero message text, emails, or call audio is ever stored",
      ],
    },
    protect: {
      num: "02",
      title: "Group-Level Privacy Guarantee",
      subtitle: "k-Anonymity ensures individual immunity",
      description:
        "Under strict mathematical k-anonymity (k ≥ 5), no pattern is ever surfaced to an IC reviewer unless at least five distinct individuals share that same behavioral dynamic. Individual employees cannot be singled out, deanonymized, or subjected to surveillance.",
      features: [
        "Minimum 5-person privacy rule strictly enforced",
        "Two-vote IC consensus required before any cohort escalation",
        "Zero tracking cookies or IP logging on employee reporting portals",
      ],
    },
    resolve: {
      num: "03",
      title: "Report & Resolve with Integrity",
      subtitle: "Statutory governance built for India's POSH Act",
      description:
        "Equips Internal Committee members with a structured 90-day compliance clock, an immutable response ledger, two-way anonymous chat channels, and an automated Retaliation Shield that watches for punitive demotions or appraisal freezes.",
      features: [
        "Automated 90-day inquiry countdowns preventing statutory default",
        "Two-way anonymous reporter dialogue without account logins",
        "Retaliation Shield protecting employees from retaliatory appraisal cuts",
      ],
    },
  };

  const currentTabData = howItWorksTabs[activeTab];

  return (
    <div className="bg-[#0A0E28] text-[#F4F1EB]">
      {/* 1. Hero Section: Full-width dark section, THEODRA logo centered above headline */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        {/* Centered Logo */}
        <div className="mb-6 inline-block">
          <Link to="/" title="THEODRA Platform" className="group block">
            <img
              src="/theodra-logo.png"
              alt="THEODRA Logo"
              className="h-20 w-auto mx-auto object-contain rounded-xl transition-transform group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Headline in Lora */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F4F1EB] leading-tight max-w-4xl mx-auto">
          Your Internal Committee deserves to know before it's too late.
        </h1>

        {/* Subheadline in Plus Jakarta Sans */}
        <p className="font-sans text-base sm:text-lg text-[#F4F1EB] opacity-90 mt-6 max-w-2xl mx-auto leading-relaxed">
          THEODRA gives IC members an early warning — without reading a single message.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/how-it-works"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#EBBA4A] transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>See How It Works</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/employee/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0A0E28] border border-[#262E5F] text-[#F4F1EB] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#262E5F] hover:text-[#DDA162] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Shield className="w-4 h-4 text-[#EBBA4A]" />
            <span>Open Employee Portal</span>
          </Link>
        </div>

        {/* Trust Bar Below Hero */}
        <div className="mt-16 pt-8 border-t border-[#262E5F] grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-5 bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F] rounded-xl transition-colors flex items-start gap-3.5 shadow-md">
            <EyeOff className="w-5 h-5 text-[#DDA162] shrink-0 mt-0.5" />
            <div>
              <span className="font-serif text-xs font-bold text-[#F4F1EB] block">
                Metadata only, never message content
              </span>
              <p className="font-serif text-[11px] text-[#A87C56] mt-0.5 leading-relaxed">
                We monitor interaction timing and volume rhythms, never email text, chats, or audio.
              </p>
            </div>
          </div>

          <div className="p-5 bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F] rounded-xl transition-colors flex items-start gap-3.5 shadow-md">
            <Users className="w-5 h-5 text-[#DDA162] shrink-0 mt-0.5" />
            <div>
              <span className="font-serif text-xs font-bold text-[#F4F1EB] block">
                Privacy-grouped: minimum 5 people
              </span>
              <p className="font-serif text-[11px] text-[#A87C56] mt-0.5 leading-relaxed">
                Mathematical k-anonymity ensures no pattern surfaces until at least 5 people share it.
              </p>
            </div>
          </div>

          <div className="p-5 bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F] rounded-xl transition-colors flex items-start gap-3.5 shadow-md">
            <Scale className="w-5 h-5 text-[#DDA162] shrink-0 mt-0.5" />
            <div>
              <span className="font-serif text-xs font-bold text-[#F4F1EB] block">
                Built for the POSH Act 2013
              </span>
              <p className="font-serif text-[11px] text-[#A87C56] mt-0.5 leading-relaxed">
                Engineered specifically for India's Internal Committees and annual Section 21 reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Problem Section (3 Cards) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#262E5F]">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold block mb-2">
            The Structural Challenge
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F1EB]">
            Workplace harassment is invisible until it causes crisis.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problemCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F] p-8 rounded-2xl shadow-xl flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  <div className="w-12 h-12 bg-[#11173D] border border-[#262E5F] rounded-xl flex items-center justify-center text-[#DDA162] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#F4F1EB] mb-3 leading-snug">
                    {card.title}
                  </h3>
                  <p className="font-serif text-xs text-[#A87C56] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. How It Works (Tabbed: Detect / Protect / Report & Resolve) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#262E5F]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold block mb-2">
            Architectural Workflow
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F1EB]">
            How THEODRA Operates
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-[#0A0E28] border border-[#262E5F] p-1.5 rounded-xl gap-1.5">
            {(["detect", "protect", "resolve"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#DDA162] text-[#0A0E28] shadow-md"
                    : "text-[#F4F1EB] hover:bg-[#262E5F] hover:text-[#DDA162]"
                }`}
              >
                {tab === "detect" && "1. Detect"}
                {tab === "protect" && "2. Protect"}
                {tab === "resolve" && "3. Report & Resolve"}
              </button>
            ))}
          </div>
        </div>

        {/* Active Tab Panel */}
        <div className="bg-[#0A0E28] border border-[#262E5F] p-8 sm:p-12 rounded-2xl shadow-2xl max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs px-2.5 py-0.5 bg-[#11173D] text-[#DDA162] border border-[#262E5F] rounded-md font-semibold">
              Stage {currentTabData.num}
            </span>
            <span className="font-serif text-xs text-[#A87C56] uppercase tracking-wider">
              {currentTabData.subtitle}
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F4F1EB] mt-2 mb-4">
            {currentTabData.title}
          </h3>

          <p className="font-serif text-sm text-[#F4F1EB] opacity-90 leading-relaxed mb-8">
            {currentTabData.description}
          </p>

          <div className="space-y-3 pt-6 border-t border-[#262E5F]">
            {currentTabData.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-3 text-xs text-[#F4F1EB]">
                <div className="w-5 h-5 bg-[#11173D] border border-[#DDA162] text-[#DDA162] rounded-md flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Role Preview Section: Three Columns, one per role */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#262E5F]">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold block mb-2">
            Tailored User Interfaces
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F1EB]">
            Built for Three Distinct Roles
          </h2>
          <p className="font-serif text-xs text-[#A87C56] mt-2">
            Strict separation of duties enforced at the code and routing level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Role 1: Employees */}
          <div className="bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F]/50 p-8 rounded-2xl shadow-xl flex flex-col justify-between transition-all">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#DDA162] block mb-2">
                Public Gateway • No Login
              </span>
              <h3 className="font-serif text-xl font-bold text-[#F4F1EB] mb-3">
                Employees & Contractors
              </h3>
              <p className="font-serif text-xs text-[#A87C56] leading-relaxed mb-6">
                Zero-account anonymous reporting, two-way encrypted case tracker, quiet flag escrow matching, and know-your-rights education.
              </p>
              <div className="space-y-2.5 text-xs text-[#F4F1EB] mb-8">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#DDA162]" /> Dedicated Employee Dashboard
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#DDA162]" /> 8-character reference code tracker
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#DDA162]" /> Quiet flag peer matching
                </div>
              </div>
            </div>

            <Link
              to="/employee/dashboard"
              className="w-full py-3 bg-[#0A0E28] border border-[#262E5F] hover:border-[#DDA162] text-[#DDA162] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#DDA162] hover:text-[#0A0E28] transition-colors text-center cursor-pointer"
            >
              Enter Employee Portal
            </Link>
          </div>

          {/* Role 2: IC Members */}
          <div className="bg-[#0A0E28] border-2 border-[#DDA162] hover:bg-[#262E5F]/50 p-8 rounded-2xl shadow-xl flex flex-col justify-between relative transition-all">
            <span className="absolute -top-3 right-6 text-[10px] font-bold px-2.5 py-0.5 bg-[#DDA162] text-[#0A0E28] uppercase tracking-wider rounded-full shadow-sm">
              Statutory Quasi-Judicial
            </span>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#EBBA4A] block mb-2">
                Presiding Officer & Members
              </span>
              <h3 className="font-serif text-xl font-bold text-[#F4F1EB] mb-3">
                Internal Committee
              </h3>
              <p className="font-serif text-xs text-[#A87C56] leading-relaxed mb-6">
                Cohort pattern detection tables, 3-metric weekly telemetry charts, case Kanban board, statutory compliance clock, and response ledger.
              </p>
              <div className="space-y-2.5 text-xs text-[#F4F1EB] mb-8">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#EBBA4A]" /> Two-vote escalation protocol
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#EBBA4A]" /> 90-day inquiry countdowns
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#EBBA4A]" /> Immutable response ledger
                </div>
              </div>
            </div>

            <Link
              to="/ic/login"
              className="w-full py-3 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#EBBA4A] transition-colors text-center cursor-pointer shadow-md"
            >
              Demo IC Portal (ic@theodra.demo)
            </Link>
          </div>

          {/* Role 3: HR Admins */}
          <div className="bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F]/50 p-8 rounded-2xl shadow-xl flex flex-col justify-between transition-all">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#DDA162] block mb-2">
                Executive Oversight
              </span>
              <h3 className="font-serif text-xl font-bold text-[#F4F1EB] mb-3">
                HR & Compliance Admins
              </h3>
              <p className="font-serif text-xs text-[#A87C56] leading-relaxed mb-6">
                67/100 organisation health score, peer benchmark comparisons, department wellness heatmaps, annual report generator, and retaliation shield.
              </p>
              <div className="space-y-2.5 text-xs text-[#F4F1EB] mb-8">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#DDA162]" /> Zero individual case access
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#DDA162]" /> Auto-compiled Form A report
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#DDA162]" /> Retaliation Shield monitoring
                </div>
              </div>
            </div>

            <Link
              to="/hr/login"
              className="w-full py-3 bg-[#0A0E28] border border-[#262E5F] hover:border-[#DDA162] text-[#F4F1EB] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#262E5F] hover:text-[#DDA162] transition-colors text-center cursor-pointer"
            >
              Demo HR Console (hr@theodra.demo)
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Modern Interactive Architecture Showcase (Replaces Old Comparison Matrix) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#262E5F]">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold block mb-2">
            Technological Foundation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F1EB]">
            The Architecture of Mathematical Trust
          </h2>
          <p className="font-serif text-xs text-[#A87C56] mt-2">
            How THEODRA protects individual civil liberties while surfacing institutional risk.
          </p>
        </div>

        {/* Live Interactive Telemetry Simulator Widget */}
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 sm:p-8 shadow-2xl mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#262E5F] gap-4">
            <div>
              <span className="text-[11px] font-mono text-[#DDA162] uppercase tracking-wider font-semibold">
                Interactive Demonstration
              </span>
              <h3 className="font-serif text-lg font-bold text-[#F4F1EB] mt-0.5">
                Compare Telemetry Mechanics in Real Time
              </h3>
            </div>
            {/* Mode Switcher */}
            <div className="inline-flex bg-[#11173D] border border-[#262E5F] p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setTelemetryMode("theodra")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  telemetryMode === "theodra"
                    ? "bg-[#DDA162] text-[#0A0E28] shadow-sm"
                    : "text-[#A87C56] hover:text-[#F4F1EB]"
                }`}
              >
                THEODRA Zero-Knowledge
              </button>
              <button
                type="button"
                onClick={() => setTelemetryMode("invasive")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  telemetryMode === "invasive"
                    ? "bg-rose-900/80 text-rose-200 border border-rose-600 shadow-sm"
                    : "text-[#A87C56] hover:text-[#F4F1EB]"
                }`}
              >
                Traditional Spyware
              </button>
            </div>
          </div>

          {/* Interactive Simulation View */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#0E1438] border border-[#262E5F] rounded-xl">
              <div className="flex items-center gap-2 mb-2 text-[#DDA162]">
                <Cpu className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Data Ingestion</span>
              </div>
              <p className="text-xs font-mono text-[#F4F1EB]/90 leading-relaxed">
                {telemetryMode === "theodra" ? (
                  <span className="text-emerald-400">
                    BLIND VECTORS: 23:42 IST · 4 msgs · Delta: 4.8h. Zero text, no sender/recipient strings parsed.
                  </span>
                ) : (
                  <span className="text-rose-400">
                    INVASIVE: Full Slack chat body & attachments extracted, keywords scanned by HR admin.
                  </span>
                )}
              </p>
            </div>

            <div className="p-5 bg-[#0E1438] border border-[#262E5F] rounded-xl">
              <div className="flex items-center gap-2 mb-2 text-[#DDA162]">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Privacy Protection</span>
              </div>
              <p className="text-xs font-mono text-[#F4F1EB]/90 leading-relaxed">
                {telemetryMode === "theodra" ? (
                  <span className="text-[#DDA162]">
                    k-Anonymity Verified (k ≥ 5): Cohort must contain at least 5 peers before committee signal appears.
                  </span>
                ) : (
                  <span className="text-rose-400">
                    Zero Anonymity: Individual employee name, profile picture, and private messages logged in plain view.
                  </span>
                )}
              </p>
            </div>

            <div className="p-5 bg-[#0E1438] border border-[#262E5F] rounded-xl">
              <div className="flex items-center gap-2 mb-2 text-[#DDA162]">
                <KeyRound className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Escalation Authority</span>
              </div>
              <p className="text-xs font-mono text-[#F4F1EB]/90 leading-relaxed">
                {telemetryMode === "theodra" ? (
                  <span className="text-[#EBBA4A]">
                    Bilateral Consensus: Requires 2 of 2 statutory IC members to cast independent digital authorization votes.
                  </span>
                ) : (
                  <span className="text-rose-400">
                    Unilateral Access: Single manager or IT staff can inspect private communication without audit trail.
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Three Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F] rounded-2xl shadow-xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#11173D] border border-[#262E5F] text-[#DDA162] flex items-center justify-center mb-4">
              <EyeOff className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#F4F1EB] mb-2">
              Zero-Content Mathematical Blindness
            </h4>
            <p className="text-xs text-[#A87C56] leading-relaxed">
              Proprietary entropy filters extract only interaction rhythms — response latency, off-hours clustering, and group exclusion — without ever ingesting natural language text.
            </p>
          </div>

          <div className="p-6 bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F] rounded-2xl shadow-xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#11173D] border border-[#262E5F] text-[#EBBA4A] flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#F4F1EB] mb-2">
              Quiet Escrow Peer Matching
            </h4>
            <p className="text-xs text-[#A87C56] leading-relaxed">
              Allows hesitant employees to lodge quiet flags that only reveal if another colleague reports the same perpetrator or team, dissolving the fear of solitary whistleblowing.
            </p>
          </div>

          <div className="p-6 bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F] rounded-2xl shadow-xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#11173D] border border-[#262E5F] text-[#DDA162] flex items-center justify-center mb-4">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#F4F1EB] mb-2">
              Section 65B Certified Ledger
            </h4>
            <p className="text-xs text-[#A87C56] leading-relaxed">
              Every committee action, notice, and disposition is sealed with SHA-256 cryptographic hashes, guaranteeing court-admissibility under the Indian Evidence Act.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Final CTA Band */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#262E5F] text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F1EB] mb-4">
          Equip your organization with early detection today.
        </h2>
        <p className="font-serif text-sm text-[#A87C56] max-w-xl mx-auto leading-relaxed mb-8">
          Join forward-thinking corporate leadership adhering to POSH Act 2013 and DPDP Act 2023 with mathematical dignity.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/pricing"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#EBBA4A] transition-colors shadow-lg cursor-pointer"
          >
            Schedule Corporate Pilot
          </Link>
          <Link
            to="/employee/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0A0E28] border border-[#262E5F] text-[#F4F1EB] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#262E5F] hover:text-[#DDA162] transition-colors"
          >
            Explore Employee Portal
          </Link>
        </div>
      </section>
    </div>
  );
};
