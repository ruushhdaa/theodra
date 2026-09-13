"use client";

import FadeIn from "@/components/FadeIn";
import { useState } from "react";

const DEPARTMENTS = [
  "Product Engineering", "Technology Operations", "Client Success",
  "People Operations", "Finance & Accounting", "Legal & Compliance",
  "Design Systems", "Data & Analytics", "Marketing & Growth",
  "Infrastructure & DevOps", "Research & Innovation",
];

const TIMEFRAMES = [
  "Week of 7 September 2026", "Week of 31 August 2026",
  "Week of 24 August 2026",   "Week of 17 August 2026",
  "Week of 10 August 2026",   "Week of 3 August 2026",
  "July 2026",                "April – June 2026",
  "October 2025 – March 2026","Earlier than October 2025",
];

const GUARANTEES = [
  { label: "No login or account", desc: "This form has no authentication. There is nothing to link to you." },
  { label: "No IP address stored", desc: "A temporary rate-limit token is created on submission and discarded within 24 hours. It cannot be used to identify you afterward." },
  { label: "No cookies or session storage", desc: "Nothing persists in your browser beyond this page visit." },
  { label: "No browser fingerprinting", desc: "THEODRA does not record your device, browser type, or screen resolution." },
  { label: "Week-level timestamps only", desc: "The exact time of your submission is never recorded — only the approximate week it arrived in." },
  { label: "Independent of detection system", desc: "Reports are not automatically cross-referenced with behavioral anomalies. The committee reviews them as a separate input." },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-6 h-px bg-midblue" />
      <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-text-muted">
        {children}
      </span>
    </div>
  );
}

export default function ReportPage() {
  const [text, setText] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed || text.trim().length < 30) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="pt-14 min-h-screen flex items-center justify-center px-6">
        <FadeIn className="max-w-lg w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-midblue" />
            <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-aqua">
              Received
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-text mb-4 leading-snug">
            Your report has been submitted.
          </h1>
          <p className="font-serif text-base text-text-sec leading-relaxed mb-8">
            The Internal Committee will review it in line with their obligations under the
            POSH Act 2013. No confirmation will be sent to you — this portal keeps no record
            of your contact details.
          </p>
          <div className="border border-midblue/40 bg-navy/50 px-5 py-3 inline-block" style={{ borderRadius: "2px" }}>
            <span className="font-sans text-xs text-text-muted">
              Submission token (non-persistent, discarded in 24h):{" "}
              <span className="text-teal font-medium tabular">
                ANON-{Math.random().toString(36).slice(2, 10).toUpperCase()}
              </span>
            </span>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="pt-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Page header */}
        <div className="pt-16 pb-10 max-w-2xl">
          <FadeIn>
            <Label>Anonymous Reporting</Label>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-text leading-tight mb-4">
              Report without a trace.
            </h1>
            <p className="font-serif text-xl text-text-sec leading-relaxed">
              No login. No IP logging. No cookies. No browser fingerprinting. This form
              operates entirely independently of the behavioral detection system.
            </p>
          </FadeIn>
        </div>

        <div className="h-px bg-midblue/30 mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 pb-16">

          {/* Form */}
          <FadeIn className="lg:col-span-3">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">

              <div>
                <label className="font-sans text-xs font-medium text-text-sec block mb-1.5">
                  Department{" "}
                  <span className="font-normal text-text-muted">
                    — select broadly, not your specific team
                  </span>
                </label>
                <select
                  required
                  className="w-full bg-navy border border-midblue/50 text-text-sec font-sans text-sm px-3 py-2.5 focus:outline-none focus:border-teal/60 transition-colors appearance-none"
                  style={{ borderRadius: "2px" }}
                >
                  <option value="" disabled>Select a department</option>
                  {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="font-sans text-xs font-medium text-text-sec block mb-1.5">
                  Approximate timeframe{" "}
                  <span className="font-normal text-text-muted">— week-level, no exact dates</span>
                </label>
                <select
                  required
                  className="w-full bg-navy border border-midblue/50 text-text-sec font-sans text-sm px-3 py-2.5 focus:outline-none focus:border-teal/60 transition-colors appearance-none"
                  style={{ borderRadius: "2px" }}
                >
                  <option value="" disabled>Select approximate period</option>
                  {TIMEFRAMES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="font-sans text-xs font-medium text-text-sec block mb-1.5">
                  Description
                </label>
                <textarea
                  required
                  minLength={30}
                  maxLength={3000}
                  rows={9}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Describe the pattern or behavior. Where possible, write in terms of what occurred rather than who was involved — this gives the IC useful context while reducing your own identification risk."
                  className="w-full bg-navy border border-midblue/50 text-text font-serif text-sm px-4 py-3 focus:outline-none focus:border-teal/60 transition-colors resize-y leading-relaxed placeholder:text-text-muted placeholder:font-sans placeholder:text-xs"
                  style={{ borderRadius: "2px" }}
                />
                <div className="flex justify-between mt-1">
                  <span className="font-sans text-[10px] text-text-muted">Minimum 30 characters</span>
                  <span className="font-sans text-[10px] tabular text-text-muted">{text.length} / 3000</span>
                </div>
              </div>

              {/* Stylometric risk notice */}
              <div className="border-l-2 border-midblue/50 pl-4 py-1">
                <div className="font-sans text-[10px] font-medium tracking-wider uppercase text-text-muted mb-1.5">
                  Limitation — Read Before Submitting
                </div>
                <p className="font-sans text-xs text-text-muted leading-relaxed">
                  This system cannot anonymize what you choose to write. If your description
                  contains specific names, project references, or incident details that only
                  a small number of people would know, the content itself may identify you —
                  regardless of the technical protections this portal applies. This is a known,
                  unsolved limitation of any free-text reporting system.
                </p>
              </div>

              {/* Agreement */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 shrink-0 accent-teal"
                />
                <span className="font-sans text-xs text-text-sec leading-relaxed">
                  I have read and understood the privacy guarantees and their limitations.
                  I am submitting this report voluntarily. I understand the Internal
                  Committee may act on it under the POSH Act 2013.
                </span>
              </label>

              <button
                type="submit"
                disabled={!agreed || text.trim().length < 30}
                className="font-sans text-sm font-medium bg-gold text-dark px-6 py-2.5 hover:bg-gold/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ borderRadius: "2px" }}
              >
                Submit anonymous report
              </button>

            </form>
          </FadeIn>

          {/* Privacy guarantees sidebar */}
          <FadeIn delay={0.06} className="lg:col-span-2">
            <div className="border border-midblue/40 bg-navy/50 p-6" style={{ borderRadius: "2px" }}>
              <div className="font-sans text-[10px] font-medium tracking-wider uppercase text-text-muted mb-5">
                Privacy Guarantees
              </div>
              <ul className="space-y-5">
                {GUARANTEES.map(({ label, desc }) => (
                  <li key={label}>
                    <div className="flex items-start gap-2">
                      <span className="text-aqua/70 text-xs mt-0.5 shrink-0">—</span>
                      <div>
                        <div className="font-sans text-xs font-medium text-text mb-0.5">{label}</div>
                        <p className="font-sans text-xs text-text-muted leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-midblue/30">
                <div className="font-sans text-[10px] font-medium tracking-wider uppercase text-text-muted mb-2">
                  What this portal does not do
                </div>
                <p className="font-sans text-xs text-text-muted leading-relaxed">
                  Reports submitted here are not automatically linked to behavioral anomalies
                  detected by the system. The IC reviews them as a separate, independent input.
                  This portal is not a substitute for a formal POSH complaint — it is an
                  additional, lower-friction channel for the IC's attention.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        <footer className="border-t border-midblue/30 py-8">
          <p className="font-sans text-[10px] text-text-muted">
            THEODRA · Anonymous Reporting Portal · POSH Act 2013 ·
            Built by Rushda Jagtap · B.Tech Computer Science & Engineering (Data Science)
          </p>
        </footer>

      </div>
    </div>
  );
}
