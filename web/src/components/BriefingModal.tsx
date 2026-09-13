"use client";

import { useEffect, useState } from "react";

export function openBriefingModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-theodra-briefing"));
  }
}

export default function BriefingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    role: "HR Leadership",
    headcount: "250 – 1,000 employees",
    message: "",
  });

  useEffect(() => {
    function handleOpen() {
      setIsOpen(true);
      setSubmitted(false);
    }
    window.addEventListener("open-theodra-briefing", handleOpen);
    return () => window.removeEventListener("open-theodra-briefing", handleOpen);
  }, []);

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/80 px-4 py-8 overflow-y-auto"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-xl bg-navy border border-midblue/60 p-6 sm:p-8 text-text relative my-auto shadow-2xl"
        style={{ borderRadius: "2px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 text-text-muted hover:text-text font-sans text-xs uppercase tracking-wider transition-colors"
          aria-label="Close dialog"
        >
          Close [Esc]
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="font-serif text-2xl font-bold text-text">
              Briefing Request Received
            </div>
            <p className="font-serif text-sm text-text-sec max-w-md mx-auto leading-relaxed">
              Thank you for reaching out. A senior member of our team will review your organization&apos;s profile and reach out to {form.email || "you"} within one business day to coordinate a confidential briefing.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="font-sans text-xs font-medium bg-gold text-dark px-6 py-2.5 hover:bg-gold/90 transition-colors"
                style={{ borderRadius: "2px" }}
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-px bg-gold" />
              <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-gold">
                Institutional Briefing
              </span>
            </div>

            <h2 className="font-serif text-2xl font-bold text-text mb-2">
              Talk to us about bringing THEODRA to your organization
            </h2>
            <p className="font-serif text-sm text-text-sec mb-6 leading-relaxed">
              Schedule a quiet, non-commercial consultation for your HR department or Internal Committee to learn how early pattern awareness operates under Indian POSH compliance.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[11px] font-medium uppercase tracking-wider text-text-muted mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full bg-dark/80 border border-midblue/50 px-3 py-2 text-sm text-text font-sans focus:outline-none focus:border-teal"
                    style={{ borderRadius: "2px" }}
                  />
                </div>
                <div>
                  <label className="block font-sans text-[11px] font-medium uppercase tracking-wider text-text-muted mb-1.5">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="p.sharma@organization.com"
                    className="w-full bg-dark/80 border border-midblue/50 px-3 py-2 text-sm text-text font-sans focus:outline-none focus:border-teal"
                    style={{ borderRadius: "2px" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[11px] font-medium uppercase tracking-wider text-text-muted mb-1.5">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    required
                    value={form.org}
                    onChange={(e) => setForm({ ...form, org: e.target.value })}
                    placeholder="e.g. Larsen & Enterprise Ltd."
                    className="w-full bg-dark/80 border border-midblue/50 px-3 py-2 text-sm text-text font-sans focus:outline-none focus:border-teal"
                    style={{ borderRadius: "2px" }}
                  />
                </div>
                <div>
                  <label className="block font-sans text-[11px] font-medium uppercase tracking-wider text-text-muted mb-1.5">
                    Your Role
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full bg-dark/80 border border-midblue/50 px-3 py-2 text-sm text-text font-sans focus:outline-none focus:border-teal"
                    style={{ borderRadius: "2px" }}
                  >
                    <option value="HR Leadership">Chief Human Resources Officer / VP HR</option>
                    <option value="IC Presiding Officer">Internal Committee Presiding Officer</option>
                    <option value="IC Member">Internal Committee Member</option>
                    <option value="Legal & Compliance">General Counsel / Compliance Officer</option>
                    <option value="People Operations">People Operations Manager</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-sans text-[11px] font-medium uppercase tracking-wider text-text-muted mb-1.5">
                  Approximate Employee Count
                </label>
                <select
                  value={form.headcount}
                  onChange={(e) => setForm({ ...form, headcount: e.target.value })}
                  className="w-full bg-dark/80 border border-midblue/50 px-3 py-2 text-sm text-text font-sans focus:outline-none focus:border-teal"
                  style={{ borderRadius: "2px" }}
                >
                  <option value="Under 250 employees">Under 250 employees</option>
                  <option value="250 – 1,000 employees">250 – 1,000 employees</option>
                  <option value="1,000 – 5,000 employees">1,000 – 5,000 employees</option>
                  <option value="5,000+ employees">5,000+ employees</option>
                </select>
              </div>

              <div>
                <label className="block font-sans text-[11px] font-medium uppercase tracking-wider text-text-muted mb-1.5">
                  Specific Questions or Governance Priorities (Optional)
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Share any specific requirements regarding your Internal Committee workflow, POSH compliance cycle, or workforce privacy expectations."
                  className="w-full bg-dark/80 border border-midblue/50 px-3 py-2 text-sm text-text font-sans focus:outline-none focus:border-teal resize-none"
                  style={{ borderRadius: "2px" }}
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <p className="font-sans text-[10px] text-text-muted max-w-xs leading-tight">
                  Zero spam. All discussions are confidential and conducted under non-disclosure terms.
                </p>
                <button
                  type="submit"
                  className="font-sans text-xs font-medium bg-gold text-dark px-5 py-2.5 hover:bg-gold/90 transition-colors shrink-0"
                  style={{ borderRadius: "2px" }}
                >
                  Request Briefing
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
