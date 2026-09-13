import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  Building2,
  FileText,
  Copy,
  Check,
} from "lucide-react";

const CATEGORIES = [
  { id: "after_hours", title: "Unwanted After-Hours Messaging", desc: "Persistent non-work-hour or late-night contact from superiors or colleagues." },
  { id: "boundary_crossing", title: "Inappropriate Comments or Boundary Crossing", desc: "Unwelcome personal remarks, sexual innuendos, or inappropriate physical/verbal conduct." },
  { id: "power_imbalance", title: "Hierarchy Pressure / Career Retaliation", desc: "Implied professional consequences, intimidation, or conditional favors based on seniority." },
  { id: "channel_isolation", title: "Channel Isolation & Exclusion", desc: "Deliberate exclusion from work groups or coerced transitions into private 1-on-1 channels." },
  { id: "other", title: "Other Workplace Harassment Concern", desc: "Any other communication dynamic violating POSH Act workplace safety standards." },
];

const DEPARTMENTS = [
  "Engineering & Technology",
  "Product & Design",
  "Sales & Business Development",
  "Client Success & Operations",
  "People Operations & HR",
  "Finance, Legal & Accounting",
  "Marketing & Growth",
  "Prefer not to specify",
];

const TIMEFRAMES = [
  "Within the past 7 days",
  "Trailing 2 to 4 weeks",
  "1 to 3 months ago",
  "Ongoing pattern over multiple months",
];

export const ReportPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [timeframe, setTimeframe] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [involvesLateNight, setInvolvesLateNight] = useState<boolean>(false);
  const [involvesOneOnOne, setInvolvesOneOnOne] = useState<boolean>(false);
  const [involvesHierarchy, setInvolvesHierarchy] = useState<boolean>(false);

  const [receiptCode, setReceiptCode] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generated = `ANON-${Math.floor(1000 + Math.random() * 9000)}-POSH`;
    setReceiptCode(generated);
    setStep(4);
  };

  const copyReceipt = () => {
    navigator.clipboard.writeText(receiptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0E28] text-[#F4F1EB] py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Top Reassurance Header */}
        <div className="mb-6 flex items-center justify-between border-b border-[#262E5F] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#13193A] border border-[#262E5F] flex items-center justify-center text-[#F0B83A]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-[#E0A96D] block">
                Zero-Login Portal
              </span>
              <span className="font-serif text-sm font-bold text-[#F4F1EB]">
                Anonymous Incident Submission
              </span>
            </div>
          </div>
          <span className="font-sans text-xs text-[#7A756B]">
            Step {step} of 4
          </span>
        </div>

        {/* Multi-Step Form Card */}
        <div className="bg-[#13193A] border border-[#262E5F] p-6 sm:p-8 rounded-[8px] shadow-2xl">
          {/* STEP 1: Category of Concern */}
          {step === 1 && (
            <div>
              <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#E0A96D] block mb-1">
                Step 1: Classification
              </span>
              <h1 className="font-serif text-2xl font-bold text-[#F4F1EB] mb-2">
                What type of concern would you like to report?
              </h1>
              <p className="font-sans text-xs text-[#BDB9AD] mb-6 leading-relaxed">
                Select the category that best describes the communication or behavioral pattern you observed or experienced.
              </p>

              <div className="space-y-3 mb-8">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left p-4 rounded-[6px] border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#1C234E] border-[#F0B83A] text-[#F4F1EB] shadow-sm"
                          : "bg-[#0A0E28] border-[#262E5F] text-[#BDB9AD] hover:border-[#E0A96D]/50 hover:text-[#F4F1EB]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-base font-bold text-[#F4F1EB]">
                          {cat.title}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#F0B83A]" />}
                      </div>
                      <p className="font-sans text-xs text-[#7A756B] leading-relaxed">
                        {cat.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#1D244C]">
                <Link to="/" className="font-sans text-xs text-[#7A756B] hover:text-[#BDB9AD]">
                  Cancel &amp; Return Home
                </Link>
                <button
                  type="button"
                  disabled={!selectedCategory}
                  onClick={() => setStep(2)}
                  className="font-sans text-xs font-semibold bg-[#F0B83A] text-[#0A0E28] px-6 py-2.5 rounded-[6px] hover:bg-[#F0B83A]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                >
                  Continue to Details <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Optional Details */}
          {step === 2 && (
            <div>
              <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#E0A96D] block mb-1">
                Step 2: Incident Context
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#F4F1EB] mb-2">
                Provide context in your own words
              </h2>
              <p className="font-sans text-xs text-[#BDB9AD] mb-6 leading-relaxed">
                All fields on this step are optional. Do not include your name, personal phone number, or details you feel uncomfortable sharing.
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block font-sans text-xs font-medium text-[#BDB9AD] mb-1.5">
                    Broad Department (Optional)
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-[#0A0E28] border border-[#262E5F] px-3.5 py-2.5 text-sm text-[#F4F1EB] rounded-[6px] focus:outline-none focus:border-[#F0B83A]"
                  >
                    <option value="">Select general department...</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-xs font-medium text-[#BDB9AD] mb-1.5">
                    Approximate Timeframe (Optional)
                  </label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full bg-[#0A0E28] border border-[#262E5F] px-3.5 py-2.5 text-sm text-[#F4F1EB] rounded-[6px] focus:outline-none focus:border-[#F0B83A]"
                  >
                    <option value="">Select approximate duration...</option>
                    {TIMEFRAMES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-xs font-medium text-[#BDB9AD] mb-1.5">
                    What occurred? (Description)
                  </label>
                  <textarea
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the nature of the communication, pattern of contact, or concerns. Focus on what happened rather than naming specific individuals if you wish to remain entirely anonymous."
                    className="w-full bg-[#0A0E28] border border-[#262E5F] p-3.5 text-sm text-[#F4F1EB] rounded-[6px] focus:outline-none focus:border-[#F0B83A] leading-relaxed resize-none font-sans"
                  />
                  <div className="text-[11px] text-[#7A756B] mt-1">
                    Tip: Writing in terms of roles (e.g. &ldquo;a team manager&rdquo;) provides the committee with actionable insight while preserving personal anonymity.
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#1D244C]">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="font-sans text-xs text-[#BDB9AD] hover:text-[#F4F1EB] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="font-sans text-xs font-semibold bg-[#F0B83A] text-[#0A0E28] px-6 py-2.5 rounded-[6px] hover:bg-[#F0B83A]/90 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  Continue to Pattern Indicators <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Optional Pattern Reference */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#E0A96D] block mb-1">
                Step 3: Communication Pattern Indicators
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#F4F1EB] mb-2">
                Help the Internal Committee correlate patterns
              </h2>
              <p className="font-sans text-xs text-[#BDB9AD] mb-6 leading-relaxed">
                Checking these optional pattern flags helps the committee review whether similar communication rhythms have appeared in objective logs.
              </p>

              <div className="space-y-3 mb-8">
                <label className="flex items-start gap-3 p-3.5 bg-[#0A0E28] border border-[#262E5F] rounded-[6px] cursor-pointer hover:border-[#E0A96D]/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={involvesLateNight}
                    onChange={(e) => setInvolvesLateNight(e.target.checked)}
                    className="mt-1 accent-[#F0B83A]"
                  />
                  <div>
                    <span className="font-sans text-xs font-semibold text-[#F4F1EB] block">
                      Late-Night or Weekend Contact
                    </span>
                    <span className="font-sans text-[11px] text-[#7A756B] leading-relaxed">
                      Frequent communication received after standard business hours, late at night, or on weekends.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 bg-[#0A0E28] border border-[#262E5F] rounded-[6px] cursor-pointer hover:border-[#E0A96D]/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={involvesOneOnOne}
                    onChange={(e) => setInvolvesOneOnOne(e.target.checked)}
                    className="mt-1 accent-[#F0B83A]"
                  />
                  <div>
                    <span className="font-sans text-xs font-semibold text-[#F4F1EB] block">
                      Shift to Private 1-on-1 Messages
                    </span>
                    <span className="font-sans text-[11px] text-[#7A756B] leading-relaxed">
                      Pressure to converse in exclusive direct messages or personal messaging channels instead of project channels.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 bg-[#0A0E28] border border-[#262E5F] rounded-[6px] cursor-pointer hover:border-[#E0A96D]/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={involvesHierarchy}
                    onChange={(e) => setInvolvesHierarchy(e.target.checked)}
                    className="mt-1 accent-[#F0B83A]"
                  />
                  <div>
                    <span className="font-sans text-xs font-semibold text-[#F4F1EB] block">
                      Significant Seniority Imbalance
                    </span>
                    <span className="font-sans text-[11px] text-[#7A756B] leading-relaxed">
                      The behavior involves someone with direct or indirect organizational authority over your role.
                    </span>
                  </div>
                </label>
              </div>

              {/* Privacy Guarantee Box */}
              <div className="p-4 bg-[#0A0E28] border-l-2 border-[#F0B83A] rounded-r-[6px] mb-6">
                <div className="flex items-center gap-2 font-sans text-xs font-semibold text-[#F0B83A] mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  Your Anonymity Guarantee
                </div>
                <p className="font-sans text-[11px] text-[#BDB9AD] leading-relaxed">
                  No IP address, browser fingerprint, or account token is saved. This submission goes directly to appointed Internal Committee members, completely bypassing line managers and HR administration.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#1D244C]">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="font-sans text-xs text-[#BDB9AD] hover:text-[#F4F1EB] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="submit"
                  className="font-sans text-xs font-semibold bg-[#F0B83A] text-[#0A0E28] px-6 py-2.5 rounded-[6px] hover:bg-[#F0B83A]/90 transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                >
                  Submit Anonymous Report <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Submit & Confirmation Receipt */}
          {step === 4 && (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-[#1C234E] border border-[#E0A96D]/40 flex items-center justify-center mx-auto mb-4 text-[#F0B83A]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#E0A96D] block mb-1">
                Report Submitted Successfully
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#F4F1EB] mb-3">
                Your report has been securely transmitted.
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#BDB9AD] max-w-md mx-auto leading-relaxed mb-6">
                Your report has been encrypted and placed directly in the confidential review queue of the organization&apos;s Internal Committee under the POSH Act 2013.
              </p>

              {/* Receipt Code Box */}
              <div className="bg-[#0A0E28] border border-[#262E5F] p-4 rounded-[8px] max-w-sm mx-auto mb-6">
                <div className="font-sans text-[10px] uppercase text-[#7A756B] mb-1">
                  Anonymous Reference Receipt
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-serif text-xl font-bold text-[#F0B83A] tracking-wider tabular">
                    {receiptCode}
                  </span>
                  <button
                    type="button"
                    onClick={copyReceipt}
                    className="p-1.5 bg-[#13193A] border border-[#262E5F] rounded text-[#BDB9AD] hover:text-[#F4F1EB] transition-colors cursor-pointer"
                    title="Copy receipt code"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#F0B83A]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-[10px] font-sans text-[#7A756B] mt-1">
                  Keep this code if you wish to reference your submission in future communications.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setSelectedCategory("");
                    setDepartment("");
                    setTimeframe("");
                    setDescription("");
                    setInvolvesLateNight(false);
                    setInvolvesOneOnOne(false);
                    setInvolvesHierarchy(false);
                  }}
                  className="font-sans text-xs font-medium border border-[#262E5F] text-[#BDB9AD] hover:text-[#F4F1EB] px-5 py-2.5 rounded-[6px]"
                >
                  Submit Another Concern
                </button>
                <Link
                  to="/"
                  className="font-sans text-xs font-semibold bg-[#F0B83A] text-[#0A0E28] px-6 py-2.5 rounded-[6px] hover:bg-[#F0B83A]/90 transition-colors"
                >
                  Return to Home Page
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
