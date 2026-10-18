import React, { useState } from "react";
import { FileText, Plus, Download, Calendar, Users, CheckCircle, Trash2, X } from "lucide-react";
import { MOCK_MEETING_MINUTES, MeetingMinutesRecord, MOCK_IC_ROSTER } from "../../data/mockData";

export const ICMinutesPage: React.FC = () => {
  const [minutesList, setMinutesList] = useState<MeetingMinutesRecord[]>(MOCK_MEETING_MINUTES);
  const [selectedMinutes, setSelectedMinutes] = useState<MeetingMinutesRecord | null>(
    MOCK_MEETING_MINUTES[0]
  );
  const [builderOpen, setBuilderOpen] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  // Builder Form State
  const [bDate, setBDate] = useState("18 Feb 2026");
  const [bTitle, setBTitle] = useState("Statutory IC Inquiry Review Session");
  const [bAttendees, setBAttendees] = useState<string[]>([
    "Dr. Sunita Rao",
    "Adv. Shalini Sen",
    "Anita Deshmukh",
  ]);
  const [bAgenda, setBAgenda] = useState<{ topic: string; discussion: string }[]>([
    {
      topic: "Review of anonymous evidence submission TR-K8X2M9PQ",
      discussion: "Evaluated timestamps against communication telemetry pattern PAT-5519.",
    },
  ]);
  const [bDecisions, setBDecisions] = useState<string[]>([
    "Unanimous authorization of Section 12 interim protection.",
  ]);
  const [bActions, setBActions] = useState<
    { task: string; owner: string; deadline: string; status: "Pending" | "Done" }[]
  >([
    { task: "File interim order with HR Operations", owner: "Adv. Shalini Sen", deadline: "22 Feb 2026", status: "Pending" },
  ]);
  const [bNextMeeting, setBNextMeeting] = useState("04 Mar 2026");

  const handleToggleAttendee = (name: string) => {
    setBAttendees((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const handleAddAgendaItem = () => {
    setBAgenda([...bAgenda, { topic: "", discussion: "" }]);
  };

  const handleAddActionItem = () => {
    setBActions([...bActions, { task: "", owner: "Dr. Sunita Rao", deadline: "01 Mar 2026", status: "Pending" }]);
  };

  const handleSaveMinutes = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: MeetingMinutesRecord = {
      id: `MIN-2026-0${minutesList.length + 1}`,
      date: bDate,
      title: bTitle,
      attendees: bAttendees,
      agendaItems: bAgenda.filter((a) => a.topic.trim()),
      decisions: bDecisions.filter((d) => d.trim()),
      actionItems: bActions.filter((ac) => ac.task.trim()),
      nextMeetingDate: bNextMeeting,
    };
    setMinutesList([newRecord, ...minutesList]);
    setSelectedMinutes(newRecord);
    setBuilderOpen(false);
  };

  const handleExportPDF = () => {
    setPdfDownloaded(true);
    setTimeout(() => setPdfDownloaded(false), 3000);
    // Real dummy download simulation
    const content = `THEODRA STATUTORY MEETING MINUTES\nMeeting: ${selectedMinutes?.title}\nDate: ${selectedMinutes?.date}\nAttendees: ${selectedMinutes?.attendees.join(", ")}\n\nNext Meeting: ${selectedMinutes?.nextMeetingDate}`;
    const blob = new Blob([content], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `minutes_${selectedMinutes?.id || "IC"}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#304A78]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
            Statutory Governance & Records
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            Meeting Minutes Builder
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            Structured records of proceedings, quorum compliance, and statutory action items.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportPDF}
            className="px-4 py-2 bg-[#0A0E28] border border-[#304A78] text-xs font-semibold text-[#DDA162] hover:bg-[#304A78] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export as PDF</span>
          </button>
          <button
            type="button"
            onClick={() => setBuilderOpen(true)}
            className="px-4 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>New Minutes</span>
          </button>
        </div>
      </div>

      {pdfDownloaded && (
        <div className="p-3 bg-[#0A0E28] border border-[#DDA162] text-xs text-[#DDA162] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#EBBA4A]" />
          <span>Statutory meeting minutes PDF generated and downloaded.</span>
        </div>
      )}

      {/* Two Column Layout: Past Minutes List & Active Minutes Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
        {/* Past Minutes List (3.5 cols) */}
        <div className="lg:col-span-4 bg-[#2C3259] border border-[#304A78] p-4 shadow-2xl space-y-3">
          <h3 className="font-serif text-sm font-bold text-[#F4F1EB] pb-2 border-b border-[#304A78]">
            Archived Minutes ({minutesList.length})
          </h3>
          <div className="space-y-2">
            {minutesList.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMinutes(m)}
                className={`w-full text-left p-3.5 border text-xs transition-colors ${
                  selectedMinutes?.id === m.id
                    ? "bg-[#0A0E28] border-[#DDA162] text-[#DDA162]"
                    : "bg-[#0A0E28]/40 border-[#304A78] text-[#F4F1EB] hover:border-[#DDA162]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-[#F4F1EB]">{m.id}</span>
                  <span className="text-[10px] text-[#A87C56] font-mono">{m.date}</span>
                </div>
                <h4 className="font-semibold text-xs text-[#F4F1EB] line-clamp-1">{m.title}</h4>
                <div className="text-[10px] text-[#A87C56] mt-1">
                  Attendees: {m.attendees.length} members
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Minutes Detail (6.5 cols) */}
        <div className="lg:col-span-6 bg-[#2C3259] border border-[#304A78] p-6 shadow-2xl space-y-6">
          {selectedMinutes ? (
            <>
              <div className="pb-4 border-b border-[#304A78]">
                <div className="flex items-center justify-between text-xs text-[#A87C56] mb-1">
                  <span className="font-mono font-bold text-[#DDA162]">{selectedMinutes.id}</span>
                  <span>Date: {selectedMinutes.date}</span>
                </div>
                <h2 className="font-serif text-xl font-bold text-[#F4F1EB]">
                  {selectedMinutes.title}
                </h2>
                <div className="mt-3 flex flex-wrap gap-1.5 items-center">
                  <span className="text-xs text-[#A87C56] mr-1">Attendees:</span>
                  {selectedMinutes.attendees.map((att) => (
                    <span
                      key={att}
                      className="px-2 py-0.5 bg-[#0A0E28] border border-[#304A78] text-xs text-[#F4F1EB]"
                    >
                      {att}
                    </span>
                  ))}
                </div>
              </div>

              {/* Agenda & Discussions */}
              <div className="space-y-3">
                <h3 className="font-serif text-sm font-bold text-[#DDA162] uppercase tracking-wider">
                  Agenda Items & Deliberations
                </h3>
                {selectedMinutes.agendaItems.map((item, idx) => (
                  <div key={idx} className="p-3 bg-[#0A0E28] border border-[#304A78] text-xs space-y-1">
                    <span className="font-semibold text-[#F4F1EB] block">
                      {idx + 1}. {item.topic}
                    </span>
                    <p className="text-[#A87C56] leading-relaxed font-serif">{item.discussion}</p>
                  </div>
                ))}
              </div>

              {/* Decisions Made */}
              <div className="space-y-2">
                <h3 className="font-serif text-sm font-bold text-[#DDA162] uppercase tracking-wider">
                  Decisions Formally Recorded
                </h3>
                <div className="space-y-1.5">
                  {selectedMinutes.decisions.map((dec, i) => (
                    <div
                      key={i}
                      className="p-2.5 bg-[#0A0E28] border border-[#304A78] text-xs text-[#F4F1EB] flex items-start gap-2"
                    >
                      <span className="text-[#EBBA4A] font-bold">✓</span>
                      <span>{dec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Items */}
              <div className="space-y-2">
                <h3 className="font-serif text-sm font-bold text-[#DDA162] uppercase tracking-wider">
                  Assigned Action Items
                </h3>
                <div className="divide-y divide-[#304A78] border border-[#304A78] bg-[#0A0E28]">
                  {selectedMinutes.actionItems.map((act, i) => (
                    <div key={i} className="p-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-medium text-[#F4F1EB]">{act.task}</span>
                        <div className="text-[10px] text-[#A87C56] mt-0.5">
                          Owner: <span className="text-[#DDA162]">{act.owner}</span> • Due: {act.deadline}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 font-bold uppercase ${
                          act.status === "Done"
                            ? "bg-[#304A78] text-[#DDA162]"
                            : "bg-[#2C3259] text-[#EBBA4A]"
                        }`}
                      >
                        {act.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#304A78] flex items-center justify-between text-xs text-[#A87C56]">
                <span>Next Scheduled Meeting:</span>
                <span className="font-mono text-[#F4F1EB] font-bold">
                  {selectedMinutes.nextMeetingDate}
                </span>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-xs text-[#A87C56]">
              Select a meeting minutes record to review.
            </div>
          )}
        </div>
      </div>

      {/* Minutes Builder Modal Form */}
      {builderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0E28]/80 backdrop-blur-none overflow-y-auto">
          <div className="bg-[#2C3259] border border-[#304A78] max-w-2xl w-full p-6 text-[#F4F1EB] shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#304A78]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#DDA162]" />
                <h3 className="font-serif text-lg font-bold text-[#F4F1EB]">
                  Record Statutory Meeting Minutes
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setBuilderOpen(false)}
                className="text-[#A87C56] hover:text-[#F4F1EB]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveMinutes} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                    Meeting Date
                  </label>
                  <input
                    type="text"
                    required
                    value={bDate}
                    onChange={(e) => setBDate(e.target.value)}
                    className="w-full bg-[#0A0E28] border border-[#304A78] px-3 py-2 text-xs text-[#F4F1EB] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                    Meeting Title
                  </label>
                  <input
                    type="text"
                    required
                    value={bTitle}
                    onChange={(e) => setBTitle(e.target.value)}
                    className="w-full bg-[#0A0E28] border border-[#304A78] px-3 py-2 text-xs text-[#F4F1EB] focus:outline-none"
                  />
                </div>
              </div>

              {/* Attendees Multi-select */}
              <div>
                <label className="block text-xs font-semibold text-[#F4F1EB] mb-1.5">
                  Attendees (Internal Committee Roster)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {MOCK_IC_ROSTER.map((mem) => {
                    const isSelected = bAttendees.includes(mem.name);
                    return (
                      <button
                        key={mem.id}
                        type="button"
                        onClick={() => handleToggleAttendee(mem.name)}
                        className={`p-2 text-left border text-xs flex items-center justify-between ${
                          isSelected
                            ? "bg-[#0A0E28] border-[#DDA162] text-[#DDA162]"
                            : "bg-[#0A0E28]/40 border-[#304A78] text-[#A87C56]"
                        }`}
                      >
                        <span className="truncate">{mem.name}</span>
                        <span className="font-bold">{isSelected ? "✓" : "+"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Agenda Items */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-[#F4F1EB]">Agenda Items</label>
                  <button
                    type="button"
                    onClick={handleAddAgendaItem}
                    className="text-[11px] text-[#DDA162] hover:underline"
                  >
                    + Add Agenda Item
                  </button>
                </div>
                {bAgenda.map((ag, i) => (
                  <div key={i} className="p-3 bg-[#0A0E28] border border-[#304A78] space-y-2">
                    <input
                      type="text"
                      placeholder="Agenda topic..."
                      value={ag.topic}
                      onChange={(e) => {
                        const copy = [...bAgenda];
                        copy[i].topic = e.target.value;
                        setBAgenda(copy);
                      }}
                      className="w-full bg-[#2C3259] border border-[#304A78] px-2.5 py-1.5 text-xs text-[#F4F1EB] focus:outline-none"
                    />
                    <textarea
                      rows={2}
                      placeholder="Discussion summary..."
                      value={ag.discussion}
                      onChange={(e) => {
                        const copy = [...bAgenda];
                        copy[i].discussion = e.target.value;
                        setBAgenda(copy);
                      }}
                      className="w-full bg-[#2C3259] border border-[#304A78] p-2 text-xs text-[#F4F1EB] focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              {/* Action Items */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-[#F4F1EB]">Action Items</label>
                  <button
                    type="button"
                    onClick={handleAddActionItem}
                    className="text-[11px] text-[#DDA162] hover:underline"
                  >
                    + Add Action Item
                  </button>
                </div>
                {bActions.map((ac, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Task description..."
                      value={ac.task}
                      onChange={(e) => {
                        const copy = [...bActions];
                        copy[i].task = e.target.value;
                        setBActions(copy);
                      }}
                      className="flex-1 bg-[#0A0E28] border border-[#304A78] px-2.5 py-1.5 text-xs text-[#F4F1EB]"
                    />
                    <input
                      type="text"
                      placeholder="Owner..."
                      value={ac.owner}
                      onChange={(e) => {
                        const copy = [...bActions];
                        copy[i].owner = e.target.value;
                        setBActions(copy);
                      }}
                      className="w-32 bg-[#0A0E28] border border-[#304A78] px-2 py-1.5 text-xs text-[#F4F1EB]"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                  Next Scheduled Meeting Date
                </label>
                <input
                  type="text"
                  value={bNextMeeting}
                  onChange={(e) => setBNextMeeting(e.target.value)}
                  className="w-full bg-[#0A0E28] border border-[#304A78] px-3 py-2 text-xs text-[#F4F1EB]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#304A78]">
                <button
                  type="button"
                  onClick={() => setBuilderOpen(false)}
                  className="px-4 py-2 border border-[#304A78] text-xs text-[#A87C56]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A]"
                >
                  Save & Archive Minutes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
