import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft, Check, CheckCircle2, Lock, Users } from "lucide-react";

export const ReportQuietFlagPage: React.FC = () => {
  const [department, setDepartment] = useState("Platform Engineering");
  const [seniority, setSeniority] = useState("Department Head / Director");
  const [concerns, setConcerns] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const concernOptions = [
    "Verbal harassment",
    "Inappropriate messages",
    "Unwanted contact",
    "Exclusion",
    "Intimidation",
    "Abuse of authority",
    "Other",
  ];

  const handleToggleConcern = (c: string) => {
    setConcerns((prev) =>
      prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (concerns.length > 0) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-[#0A0E28] text-[#F4F1EB] min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back Link */}
        <Link
          to="/report"
          className="inline-flex items-center gap-2 text-xs text-[#A87C56] hover:text-[#DDA162] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Anonymous Portal</span>
        </Link>

        {/* Card Header */}
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#0E1438] border border-[#262E5F] flex items-center justify-center text-[#DDA162]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#DDA162]">
                Escrow Matching System
              </span>
              <h1 className="font-serif text-2xl font-bold text-[#F4F1EB]">Quiet Flag</h1>
            </div>
          </div>

          {/* Plain English Explanation */}
          <div className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl text-xs text-[#F4F1EB] leading-relaxed my-4 space-y-2">
            <p className="font-semibold text-[#DDA162]">How Quiet Flag Works:</p>
            <p className="text-[#F4F1EB] opacity-90">
              Flag a concern quietly. Nothing happens until at least one other person flags the same team or individual independently. When that happens, the IC receives only a count — never your identity.
            </p>
            <div className="pt-2 flex items-center gap-4 text-[11px] text-[#A87C56]">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#DDA162]" /> Independent Escrow
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#DDA162]" /> Aggregate Threshold Count
              </span>
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5 mt-6">
              {/* Department */}
              <div>
                <label className="block text-xs font-semibold text-[#F4F1EB] mb-1.5">
                  Department or Team of Concern
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl px-3.5 py-2.5 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
                >
                  <option value="Platform Engineering">Platform Engineering</option>
                  <option value="Enterprise Sales">Enterprise Sales & Commercial</option>
                  <option value="Product Design Systems">Product Design Systems</option>
                  <option value="Corporate Finance & Treasury">Corporate Finance & Treasury</option>
                  <option value="Operations & Logistics">Operations & Logistics</option>
                  <option value="Legal & Regulatory">Legal & Regulatory</option>
                  <option value="Talent Operations & HR">Talent Operations & HR</option>
                  <option value="Cloud Infrastructure & DevOps">Cloud Infrastructure & DevOps</option>
                </select>
              </div>

              {/* Role / Seniority Level (NOT Name) */}
              <div>
                <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                  Seniority Level of Person of Concern (Do not enter their name)
                </label>
                <p className="text-[11px] text-[#A87C56] mb-2">
                  To protect anonymity and privacy, identify role seniority only.
                </p>
                <select
                  value={seniority}
                  onChange={(e) => setSeniority(e.target.value)}
                  className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl px-3.5 py-2.5 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
                >
                  <option value="VP / Executive Leadership">VP / Executive Leadership</option>
                  <option value="Department Head / Director">Department Head / Director</option>
                  <option value="Team Lead / Engineering Manager">Team Lead / Engineering Manager</option>
                  <option value="Senior Individual Contributor">Senior Individual Contributor</option>
                  <option value="Peer Colleague">Peer Colleague</option>
                  <option value="External Contractor / Client">External Contractor / Client</option>
                </select>
              </div>

              {/* Nature of concern */}
              <div>
                <label className="block text-xs font-semibold text-[#F4F1EB] mb-2">
                  Nature of Concern (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {concernOptions.map((opt) => {
                    const isChecked = concerns.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleToggleConcern(opt)}
                        className={`p-2.5 text-left rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                          isChecked
                            ? "bg-[#0E1438] border-[#DDA162] text-[#DDA162]"
                            : "bg-[#0E1438]/60 border-[#262E5F] text-[#F4F1EB] hover:border-[#DDA162]"
                        }`}
                      >
                        <span>{opt}</span>
                        <div
                          className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                            isChecked
                              ? "border-[#DDA162] bg-[#DDA162] text-[#0A0E28]"
                              : "border-[#262E5F]"
                          }`}
                        >
                          {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-[#262E5F]">
                <button
                  type="submit"
                  disabled={concerns.length === 0}
                  className="w-full py-3 bg-[#DDA162] text-[#0A0E28] text-xs font-bold tracking-wider uppercase hover:bg-[#EBBA4A] rounded-xl transition-colors disabled:opacity-40 cursor-pointer shadow-md"
                >
                  Record Quiet Flag
                </button>
              </div>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0E1438] border border-[#DDA162] mx-auto flex items-center justify-center text-[#DDA162]">
                <CheckCircle2 className="w-8 h-8 text-[#EBBA4A]" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#F4F1EB]">
                Your flag has been recorded.
              </h2>
              <p className="font-serif text-xs text-[#F4F1EB] opacity-90 max-w-md mx-auto leading-relaxed">
                If another person independently flags the same pattern, the IC will be notified of the count only. Your identity remains unrecorded and completely sealed in cryptographic escrow.
              </p>
              <div className="pt-4">
                <Link
                  to="/report"
                  className="inline-block px-6 py-2.5 bg-[#0E1438] border border-[#262E5F] rounded-xl text-[#F4F1EB] text-xs font-semibold hover:bg-[#262E5F] hover:text-[#DDA162] transition-colors"
                >
                  Return to Portal Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
