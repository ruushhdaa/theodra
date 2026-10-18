import React, { useState } from "react";
import { ClipboardList, Lock, Download, Filter, Search, ShieldCheck } from "lucide-react";
import { MOCK_RESPONSE_LEDGER, ResponseLedgerEntry } from "../../data/mockData";

export const ICLedgerPage: React.FC = () => {
  const [ledger, setLedger] = useState<ResponseLedgerEntry[]>(MOCK_RESPONSE_LEDGER);
  const [filterType, setFilterType] = useState("All");
  const [search, setSearch] = useState("");
  const [exportNotice, setExportNotice] = useState(false);

  const filtered = ledger.filter((item) => {
    const matchesSearch =
      item.referenceId.toLowerCase().includes(search.toLowerCase()) ||
      item.icMember.toLowerCase().includes(search.toLowerCase()) ||
      item.reasoning.toLowerCase().includes(search.toLowerCase()) ||
      item.disposition.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "All" || item.sourceType === filterType;
    return matchesSearch && matchesType;
  });

  const handleExportCSV = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
    // Real CSV download simulation
    const headers = "ID,Type,Reference,Date,IC Member,Disposition,Reasoning,Seal\n";
    const rows = filtered
      .map(
        (r) =>
          `"${r.id}","${r.sourceType}","${r.referenceId}","${r.dateReviewed}","${r.icMember}","${r.disposition}","${r.reasoning}","${r.tamperSealHash}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `theodra_response_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262E5F]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
            Immutable Audit Registry
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            Response Ledger
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            All reviews, escalations, and statutory dispositions are locked and cryptographically sealed.
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#EBBA4A] transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span>Export as CSV</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3.5 bg-[#0E1438] border border-[#DDA162] text-xs text-[#DDA162] rounded-xl animate-in fade-in duration-200">
          Response Ledger export generated and saved with SHA-256 integrity seal.
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs shadow-xl">
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reference, member, disposition..."
            className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl px-4 py-2.5 text-xs text-[#F4F1EB] placeholder-[#A87C56] focus:outline-none focus:border-[#DDA162]"
          />
          <Search className="w-3.5 h-3.5 text-[#A87C56] absolute right-3.5 top-3 pointer-events-none" />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <span className="text-[#A87C56]">Source Type:</span>
          <div className="flex flex-wrap items-center gap-1.5">
            {["All", "Cohort Pattern", "Anonymous Report", "Interim Relief"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                  filterType === t
                    ? "bg-[#262E5F] border-[#DDA162] text-[#DDA162]"
                    : "bg-[#0E1438] border-[#262E5F] text-[#A87C56] hover:bg-[#262E5F] hover:text-[#F4F1EB]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0A0E28] border-b border-[#262E5F] text-[#A87C56] uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Ledger ID</th>
                <th className="py-3.5 px-4">Source Type</th>
                <th className="py-3.5 px-4">Reference</th>
                <th className="py-3.5 px-4">Date Reviewed</th>
                <th className="py-3.5 px-4">IC Member</th>
                <th className="py-3.5 px-4">Disposition</th>
                <th className="py-3.5 px-4">Reasoning</th>
                <th className="py-3.5 px-4 text-right">Tamper Seal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262E5F]/60">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#262E5F] transition-colors cursor-pointer group">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#F4F1EB] group-hover:text-[#DDA162] flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-[#DDA162] shrink-0" />
                    <span>{item.id}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#A87C56]">{item.sourceType}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#DDA162]">
                    {item.referenceId}
                  </td>
                  <td className="py-3.5 px-4 text-[#A87C56]">{item.dateReviewed}</td>
                  <td className="py-3.5 px-4 text-[#F4F1EB] font-medium">{item.icMember}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                        item.disposition === "Escalate" || item.disposition === "Inquiry Instituted"
                          ? "bg-amber-950/80 text-[#EBBA4A] border-[#EBBA4A]"
                          : item.disposition === "Relief Ordered"
                          ? "bg-[#161E48] text-[#DDA162] border-[#262E5F]"
                          : "bg-[#0E1438] text-[#A87C56] border-[#262E5F]"
                      }`}
                    >
                      {item.disposition}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#F4F1EB] max-w-xs leading-relaxed">
                    {item.reasoning}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[10px] text-[#A87C56]">
                    {item.tamperSealHash}
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
