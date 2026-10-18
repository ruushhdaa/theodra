import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Clock,
  ShieldAlert,
  FileText,
  UserCheck,
  CheckCircle,
  Plus,
  AlertTriangle,
  Scale,
  Send,
  Lock,
} from "lucide-react";
import { MOCK_KANBAN_CASES, KanbanCase, ICNote, WitnessEntry } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";

export const ICCaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const initialCase = MOCK_KANBAN_CASES.find((c) => c.id === id) || MOCK_KANBAN_CASES[0];
  const [caseFile, setCaseFile] = useState<KanbanCase>(initialCase);

  // New Note state
  const [newNoteContent, setNewNoteContent] = useState("");

  // Interim Relief state
  const [interimMeasures, setInterimMeasures] = useState<string[]>(
    caseFile.interimRelief.measures
  );
  const [interimDetails, setInterimDetails] = useState(caseFile.interimRelief.details);
  const [reliefSaved, setReliefSaved] = useState(false);

  // Witness log state
  const [witnesses, setWitnesses] = useState<WitnessEntry[]>(caseFile.witnesses);
  const [newWitnessMethod, setNewWitnessMethod] = useState<"In-Person Confidential" | "Secure Video Link">(
    "In-Person Confidential"
  );
  const [newWitnessDate, setNewWitnessDate] = useState("26 Feb 2026");

  // Disposition state
  const [dispositionOutcome, setDispositionOutcome] = useState(
    caseFile.disposition?.outcome || "Allegations Substantiated — Disciplinary Recommendation"
  );
  const [dispositionReasoning, setDispositionReasoning] = useState(
    caseFile.disposition?.reasoning || ""
  );
  const [dispositionSaved, setDispositionSaved] = useState(false);

  // Retaliation flag state
  const [retaliationModalOpen, setRetaliationModalOpen] = useState(false);
  const [retaliationReason, setRetaliationReason] = useState("");

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    const note: ICNote = {
      id: `nt-${Date.now()}`,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      author: user?.name || "Dr. Sunita Rao",
      content: newNoteContent.trim(),
    };
    setCaseFile((prev) => ({
      ...prev,
      notes: [...prev.notes, note],
    }));
    setNewNoteContent("");
  };

  const handleToggleInterim = (m: string) => {
    setInterimMeasures((prev) =>
      prev.includes(m) ? prev.filter((item) => item !== m) : [...prev, m]
    );
  };

  const handleSaveInterim = (e: React.FormEvent) => {
    e.preventDefault();
    setCaseFile((prev) => ({
      ...prev,
      interimRelief: {
        ordered: interimMeasures.length > 0,
        measures: interimMeasures,
        details: interimDetails,
      },
    }));
    setReliefSaved(true);
    setTimeout(() => setReliefSaved(false), 2000);
  };

  const handleAddWitness = () => {
    const letters = "ABCDEFG";
    const nextCode = `Witness ${letters[witnesses.length % letters.length]}`;
    const newW: WitnessEntry = {
      id: `w-${Date.now()}`,
      codeName: nextCode,
      scheduledDate: newWitnessDate,
      status: "Scheduled",
      method: newWitnessMethod,
    };
    setWitnesses([...witnesses, newW]);
  };

  const handleSaveDisposition = (e: React.FormEvent) => {
    e.preventDefault();
    setCaseFile((prev) => ({
      ...prev,
      stage: "Closed",
      disposition: {
        outcome: dispositionOutcome,
        reasoning: dispositionReasoning,
        finalizedDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      },
    }));
    setDispositionSaved(true);
    setTimeout(() => setDispositionSaved(false), 2500);
  };

  const handleConfirmRetaliation = (e: React.FormEvent) => {
    e.preventDefault();
    setCaseFile((prev) => ({
      ...prev,
      retaliationFlagged: true,
      retaliationNotes: retaliationReason,
    }));
    setRetaliationModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <Link
          to="/ic/cases"
          className="inline-flex items-center gap-2 text-xs text-[#A87C56] hover:text-[#DDA162] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Case Board</span>
        </Link>
      </div>

      {/* 1. Header Section */}
      <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262E5F]">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#0E1438] border border-[#262E5F] rounded-xl text-[#DDA162]">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-[#F4F1EB]">{caseFile.id}</h1>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-[#161E48] text-[#DDA162] border border-[#262E5F]">
                  {caseFile.stage} Stage
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#11173D] text-[#EBBA4A] font-semibold border border-[#262E5F]">
                  {caseFile.severity} Priority
                </span>
              </div>
              <p className="font-serif text-sm text-[#F4F1EB] mt-1 font-semibold">
                {caseFile.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setRetaliationModalOpen(true)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-2 cursor-pointer ${
                caseFile.retaliationFlagged
                  ? "bg-amber-950/80 border-[#EBBA4A] text-[#EBBA4A]"
                  : "bg-[#0E1438] border-[#262E5F] text-[#A87C56] hover:border-[#DDA162] hover:text-[#DDA162] hover:bg-[#262E5F]"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>
                {caseFile.retaliationFlagged ? "Retaliation Flagged" : "Flag Suspected Retaliation"}
              </span>
            </button>
          </div>
        </div>

        {/* Case Metadata Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-xs">
          <div className="p-3.5 bg-[#0E1438] border border-[#262E5F] rounded-xl">
            <span className="text-[10px] uppercase text-[#A87C56] block">Department</span>
            <span className="font-semibold text-[#F4F1EB] block mt-1">{caseFile.department}</span>
          </div>

          <div className="p-3.5 bg-[#0E1438] border border-[#262E5F] rounded-xl">
            <span className="text-[10px] uppercase text-[#A87C56] block">Date Opened</span>
            <span className="font-semibold text-[#F4F1EB] block mt-1">{caseFile.dateOpened}</span>
          </div>

          <div className="p-3.5 bg-[#0E1438] border border-[#262E5F] rounded-xl">
            <span className="text-[10px] uppercase text-[#A87C56] block">Assigned IC Member</span>
            <span className="font-semibold text-[#DDA162] block mt-1">{caseFile.assignedMember}</span>
          </div>

          <div className="p-3.5 bg-[#0E1438] border border-[#262E5F] rounded-xl">
            <span className="text-[10px] uppercase text-[#A87C56] block">Parties (Anonymized)</span>
            <span className="font-semibold text-[#F4F1EB] block mt-1">
              {caseFile.complainantDesignation} vs {caseFile.respondentRole}
            </span>
          </div>
        </div>

        {caseFile.retaliationFlagged && caseFile.retaliationNotes && (
          <div className="mt-4 p-3.5 bg-amber-950/40 border border-[#EBBA4A] text-xs text-[#EBBA4A] rounded-xl flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Retaliation Watch Triggered:</span>{" "}
              {caseFile.retaliationNotes}
            </div>
          </div>
        )}
      </div>

      {/* 2. Timeline & Evidence Log (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Timeline (6 cols) */}
        <div className="lg:col-span-6 bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-2xl">
          <div className="pb-3 border-b border-[#262E5F] mb-4 flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
              Chronological Case Timeline
            </h3>
            <span className="text-xs text-[#A87C56]">Statutory progression log</span>
          </div>

          <div className="space-y-4">
            {caseFile.timeline.map((ev) => (
              <div key={ev.id} className="flex items-start gap-3 text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-[#DDA162] mt-2 shrink-0" />
                <div className="flex-1 p-3.5 bg-[#0E1438] border border-[#262E5F] rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#F4F1EB]">{ev.title}</span>
                    <span className="text-[10px] text-[#A87C56] font-mono">{ev.date}</span>
                  </div>
                  <p className="text-[#A87C56] leading-relaxed">{ev.description}</p>
                  <span className="text-[10px] text-[#DDA162] mt-1 block">Recorded by: {ev.actor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence Log (4 cols) */}
        <div className="lg:col-span-4 bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-2xl">
          <div className="pb-3 border-b border-[#262E5F] mb-4 flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
              Submitted Evidence Log
            </h3>
            <span className="text-[11px] text-[#A87C56]">Metadata only</span>
          </div>

          <p className="text-[11px] text-[#A87C56] mb-3 leading-relaxed">
            Statutory rule: File metadata recorded below. Raw content is decrypted solely inside in-camera sessions.
          </p>

          <div className="space-y-2.5">
            {caseFile.evidence.length === 0 ? (
              <div className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl text-center text-xs text-[#A87C56]">
                No physical/digital evidence items submitted yet.
              </div>
            ) : (
              caseFile.evidence.map((item) => (
                <div key={item.id} className="p-3 bg-[#0E1438] border border-[#262E5F] rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#F4F1EB] truncate max-w-[170px]">
                      {item.fileName}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#161E48] text-[#DDA162] font-mono border border-[#262E5F]">
                      {item.fileType}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A87C56]">{item.notes}</p>
                  <span className="text-[10px] text-[#A87C56] block pt-1">
                    Received: {item.dateReceived}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 3. IC Notes (Private Notepad) & Interim Relief */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* IC Notes (6 cols) */}
        <div className="lg:col-span-6 bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-2xl">
          <div className="pb-3 border-b border-[#262E5F] mb-4 flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
              Confidential IC Notepad
            </h3>
            <span className="text-xs text-[#A87C56]">Restricted to Committee members</span>
          </div>

          {/* Past Notes */}
          <div className="space-y-3 mb-4 max-h-56 overflow-y-auto">
            {caseFile.notes.length === 0 ? (
              <div className="text-xs text-[#A87C56] italic">No committee notes added yet.</div>
            ) : (
              caseFile.notes.map((n) => (
                <div key={n.id} className="p-3.5 bg-[#0E1438] border border-[#262E5F] rounded-xl text-xs">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-[#DDA162]">{n.author}</span>
                    <span className="text-[#A87C56]">{n.date}</span>
                  </div>
                  <p className="text-[#F4F1EB] leading-relaxed">{n.content}</p>
                </div>
              ))
            )}
          </div>

          {/* Add Note Form */}
          <form onSubmit={handleAddNote} className="space-y-3">
            <textarea
              rows={2}
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Add a private, timestamped case observation or legal consideration..."
              className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl p-3 text-xs text-[#F4F1EB] placeholder-[#A87C56] focus:outline-none focus:border-[#DDA162]"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newNoteContent.trim()}
                className="px-4 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#EBBA4A] transition-colors disabled:opacity-40 flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save Note</span>
              </button>
            </div>
          </form>
        </div>

        {/* Interim Relief (4 cols) */}
        <div className="lg:col-span-4 bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-2xl">
          <div className="pb-3 border-b border-[#262E5F] mb-4 flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
              Interim Relief (POSH §12)
            </h3>
            {reliefSaved && (
              <span className="text-[11px] text-[#EBBA4A] flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Saved
              </span>
            )}
          </div>

          <form onSubmit={handleSaveInterim} className="space-y-4 text-xs">
            <p className="text-[11px] text-[#A87C56] leading-relaxed">
              Order protective interim measures during active inquiry proceedings:
            </p>

            <div className="space-y-2">
              {[
                "Supervisor / team reassignment",
                "Restraining order from direct 1:1 contact",
                "Paid leave of absence (up to 3 months)",
                "Appraisal freeze / neutral appraisal review",
              ].map((measure) => {
                const isSelected = interimMeasures.includes(measure);
                return (
                  <button
                    key={measure}
                    type="button"
                    onClick={() => handleToggleInterim(measure)}
                    className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#161E48] border-[#DDA162] text-[#DDA162]"
                        : "bg-[#0E1438] border-[#262E5F] text-[#F4F1EB] hover:bg-[#262E5F]"
                    }`}
                  >
                    <span>{measure}</span>
                    <span className="text-xs font-bold">{isSelected ? "✓" : "+"}</span>
                  </button>
                );
              })}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F4F1EB] mb-1.5">
                Relief Order Specifics
              </label>
              <textarea
                rows={2}
                value={interimDetails}
                onChange={(e) => setInterimDetails(e.target.value)}
                placeholder="Details of instructions issued to HR Operations..."
                className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl p-2.5 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#161E48] border border-[#262E5F] text-[#F4F1EB] text-xs font-semibold rounded-xl hover:bg-[#262E5F] hover:border-[#DDA162] hover:text-[#DDA162] transition-colors cursor-pointer"
            >
              Update Interim Relief Order
            </button>
          </form>
        </div>
      </div>

      {/* 4. Witness Log & Final Disposition */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Witness Log (5 cols) */}
        <div className="lg:col-span-5 bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-2xl">
          <div className="pb-3 border-b border-[#262E5F] mb-4 flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
              Witness Deposition Log
            </h3>
            <span className="text-xs text-[#A87C56]">Identities anonymized</span>
          </div>

          <div className="space-y-3 mb-4">
            {witnesses.length === 0 ? (
              <div className="text-xs text-[#A87C56] italic">No witness testimonies scheduled.</div>
            ) : (
              witnesses.map((w) => (
                <div
                  key={w.id}
                  className="p-3.5 bg-[#0E1438] border border-[#262E5F] rounded-xl flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-[#DDA162]">{w.codeName}</span>
                    <p className="text-[11px] text-[#A87C56] mt-0.5">{w.method}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold border ${
                        w.status === "Completed"
                          ? "bg-[#161E48] text-[#DDA162] border-[#262E5F]"
                          : "bg-[#0A0E28] text-[#F4F1EB] border-[#262E5F]"
                      }`}
                    >
                      {w.status}
                    </span>
                    <span className="text-[10px] text-[#A87C56] block mt-1">{w.scheduledDate}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Schedule Witness form */}
          <div className="pt-3 border-t border-[#262E5F] flex gap-2">
            <select
              value={newWitnessMethod}
              onChange={(e) =>
                setNewWitnessMethod(e.target.value as "In-Person Confidential" | "Secure Video Link")
              }
              className="bg-[#0E1438] border border-[#262E5F] rounded-xl px-3 py-2 text-xs text-[#F4F1EB] focus:outline-none"
            >
              <option value="In-Person Confidential">In-Person Confidential</option>
              <option value="Secure Video Link">Secure Video Link</option>
            </select>
            <button
              type="button"
              onClick={handleAddWitness}
              className="px-4 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#EBBA4A] transition-colors cursor-pointer shadow-md"
            >
              + Add Next Witness
            </button>
          </div>
        </div>

        {/* Final Disposition (5 cols) */}
        <div className="lg:col-span-5 bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-2xl">
          <div className="pb-3 border-b border-[#262E5F] mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#DDA162]" />
              <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
                Statutory Final Disposition
              </h3>
            </div>
            {dispositionSaved && (
              <span className="text-[11px] text-[#EBBA4A] flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Finalized & Sealed
              </span>
            )}
          </div>

          <form onSubmit={handleSaveDisposition} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-semibold text-[#F4F1EB] mb-1.5">
                Final Outcome Determination
              </label>
              <select
                value={dispositionOutcome}
                onChange={(e) => setDispositionOutcome(e.target.value)}
                className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl px-3.5 py-2.5 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
              >
                <option value="Allegations Substantiated — Disciplinary Recommendation">
                  Allegations Substantiated — Disciplinary Recommendation
                </option>
                <option value="Allegations Substantiated — Written Warning & Counseling">
                  Allegations Substantiated — Written Warning & Counseling
                </option>
                <option value="Conciliation Agreement Formalized (§10)">
                  Conciliation Agreement Formalized (§10)
                </option>
                <option value="Allegations Not Established / Inconclusive">
                  Allegations Not Established / Inconclusive
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F4F1EB] mb-1.5">
                Formal Reasoning & Statutory Findings
              </label>
              <textarea
                rows={3}
                value={dispositionReasoning}
                onChange={(e) => setDispositionReasoning(e.target.value)}
                placeholder="State the findings of facts, witness evidence analysis, and recommendations for employer action..."
                className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl p-3 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162] leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#EBBA4A] transition-colors cursor-pointer shadow-md"
            >
              Seal Disposition in Response Ledger
            </button>
          </form>
        </div>
      </div>

      {/* Retaliation Suspected Modal */}
      {retaliationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0E28]/85 backdrop-blur-sm">
          <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl max-w-md w-full p-6 text-[#F4F1EB] shadow-2xl space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-3 pb-3 border-b border-[#262E5F]">
              <ShieldAlert className="w-6 h-6 text-[#EBBA4A]" />
              <h3 className="font-serif text-lg font-bold text-[#F4F1EB]">
                Flag Suspected Retaliation
              </h3>
            </div>

            <p className="text-xs text-[#F4F1EB] leading-relaxed">
              Flagging retaliation activates heightened telemetry observation on the Retaliation Shield. Any sudden performance review downgrades, shift changes, or role demotions will immediately notify the Presiding Officer.
            </p>

            <form onSubmit={handleConfirmRetaliation} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-[#F4F1EB] mb-1.5">
                  Reason for Retaliation Concern
                </label>
                <textarea
                  rows={3}
                  required
                  value={retaliationReason}
                  onChange={(e) => setRetaliationReason(e.target.value)}
                  placeholder="e.g. Complainant informed IC that respondent gave an abrupt below-average rating outside normal review cycle..."
                  className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl p-3 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#262E5F]">
                <button
                  type="button"
                  onClick={() => setRetaliationModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#262E5F] text-xs text-[#A87C56] hover:bg-[#262E5F] hover:text-[#F4F1EB] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#EBBA4A] text-[#0A0E28] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#DDA162] transition-colors cursor-pointer shadow-md"
                >
                  Confirm Retaliation Watch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
