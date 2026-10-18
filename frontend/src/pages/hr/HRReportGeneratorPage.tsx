import React, { useState } from "react";
import { FileText, Download, Send, CheckCircle, Award, Scale, Check, X } from "lucide-react";
import { MOCK_ANNUAL_REPORT_DATA, AnnualReportData } from "../../data/mockData";

export const HRReportGeneratorPage: React.FC = () => {
  const [financialYear, setFinancialYear] = useState("2025-2026");
  const [isGenerated, setIsGenerated] = useState(true);
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const [boardSubmitted, setBoardSubmitted] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const report = MOCK_ANNUAL_REPORT_DATA;

  const handleExport = (format: "PDF" | "Word") => {
    setExportNotice(`Annual Report successfully compiled and downloaded as ${format}.`);
    setTimeout(() => setExportNotice(null), 3000);
    // Real dummy download simulation
    const content = `ANNUAL POSH STATUTORY REPORT (SECTION 21, POSH ACT 2013)\n${report.organizationName} | FY ${report.financialYear}\nTotal Complaints: ${report.totalComplaintsReceived}\nDisposed: ${report.complaintsDisposedDuringYear}\nPending: ${report.casesPendingMoreThan90Days}`;
    const blob = new Blob([content], { type: format === "PDF" ? "application/pdf" : "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `annual_posh_report_${report.financialYear}.${format === "PDF" ? "pdf" : "docx"}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleConfirmSubmitBoard = () => {
    setBoardSubmitted(true);
    setBoardModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#304A78]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
            Section 21 Statutory Filing
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            Annual POSH Report Generator
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            Auto-compiles required statutory metrics for filing with the District Officer and Board's Report.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleExport("PDF")}
            className="px-4 py-2 bg-[#0A0E28] border border-[#304A78] text-xs font-semibold text-[#DDA162] hover:bg-[#304A78] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export as PDF</span>
          </button>
          <button
            type="button"
            onClick={() => handleExport("Word")}
            className="px-4 py-2 bg-[#0A0E28] border border-[#304A78] text-xs font-semibold text-[#F4F1EB] hover:bg-[#304A78] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export as Word</span>
          </button>
          <button
            type="button"
            onClick={() => setBoardModalOpen(true)}
            className="px-4 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Send className="w-4 h-4" />
            <span>Submit to Board</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 bg-[#0A0E28] border border-[#DDA162] text-xs text-[#DDA162] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#EBBA4A]" />
          <span>{exportNotice}</span>
        </div>
      )}

      {boardSubmitted && (
        <div className="p-3.5 bg-amber-950/40 border border-[#EBBA4A] text-xs text-[#EBBA4A] flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>Annual Report successfully submitted for inclusion in Company Secretarial Board Pack.</span>
        </div>
      )}

      {/* Select Period Form */}
      <div className="bg-[#2C3259] border border-[#304A78] p-4 flex items-center gap-4 text-xs">
        <span className="font-semibold text-[#F4F1EB]">Financial Year Period:</span>
        <select
          value={financialYear}
          onChange={(e) => setFinancialYear(e.target.value)}
          className="bg-[#0A0E28] border border-[#304A78] px-3 py-1.5 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
        >
          <option value="2025-2026">FY 2025–2026 (1 Apr 2025 – 31 Mar 2026)</option>
          <option value="2024-2025">FY 2024–2025 (Archived)</option>
        </select>
        <button
          type="button"
          onClick={() => setIsGenerated(true)}
          className="px-4 py-1.5 bg-[#304A78] text-[#F4F1EB] font-semibold hover:bg-[#DDA162] hover:text-[#0A0E28] transition-colors cursor-pointer"
        >
          Re-compile Metrics
        </button>
      </div>

      {/* Auto-compiled Report Preview */}
      {isGenerated && (
        <div className="bg-[#2C3259] border border-[#304A78] p-8 shadow-2xl space-y-8 font-serif">
          {/* Header */}
          <div className="text-center pb-6 border-b border-[#304A78]">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#DDA162] block mb-1">
              Statutory Form A • Section 21 POSH Act 2013
            </span>
            <h2 className="text-2xl font-bold text-[#F4F1EB]">
              Annual Report of the Internal Committee
            </h2>
            <p className="text-xs text-[#A87C56] mt-1 font-sans">
              Financial Year: <span className="text-[#F4F1EB] font-mono">{report.financialYear}</span> • Registration: {report.registrationNumber}
            </p>
          </div>

          {/* Section 1: Organisation Details */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#DDA162] font-sans">
              1. Organisation Details & Committee Constitution
            </h3>
            <div className="p-4 bg-[#0A0E28] border border-[#304A78] font-sans text-xs space-y-2">
              <p><span className="text-[#A87C56]">Legal Entity Name:</span> <strong className="text-[#F4F1EB]">{report.organizationName}</strong></p>
              <p><span className="text-[#A87C56]">Presiding Officer:</span> <strong className="text-[#F4F1EB]">{report.presidingOfficer}</strong></p>
              <p><span className="text-[#A87C56]">Independent External Member:</span> <strong className="text-[#F4F1EB]">{report.externalMember}</strong></p>
              <p><span className="text-[#A87C56]">Total Constituted Members:</span> <strong className="text-[#F4F1EB]">6 Members (Quorum Compliant)</strong></p>
            </div>
          </div>

          {/* Section 2: Complaints Summary */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#DDA162] font-sans">
              2. Annual Grievance Statistics (§21(a)–(d))
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
              <div className="p-4 bg-[#0A0E28] border border-[#304A78]">
                <span className="text-[10px] text-[#A87C56] uppercase block">Total Complaints Received</span>
                <span className="text-2xl font-bold text-[#F4F1EB] font-serif block mt-1">
                  {report.totalComplaintsReceived}
                </span>
                <span className="text-[10px] text-[#DDA162] block mt-0.5">Formal cases logged</span>
              </div>

              <div className="p-4 bg-[#0A0E28] border border-[#304A78]">
                <span className="text-[10px] text-[#A87C56] uppercase block">Complaints Disposed</span>
                <span className="text-2xl font-bold text-[#F4F1EB] font-serif block mt-1">
                  {report.complaintsDisposedDuringYear}
                </span>
                <span className="text-[10px] text-[#DDA162] block mt-0.5">Inquiry concluded</span>
              </div>

              <div className="p-4 bg-[#0A0E28] border border-[#304A78]">
                <span className="text-[10px] text-[#A87C56] uppercase block">Cases Pending &gt; 90 Days</span>
                <span className="text-2xl font-bold text-[#EBBA4A] font-serif block mt-1">
                  {report.casesPendingMoreThan90Days}
                </span>
                <span className="text-[10px] text-[#EBBA4A] block mt-0.5">1 pending medical delay</span>
              </div>
            </div>
          </div>

          {/* Section 3: Training & Sensitization */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#DDA162] font-sans">
              3. Sensitization & Capacity Building Workshops (§19(c))
            </h3>
            <div className="p-4 bg-[#0A0E28] border border-[#304A78] font-sans text-xs space-y-2">
              <p><span className="text-[#A87C56]">Workshops Conducted:</span> <strong className="text-[#F4F1EB]">{report.workshopsSensitizationSessions} sessions</strong> across regional locations</p>
              <p><span className="text-[#A87C56]">Employees Sensitized:</span> <strong className="text-[#F4F1EB]">{report.employeesTrainedCount} personnel (94.2% headcount)</strong></p>
              <p><span className="text-[#A87C56]">IC Capacity Building:</span> <strong className="text-[#F4F1EB]">All members completed annual inquiry jurisprudence certification</strong></p>
            </div>
          </div>

          {/* Section 4: Action Taken by Employer */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#DDA162] font-sans">
              4. Actions Implemented by Employer (§13(4))
            </h3>
            <div className="p-4 bg-[#0A0E28] border border-[#304A78] font-sans text-xs leading-relaxed text-[#F4F1EB]">
              {report.actionTakenByEmployer}
            </div>
          </div>

          {/* Signatures block */}
          <div className="pt-8 border-t border-[#304A78] grid grid-cols-2 gap-8 font-sans text-xs">
            <div>
              <div className="h-10 border-b border-[#304A78]/80 mb-2" />
              <span className="font-semibold text-[#F4F1EB] block">{report.presidingOfficer}</span>
              <span className="text-[11px] text-[#A87C56]">Presiding Officer, Internal Committee</span>
            </div>
            <div>
              <div className="h-10 border-b border-[#304A78]/80 mb-2" />
              <span className="font-semibold text-[#F4F1EB] block">Rajesh Menon</span>
              <span className="text-[11px] text-[#A87C56]">VP Human Resources & Authorised Signatory</span>
            </div>
          </div>
        </div>
      )}

      {/* Submit to Board Confirmation Modal */}
      {boardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0E28]/80 backdrop-blur-none">
          <div className="bg-[#2C3259] border border-[#304A78] max-w-md w-full p-6 text-[#F4F1EB] shadow-2xl space-y-4 font-sans">
            <div className="flex items-center gap-2">
              <Send className="w-5 h-5 text-[#DDA162]" />
              <h3 className="font-serif text-lg font-bold text-[#F4F1EB]">
                Submit to Board of Directors
              </h3>
            </div>
            <p className="text-xs text-[#F4F1EB] leading-relaxed">
              Confirm submission of this compiled Section 21 Annual Report for formal inclusion in the Directors' Board Report under Section 134(3)(q) of the Companies Act 2013?
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#304A78]">
              <button
                type="button"
                onClick={() => setBoardModalOpen(false)}
                className="px-4 py-2 border border-[#304A78] text-xs text-[#A87C56]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmitBoard}
                className="px-5 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A]"
              >
                Confirm Board Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
