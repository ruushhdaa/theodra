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
} from "lucide-react";

export const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"detect" | "protect" | "resolve">("detect");

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
          <img
            src="/theodra-logo.png"
            alt="THEODRA Logo"
            className="h-20 w-auto mx-auto object-contain"
          />
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
            className="w-full sm:w-auto px-8 py-3.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>See How It Works</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/pricing"
            className="w-full sm:w-auto px-8 py-3.5 border border-[#304A78] text-[#F4F1EB] text-xs font-semibold uppercase tracking-wider hover:bg-[#2C3259] transition-colors flex items-center justify-center gap-2"
          >
            <span>Book a Demo</span>
          </Link>
        </div>

        {/* Trust Bar Below Hero: Three items in plain English */}
        <div className="mt-16 pt-8 border-t border-[#304A78] grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-4 bg-[#2C3259] border border-[#304A78] flex items-start gap-3">
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

          <div className="p-4 bg-[#2C3259] border border-[#304A78] flex items-start gap-3">
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

          <div className="p-4 bg-[#2C3259] border border-[#304A78] flex items-start gap-3">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#304A78]">
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
                className="bg-[#2C3259] border border-[#304A78] p-8 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-[#0A0E28] border border-[#304A78] flex items-center justify-center text-[#DDA162] mb-6">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#304A78]">
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
          <div className="inline-flex bg-[#2C3259] border border-[#304A78] p-1 gap-1">
            {(["detect", "protect", "resolve"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#DDA162] text-[#0A0E28]"
                    : "text-[#F4F1EB] hover:text-[#DDA162]"
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
        <div className="bg-[#2C3259] border border-[#304A78] p-8 sm:p-12 shadow-2xl max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs px-2 py-0.5 bg-[#0A0E28] text-[#DDA162] border border-[#304A78]">
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

          <div className="space-y-3 pt-6 border-t border-[#304A78]">
            {currentTabData.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-3 text-xs text-[#F4F1EB]">
                <div className="w-4 h-4 bg-[#0A0E28] border border-[#DDA162] text-[#DDA162] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Role Preview Section: Three Columns, one per role, each with a CTA into demo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#304A78]">
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
          <div className="bg-[#2C3259] border border-[#304A78] p-8 shadow-2xl flex flex-col justify-between">
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
              <div className="space-y-2 text-xs text-[#F4F1EB] mb-8">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#DDA162]" /> No corporate email needed
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#DDA162]" /> 8-character reference code
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#DDA162]" /> Quiet flag peer matching
                </div>
              </div>
            </div>

            <Link
              to="/report"
              className="w-full py-2.5 bg-[#0A0E28] border border-[#304A78] text-[#DDA162] text-xs font-bold uppercase tracking-wider hover:bg-[#DDA162] hover:text-[#0A0E28] transition-colors text-center"
            >
              Enter Employee Portal
            </Link>
          </div>

          {/* Role 2: IC Members */}
          <div className="bg-[#2C3259] border-2 border-[#DDA162] p-8 shadow-2xl flex flex-col justify-between relative">
            <span className="absolute -top-3 right-6 text-[10px] font-bold px-2 py-0.5 bg-[#DDA162] text-[#0A0E28] uppercase tracking-wider">
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
              <div className="space-y-2 text-xs text-[#F4F1EB] mb-8">
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
              className="w-full py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors text-center"
            >
              Demo IC Portal (ic@theodra.demo)
            </Link>
          </div>

          {/* Role 3: HR Admins */}
          <div className="bg-[#2C3259] border border-[#304A78] p-8 shadow-2xl flex flex-col justify-between">
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
              <div className="space-y-2 text-xs text-[#F4F1EB] mb-8">
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
              className="w-full py-2.5 bg-[#0A0E28] border border-[#304A78] text-[#F4F1EB] text-xs font-bold uppercase tracking-wider hover:bg-[#304A78] transition-colors text-center"
            >
              Demo HR Console (hr@theodra.demo)
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Old-Way vs New-Way Comparison Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#304A78]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold block mb-2">
            The Paradigm Shift
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F1EB]">
            The Old Way vs. THEODRA
          </h2>
        </div>

        <div className="bg-[#2C3259] border border-[#304A78] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#0A0E28] border-b border-[#304A78] text-[#A87C56] uppercase text-[10px] tracking-wider">
                  <th className="py-4 px-6 w-1/3">Core Dimension</th>
                  <th className="py-4 px-6 w-1/3">Traditional HR Tools & Hotlines</th>
                  <th className="py-4 px-6 w-1/3 text-[#DDA162]">THEODRA B2B Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#304A78]/60 font-serif">
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#F4F1EB] font-sans">Detection Timing</td>
                  <td className="py-4 px-6 text-[#A87C56]">100% reactive after trauma escalates</td>
                  <td className="py-4 px-6 text-[#EBBA4A] font-semibold">Weeks ahead via off-hours metadata telemetry</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#F4F1EB] font-sans">Privacy & Content Inspection</td>
                  <td className="py-4 px-6 text-[#A87C56]">Intrusive email / chat surveillance or blind forms</td>
                  <td className="py-4 px-6 text-[#DDA162]">Mathematical k-anonymity (k ≥ 5), zero words read</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#F4F1EB] font-sans">Employee Trust Barrier</td>
                  <td className="py-4 px-6 text-[#A87C56]">Single-reporter fear of career retaliation</td>
                  <td className="py-4 px-6 text-[#DDA162]">Quiet flag escrow matching & no account requirements</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#F4F1EB] font-sans">Statutory Separation of Duties</td>
                  <td className="py-4 px-6 text-[#A87C56]">HR admins see private case files and names</td>
                  <td className="py-4 px-6 text-[#DDA162]">Strict code guard: HR sees zero case/report data</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#F4F1EB] font-sans">Compliance Governance</td>
                  <td className="py-4 px-6 text-[#A87C56]">Manual spreadsheets prone to 90-day expiry</td>
                  <td className="py-4 px-6 text-[#EBBA4A] font-semibold">Automated statutory clocks & tamper-evident ledger</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Final CTA Band */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#304A78] text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F1EB] mb-4">
          Equip your organization with early detection today.
        </h2>
        <p className="font-serif text-sm text-[#A87C56] max-w-xl mx-auto leading-relaxed mb-8">
          Join forward-thinking corporate leadership adhering to POSH Act 2013 and DPDP Act 2023 with mathematical dignity.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/pricing"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors shadow-lg cursor-pointer"
          >
            Schedule Corporate Pilot
          </Link>
          <Link
            to="/why-theodra"
            className="w-full sm:w-auto px-8 py-3.5 border border-[#304A78] text-[#F4F1EB] text-xs font-semibold uppercase tracking-wider hover:bg-[#2C3259] transition-colors"
          >
            Read Technical Architecture
          </Link>
        </div>
      </section>
    </div>
  );
};
