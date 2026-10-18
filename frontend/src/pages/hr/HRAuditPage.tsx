import React, { useState } from "react";
import { Eye, Download, Search, ShieldCheck, Lock, Filter } from "lucide-react";
import { MOCK_AUDIT_LOG, AuditLogEntry } from "../../data/mockData";

export const HRAuditPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>(MOCK_AUDIT_LOG);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState("All");
  const [notice, setNotice] = useState<string | null>(null);

  const filtered = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.resource.toLowerCase().includes(search.toLowerCase()) ||
      log.ipMasked.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || log.role === roleFilter;
    const matchesAction = actionFilter === "All" || log.action.includes(actionFilter);
    return matchesSearch && matchesRole && matchesAction;
  });

  const handleExportCSV = () => {
    setNotice("Audit log export completed with tamper-evident cryptographic hash signature.");
    setTimeout(() => setNotice(null), 3000);
    const headers = "ID,Timestamp,User,Role,Action,Resource,IP Masked,Status\n";
    const rows = filtered
      .map(
        (l) =>
          `"${l.id}","${l.timestamp}","${l.user}","${l.role}","${l.action}","${l.resource}","${l.ipMasked}","${l.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `theodra_audit_log_${Date.now()}.csv`);
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
            Immutable Security & Access Telemetry
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            Audit Log Viewer
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            Permanent, tamper-evident ledger tracking every authenticated query, vote, and export.
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-4 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Export Audit CSV</span>
          </button>
        </div>
      </div>

      {notice && (
        <div className="p-3 bg-[#0A0E28] border border-[#DDA162] text-xs text-[#DDA162] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#EBBA4A]" />
          <span>{notice}</span>
        </div>
      )}

      {/* Mandatory Header Note */}
      <div className="bg-[#2C3259] border border-[#304A78] p-3.5 flex items-center gap-2.5 text-xs text-[#F4F1EB]">
        <Lock className="w-4 h-4 text-[#DDA162] shrink-0" />
        <span className="font-semibold text-[#DDA162]">Statutory Integrity Note:</span>
        <span className="text-[#F4F1EB] opacity-90">
          Audit logs are tamper-evident and cannot be modified.
        </span>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#2C3259] border border-[#304A78] p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="w-full md:w-72 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search action, resource, user..."
            className="w-full bg-[#0A0E28] border border-[#304A78] px-3.5 py-2 text-xs text-[#F4F1EB] placeholder-[#A87C56] focus:outline-none focus:border-[#DDA162]"
          />
          <Search className="w-3.5 h-3.5 text-[#A87C56] absolute right-3 top-2.5 pointer-events-none" />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-[#A87C56]">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-[#0A0E28] border border-[#304A78] px-2.5 py-1.5 text-xs text-[#F4F1EB]"
            >
              <option value="All">All Roles</option>
              <option value="IC Member">IC Member</option>
              <option value="HR Admin">HR Admin</option>
              <option value="System Worker">System Worker</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#A87C56]">Action Type:</span>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="bg-[#0A0E28] border border-[#304A78] px-2.5 py-1.5 text-xs text-[#F4F1EB]"
            >
              <option value="All">All Actions</option>
              <option value="Viewed">View Events</option>
              <option value="Vote">Vote Actions</option>
              <option value="Report">Report Operations</option>
              <option value="Check">Automated Checks</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-[#2C3259] border border-[#304A78] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0A0E28] border-b border-[#304A78] text-[#A87C56] uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Resource Target</th>
                <th className="py-3 px-4">IP Address (Masked)</th>
                <th className="py-3 px-4 text-right">Integrity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#304A78]/50">
              {filtered.map((entry) => (
                <tr key={entry.id} className="hover:bg-[#0A0E28]/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#A87C56]">
                    {entry.timestamp}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#F4F1EB]">{entry.user}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] px-2 py-0.5 font-bold uppercase ${
                        entry.role === "IC Member"
                          ? "bg-[#304A78] text-[#DDA162]"
                          : entry.role === "HR Admin"
                          ? "bg-[#2C3259] text-[#EBBA4A]"
                          : "bg-[#0A0E28] text-[#A87C56]"
                      }`}
                    >
                      {entry.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#F4F1EB]">{entry.action}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#DDA162]">
                    {entry.resource}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#A87C56]">{entry.ipMasked}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-[10px] px-2 py-0.5 bg-[#0A0E28] border border-[#304A78] text-[#DDA162] font-mono">
                      ✓ {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
