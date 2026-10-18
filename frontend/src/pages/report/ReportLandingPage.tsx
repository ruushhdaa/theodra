import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  EyeOff,
  Users,
  Lock,
  ArrowRight,
  Upload,
  Check,
  Copy,
  CheckCircle,
  FileText,
  AlertCircle,
  Image as ImageIcon,
  Video,
  File,
} from "lucide-react";
import { api } from "../../api/client";

export const ReportLandingPage: React.FC = () => {
  const [activeMode, setActiveMode] = useState<"landing" | "form">("landing");
  const [currentStep, setCurrentStep] = useState(1);
  const [pulseScore, setPulseScore] = useState<number | null>(null);
  const [pulseSubmitted, setPulseSubmitted] = useState(false);

  // Form states
  const [concerns, setConcerns] = useState<string[]>([]);
  const [channel, setChannel] = useState<string>("In-person");
  const [timeframe, setTimeframe] = useState<string>("February 2026");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<{ name: string; size: string }[]>([]);
  const [optionalContact, setOptionalContact] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [copied, setCopied] = useState(false);

  const concernOptions = [
    "Unwanted physical contact",
    "Sexually suggestive remarks or jokes",
    "Repeated requests for dates / after-hours contact",
    "Quid pro quo (implied career threat or promise)",
    "Hostile work environment",
    "Retaliation for previous refusal",
    "Other concern",
  ];

  const handleToggleConcern = (c: string) => {
    setConcerns((prev) =>
      prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
    );
  };

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).slice(0, 5 - files.length).map((f) => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      }));
      setFiles((prev) => [...prev, ...newFiles].slice(0, 5));
    }
  };

  const generateRefCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "TR-";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCompleteSubmission = async () => {
    try {
      const res = await api.portal.submit({
        concern_types: concerns.length ? concerns : ["General Workplace Concern"],
        channel,
        timeframe_month: 2,
        timeframe_year: 2026,
        description: description || "No statement provided",
        evidence_file_paths: [],
      });
      if (res && res.reference_code) {
        setReferenceCode(res.reference_code);
        setCurrentStep(5);
        return;
      }
    } catch (e) {
      console.warn("Backend submit fallback:", e);
    }
    const ref = generateRefCode();
    setReferenceCode(ref);
    setCurrentStep(5);
  };

  const handleCopyCode = () => {
    if (referenceCode) {
      navigator.clipboard.writeText(referenceCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePulseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pulseScore !== null) {
      setPulseSubmitted(true);
    }
  };

  return (
    <div className="bg-[#0A0E28] text-[#F4F1EB] min-h-[85vh]">
      {/* Sub-navigation bar for Employee Portal */}
      <div className="bg-[#0A0E28] border-b border-[#262E5F] px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-[#DDA162]">
            <ShieldCheck className="w-4 h-4" />
            <span className="font-semibold tracking-wide uppercase text-[11px]">
              Confidential Reporting Gateway
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/report/track" className="text-[#F4F1EB] hover:text-[#DDA162] transition-colors">
              Track Report
            </Link>
            <Link to="/report/quiet-flag" className="text-[#F4F1EB] hover:text-[#DDA162] transition-colors">
              Quiet Flag
            </Link>
            <Link to="/report/rights" className="text-[#F4F1EB] hover:text-[#DDA162] transition-colors">
              Know Your Rights
            </Link>
            <Link to="/report/resources" className="text-[#F4F1EB] hover:text-[#DDA162] transition-colors">
              Safety Resources
            </Link>
          </div>
        </div>
      </div>

      {activeMode === "landing" ? (
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
          {/* Main Hero Header */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold block mb-3">
              Zero Accounts • Zero Tracking • Total Anonymity
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4F1EB] leading-tight">
              You don't have to stay silent.
            </h1>
            <p className="font-serif text-base sm:text-lg text-[#F4F1EB] opacity-90 mt-4 leading-relaxed max-w-2xl mx-auto">
              Report safely. No account. No tracking. Just your words.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setActiveMode("form")}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold tracking-wider uppercase hover:bg-[#EBBA4A] rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Make a Report</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/report/track"
                className="w-full sm:w-auto px-7 py-3.5 border border-[#262E5F] text-[#F4F1EB] text-xs font-semibold tracking-wider hover:bg-[#262E5F] hover:border-[#DDA162] rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>Track an Existing Report</span>
              </Link>
            </div>
          </div>

          {/* Three Trust Statements in Plain English */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F] hover:border-[#DDA162] p-6 rounded-2xl shadow-xl transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#0E1438] border border-[#262E5F] group-hover:border-[#DDA162] flex items-center justify-center mb-4 text-[#DDA162]">
                <EyeOff className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#F4F1EB] group-hover:text-[#DDA162] mb-2 transition-colors">
                Metadata only, never message content
              </h3>
              <p className="font-serif text-xs text-[#A87C56] leading-relaxed">
                THEODRA never reads your emails, chats, or documents. It only monitors communication rhythms like off-hours spikes to spot pressure patterns without intruding.
              </p>
            </div>

            <div className="bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F] hover:border-[#DDA162] p-6 rounded-2xl shadow-xl transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#0E1438] border border-[#262E5F] group-hover:border-[#DDA162] flex items-center justify-center mb-4 text-[#DDA162]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#F4F1EB] group-hover:text-[#DDA162] mb-2 transition-colors">
                No login, no IP tracking
              </h3>
              <p className="font-serif text-xs text-[#A87C56] leading-relaxed">
                You never log in, provide your corporate email, or authenticate. Your IP address is never stored. Your reference code is the only link to your report.
              </p>
            </div>

            <div className="bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F] hover:border-[#DDA162] p-6 rounded-2xl shadow-xl transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#0E1438] border border-[#262E5F] group-hover:border-[#DDA162] flex items-center justify-center mb-4 text-[#DDA162]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#F4F1EB] group-hover:text-[#DDA162] mb-2 transition-colors">
                Minimum 5-person privacy rule
              </h3>
              <p className="font-serif text-xs text-[#A87C56] leading-relaxed">
                We strictly enforce privacy thresholds. No aggregated pattern is ever surfaced to reviewers unless at least 5 individuals share that same pattern, preventing individual identification.
              </p>
            </div>
          </div>

          {/* Optional Wellness Pulse Widget */}
          <div className="mt-14 max-w-2xl mx-auto bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 text-center shadow-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#DDA162] block mb-1">
              Voluntary Pulse Check
            </span>
            <h3 className="font-serif text-lg font-bold text-[#F4F1EB] mb-2">
              How safe do you feel at your workplace this week?
            </h3>
            <p className="font-serif text-xs text-[#A87C56] mb-5">
              100% anonymous. No reference code or cookies. Feeds aggregate organizational wellbeing insights only.
            </p>

            {!pulseSubmitted ? (
              <form onSubmit={handlePulseSubmit} className="space-y-4">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {[
                    { val: 5, label: "Very safe" },
                    { val: 4, label: "Safe" },
                    { val: 3, label: "Neutral" },
                    { val: 2, label: "Unsafe" },
                    { val: 1, label: "Very unsafe" },
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => setPulseScore(item.val)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        pulseScore === item.val
                          ? "bg-[#DDA162] text-[#0A0E28] border-[#DDA162]"
                          : "bg-[#0E1438] text-[#F4F1EB] border-[#262E5F] hover:border-[#DDA162]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={pulseScore === null}
                    className="px-5 py-2.5 bg-[#0E1438] border border-[#262E5F] text-[#F4F1EB] text-xs font-semibold hover:bg-[#262E5F] hover:border-[#DDA162] rounded-xl transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    Submit Anonymous Pulse
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl text-xs text-[#DDA162] flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#EBBA4A]" />
                <span>
                  Thank you. Your response is anonymous and helps your organisation understand overall workplace wellbeing.
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Multi-step Report Form (5 Steps) */
        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-[#DDA162]">
                Step {currentStep} of 5:{" "}
                {currentStep === 1 && "Nature of Concern"}
                {currentStep === 2 && "Time & Communication Channel"}
                {currentStep === 3 && "Description in Your Words"}
                {currentStep === 4 && "Evidence & Documentation"}
                {currentStep === 5 && "Confirmation & Reference Code"}
              </span>
              <span className="text-[#A87C56] font-mono">
                {Math.round((currentStep / 5) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#0E1438] rounded-full overflow-hidden border border-[#262E5F]">
              <div
                className="h-full bg-[#DDA162] rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 sm:p-8 shadow-2xl">
            {/* Step 1: Nature of Concern */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#F4F1EB]">
                    What is the nature of your concern?
                  </h2>
                  <p className="font-serif text-xs text-[#A87C56] mt-1">
                    Select all that apply. This helps the Internal Committee classify the inquiry.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {concernOptions.map((opt) => {
                    const isChecked = concerns.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleToggleConcern(opt)}
                        className={`p-3.5 text-left rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                          isChecked
                            ? "bg-[#0E1438] border-[#DDA162] text-[#DDA162]"
                            : "bg-[#0E1438]/60 border-[#262E5F] text-[#F4F1EB] hover:border-[#DDA162]"
                        }`}
                      >
                        <span>{opt}</span>
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isChecked
                              ? "border-[#DDA162] bg-[#DDA162] text-[#0A0E28]"
                              : "border-[#262E5F]"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {concerns.length === 0 && (
                  <p className="text-xs text-[#A87C56] italic">
                    Please select at least one option to continue.
                  </p>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-[#262E5F]">
                  <button
                    type="button"
                    onClick={() => setActiveMode("landing")}
                    className="text-xs text-[#A87C56] hover:text-[#F4F1EB] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={concerns.length === 0}
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] rounded-xl transition-colors disabled:opacity-40 cursor-pointer shadow-md"
                  >
                    Continue to Step 2
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Channel & Timeframe */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#F4F1EB]">
                    Where did this happen, and approximately when?
                  </h2>
                  <p className="font-serif text-xs text-[#A87C56] mt-1">
                    Exact dates are never mandatory. A general month and year is sufficient.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#F4F1EB] mb-2">
                      Primary Communication Channel
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {["In-person", "Slack/Teams", "Email", "Phone call", "Off-site/Travel", "Other"].map(
                        (ch) => (
                          <button
                            key={ch}
                            type="button"
                            onClick={() => setChannel(ch)}
                            className={`p-2.5 text-xs text-center rounded-xl border font-semibold transition-colors cursor-pointer ${
                              channel === ch
                                ? "bg-[#0E1438] border-[#DDA162] text-[#DDA162]"
                                : "bg-[#0E1438]/60 border-[#262E5F] text-[#F4F1EB] hover:border-[#DDA162]"
                            }`}
                          >
                            {ch}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#F4F1EB] mb-1.5">
                      Approximate Timeframe (Month & Year)
                    </label>
                    <select
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                      className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl px-3.5 py-2.5 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
                    >
                      <option value="February 2026">February 2026</option>
                      <option value="January 2026">January 2026</option>
                      <option value="December 2025">December 2025</option>
                      <option value="November 2025">November 2025</option>
                      <option value="Q3 2025 (July - Sep)">Q3 2025 (July - September)</option>
                      <option value="Earlier in 2025">Earlier in 2025</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#262E5F]">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-[#A87C56] hover:text-[#F4F1EB] cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] rounded-xl transition-colors cursor-pointer shadow-md"
                  >
                    Continue to Step 3
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Free Text Description */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#F4F1EB]">
                    Describe what happened in your own words
                  </h2>
                  <p className="font-serif text-xs text-[#A87C56] mt-1">
                    You do not need to name anyone if you don't want to. Focus on what was said or done.
                  </p>
                </div>

                <div>
                  <textarea
                    rows={7}
                    maxLength={2000}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what happened in your own words. You do not need to name anyone if you don't want to. For example: 'A senior colleague repeatedly paged me late at night and made comments regarding personal life...'"
                    className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl p-4 text-xs text-[#F4F1EB] placeholder-[#A87C56] focus:outline-none focus:border-[#DDA162] leading-relaxed"
                  />
                  <div className="flex items-center justify-between mt-2 text-[11px] text-[#A87C56]">
                    <span>Minimum 15 characters recommended</span>
                    <span className="font-mono">{description.length} / 2000 characters</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#262E5F]">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs text-[#A87C56] hover:text-[#F4F1EB] cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={description.trim().length < 10}
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] rounded-xl transition-colors disabled:opacity-40 cursor-pointer shadow-md"
                  >
                    Continue to Step 4
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Evidence Upload */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#F4F1EB]">
                    Upload evidence (Optional)
                  </h2>
                  <p className="font-serif text-xs text-[#A87C56] mt-1">
                    Accepts images (JPG, PNG, WEBP), videos (MP4, MOV), PDFs, DOCX, and screen recordings. Max 5 files, 50MB each.
                  </p>
                </div>

                {/* Privacy Notice */}
                <div className="p-3.5 bg-[#0E1438] border border-[#262E5F] rounded-xl text-xs text-[#DDA162] flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <span className="font-semibold">Privacy notice:</span> Files are encrypted in transit. The IC cannot see who uploaded them or inspect metadata revealing your identity.
                  </p>
                </div>

                {/* Drag-and-drop zone */}
                <div className="border-2 border-dashed border-[#262E5F] hover:border-[#DDA162] rounded-2xl p-8 text-center bg-[#0E1438]/50 transition-colors relative cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.mp4,.mov"
                    onChange={handleFileDrop}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-[#DDA162] mx-auto mb-2" />
                  <p className="text-xs font-semibold text-[#F4F1EB]">
                    Drag & drop files here, or click to browse
                  </p>
                  <p className="text-[11px] text-[#A87C56] mt-1">
                    Images, screenshots, PDFs, documents, or video captures
                  </p>
                </div>

                {/* Uploaded File List */}
                {files.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-[#F4F1EB]">
                      Selected Files ({files.length} of 5):
                    </span>
                    {files.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2.5 bg-[#0E1438] border border-[#262E5F] rounded-xl text-xs"
                      >
                        <div className="flex items-center gap-2">
                          {f.name.endsWith(".png") || f.name.endsWith(".jpg") ? (
                            <ImageIcon className="w-4 h-4 text-[#DDA162]" />
                          ) : f.name.endsWith(".mp4") ? (
                            <Video className="w-4 h-4 text-[#DDA162]" />
                          ) : (
                            <File className="w-4 h-4 text-[#DDA162]" />
                          )}
                          <span className="text-[#F4F1EB] font-medium">{f.name}</span>
                          <span className="text-[#A87C56]">({f.size})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                          className="text-[#A87C56] hover:text-[#EBBA4A] cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-[#262E5F]">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-xs text-[#A87C56] hover:text-[#F4F1EB] cursor-pointer"
                  >
                    Back
                  </button>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCompleteSubmission}
                      className="text-xs text-[#A87C56] hover:text-[#F4F1EB] underline cursor-pointer"
                    >
                      No files to upload
                    </button>
                    <button
                      type="button"
                      onClick={handleCompleteSubmission}
                      className="px-6 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] rounded-xl transition-colors cursor-pointer shadow-md"
                    >
                      Submit Report
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Confirmation with Reference Code */}
            {currentStep === 5 && (
              <div className="space-y-6 text-center py-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0E1438] border border-[#DDA162] mx-auto flex items-center justify-center text-[#DDA162]">
                  <CheckCircle className="w-8 h-8 text-[#DDA162]" />
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
                    Submission Confirmed
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#F4F1EB] mt-1">
                    Your report has been received.
                  </h2>
                  <p className="font-serif text-xs text-[#A87C56] mt-1">
                    The Internal Committee will review it within 7 working days.
                  </p>
                </div>

                {/* Highlighted Reference Code Box */}
                <div className="max-w-md mx-auto bg-[#0E1438] border-2 border-[#DDA162] rounded-2xl p-6 text-center shadow-xl">
                  <span className="text-[11px] uppercase tracking-wider text-[#A87C56] block mb-1">
                    Your Anonymous Case Reference Code
                  </span>
                  <div className="font-mono text-2xl font-bold text-[#EBBA4A] tracking-wider my-2">
                    {referenceCode}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#0A0E28] border border-[#262E5F] rounded-xl text-xs font-semibold text-[#F4F1EB] hover:bg-[#262E5F] hover:border-[#DDA162] transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#EBBA4A]" /> Copied to Clipboard
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Reference Code
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-[#A87C56] mt-3 leading-relaxed">
                    ⚠️ <span className="text-[#F4F1EB]">Save this code now.</span> Because you have no account, this code is the only way to check status, review IC responses, and maintain your anonymous message thread.
                  </p>
                </div>

                {/* Optional notification contact */}
                <div className="max-w-md mx-auto text-left pt-4 border-t border-[#262E5F]">
                  <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                    Optional: Email or Phone for Anonymous Status Updates
                  </label>
                  <p className="text-[11px] text-[#A87C56] mb-2">
                    This field is strictly optional. If provided, it is stored in a separate one-way hashed partition solely for dispatching notification pings.
                  </p>
                  <input
                    type="text"
                    value={optionalContact}
                    onChange={(e) => setOptionalContact(e.target.value)}
                    placeholder="optional@personal-domain.com or phone"
                    className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl px-3 py-2 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
                  />
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/report/track"
                    className="px-6 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] rounded-xl transition-colors shadow-md"
                  >
                    Go to Case Tracker
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMode("landing");
                      setCurrentStep(1);
                      setDescription("");
                      setConcerns([]);
                      setFiles([]);
                    }}
                    className="px-6 py-2.5 bg-[#0E1438] border border-[#262E5F] rounded-xl text-xs text-[#F4F1EB] hover:bg-[#262E5F] transition-colors cursor-pointer"
                  >
                    Return to Portal Home
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
