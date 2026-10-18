import React, { useState } from "react";
import { GraduationCap, BellRing, Plus, Award, CheckCircle, Search, Edit2 } from "lucide-react";
import { MOCK_IC_TRAINING, ICTrainingRecord } from "../../data/mockData";

interface OrgEmployeeTraining {
  employeeId: string;
  department: string;
  module: string;
  status: "Completed" | "Pending" | "Overdue";
  completedDate: string;
  certificateId: string;
}

const MOCK_ORG_TRAINING: OrgEmployeeTraining[] = [
  { employeeId: "EMP-1029", department: "Platform Engineering", module: "Workplace Civility & POSH Sensitization 2026", status: "Completed", completedDate: "14 Jan 2026", certificateId: "CERT-ORG-8841" },
  { employeeId: "EMP-1033", department: "Enterprise Sales", module: "Workplace Civility & POSH Sensitization 2026", status: "Completed", completedDate: "20 Jan 2026", certificateId: "CERT-ORG-8849" },
  { employeeId: "EMP-1045", department: "Corporate Finance", module: "Managerial Duty & Anti-Retaliation Protocol", status: "Completed", completedDate: "02 Feb 2026", certificateId: "CERT-ORG-8902" },
  { employeeId: "EMP-1088", department: "Operations & Logistics", module: "Workplace Civility & POSH Sensitization 2026", status: "Pending", completedDate: "—", certificateId: "—" },
  { employeeId: "EMP-1102", department: "Product Design", module: "Workplace Civility & POSH Sensitization 2026", status: "Completed", completedDate: "12 Dec 2025", certificateId: "CERT-ORG-8712" },
  { employeeId: "EMP-1144", department: "Cloud Infrastructure", module: "Workplace Civility & POSH Sensitization 2026", status: "Overdue", completedDate: "—", certificateId: "—" },
  { employeeId: "EMP-1190", department: "Legal & Regulatory", module: "Managerial Duty & Anti-Retaliation Protocol", status: "Completed", completedDate: "10 Jan 2026", certificateId: "CERT-ORG-8822" },
  { employeeId: "EMP-1205", department: "Customer Support", module: "Workplace Civility & POSH Sensitization 2026", status: "Completed", completedDate: "18 Jan 2026", certificateId: "CERT-ORG-8874" },
];

export const HRTrainingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"org" | "ic">("org");
  const [orgRecords, setOrgRecords] = useState<OrgEmployeeTraining[]>(MOCK_ORG_TRAINING);
  const [icRecords, setIcRecords] = useState<ICTrainingRecord[]>(MOCK_IC_TRAINING);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const orgCompleted = orgRecords.filter((r) => r.status === "Completed").length;
  const orgTotal = orgRecords.length;

  const handleBulkReminder = () => {
    setNotice("Automated training reminders dispatched to 2 overdue/pending personnel.");
    setTimeout(() => setNotice(null), 3000);
  };

  const handleAssignTraining = () => {
    setNotice("New 2026 Refresher Module assigned to all department associates.");
    setTimeout(() => setNotice(null), 3000);
  };

  const filteredOrg = orgRecords.filter(
    (r) =>
      r.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      r.department.toLowerCase().includes(search.toLowerCase()) ||
      r.module.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262E5F]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
            Organisation-Wide Educational Mandates (§19)
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            Training Management
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            Oversee workforce sensitization programs and statutory IC capacity building.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAssignTraining}
            className="px-4 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Assign Training</span>
          </button>
          <button
            type="button"
            onClick={handleBulkReminder}
            className="px-4 py-2 bg-[#0A0E28] border border-[#262E5F] text-xs font-semibold text-[#DDA162] hover:bg-[#262E5F] hover:border-[#DDA162] rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <BellRing className="w-4 h-4" />
            <span>Send Bulk Reminder</span>
          </button>
        </div>
      </div>

      {notice && (
        <div className="p-3 bg-[#0A0E28] border border-[#DDA162] text-xs text-[#DDA162] rounded-xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#EBBA4A]" />
          <span>{notice}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-[#262E5F] pb-1">
        <button
          type="button"
          onClick={() => setActiveTab("org")}
          className={`pb-2.5 px-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
            activeTab === "org"
              ? "border-[#DDA162] text-[#DDA162]"
              : "border-transparent text-[#A87C56] hover:text-[#F4F1EB]"
          }`}
        >
          Organisation Training (All Employees)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("ic")}
          className={`pb-2.5 px-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
            activeTab === "ic"
              ? "border-[#DDA162] text-[#DDA162]"
              : "border-transparent text-[#A87C56] hover:text-[#F4F1EB]"
          }`}
        >
          Internal Committee Training Tracker
        </button>
      </div>

      {activeTab === "org" ? (
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#DDA162]">
                Statutory Sensitization Coverage
              </span>
              <div className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
                94.2% Completion Rate
              </div>
              <p className="text-xs text-[#A87C56] mt-1">
                1,420 of 1,507 total active employees certified in FY 2025–26.
              </p>
            </div>
            <div className="w-full sm:w-64 bg-[#0E1438] p-4 rounded-xl border border-[#262E5F]">
              <div className="flex justify-between text-xs text-[#A87C56] mb-1.5">
                <span>SEBI BRSR Target: 90%</span>
                <span className="text-[#DDA162] font-mono font-bold">94.2%</span>
              </div>
              <div className="w-full bg-[#0A0E28] h-2.5 rounded-full overflow-hidden border border-[#262E5F]">
                <div className="h-full bg-[#DDA162] rounded-full transition-all duration-500" style={{ width: "94.2%" }} />
              </div>
            </div>
          </div>

          {/* Org Table */}
          <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-[#0E1438] border-b border-[#262E5F] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="font-serif text-sm font-bold text-[#F4F1EB]">
                Sampled Employee Certification Register (Anonymized)
              </span>
              <div className="w-full sm:w-64 relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search ID, department..."
                  className="w-full bg-[#0A0E28] border border-[#262E5F] rounded-xl px-3 py-1.5 text-xs text-[#F4F1EB] placeholder-[#A87C56] focus:outline-none focus:border-[#DDA162]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#0A0E28] border-b border-[#262E5F] text-[#A87C56] uppercase text-[10px] tracking-wider">
                    <th className="py-3.5 px-4">Employee ID</th>
                    <th className="py-3.5 px-4">Department</th>
                    <th className="py-3.5 px-4">Module</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Completed Date</th>
                    <th className="py-3.5 px-4 text-right">Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262E5F]/60">
                  {filteredOrg.map((row) => (
                    <tr key={row.employeeId} className="hover:bg-[#262E5F] transition-colors cursor-pointer group">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#F4F1EB] group-hover:text-[#DDA162]">
                        {row.employeeId}
                      </td>
                      <td className="py-3.5 px-4 text-[#F4F1EB]">{row.department}</td>
                      <td className="py-3.5 px-4 text-[#A87C56]">{row.module}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            row.status === "Completed"
                              ? "bg-[#0E1438] text-[#DDA162] border border-[#262E5F]"
                              : row.status === "Overdue"
                              ? "bg-amber-950 text-[#EBBA4A] border border-[#EBBA4A]"
                              : "bg-[#0A0E28] text-[#A87C56] border border-[#262E5F]"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#A87C56]">{row.completedDate}</td>
                      <td className="py-3.5 px-4 text-right font-mono text-[11px] text-[#DDA162]">
                        {row.certificateId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* IC Training Tab (Editable by HR) */
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-4 bg-[#0E1438] border-b border-[#262E5F]">
            <h3 className="font-serif text-sm font-bold text-[#F4F1EB]">
              Internal Committee Jurisprudence Certification Roster
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#0A0E28] border-b border-[#262E5F] text-[#A87C56] uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-4">IC Member</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Statutory Module</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Certificate ID</th>
                  <th className="py-3.5 px-4">Days Left</th>
                  <th className="py-3.5 px-4 text-right">HR Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262E5F]/60">
                {icRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-[#262E5F] transition-colors cursor-pointer group">
                    <td className="py-3.5 px-4 font-semibold text-[#F4F1EB] group-hover:text-[#DDA162]">{rec.memberName}</td>
                    <td className="py-3.5 px-4 text-[#A87C56]">{rec.role}</td>
                    <td className="py-3.5 px-4 text-[#F4F1EB] max-w-xs">{rec.trainingModule}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                          rec.status === "Completed"
                            ? "bg-[#0E1438] text-[#DDA162] border border-[#262E5F]"
                            : "bg-amber-950 text-[#EBBA4A] border border-[#EBBA4A]"
                        }`}
                      >
                        {rec.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#DDA162]">
                      {rec.certificateId || "Pending"}
                    </td>
                    <td className="py-3.5 px-4 font-mono">{rec.daysUntilExpiry} days</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setNotice(`Certification status updated for ${rec.memberName}`);
                          setTimeout(() => setNotice(null), 2500);
                        }}
                        className="px-3 py-1 bg-[#0A0E28] border border-[#262E5F] rounded-lg text-[11px] text-[#DDA162] hover:bg-[#DDA162] hover:text-[#0A0E28] transition-colors cursor-pointer"
                      >
                        Update Record
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
