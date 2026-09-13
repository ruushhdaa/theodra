"use client";

import { useState } from "react";
import Link from "next/link";

export default function PlatformLifecycleTabs() {
  const [activeTab, setActiveTab] = useState<"detect" | "protect" | "resolve">("detect");

  const tabs = [
    {
      id: "detect" as const,
      number: "01",
      name: "Detect",
      title: "Notice communication stress without reading words",
      tagline: "Behavioral patterns, never message content",
      body: "THEODRA notices unusual patterns in how people communicate — never what they actually say. The system examines interaction rhythms across organizational channels: after-hours communication frequency, sharp changes in response delays, and significant hierarchy gaps between senior and junior staff. Because it never inspects message content, employee communication remains private.",
      highlights: [
        { label: "Timing Rhythms", detail: "Spikes in late-night or weekend messages between unequal roles" },
        { label: "Response Dynamics", detail: "Persistent one-way delays indicating conversational pressure" },
        { label: "Content Shield", detail: "Zero message text, attachments, or phone audio are ever ingested" },
      ],
    },
    {
      id: "protect" as const,
      number: "02",
      name: "Protect",
      title: "Group-level protection before any human reviews",
      tagline: "Minimum 5-person privacy threshold",
      body: "We only ever show a pattern once it involves enough people that no single individual could be identified from it. Before any alert is presented to the Internal Committee, names and personal details are stripped away, and records are grouped together. If a pattern involves fewer than five people, it is automatically withheld from view so that no one is ever singled out.",
      highlights: [
        { label: "Minimum Group Size", detail: "At least 5 individuals must share a pattern for it to appear" },
        { label: "Identity Redaction", detail: "Names, emails, and identifiers replaced by broad role bands" },
        { label: "Automatic Withholding", detail: "Small, uniquely identifiable groups are completely suppressed" },
      ],
    },
    {
      id: "resolve" as const,
      number: "03",
      name: "Report & Resolve",
      title: "Dual human authorization for every committee action",
      tagline: "Multi-party consensus, zero automated punishment",
      body: "The Internal Committee reviews anonymized patterns alongside an independent employee reporting portal. The software never accuses anyone or imposes automated penalties. When the committee determines an issue requires follow-up, no single person can act alone: at least two committee members must independently agree before any further inquiry can proceed.",
      highlights: [
        { label: "Dual Authorization", detail: "Escalation requires sign-off from at least two committee members" },
        { label: "Parallel Anonymous Channel", detail: "Employees can privately report concerns from their mobile devices" },
        { label: "Statutory Integrity", detail: "Preserves the formal inquiry procedures mandated under the POSH Act" },
      ],
    },
  ];

  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="py-20 border-t border-midblue/30 bg-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-px bg-gold" />
          <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-text-muted">
            The Three-Stage Architecture
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text leading-tight mb-4">
          How THEODRA protects your organization
        </h2>
        <p className="font-serif text-base text-text-sec max-w-2xl mb-10 leading-relaxed">
          A calm, privacy-preserving progression from quiet pattern detection to group privacy protection and dual-signoff resolution.
        </p>

        {/* Horizontal Tabs (ZingHR-style horizontal interaction) */}
        <div className="border-b border-midblue/40 flex overflow-x-auto scrollbar-none gap-2 sm:gap-4 mb-8">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={[
                  "font-sans text-xs sm:text-sm font-medium py-3 px-4 sm:px-6 transition-colors border-b-2 flex items-center gap-2.5 whitespace-nowrap cursor-pointer",
                  isActive
                    ? "border-gold text-text bg-navy/60"
                    : "border-transparent text-text-muted hover:text-text-sec hover:border-midblue/60",
                ].join(" ")}
                style={{ borderRadius: "2px 2px 0 0" }}
              >
                <span className={`text-[11px] tabular ${isActive ? "text-gold" : "text-text-muted"}`}>
                  {tab.number}
                </span>
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div
          className="border border-midblue/40 bg-navy/40 p-6 sm:p-10"
          style={{ borderRadius: "2px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Narrative */}
            <div className="lg:col-span-7">
              <div className="font-sans text-xs font-medium text-teal uppercase tracking-wider mb-2">
                {current.tagline}
              </div>
              <h3 className="font-serif text-2xl font-bold text-text mb-4">
                {current.title}
              </h3>
              <p className="font-serif text-base text-text-sec leading-relaxed mb-6">
                {current.body}
              </p>
              <Link
                href="/system"
                className="font-sans text-xs font-medium text-teal hover:text-aqua transition-colors inline-flex items-center gap-1.5"
              >
                View full technical workflow & governance safeguards →
              </Link>
            </div>

            {/* Right: Key Institutional Safeguards */}
            <div className="lg:col-span-5 bg-dark/60 border border-midblue/40 p-5 space-y-4" style={{ borderRadius: "2px" }}>
              <div className="font-sans text-[10px] font-medium uppercase tracking-wider text-text-muted border-b border-midblue/30 pb-2">
                Safeguards in this layer
              </div>
              {current.highlights.map((h) => (
                <div key={h.label} className="space-y-1">
                  <div className="font-serif text-xs font-bold text-text">
                    {h.label}
                  </div>
                  <div className="font-sans text-xs text-text-sec leading-relaxed">
                    {h.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
