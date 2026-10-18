import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Plus,
  ArrowRight,
  Clock,
  User,
  ShieldAlert,
  X,
  CheckCircle,
} from "lucide-react";
import { MOCK_KANBAN_CASES, KanbanCase, CaseStage, SeverityTier } from "../../data/mockData";

export const ICCasesPage: React.FC = () => {
  const [cases, setCases] = useState<KanbanCase[]>(MOCK_KANBAN_CASES);
  const [draggedCaseId, setDraggedCaseId] = useState<string | null>(null);

  // New Case Modal State
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDept, setNewDept] = useState("Platform Engineering");
  const [newSeverity, setNewSeverity] = useState<SeverityTier>("Elevated");
  const [newAssignee, setNewAssignee] = useState("Dr. Sunita Rao");
  const [newRespRole, setNewRespRole] = useState("Team Lead");
  const [newCompDesig, setNewCompDesig] = useState("Software Engineer");

  const columns: { stage: CaseStage; label: string; count: number }[] = [
    { stage: "Open", label: "Open", count: cases.filter((c) => c.stage === "Open").length },
    { stage: "Conciliation", label: "Conciliation", count: cases.filter((c) => c.stage === "Conciliation").length },
    { stage: "Inquiry", label: "Inquiry", count: cases.filter((c) => c.stage === "Inquiry").length },
    { stage: "Closed", label: "Closed", count: cases.filter((c) => c.stage === "Closed").length },
  ];

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    setDraggedCaseId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: CaseStage) => {
    e.preventDefault();
    const caseId = e.dataTransfer.getData("text/plain") || draggedCaseId;
    if (caseId) {
      setCases((prev) =>
        prev.map((c) => (c.id === caseId ? { ...c, stage: targetStage } : c))
      );
    }
    setDraggedCaseId(null);
  };

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    const newCaseItem: KanbanCase = {
      id: `CASE-2026-0${cases.length + 5}`,
      title: newTitle.trim() || "Workplace conduct concern",
      department: newDept,
      stage: "Open",
      severity: newSeverity,
      dateOpened: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      assignedMember: newAssignee,
      respondentRole: newRespRole,
      complainantDesignation: newCompDesig,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          title: "Case Created",
          description: "Case entered into Internal Committee tracking board.",
          actor: newAssignee,
        },
      ],
      evidence: [],
      notes: [],
      interimRelief: {
        ordered: false,
        measures: [],
        details: "Preliminary assessment underway.",
      },
      witnesses: [],
      retaliationFlagged: false,
    };

    setCases([newCaseItem, ...cases]);
    setNewModalOpen(false);
    setNewTitle("");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#304A78]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
            Inquiry Workflow Board
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            Case Management
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            Drag cards across columns to advance case lifecycle from intake to disposition.
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setNewModalOpen(true)}
            className="px-4 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>New Case</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {columns.map((col) => {
          const colCases = cases.filter((c) => c.stage === col.stage);
          return (
            <div
              key={col.stage}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.stage)}
              className="bg-[#2C3259] border border-[#304A78] p-3 flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#304A78] mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm font-bold text-[#F4F1EB]">
                    {col.label}
                  </span>
                  <span className="text-[10px] bg-[#0A0E28] text-[#DDA162] font-mono px-2 py-0.5 border border-[#304A78]">
                    {col.count}
                  </span>
                </div>
              </div>

              {/* Cards List */}
              <div className="space-y-3 flex-1">
                {colCases.length === 0 ? (
                  <div className="h-32 border border-dashed border-[#304A78]/60 flex items-center justify-center text-[11px] text-[#A87C56] text-center p-3">
                    Drag cases here to move to {col.label}
                  </div>
                ) : (
                  colCases.map((cs) => (
                    <div
                      key={cs.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, cs.id)}
                      className="bg-[#0A0E28] border border-[#304A78] hover:border-[#DDA162] p-4 text-xs space-y-3 cursor-grab active:cursor-grabbing transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-[#F4F1EB] group-hover:text-[#DDA162]">
                          {cs.id}
                        </span>
                        <span
                          className={`text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider ${
                            cs.severity === "Flagged"
                              ? "bg-amber-950/80 text-[#EBBA4A] border border-[#EBBA4A]"
                              : cs.severity === "Elevated"
                              ? "bg-[#304A78] text-[#DDA162]"
                              : "bg-[#2C3259] text-[#A87C56]"
                          }`}
                        >
                          {cs.severity}
                        </span>
                      </div>

                      <h4 className="font-medium text-[#F4F1EB] line-clamp-2 leading-relaxed">
                        {cs.title}
                      </h4>

                      <div className="space-y-1 text-[11px] text-[#A87C56] pt-1 border-t border-[#304A78]/60">
                        <div>Dept: <span className="text-[#F4F1EB]">{cs.department}</span></div>
                        <div className="flex items-center justify-between">
                          <span>Opened: {cs.dateOpened}</span>
                          <span className="text-[#DDA162] truncate max-w-[110px]">{cs.assignedMember}</span>
                        </div>
                      </div>

                      {cs.retaliationFlagged && (
                        <div className="p-1.5 bg-amber-950/40 border border-[#EBBA4A] text-[#EBBA4A] text-[10px] flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3 shrink-0" />
                          <span>Retaliation Watch Active</span>
                        </div>
                      )}

                      <div className="pt-2 flex justify-end">
                        <Link
                          to={`/ic/cases/${cs.id}`}
                          className="text-[11px] text-[#DDA162] hover:text-[#EBBA4A] font-semibold inline-flex items-center gap-1"
                        >
                          <span>Open Case File</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Case Form Modal */}
      {newModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0E28]/80 backdrop-blur-none">
          <div className="bg-[#2C3259] border border-[#304A78] max-w-lg w-full p-6 text-[#F4F1EB] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#304A78]">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#DDA162]" />
                <h3 className="font-serif text-lg font-bold text-[#F4F1EB]">
                  Register New Statutory Case
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setNewModalOpen(false)}
                className="text-[#A87C56] hover:text-[#F4F1EB]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCase} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                  Case Summary Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Conduct concern regarding travel schedules"
                  className="w-full bg-[#0A0E28] border border-[#304A78] px-3.5 py-2 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                    Department
                  </label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full bg-[#0A0E28] border border-[#304A78] px-2.5 py-2 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
                  >
                    <option value="Platform Engineering">Platform Engineering</option>
                    <option value="Enterprise Sales">Enterprise Sales</option>
                    <option value="Product Design Systems">Product Design Systems</option>
                    <option value="Corporate Finance">Corporate Finance</option>
                    <option value="Operations & Logistics">Operations & Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                    Severity Tier
                  </label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as SeverityTier)}
                    className="w-full bg-[#0A0E28] border border-[#304A78] px-2.5 py-2 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
                  >
                    <option value="Watch">Watch</option>
                    <option value="Elevated">Elevated</option>
                    <option value="Flagged">Flagged</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                    Assigned IC Member
                  </label>
                  <select
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    className="w-full bg-[#0A0E28] border border-[#304A78] px-2.5 py-2 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
                  >
                    <option value="Dr. Sunita Rao">Dr. Sunita Rao (Presiding Officer)</option>
                    <option value="Adv. Shalini Sen">Adv. Shalini Sen (External Member)</option>
                    <option value="Anita Deshmukh">Anita Deshmukh (Internal Member)</option>
                    <option value="Vikram Malhotra">Vikram Malhotra (Internal Member)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                    Respondent Role / Seniority
                  </label>
                  <input
                    type="text"
                    value={newRespRole}
                    onChange={(e) => setNewRespRole(e.target.value)}
                    placeholder="e.g. Senior Director"
                    className="w-full bg-[#0A0E28] border border-[#304A78] px-3 py-2 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#304A78]">
                <button
                  type="button"
                  onClick={() => setNewModalOpen(false)}
                  className="px-4 py-2 border border-[#304A78] text-xs text-[#A87C56] hover:text-[#F4F1EB]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A]"
                >
                  Create Case File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
