import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  CheckCircle2,
  Clock,
  CircleDashed,
  Send,
  ShieldCheck,
  ArrowLeft,
  FileCheck,
  Scale,
  Check,
} from "lucide-react";

export const ReportTrackPage: React.FC = () => {
  const [code, setCode] = useState("TR-K8X2M9PQ");
  const [submittedCode, setSubmittedCode] = useState<string | null>("TR-K8X2M9PQ");
  const [messages, setMessages] = useState<
    { id: string; sender: "IC" | "Reporter"; text: string; time: string }[]
  >([
    {
      id: "m-1",
      sender: "IC",
      text: "Thank you for your report. We may reach out through this channel if we need clarification. All communications here are anonymous.",
      time: "14 Feb 2026, 10:30 AM",
    },
  ]);
  const [replyText, setReplyText] = useState("");

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      setSubmittedCode(code.trim().toUpperCase());
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    const newMsg = {
      id: `m-${Date.now()}`,
      sender: "Reporter" as const,
      text: replyText.trim(),
      time: "Just now",
    };
    setMessages((prev) => [...prev, newMsg]);
    setReplyText("");
  };

  const stages = [
    {
      num: 1,
      label: "Report Received",
      status: "Completed",
      date: "13 Feb 2026",
      desc: "Report logged with encrypted reference identifier.",
      icon: CheckCircle2,
    },
    {
      num: 2,
      label: "IC Review",
      status: "Active",
      date: "14 Feb 2026",
      desc: "Your report is being reviewed by the Internal Committee.",
      icon: Clock,
    },
    {
      num: 3,
      label: "Inquiry",
      status: "Pending",
      date: "Pending determination",
      desc: "Confidential witness testimonies and documentary examination.",
      icon: CircleDashed,
    },
    {
      num: 4,
      label: "Resolution",
      status: "Pending",
      date: "Pending completion",
      desc: "Statutory findings report and recommendations under Section 13.",
      icon: CircleDashed,
    },
    {
      num: 5,
      label: "Closed",
      status: "Pending",
      date: "Pending completion",
      desc: "Employer implementation report sealed in Response Ledger.",
      icon: CircleDashed,
    },
  ];

  return (
    <div className="bg-[#0A0E28] text-[#F4F1EB] min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back link */}
        <div>
          <Link
            to="/report"
            className="inline-flex items-center gap-2 text-xs text-[#A87C56] hover:text-[#DDA162] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Anonymous Portal</span>
          </Link>
        </div>

        {/* Header & Code Input */}
        <div className="bg-[#2C3259] border border-[#304A78] p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#304A78]">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#DDA162]">
                Secure Case Tracker
              </span>
              <h1 className="font-serif text-2xl font-bold text-[#F4F1EB] mt-1">
                Track Report by Reference Code
              </h1>
              <p className="font-serif text-xs text-[#A87C56] mt-1">
                Enter your 8-character code to view status updates and communicate anonymously with the IC.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#A87C56] bg-[#0A0E28] px-3 py-2 border border-[#304A78]">
              <ShieldCheck className="w-4 h-4 text-[#DDA162]" />
              <span>Encrypted Session</span>
            </div>
          </div>

          <form onSubmit={handleTrackSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. TR-K8X2M9PQ"
              className="flex-1 bg-[#0A0E28] border border-[#304A78] px-4 py-2.5 text-sm font-mono text-[#EBBA4A] uppercase focus:outline-none focus:border-[#DDA162]"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Lookup Case</span>
            </button>
          </form>
        </div>

        {/* Case Timeline Section */}
        {submittedCode && (
          <div className="bg-[#2C3259] border border-[#304A78] p-6 sm:p-8 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#304A78]">
              <div>
                <span className="text-xs text-[#A87C56]">Active Case Reference:</span>
                <span className="ml-2 font-mono text-base font-bold text-[#EBBA4A]">
                  {submittedCode}
                </span>
              </div>
              <div className="text-xs text-[#DDA162] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#EBBA4A] animate-ping" />
                <span>Current Stage: IC Review</span>
              </div>
            </div>

            {/* Stages Timeline */}
            <div>
              <h3 className="font-serif text-lg font-bold text-[#F4F1EB] mb-6">
                Statutory Inquiry Stages
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                {stages.map((st) => {
                  const Icon = st.icon;
                  const isCompleted = st.status === "Completed";
                  const isActive = st.status === "Active";

                  return (
                    <div
                      key={st.num}
                      className={`p-4 border relative ${
                        isActive
                          ? "bg-[#0A0E28] border-[#DDA162]"
                          : isCompleted
                          ? "bg-[#0A0E28]/50 border-[#304A78]"
                          : "bg-[#0A0E28]/20 border-[#304A78]/50 opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 ${
                            isActive
                              ? "bg-[#DDA162] text-[#0A0E28] font-bold"
                              : isCompleted
                              ? "bg-[#304A78] text-[#DDA162]"
                              : "bg-[#2C3259] text-[#A87C56]"
                          }`}
                        >
                          Stage 0{st.num}
                        </span>
                        <Icon
                          className={`w-4 h-4 ${
                            isActive
                              ? "text-[#EBBA4A]"
                              : isCompleted
                              ? "text-[#DDA162]"
                              : "text-[#A87C56]"
                          }`}
                        />
                      </div>
                      <h4
                        className={`font-semibold text-xs mb-1 ${
                          isActive ? "text-[#EBBA4A]" : "text-[#F4F1EB]"
                        }`}
                      >
                        {st.label}
                      </h4>
                      <p className="text-[11px] text-[#A87C56] leading-tight mb-2">{st.desc}</p>
                      <div className="text-[10px] font-mono text-[#A87C56] pt-1 border-t border-[#304A78]/60">
                        {st.date}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Two-Way Anonymous Message Thread */}
            <div className="pt-6 border-t border-[#304A78]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#F4F1EB]">
                    Confidential Two-Way Communication Thread
                  </h3>
                  <p className="font-serif text-xs text-[#A87C56]">
                    You may communicate with the Internal Committee here without revealing your identity.
                  </p>
                </div>
                <span className="text-[11px] text-[#DDA162] font-semibold bg-[#0A0E28] px-2.5 py-1 border border-[#304A78]">
                  Zero IP Logging
                </span>
              </div>

              {/* Message History */}
              <div className="bg-[#0A0E28] border border-[#304A78] p-4 space-y-4 max-h-72 overflow-y-auto mb-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${
                      m.sender === "Reporter" ? "items-end" : "items-start"
                    }`}
                  >
                    <div className="text-[10px] text-[#A87C56] mb-1 flex items-center gap-2">
                      <span className="font-semibold text-[#DDA162]">
                        {m.sender === "Reporter" ? "You (Reporter)" : "Internal Committee"}
                      </span>
                      <span>•</span>
                      <span>{m.time}</span>
                    </div>
                    <div
                      className={`max-w-md p-3.5 text-xs leading-relaxed ${
                        m.sender === "Reporter"
                          ? "bg-[#304A78] text-[#F4F1EB] rounded-tl-lg rounded-bl-lg rounded-tr-lg"
                          : "bg-[#2C3259] text-[#F4F1EB] border border-[#304A78] rounded-tr-lg rounded-br-lg rounded-tl-lg"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Input Box */}
              <form onSubmit={handleSendReply} className="flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type an anonymous clarification or question to the IC..."
                  className="flex-1 bg-[#0A0E28] border border-[#304A78] px-4 py-2.5 text-xs text-[#F4F1EB] placeholder-[#A87C56] focus:outline-none focus:border-[#DDA162]"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-5 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
