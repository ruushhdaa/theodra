"use client";

import { openBriefingModal } from "./BriefingModal";
import Link from "next/link";

export default function CtaBand() {
  return (
    <section className="py-20 border-t border-midblue/40 bg-navy/60">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-px bg-gold" />
          <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-text-muted">
            Institutional Adoption
          </span>
          <div className="w-6 h-px bg-gold" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text leading-tight mb-4">
          Talk to us about bringing THEODRA to your organization
        </h2>

        <p className="font-serif text-base text-text-sec max-w-2xl mx-auto leading-relaxed mb-8">
          We work quietly with corporate HR departments, General Counsel, and Internal Committees to evaluate how privacy-preserving early warning integrates into your existing POSH compliance structure.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={openBriefingModal}
            className="font-sans text-xs font-medium bg-gold text-dark px-6 py-3 hover:bg-gold/90 transition-colors cursor-pointer"
            style={{ borderRadius: "2px" }}
          >
            Schedule a Confidential Briefing
          </button>
          <Link
            href="/system"
            className="font-sans text-xs font-medium border border-midblue text-text-sec px-6 py-3 hover:border-teal/50 hover:text-text transition-colors"
            style={{ borderRadius: "2px" }}
          >
            Review System Architecture
          </Link>
        </div>

        <p className="font-sans text-[11px] text-text-muted mt-6">
          Non-commercial research project · No spam · Strict mutual confidentiality
        </p>
      </div>
    </section>
  );
}
