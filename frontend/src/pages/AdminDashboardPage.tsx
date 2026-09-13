import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  MOCK_IC_ROSTER,
  MOCK_COMPLIANCE_METRICS,
  CommitteeMember,
} from "../data/mockData";
import {
  Building2,
  Users,
  Calendar,
  ShieldCheck,
  AlertCircle,
  Plus,
  Trash2,
  FileCheck2,
  Lock,
  ArrowRight,
  X,
  CheckCircle2,
} from "lucide-react";

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [roster, setRoster] = useState<CommitteeMember[]>(MOCK_IC_ROSTER);
  const [metrics] = useState(MOCK_COMPLIANCE_METRICS);

  // Add Member Modal State
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState<"Internal Member" | "External Member">("Internal Member");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Employee Representative (POSH Act §4(2)(b))");

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newTitle) return;

    const newMember: CommitteeMember = {
      id: `ic_${Date.now()}`,
      name: newName,
      roleInCommittee: newRole,
      corporateTitle: newTitle,
      termStartDate: "Today",
      termEndDate: "3 Years from Today",
      statutoryCategory: newCategory,
      trainingCertified: true,
    };

    setRoster([...roster, newMember]);
    setNewName("");
    setNewTitle("");
    setAddModalOpen(false);
  };

  const handleRemoveMember = (id: string) => {
    if (roster.length <= 4) {
      alert("Statutory Minimum: The Internal Committee must maintain at least 4 members under Section 4 of the POSH Act.");
      return;
    }
    setRoster(roster.filter((m) => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0A0E28] text-[#F4F1EB] py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Workspace Top Header */}
        <div className="bg-[#13193A] border border-[#262E5F] p-6 rounded-[8px] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#E0A96D]">
                HR Governance &amp; Administration Console
              </span>
              <span className="text-[#7A756B] text-xs">·</span>
              <span className="font-sans text-[11px] text-[#F0B83A] bg-[#4E182A]/40 border border-[#E0A96D]/30 px-2 py-0.5 rounded-[4px]">
                Statutory Compliance
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F4F1EB]">
              Internal Committee Roster &amp; Filing Tracker
            </h1>
            <p className="font-sans text-xs text-[#BDB9AD] mt-1">
              Active Administrator: <strong className="text-[#F4F1EB]">{user?.name || "Rajesh Menon"}</strong> ({user?.title || "VP HR & Compliance"})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setAddModalOpen(true)}
              className="font-sans text-xs font-semibold bg-[#F0B83A] text-[#0A0E28] px-4 py-2 rounded-[6px] hover:bg-[#F0B83A]/90 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" /> Add Committee Member
            </button>
          </div>
        </div>

        {/* Statutory Boundary Notice Banner */}
        <div className="bg-[#13193A] border-l-4 border-[#E0A96D] border border-[#262E5F] p-5 rounded-r-[8px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#F0B83A] shrink-0 mt-0.5" />
            <div>
              <span className="font-sans text-xs font-semibold text-[#E0A96D] uppercase tracking-wider block mb-0.5">
                Statutory Separation of Duties Enforced in Code
              </span>
              <p className="font-sans text-xs text-[#BDB9AD] leading-relaxed">
                As an HR Administrator, you manage committee rosters, statutory deadlines, and training metrics. Under Section 16 of India&apos;s POSH Act, <strong className="text-[#F4F1EB]">you are strictly barred from viewing individual pattern data or employee case reports</strong>.
              </p>
            </div>
          </div>

          <Link
            to="/dashboard/ic"
            className="font-sans text-xs text-[#F0B83A] hover:underline whitespace-nowrap flex items-center gap-1 shrink-0"
          >
            Test Route Guard (Attempt IC Access) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Compliance Status Widgets & Filing Tracker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Annual Filing Deadline */}
          <div className="bg-[#13193A] border border-[#262E5F] p-4 rounded-[8px] space-y-1">
            <div className="flex items-center justify-between text-[#7A756B]">
              <span className="font-sans text-[10px] uppercase tracking-wider">
                Annual POSH Filing
              </span>
              <Calendar className="w-4 h-4 text-[#F0B83A]" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#F4F1EB] tabular">
              {metrics.daysRemainingForFiling} Days
            </div>
            <div className="font-sans text-[11px] text-[#E0A96D]">
              Due by: {metrics.annualReportDeadline}
            </div>
          </div>

          {/* Sensitization Rate */}
          <div className="bg-[#13193A] border border-[#262E5F] p-4 rounded-[8px] space-y-1">
            <div className="flex items-center justify-between text-[#7A756B]">
              <span className="font-sans text-[10px] uppercase tracking-wider">
                Sensitization Rate
              </span>
              <ShieldCheck className="w-4 h-4 text-[#F0B83A]" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#F0B83A] tabular">
              {metrics.sensitizationCompletionRate}%
            </div>
            <div className="font-sans text-[11px] text-[#7A756B]">
              {metrics.totalEmployeesSensitized} / {metrics.totalWorkforceHeadcount} staff trained
            </div>
          </div>

          {/* Quarterly Meetings */}
          <div className="bg-[#13193A] border border-[#262E5F] p-4 rounded-[8px] space-y-1">
            <div className="flex items-center justify-between text-[#7A756B]">
              <span className="font-sans text-[10px] uppercase tracking-wider">
                IC Official Meetings
              </span>
              <Users className="w-4 h-4 text-[#E0A96D]" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#F4F1EB] tabular">
              {metrics.quarterlyMeetingsConvened} / {metrics.requiredQuarterlyMeetings}
            </div>
            <div className="font-sans text-[11px] text-[#E0A96D]">
              Statutory quorum fulfilled
            </div>
          </div>

          {/* System Integrity */}
          <div className="bg-[#13193A] border border-[#262E5F] p-4 rounded-[8px] space-y-1">
            <div className="flex items-center justify-between text-[#7A756B]">
              <span className="font-sans text-[10px] uppercase tracking-wider">
                System Integrity
              </span>
              <CheckCircle2 className="w-4 h-4 text-[#F0B83A]" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#F0B83A]">
              {metrics.systemIntegrityStatus}
            </div>
            <div className="font-sans text-[11px] text-[#7A756B]">
              Zero content storage verified
            </div>
          </div>
        </div>

        {/* IC Roster Management Table */}
        <div className="bg-[#13193A] border border-[#262E5F] rounded-[8px] overflow-hidden">
          <div className="p-5 border-b border-[#262E5F] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#F4F1EB]">
                Registered Internal Committee Roster
              </h2>
              <p className="font-sans text-xs text-[#BDB9AD]">
                Statutory composition registered under Section 4 of the Sexual Harassment of Women at Workplace Act 2013.
              </p>
            </div>
            <span className="font-sans text-[11px] text-[#E0A96D] bg-[#1C234E] border border-[#262E5F] px-3 py-1 rounded-[4px] self-start sm:self-auto">
              {roster.length} Appointed Members
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs">
              <thead className="bg-[#0A0E28] border-b border-[#262E5F] text-[#7A756B] uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Statutory Position</th>
                  <th className="py-3.5 px-4 font-semibold">Member Name &amp; Corporate Role</th>
                  <th className="py-3.5 px-4 font-semibold">Tenure</th>
                  <th className="py-3.5 px-4 font-semibold">Statutory Requirement</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1D244C]">
                {roster.map((member) => (
                  <tr key={member.id} className="hover:bg-[#1C234E]/60 transition-colors">
                    <td className="py-4 px-4 font-semibold text-[#F0B83A] whitespace-nowrap">
                      {member.roleInCommittee}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-serif text-sm font-bold text-[#F4F1EB]">
                        {member.name}
                      </div>
                      <div className="text-[11px] text-[#7A756B]">
                        {member.corporateTitle}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#BDB9AD] whitespace-nowrap">
                      <div>From: {member.termStartDate}</div>
                      <div className="text-[10px] text-[#7A756B]">To: {member.termEndDate}</div>
                    </td>
                    <td className="py-4 px-4 text-[#BDB9AD] text-[11px] max-w-xs leading-relaxed">
                      {member.statutoryCategory}
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      {member.roleInCommittee !== "Presiding Officer" ? (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-[#7A756B] hover:text-red-400 p-1.5 rounded transition-colors"
                          title="Remove member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="text-[10px] text-[#7A756B] italic">
                          Mandatory Chair
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Annual POSH Report Compilation Summary Box */}
        <div className="bg-[#13193A] border border-[#262E5F] p-6 rounded-[8px] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#262E5F] pb-4">
            <div>
              <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
                District Officer Annual POSH Report Compilation
              </h3>
              <p className="font-sans text-xs text-[#BDB9AD]">
                Statutory summary compiled under Section 21 of the POSH Act for local municipal jurisdiction.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert("Statutory annual POSH summary generated.")}
              className="font-sans text-xs font-semibold bg-[#E0A96D] text-[#0A0E28] px-4 py-2 rounded-[6px] hover:bg-[#E0A96D]/90 transition-colors self-start sm:self-auto cursor-pointer"
            >
              Generate Filing Pack (PDF)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
            <div className="p-3 bg-[#0A0E28] border border-[#262E5F] rounded-[6px]">
              <div className="text-[10px] uppercase text-[#7A756B]">Form Category</div>
              <div className="font-serif text-sm font-bold text-[#F4F1EB] mt-0.5">Section 21 Report</div>
              <div className="text-[#7A756B] mt-0.5">Filing due to District Officer</div>
            </div>
            <div className="p-3 bg-[#0A0E28] border border-[#262E5F] rounded-[6px]">
              <div className="text-[10px] uppercase text-[#7A756B]">Sensitization Workshops</div>
              <div className="font-serif text-sm font-bold text-[#F4F1EB] mt-0.5">4 Full Sessions</div>
              <div className="text-[#7A756B] mt-0.5">Coverage: 94.2% of staff</div>
            </div>
            <div className="p-3 bg-[#0A0E28] border border-[#262E5F] rounded-[6px]">
              <div className="text-[10px] uppercase text-[#7A756B]">Statutory Compliance</div>
              <div className="font-serif text-sm font-bold text-[#F0B83A] mt-0.5">100% In Order</div>
              <div className="text-[#7A756B] mt-0.5">No overdue actions</div>
            </div>
          </div>
        </div>

        {/* Add Member Modal */}
        {addModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0E28]/85 p-4 overflow-y-auto"
            onClick={() => setAddModalOpen(false)}
          >
            <div
              className="w-full max-w-md bg-[#13193A] border border-[#262E5F] p-6 rounded-[8px] text-[#F4F1EB] shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#262E5F] pb-3">
                <h3 className="font-serif text-lg font-bold text-[#F4F1EB]">
                  Add Internal Committee Member
                </h3>
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="text-[#7A756B] hover:text-[#F4F1EB]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddMember} className="space-y-4">
                <div>
                  <label className="block font-sans text-xs font-medium text-[#BDB9AD] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Ramesh Kulkarni"
                    className="w-full bg-[#0A0E28] border border-[#262E5F] px-3 py-2 text-sm text-[#F4F1EB] rounded-[6px] focus:outline-none focus:border-[#F0B83A]"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs font-medium text-[#BDB9AD] mb-1">
                    Corporate Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Senior Director, Finance"
                    className="w-full bg-[#0A0E28] border border-[#262E5F] px-3 py-2 text-sm text-[#F4F1EB] rounded-[6px] focus:outline-none focus:border-[#F0B83A]"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs font-medium text-[#BDB9AD] mb-1">
                    Role in Committee
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as any)}
                    className="w-full bg-[#0A0E28] border border-[#262E5F] px-3 py-2 text-sm text-[#F4F1EB] rounded-[6px] focus:outline-none focus:border-[#F0B83A]"
                  >
                    <option value="Internal Member">Internal Member</option>
                    <option value="External Member">External Member</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-xs font-medium text-[#BDB9AD] mb-1">
                    Statutory Requirement Category
                  </label>
                  <input
                    type="text"
                    required
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="e.g. Employee Representative (POSH Act §4(2)(b))"
                    className="w-full bg-[#0A0E28] border border-[#262E5F] px-3 py-2 text-sm text-[#F4F1EB] rounded-[6px] focus:outline-none focus:border-[#F0B83A]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setAddModalOpen(false)}
                    className="font-sans text-xs text-[#BDB9AD] hover:text-[#F4F1EB] px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="font-sans text-xs font-semibold bg-[#F0B83A] text-[#0A0E28] px-5 py-2.5 rounded-[6px] hover:bg-[#F0B83A]/90 transition-colors cursor-pointer"
                  >
                    Register Member
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
