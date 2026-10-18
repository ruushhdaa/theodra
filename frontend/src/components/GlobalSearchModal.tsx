import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Activity, Briefcase, Inbox, FileText, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  MOCK_PATTERN_COHORTS,
  MOCK_KANBAN_CASES,
  MOCK_ANONYMOUS_REPORTS,
  MOCK_POLICY_VAULT,
} from "../data/mockData";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { isIC } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open triggered by shortcut
          window.dispatchEvent(new CustomEvent("open-global-search"));
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // If user is IC member, they can search Patterns, Cases, Reports, and Documents.
  // If user is HR, they can ONLY search Policies and aggregate areas (CRITICAL SECURITY RULE).
  const patternResults = isIC && trimmed
    ? MOCK_PATTERN_COHORTS.filter(
        (p) =>
          p.id.toLowerCase().includes(trimmed) ||
          p.department.toLowerCase().includes(trimmed) ||
          p.rolePairing.toLowerCase().includes(trimmed)
      )
    : [];

  const caseResults = isIC && trimmed
    ? MOCK_KANBAN_CASES.filter(
        (c) =>
          c.id.toLowerCase().includes(trimmed) ||
          c.title.toLowerCase().includes(trimmed) ||
          c.department.toLowerCase().includes(trimmed)
      )
    : [];

  const reportResults = isIC && trimmed
    ? MOCK_ANONYMOUS_REPORTS.filter(
        (r) =>
          r.id.toLowerCase().includes(trimmed) ||
          r.referenceCode.toLowerCase().includes(trimmed) ||
          r.concernTags.some((t) => t.toLowerCase().includes(trimmed))
      )
    : [];

  const docResults = trimmed
    ? MOCK_POLICY_VAULT.filter(
        (d) =>
          d.name.toLowerCase().includes(trimmed) ||
          d.category.toLowerCase().includes(trimmed)
      )
    : [];

  const handleSelect = (url: string) => {
    navigate(url);
    onClose();
  };

  const hasResults =
    patternResults.length > 0 ||
    caseResults.length > 0 ||
    reportResults.length > 0 ||
    docResults.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#0A0E28]/80 backdrop-blur-none">
      <div className="bg-[#2C3259] border border-[#304A78] max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[#304A78] bg-[#0A0E28]">
          <Search className="w-5 h-5 text-[#DDA162] mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isIC
                ? "Search cases, patterns, reports, policies... (Press Esc to close)"
                : "Search organization policies, audit vault, compliance packs..."
            }
            className="w-full bg-transparent text-[#F4F1EB] placeholder-[#A87C56] text-sm focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-[#A87C56] hover:text-[#F4F1EB] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] text-[#A87C56] bg-[#2C3259] border border-[#304A78]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1">
          {!trimmed && (
            <div className="py-8 text-center text-sm text-[#A87C56]">
              Type a keyword, cohort ID (e.g. PAT-8821), case reference (e.g. CASE-2026-08), or report code.
            </div>
          )}

          {trimmed && !hasResults && (
            <div className="py-8 text-center text-sm text-[#A87C56]">
              No matching records found for "{query}".
            </div>
          )}

          {/* Patterns (IC only) */}
          {patternResults.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#DDA162] mb-2 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" /> Cohort Patterns
              </div>
              <div className="space-y-1">
                {patternResults.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(`/ic/patterns/${p.id}`)}
                    className="w-full text-left p-2.5 bg-[#0A0E28]/60 hover:bg-[#304A78]/50 border border-[#304A78] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#F4F1EB]">{p.id}</span>
                        <span className="text-xs text-[#A87C56]">({p.department})</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-[#304A78] text-[#DDA162]">
                          {p.severity}
                        </span>
                      </div>
                      <p className="text-xs text-[#A87C56] line-clamp-1 mt-0.5">{p.rolePairing}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#A87C56] group-hover:text-[#DDA162]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cases (IC only) */}
          {caseResults.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#DDA162] mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" /> Cases
              </div>
              <div className="space-y-1">
                {caseResults.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(`/ic/cases/${c.id}`)}
                    className="w-full text-left p-2.5 bg-[#0A0E28]/60 hover:bg-[#304A78]/50 border border-[#304A78] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#F4F1EB]">{c.id}</span>
                        <span className="text-xs text-[#A87C56]">— {c.title}</span>
                      </div>
                      <p className="text-xs text-[#A87C56] mt-0.5">
                        {c.department} • Stage: {c.stage} • Assigned: {c.assignedMember}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#A87C56] group-hover:text-[#DDA162]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reports (IC only) */}
          {reportResults.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#DDA162] mb-2 flex items-center gap-1.5">
                <Inbox className="w-3.5 h-3.5" /> Anonymous Reports
              </div>
              <div className="space-y-1">
                {reportResults.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleSelect(`/ic/reports/${r.id}`)}
                    className="w-full text-left p-2.5 bg-[#0A0E28]/60 hover:bg-[#304A78]/50 border border-[#304A78] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#F4F1EB]">{r.id}</span>
                        <span className="text-xs text-[#DDA162] font-mono">[{r.referenceCode}]</span>
                        <span className="text-xs text-[#A87C56]">{r.submissionWeek}</span>
                      </div>
                      <p className="text-xs text-[#A87C56] mt-0.5">{r.concernTags.join(", ")}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#A87C56] group-hover:text-[#DDA162]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Policies & Documents (Available to both) */}
          {docResults.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#DDA162] mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Policy Documents
              </div>
              <div className="space-y-1">
                {docResults.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleSelect(isIC ? "/ic/minutes" : "/hr/policy")}
                    className="w-full text-left p-2.5 bg-[#0A0E28]/60 hover:bg-[#304A78]/50 border border-[#304A78] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#F4F1EB]">{d.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-[#304A78] text-[#DDA162]">
                          {d.version}
                        </span>
                      </div>
                      <p className="text-xs text-[#A87C56] mt-0.5">{d.category} • Uploaded {d.uploadDate}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#A87C56] group-hover:text-[#DDA162]" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2 border-t border-[#304A78] bg-[#0A0E28] flex items-center justify-between text-xs text-[#A87C56]">
          <span>Press ESC or click outside to dismiss</span>
          <span>{isIC ? "Internal Committee Mode (Full Access)" : "HR Admin Mode (Aggregate Only)"}</span>
        </div>
      </div>
    </div>
  );
};
