import React, { useState } from "react";
import { Users, Plus, Download, Trash2, Edit3, CheckCircle2, X, AlertTriangle } from "lucide-react";
import { MOCK_IC_ROSTER, CommitteeMember } from "../../data/mockData";

export const HRRosterPage: React.FC = () => {
  const [roster, setRoster] = useState<CommitteeMember[]>(MOCK_IC_ROSTER);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<CommitteeMember | null>(null);
  const [editRoleMember, setEditRoleMember] = useState<CommitteeMember | null>(null);

  // New Member Form State
  const [newName, setNewName] = useState("");
  const [newDesig, setNewDesig] = useState("");
  const [newDept, setNewDept] = useState("Corporate");
  const [newRole, setNewRole] = useState<"Presiding Officer" | "Internal Member" | "External Member">("Internal Member");
  const [newCategory, setNewCategory] = useState("Employee Representative (POSH Act §4(2)(b))");

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember: CommitteeMember = {
      id: `ic-mem-${roster.length + 1}`,
      name: newName.trim(),
      designation: newDesig.trim() || "Senior Associate",
      department: newDept,
      role: newRole,
      joinDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      termExpiry: "18 Feb 2029",
      trainingStatus: "Expiring Soon",
      statutoryCategory: newCategory,
    };
    setRoster([...roster, newMember]);
    setAddModalOpen(false);
    setNewName("");
    setNewDesig("");
  };

  const handleConfirmRemove = () => {
    if (memberToRemove) {
      setRoster(roster.filter((m) => m.id !== memberToRemove.id));
      setRemoveModalOpen(false);
      setMemberToRemove(null);
    }
  };

  const handleSaveEditedRole = (role: "Presiding Officer" | "Internal Member" | "External Member") => {
    if (editRoleMember) {
      setRoster(roster.map((m) => (m.id === editRoleMember.id ? { ...m, role } : m)));
      setEditRoleMember(null);
    }
  };

  const handleExportCSV = () => {
    const headers = "ID,Name,Designation,Department,Role,Join Date,Term Expiry,Training Status,Statutory Category\n";
    const rows = roster
      .map(
        (m) =>
          `"${m.id}","${m.name}","${m.designation}","${m.department}","${m.role}","${m.joinDate}","${m.termExpiry}","${m.trainingStatus}","${m.statutoryCategory}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `theodra_ic_roster_${Date.now()}.csv`);
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
            Statutory Committee Constitution (§4)
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            IC Roster Management
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            Ensuring legal quorum: Presiding Officer, 50% women representation, and independent External Member.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-4 py-2 bg-[#0A0E28] border border-[#304A78] text-xs font-semibold text-[#DDA162] hover:bg-[#304A78] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Roster CSV</span>
          </button>
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Roster Table (7 cols) & Onboarding Checklist (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
        {/* Table (7 cols) */}
        <div className="lg:col-span-7 bg-[#2C3259] border border-[#304A78] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#0A0E28] border-b border-[#304A78] text-[#A87C56] uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Member Name</th>
                  <th className="py-3 px-4">Designation</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Term Expiry</th>
                  <th className="py-3 px-4">Training</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#304A78]/50">
                {roster.map((mem) => (
                  <tr key={mem.id} className="hover:bg-[#0A0E28]/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#F4F1EB]">{mem.name}</td>
                    <td className="py-3.5 px-4 text-[#A87C56]">{mem.designation}</td>
                    <td className="py-3.5 px-4 text-[#F4F1EB]">{mem.department}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] px-2 py-0.5 font-bold uppercase ${
                          mem.role === "Presiding Officer"
                            ? "bg-[#DDA162] text-[#0A0E28]"
                            : mem.role === "External Member"
                            ? "bg-amber-950/80 text-[#EBBA4A] border border-[#EBBA4A]"
                            : "bg-[#304A78] text-[#DDA162]"
                        }`}
                      >
                        {mem.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#A87C56]">
                      {mem.termExpiry}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] px-2 py-0.5 font-semibold ${
                          mem.trainingStatus === "Certified"
                            ? "bg-[#304A78] text-[#DDA162]"
                            : mem.trainingStatus === "Expiring Soon"
                            ? "bg-[#0A0E28] text-[#EBBA4A] border border-[#EBBA4A]"
                            : "bg-amber-950/80 text-[#EBBA4A]"
                        }`}
                      >
                        {mem.trainingStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditRoleMember(mem)}
                        className="text-[#DDA162] hover:text-[#EBBA4A] p-1"
                        title="Edit Role"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMemberToRemove(mem);
                          setRemoveModalOpen(true);
                        }}
                        className="text-[#A87C56] hover:text-[#EBBA4A] p-1"
                        title="Remove Member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Onboarding Checklist Panel (3 cols) */}
        <div className="lg:col-span-3 bg-[#2C3259] border border-[#304A78] p-5 shadow-2xl space-y-4">
          <div className="pb-3 border-b border-[#304A78]">
            <h3 className="font-serif text-sm font-bold text-[#F4F1EB]">
              New Member Statutory Checklist
            </h3>
            <p className="text-[11px] text-[#A87C56] mt-0.5">
              Mandatory procedural onboarding steps under POSH Rules:
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {[
              {
                step: "1. Formal Board Resolution Appointment",
                desc: "Resolution passed under Section 4(1) recorded in board minutes.",
                done: true,
              },
              {
                step: "2. Confidentiality & Non-Disclosure Undertaking",
                desc: "Signed Section 16 non-disclosure statutory covenant.",
                done: true,
              },
              {
                step: "3. Conflict of Interest Declaration",
                desc: "Annual neutrality statement confirming zero bias in departments.",
                done: true,
              },
              {
                step: "4. Statutory Jurisprudence Certification",
                desc: "Completion of 4-hour POSH Act & Principles of Natural Justice course.",
                done: false,
              },
              {
                step: "5. Intimation to District Officer",
                desc: "Updated Form A notification filed with the jurisdictional DO.",
                done: false,
              },
            ].map((item, i) => (
              <div key={i} className="p-3 bg-[#0A0E28] border border-[#304A78] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#F4F1EB]">{item.step}</span>
                  {item.done ? (
                    <span className="text-[10px] text-[#DDA162] font-bold">Done</span>
                  ) : (
                    <span className="text-[10px] text-[#EBBA4A] font-bold">Pending</span>
                  )}
                </div>
                <p className="text-[11px] text-[#A87C56]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0E28]/80 backdrop-blur-none">
          <div className="bg-[#2C3259] border border-[#304A78] max-w-md w-full p-6 text-[#F4F1EB] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#304A78]">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#DDA162]" />
                <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
                  Add Committee Member
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="text-[#A87C56] hover:text-[#F4F1EB]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Priyadarshini Sen"
                  className="w-full bg-[#0A0E28] border border-[#304A78] px-3 py-2 text-xs text-[#F4F1EB] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                  Designation / Corporate Title
                </label>
                <input
                  type="text"
                  value={newDesig}
                  onChange={(e) => setNewDesig(e.target.value)}
                  placeholder="e.g. Senior Director, Corporate Affairs"
                  className="w-full bg-[#0A0E28] border border-[#304A78] px-3 py-2 text-xs text-[#F4F1EB] focus:outline-none"
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
                    className="w-full bg-[#0A0E28] border border-[#304A78] px-2.5 py-2 text-xs text-[#F4F1EB]"
                  >
                    <option value="Legal Affairs">Legal Affairs</option>
                    <option value="People Operations">People Operations</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Commercial">Commercial</option>
                    <option value="External / NGO">External / NGO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                    Committee Role
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) =>
                      setNewRole(e.target.value as "Presiding Officer" | "Internal Member" | "External Member")
                    }
                    className="w-full bg-[#0A0E28] border border-[#304A78] px-2.5 py-2 text-xs text-[#F4F1EB]"
                  >
                    <option value="Internal Member">Internal Member</option>
                    <option value="External Member">External Member</option>
                    <option value="Presiding Officer">Presiding Officer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                  Statutory Category Reference
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-[#0A0E28] border border-[#304A78] px-2.5 py-2 text-xs text-[#F4F1EB]"
                >
                  <option value="Employee Representative (POSH Act §4(2)(b))">
                    Employee Representative (POSH Act §4(2)(b))
                  </option>
                  <option value="Senior Woman Employee (POSH Act §4(2)(a))">
                    Senior Woman Employee (POSH Act §4(2)(a))
                  </option>
                  <option value="External Member / NGO (POSH Act §4(2)(c))">
                    External Member / NGO (POSH Act §4(2)(c))
                  </option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#304A78]">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 border border-[#304A78] text-xs text-[#A87C56]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A]"
                >
                  Add to Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Remove Member Confirmation Modal */}
      {removeModalOpen && memberToRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0E28]/80 backdrop-blur-none">
          <div className="bg-[#2C3259] border border-[#EBBA4A] max-w-md w-full p-6 text-[#F4F1EB] shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-[#EBBA4A]">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
                Confirm Member Removal
              </h3>
            </div>
            <p className="text-xs text-[#F4F1EB] leading-relaxed">
              Are you sure you want to remove <span className="text-[#DDA162] font-semibold">{memberToRemove.name}</span> ({memberToRemove.role}) from the statutory roster? This will necessitate filing a replacement with the District Officer.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#304A78]">
              <button
                type="button"
                onClick={() => setRemoveModalOpen(false)}
                className="px-4 py-2 border border-[#304A78] text-xs text-[#A87C56]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRemove}
                className="px-5 py-2 bg-[#EBBA4A] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#DDA162]"
              >
                Confirm Removal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {editRoleMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0E28]/80 backdrop-blur-none">
          <div className="bg-[#2C3259] border border-[#304A78] max-w-sm w-full p-6 text-[#F4F1EB] shadow-2xl space-y-4">
            <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
              Edit Role for {editRoleMember.name}
            </h3>
            <div className="space-y-2">
              {(["Presiding Officer", "Internal Member", "External Member"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleSaveEditedRole(r)}
                  className="w-full p-2.5 bg-[#0A0E28] border border-[#304A78] hover:border-[#DDA162] text-xs font-semibold text-[#F4F1EB] text-left"
                >
                  {r}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setEditRoleMember(null)}
              className="w-full py-2 border border-[#304A78] text-xs text-[#A87C56]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
