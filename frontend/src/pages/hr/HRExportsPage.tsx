import React, { useState } from "react";
import { Download, FileText, ClipboardList, Eye, Shield, GraduationCap, Users, Loader2, CheckCircle } from "lucide-react";

interface ExportCard {
  id: string;
  title: string;
  description: string;
  format: "PDF" | "CSV";
  icon: React.ElementType;
}

export const HRExportsPage: React.FC = () => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [readyNotice, setReadyNotice] = useState<string | null>(null);

  const exportOptions: ExportCard[] = [
    {
      id: "exp-posh-report",
      title: "Annual POSH Statutory Report",
      description: "Auto-compiled Form A report for filing with District Officer under Section 21 of the Act.",
      format: "PDF",
      icon: FileText,
    },
    {
      id: "exp-minutes",
      title: "IC Meeting Minutes Pack",
      description: "Consolidated, timestamped records of quarterly and extraordinary committee proceedings.",
      format: "PDF",
      icon: ClipboardList,
    },
    {
      id: "exp-audit",
      title: "Tamper-Evident Audit Log",
      description: "Complete raw cryptographic access and action log export for external forensic audits.",
      format: "CSV",
      icon: Eye,
    },
    {
      id: "exp-compliance-summary",
      title: "Executive Compliance Summary",
      description: "High-level board-ready briefing pack including health score, peer benchmarks, and pulse trends.",
      format: "PDF",
      icon: Shield,
    },
    {
      id: "exp-training",
      title: "Workforce Training Records",
      description: "Employee and IC certification timestamps, completion percentages, and expiry schedules.",
      format: "CSV",
      icon: GraduationCap,
    },
    {
      id: "exp-roster",
      title: "Statutory IC Roster Register",
      description: "Current committee constitution, external member tenure appointment, and resolution dates.",
      format: "CSV",
      icon: Users,
    },
  ];

  const handleGenerate = (option: ExportCard) => {
    setDownloadingId(option.id);
    setReadyNotice(null);

    // Prompt specifies: show a loading spinner for 1.5 seconds then trigger dummy download / ready confirmation
    setTimeout(() => {
      setDownloadingId(null);
      setReadyNotice(`Export ready: ${option.title} (${option.format}) downloaded successfully.`);

      // Trigger actual dummy file download
      const content = `THEODRA COMPLIANCE EXPORT: ${option.title}\nGenerated on: ${new Date().toISOString()}\nOrganization: Corporate Compliance Organization\nStatus: Statutorily Verified`;
      const blob = new Blob([content], {
        type: option.format === "PDF" ? "application/pdf" : "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `theodra_${option.id}_${Date.now()}.${option.format.toLowerCase()}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#304A78]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
            Regulatory Documentation Archive
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            Export Centre
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            Compile and download certified statutory filings, audit archives, and board briefing packages.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-[#2C3259] px-3.5 py-2 border border-[#304A78] text-[#DDA162]">
          <Download className="w-4 h-4" />
          <span>Cryptographically Sealed Exports</span>
        </div>
      </div>

      {readyNotice && (
        <div className="p-3.5 bg-[#0A0E28] border border-[#DDA162] text-xs text-[#DDA162] flex items-center gap-2 shadow-lg">
          <CheckCircle className="w-4 h-4 text-[#EBBA4A]" />
          <span>{readyNotice}</span>
        </div>
      )}

      {/* Export Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exportOptions.map((opt) => {
          const Icon = opt.icon;
          const isLoading = downloadingId === opt.id;

          return (
            <div
              key={opt.id}
              className="bg-[#2C3259] border border-[#304A78] p-6 shadow-2xl flex flex-col justify-between h-56 transition-all hover:border-[#DDA162]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-[#0A0E28] border border-[#304A78] text-[#DDA162]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-[#0A0E28] text-[#DDA162] font-mono border border-[#304A78] font-bold">
                    {opt.format}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#F4F1EB] mb-1.5">
                  {opt.title}
                </h3>
                <p className="font-serif text-xs text-[#A87C56] leading-relaxed">
                  {opt.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#304A78]">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleGenerate(opt)}
                  className="w-full py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Compiling {opt.format}...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Generate & Download</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
