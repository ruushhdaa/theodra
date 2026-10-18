import React, { useState } from "react";
import { Scale, AlertTriangle, CheckCircle, ArrowRight, X } from "lucide-react";
import { MOCK_DISCLOSURE_RECONCILIATION, DisclosureReconciliationItem } from "../../data/mockData";

export const HRDisclosurePage: React.FC = () => {
  const [items, setItems] = useState<DisclosureReconciliationItem[]>(MOCK_DISCLOSURE_RECONCILIATION);
  const [reconcileModalItem, setReconcileModalItem] = useState<DisclosureReconciliationItem | null>(null);
  const [reconcileNotes, setReconcileNotes] = useState("");
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleOpenReconcile = (item: DisclosureReconciliationItem) => {
    setReconcileModalItem(item);
    setReconcileNotes(
      `Reconciled: Statutory disclosure footnote added explaining variance in ${item.metric}.`
    );
  };

  const handleSaveReconciliation = (e: React.FormEvent) => {
    e.preventDefault();
    if (reconcileModalItem) {
      setItems((prev) =>
        prev.map((i) =>
          i.metric === reconcileModalItem.metric
            ? { ...i, isMismatch: false, notes: reconcileNotes, boardReport: i.internalRecords, brsrReturn: i.internalRecords }
            : i
        )
      );
      setSuccessNotice(`Statutory figures reconciled for: ${reconcileModalItem.metric}`);
      setReconcileModalItem(null);
      setTimeout(() => setSuccessNotice(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#304A78]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
            Regulatory Tri-Partite Reconciliation
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            Statutory Disclosure Reconciliation
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            Cross-verifying IC Internal Records against figures reported in the Directors' Board Report and SEBI BRSR filings.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-[#2C3259] px-3.5 py-2 border border-[#304A78] text-[#DDA162]">
          <Scale className="w-4 h-4" />
          <span>SEBI BRSR Principle 5 Cross-Check</span>
        </div>
      </div>

      {successNotice && (
        <div className="p-3 bg-[#0A0E28] border border-[#DDA162] text-xs text-[#DDA162] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#EBBA4A]" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Explanation Banner */}
      <div className="bg-[#2C3259] border border-[#304A78] p-4 text-xs text-[#F4F1EB] leading-relaxed">
        <span className="text-[#DDA162] font-semibold block mb-1">
          Statutory Risk Notice:
        </span>
        Discrepancies between Internal Committee disposal logs and SEBI Business Responsibility and Sustainability Reporting (BRSR) filings can trigger scrutiny from regulatory authorities. All variances must be reconciled with written committee notes.
      </div>

      {/* Three Column Comparison Table */}
      <div className="bg-[#2C3259] border border-[#304A78] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0A0E28] border-b border-[#304A78] text-[#A87C56] uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Statutory Metric</th>
                <th className="py-3 px-4">Internal Records</th>
                <th className="py-3 px-4">Filed in Board's Report</th>
                <th className="py-3 px-4">Filed in BRSR Return</th>
                <th className="py-3 px-4">Discrepancy Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#304A78]/50">
              {items.map((item, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    item.isMismatch
                      ? "bg-amber-950/20 hover:bg-amber-950/30"
                      : "hover:bg-[#0A0E28]/40"
                  }`}
                >
                  <td className="py-3.5 px-4 font-semibold text-[#F4F1EB]">
                    <div>{item.metric}</div>
                    <div className="text-[10px] text-[#A87C56] mt-0.5 font-normal">
                      {item.notes}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#DDA162]">
                    {item.internalRecords}
                  </td>
                  <td
                    className={`py-3.5 px-4 font-mono ${
                      item.isMismatch && item.boardReport !== item.internalRecords
                        ? "text-[#EBBA4A] font-bold"
                        : "text-[#F4F1EB]"
                    }`}
                  >
                    {item.boardReport}
                  </td>
                  <td
                    className={`py-3.5 px-4 font-mono ${
                      item.isMismatch && item.brsrReturn !== item.internalRecords
                        ? "text-[#EBBA4A] font-bold"
                        : "text-[#F4F1EB]"
                    }`}
                  >
                    {item.brsrReturn}
                  </td>
                  <td className="py-3.5 px-4">
                    {item.isMismatch ? (
                      <span className="text-[10px] px-2.5 py-0.5 bg-amber-950 text-[#EBBA4A] font-bold uppercase tracking-wider border border-[#EBBA4A] flex items-center gap-1 w-fit">
                        <AlertTriangle className="w-3 h-3" /> MISMATCH
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 bg-[#304A78] text-[#DDA162] font-semibold flex items-center gap-1 w-fit">
                        <CheckCircle className="w-3 h-3" /> Concordant
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {item.isMismatch && (
                      <button
                        type="button"
                        onClick={() => handleOpenReconcile(item)}
                        className="px-3 py-1 bg-[#EBBA4A] text-[#0A0E28] text-[11px] font-bold uppercase tracking-wider hover:bg-[#DDA162] transition-colors cursor-pointer"
                      >
                        Reconcile
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reconciliation Modal */}
      {reconcileModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0E28]/80 backdrop-blur-none">
          <div className="bg-[#2C3259] border border-[#EBBA4A] max-w-lg w-full p-6 text-[#F4F1EB] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#304A78]">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#EBBA4A]" />
                <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
                  Statutory Disclosure Reconciliation
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setReconcileModalItem(null)}
                className="text-[#A87C56] hover:text-[#F4F1EB]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-[#0A0E28] border border-[#304A78] text-xs space-y-1">
              <span className="font-semibold text-[#DDA162]">{reconcileModalItem.metric}</span>
              <div className="grid grid-cols-3 gap-2 pt-2 font-mono text-[11px]">
                <div>Internal: <strong className="text-[#F4F1EB]">{reconcileModalItem.internalRecords}</strong></div>
                <div>Board: <strong className="text-[#EBBA4A]">{reconcileModalItem.boardReport}</strong></div>
                <div>BRSR: <strong className="text-[#EBBA4A]">{reconcileModalItem.brsrReturn}</strong></div>
              </div>
            </div>

            <form onSubmit={handleSaveReconciliation} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-[#F4F1EB] mb-1">
                  Statutory Footnote & Resolution Note
                </label>
                <textarea
                  rows={3}
                  required
                  value={reconcileNotes}
                  onChange={(e) => setReconcileNotes(e.target.value)}
                  className="w-full bg-[#0A0E28] border border-[#304A78] p-2.5 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162] leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#304A78]">
                <button
                  type="button"
                  onClick={() => setReconcileModalItem(null)}
                  className="px-4 py-2 border border-[#304A78] text-xs text-[#A87C56]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A]"
                >
                  Apply Reconciliation Fix
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
