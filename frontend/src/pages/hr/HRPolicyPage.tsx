import React, { useState } from "react";
import { Archive, Upload, Send, ChevronDown, ChevronUp, FileText, CheckCircle, X, Shield } from "lucide-react";
import { MOCK_POLICY_VAULT, PolicyVaultDocument } from "../../data/mockData";

export const HRPolicyPage: React.FC = () => {
  const [policies, setPolicies] = useState<PolicyVaultDocument[]>(MOCK_POLICY_VAULT);
  const [expandedId, setExpandedId] = useState<string | null>("pol-1");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [distributeModalOpen, setDistributeModalOpen] = useState(false);
  const [selectedPolicyForDist, setSelectedPolicyForDist] = useState<PolicyVaultDocument | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Upload new version state
  const [uploadDocName, setUploadDocName] = useState("Corporate POSH Policy 2026");
  const [uploadVersion, setUploadVersion] = useState("v4.3");
  const [uploadSummary, setUploadSummary] = useState("Annual policy review aligned with updated jurisprudence");

  const handleUploadNewVersion = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = policies.map((p) => {
      if (p.id === "pol-1") {
        return {
          ...p,
          version: uploadVersion,
          uploadDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          versionHistory: [
            {
              version: uploadVersion,
              date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
              changeSummary: uploadSummary,
              author: "Rajesh Menon (VP HR)",
            },
            ...p.versionHistory,
          ],
        };
      }
      return p;
    });
    setPolicies(updated);
    setUploadModalOpen(false);
    setNotice("New policy version successfully archived in vault with cryptographic hash.");
    setTimeout(() => setNotice(null), 3000);
  };

  const handleConfirmDistribute = () => {
    setDistributeModalOpen(false);
    setNotice(
      `Distribution notice queued: ${selectedPolicyForDist?.name} sent to all 1,507 employee mailboxes with acknowledgment tracking.`
    );
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262E5F]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
            Corporate Governance Vault
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            Policy Vault
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            Central repository for statutory POSH policies, anti-retaliation charters, and employee handbooks.
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setUploadModalOpen(true)}
            className="px-4 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Version</span>
          </button>
        </div>
      </div>

      {notice && (
        <div className="p-3 bg-[#0A0E28] border border-[#DDA162] text-xs text-[#DDA162] rounded-xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#EBBA4A]" />
          <span>{notice}</span>
        </div>
      )}

      {/* Policies List */}
      <div className="space-y-4">
        {policies.map((doc) => {
          const isExpanded = expandedId === doc.id;

          return (
            <div
              key={doc.id}
              className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl shadow-2xl overflow-hidden transition-colors"
            >
              {/* Document Summary Card Bar */}
              <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-[#0E1438] border border-[#262E5F] rounded-xl text-[#DDA162] shrink-0 mt-0.5">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-base font-bold text-[#F4F1EB]">{doc.name}</h3>
                      <span className="text-[10px] px-2.5 py-0.5 bg-[#0E1438] text-[#DDA162] border border-[#262E5F] rounded-full font-mono font-semibold">
                        {doc.version}
                      </span>
                      {doc.isActive && (
                        <span className="text-[10px] px-2.5 py-0.5 bg-amber-950/80 text-[#EBBA4A] border border-[#EBBA4A] rounded-full font-bold uppercase tracking-wider">
                          Active Version
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#A87C56] mt-1 space-x-3">
                      <span>Category: <strong className="text-[#F4F1EB]">{doc.category}</strong></span>
                      <span>•</span>
                      <span>Uploaded: {doc.uploadDate}</span>
                      <span>•</span>
                      <span>By: {doc.uploadedBy}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPolicyForDist(doc);
                      setDistributeModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 bg-[#0A0E28] border border-[#262E5F] rounded-xl text-xs font-semibold text-[#DDA162] hover:bg-[#262E5F] hover:border-[#DDA162] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Distribute to All Staff</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : doc.id)}
                    className="p-1.5 text-[#A87C56] hover:text-[#F4F1EB] hover:bg-[#262E5F] rounded-lg transition-colors cursor-pointer"
                    aria-label="Toggle version history"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expandable Version History */}
              {isExpanded && (
                <div className="p-5 bg-[#0E1438] border-t border-[#262E5F] space-y-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#DDA162] block">
                    Version Revision History
                  </span>
                  <div className="divide-y divide-[#262E5F]/60 text-xs">
                    {doc.versionHistory.map((v, i) => (
                      <div key={i} className="py-2.5 flex items-start justify-between gap-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#F4F1EB]">{v.version}</span>
                            <span className="text-[10px] text-[#A87C56] font-mono">{v.date}</span>
                          </div>
                          <p className="text-[#A87C56] leading-relaxed">{v.changeSummary}</p>
                        </div>
                        <span className="text-[10px] text-[#DDA162] shrink-0 font-medium">
                          {v.author}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Upload New Version Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0E28]/80 backdrop-blur-none">
          <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl max-w-lg w-full p-6 text-[#F4F1EB] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#262E5F]">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#DDA162]" />
                <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
                  Upload New Policy Version
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                className="text-[#A87C56] hover:text-[#F4F1EB]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadNewVersion} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                  Document Target
                </label>
                <select
                  value={uploadDocName}
                  onChange={(e) => setUploadDocName(e.target.value)}
                  className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl px-3 py-2 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
                >
                  <option value="Corporate POSH Policy 2026">
                    Corporate Prevention of Sexual Harassment Policy
                  </option>
                  <option value="Anti-Retaliation Charter">
                    Zero-Tolerance Anti-Retaliation Safeguards Charter
                  </option>
                  <option value="ICC Operating Procedures">
                    Internal Committee Operating Procedures Manual
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                    New Version Identifier
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadVersion}
                    onChange={(e) => setUploadVersion(e.target.value)}
                    placeholder="e.g. v4.3"
                    className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl px-3 py-2 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                    Select File (PDF / DOCX)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl px-2 py-1.5 text-[11px] text-[#A87C56]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                  Revision Notes & Statutory Change Summary
                </label>
                <textarea
                  rows={2}
                  required
                  value={uploadSummary}
                  onChange={(e) => setUploadSummary(e.target.value)}
                  placeholder="Summarize amendments, updated external committee contacts, or regulatory alignments..."
                  className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl p-2.5 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#262E5F]">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 border border-[#262E5F] rounded-xl text-xs text-[#A87C56] hover:bg-[#262E5F] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] rounded-xl transition-colors"
                >
                  Commit New Version
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Distribute Confirmation Modal */}
      {distributeModalOpen && selectedPolicyForDist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0E28]/80 backdrop-blur-none">
          <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl max-w-md w-full p-6 text-[#F4F1EB] shadow-2xl space-y-4">
            <div className="flex items-center gap-2">
              <Send className="w-5 h-5 text-[#DDA162]" />
              <h3 className="font-serif text-lg font-bold text-[#F4F1EB]">
                Broadcast Policy Distribution
              </h3>
            </div>
            <p className="text-xs text-[#F4F1EB] leading-relaxed">
              Distribute <span className="text-[#DDA162] font-semibold">{selectedPolicyForDist.name} ({selectedPolicyForDist.version})</span> to all 1,507 active employees? Each employee will receive an acknowledgment receipt requirement to comply with POSH Section 19(b).
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#262E5F]">
              <button
                type="button"
                onClick={() => setDistributeModalOpen(false)}
                className="px-4 py-2 border border-[#262E5F] rounded-xl text-xs text-[#A87C56] hover:bg-[#262E5F] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDistribute}
                className="px-5 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] rounded-xl transition-colors"
              >
                Confirm Distribution
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
