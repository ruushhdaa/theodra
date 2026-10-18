import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Inbox,
  ShieldCheck,
  Send,
  Link as LinkIcon,
  CheckCircle,
  FileText,
  Image as ImageIcon,
  Check,
  X,
} from "lucide-react";
import { MOCK_ANONYMOUS_REPORTS, AnonymousReport, MOCK_KANBAN_CASES } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";

export const ICReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const initialReport = MOCK_ANONYMOUS_REPORTS.find((r) => r.id === id) || MOCK_ANONYMOUS_REPORTS[0];
  const [report, setReport] = useState<AnonymousReport>(initialReport);

  const [status, setStatus] = useState<"New" | "Under Review" | "Responded" | "Closed">(
    report.status
  );
  const [replyText, setReplyText] = useState("");
  const [linkCaseModalOpen, setLinkCaseModalOpen] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState(report.linkedCaseId || "CASE-2026-09");
  const [linkedSuccess, setLinkedSuccess] = useState(false);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "IC Member" as const,
      timestamp: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: replyText.trim(),
    };

    setReport((prev) => ({
      ...prev,
      status: "Responded",
      messages: [...prev.messages, newMsg],
    }));
    setStatus("Responded");
    setReplyText("");
  };

  const handleStatusChange = (newStatus: "New" | "Under Review" | "Responded" | "Closed") => {
    setStatus(newStatus);
    setReport((prev) => ({ ...prev, status: newStatus }));
  };

  const handleLinkCase = () => {
    setReport((prev) => ({ ...prev, linkedCaseId: selectedCaseId }));
    setLinkCaseModalOpen(false);
    setLinkedSuccess(true);
    setTimeout(() => setLinkedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <Link
          to="/ic/reports"
          className="inline-flex items-center gap-2 text-xs text-[#A87C56] hover:text-[#DDA162] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Reports Inbox</span>
        </Link>
      </div>

      {/* Top Header Card */}
      <div className="bg-[#2C3259] border border-[#304A78] p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#304A78]">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#0A0E28] border border-[#304A78] text-[#DDA162]">
              <Inbox className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-[#F4F1EB]">{report.id}</h1>
                <span className="font-mono text-xs px-2.5 py-0.5 bg-[#0A0E28] text-[#DDA162] border border-[#304A78]">
                  Code: {report.referenceCode}
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-[#304A78] text-[#EBBA4A] font-bold uppercase">
                  {status}
                </span>
              </div>
              <p className="text-xs text-[#A87C56] mt-0.5">
                Submitted: <span className="text-[#F4F1EB]">{report.submissionWeek}</span> ({report.submissionDate})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Status Selector */}
            <div className="flex items-center gap-1.5 bg-[#0A0E28] p-1 border border-[#304A78]">
              <span className="text-[11px] text-[#A87C56] px-2">Status:</span>
              {(["Under Review", "Responded", "Closed"] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => handleStatusChange(st)}
                  className={`px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                    status === st
                      ? "bg-[#DDA162] text-[#0A0E28]"
                      : "text-[#A87C56] hover:text-[#F4F1EB]"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Link to Case button */}
            <button
              type="button"
              onClick={() => setLinkCaseModalOpen(true)}
              className="px-3.5 py-2 bg-[#0A0E28] border border-[#304A78] text-xs font-semibold text-[#DDA162] hover:border-[#DDA162] transition-colors flex items-center gap-1.5"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>{report.linkedCaseId ? `Linked: ${report.linkedCaseId}` : "Link to Case"}</span>
            </button>
          </div>
        </div>

        {linkedSuccess && (
          <div className="mt-4 p-3 bg-[#0A0E28] border border-[#DDA162] text-xs text-[#DDA162] flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#EBBA4A]" />
            <span>Report successfully associated with case {report.linkedCaseId}.</span>
          </div>
        )}

        {/* Tags & Timeframe Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-xs">
          <div className="p-3 bg-[#0A0E28] border border-[#304A78]">
            <span className="text-[10px] uppercase text-[#A87C56] block">Nature of Concern</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {report.concernTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-[#2C3259] text-[#DDA162] text-[10px] font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 bg-[#0A0E28] border border-[#304A78]">
            <span className="text-[10px] uppercase text-[#A87C56] block">Communication Channel</span>
            <span className="font-semibold text-[#F4F1EB] block mt-1">
              {report.communicationChannel}
            </span>
          </div>

          <div className="p-3 bg-[#0A0E28] border border-[#304A78]">
            <span className="text-[10px] uppercase text-[#A87C56] block">Approximate Timeframe</span>
            <span className="font-semibold text-[#F4F1EB] block mt-1">
              {report.approximateTimeframe}
            </span>
          </div>
        </div>

        {/* Free Text Description */}
        <div className="mt-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#DDA162] block mb-2">
            Free-Text Statement from Reporting Individual
          </span>
          <div className="p-4 bg-[#0A0E28] border border-[#304A78] text-xs text-[#F4F1EB] leading-relaxed font-serif">
            "{report.description}"
          </div>
        </div>

        {/* Uploaded Evidence items */}
        {report.evidenceItems.length > 0 && (
          <div className="mt-6 pt-4 border-t border-[#304A78]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#DDA162] block mb-2">
              Uploaded Digital Evidence Files ({report.evidenceItems.length})
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {report.evidenceItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#0A0E28] border border-[#304A78] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    {item.fileType === "PNG" ? (
                      <ImageIcon className="w-4 h-4 text-[#DDA162]" />
                    ) : (
                      <FileText className="w-4 h-4 text-[#DDA162]" />
                    )}
                    <span className="font-medium text-[#F4F1EB]">{item.fileName}</span>
                  </div>
                  <span className="text-[#A87C56] font-mono text-[11px]">{item.size}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Two-Way Message Thread */}
      <div className="bg-[#2C3259] border border-[#304A78] p-6 shadow-2xl">
        <div className="pb-4 border-b border-[#304A78] mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#F4F1EB]">
              Two-Way Anonymous Reporter Channel
            </h3>
            <p className="font-serif text-xs text-[#A87C56]">
              All messages sent here are delivered directly to the employee's Case Tracker under reference code {report.referenceCode}.
            </p>
          </div>
          <span className="text-xs text-[#DDA162] bg-[#0A0E28] px-2.5 py-1 border border-[#304A78] font-semibold">
            Confidential Session
          </span>
        </div>

        {/* Chat Bubbles Thread */}
        <div className="bg-[#0A0E28] border border-[#304A78] p-5 space-y-4 max-h-80 overflow-y-auto mb-4">
          {report.messages.map((msg) => {
            const isIC = msg.sender === "IC Member";
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isIC ? "items-end" : "items-start"}`}
              >
                <div className="text-[10px] text-[#A87C56] mb-1 flex items-center gap-2">
                  <span className={`font-semibold ${isIC ? "text-[#DDA162]" : "text-[#EBBA4A]"}`}>
                    {msg.sender === "IC Member" ? "Internal Committee Reply" : "Anonymous Reporter"}
                  </span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div
                  className={`max-w-lg p-3.5 text-xs leading-relaxed ${
                    isIC
                      ? "bg-[#304A78] text-[#F4F1EB] rounded-tl-lg rounded-bl-lg rounded-tr-lg"
                      : "bg-[#2C3259] text-[#F4F1EB] border border-[#304A78] rounded-tr-lg rounded-br-lg rounded-tl-lg"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reply input */}
        <form onSubmit={handleSendReply} className="flex gap-2">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type a confidential inquiry question or protective relief notice to the reporter..."
            className="flex-1 bg-[#0A0E28] border border-[#304A78] px-4 py-2.5 text-xs text-[#F4F1EB] placeholder-[#A87C56] focus:outline-none focus:border-[#DDA162]"
          />
          <button
            type="submit"
            disabled={!replyText.trim()}
            className="px-5 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
          >
            <span>Send Reply</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Link to Case Modal */}
      {linkCaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0E28]/80 backdrop-blur-none">
          <div className="bg-[#2C3259] border border-[#304A78] max-w-md w-full p-6 text-[#F4F1EB] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#304A78]">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-[#DDA162]" />
                <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
                  Associate Report with Active Case
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLinkCaseModalOpen(false)}
                className="text-[#A87C56] hover:text-[#F4F1EB]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#F4F1EB] leading-relaxed">
              Linking report {report.id} ({report.referenceCode}) to a formal Kanban case allows the Internal Committee to aggregate evidence items while maintaining the complainant's identity seal.
            </p>

            <div>
              <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                Select Active Case File
              </label>
              <select
                value={selectedCaseId}
                onChange={(e) => setSelectedCaseId(e.target.value)}
                className="w-full bg-[#0A0E28] border border-[#304A78] px-3 py-2 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
              >
                {MOCK_KANBAN_CASES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.id} — {c.title} ({c.stage})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#304A78]">
              <button
                type="button"
                onClick={() => setLinkCaseModalOpen(false)}
                className="px-4 py-2 border border-[#304A78] text-xs text-[#A87C56] hover:text-[#F4F1EB]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLinkCase}
                className="px-5 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A]"
              >
                Confirm Linkage
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
