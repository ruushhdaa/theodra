import React, { useState } from "react";
import { ShieldAlert, AlertCircle, CheckCircle, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { MOCK_RETALIATION_SHIELD, RetaliationShieldCase } from "../../data/mockData";

export const HRRetaliationPage: React.FC = () => {
  const [cases, setCases] = useState<RetaliationShieldCase[]>(MOCK_RETALIATION_SHIELD);
  const [selectedCase, setSelectedCase] = useState<RetaliationShieldCase>(MOCK_RETALIATION_SHIELD[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262E5F]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
            Anti-Retaliation Safeguard System
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            Retaliation Shield Monitor
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            Automated monitoring of HR actions to safeguard complainants and witnesses from adverse career actions.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-[#0A0E28] px-3.5 py-2 border border-[#262E5F] rounded-xl text-[#DDA162]">
          <ShieldAlert className="w-4 h-4" />
          <span>Section 12 Safeguard Engine</span>
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-4 text-xs text-[#F4F1EB] leading-relaxed flex items-start gap-3 shadow-xl">
        <ShieldCheck className="w-5 h-5 text-[#DDA162] shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-[#EBBA4A] mb-0.5">Automated Oversight Protocol:</p>
          <p className="opacity-95 font-serif text-xs sm:text-sm text-[#F4F1EB]">
            Monitors HR events for employees involved in active cases who have consented to monitoring. Alerts IC when a suspicious event occurs.
          </p>
        </div>
      </div>

      {/* Two Column Grid: Cases Table (5 cols) & Event Log Detail (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
        {/* Cases Table */}
        <div className="lg:col-span-5 bg-[#0A0E28] border border-[#262E5F] rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-4 bg-[#0E1438] border-b border-[#262E5F] flex items-center justify-between">
            <h3 className="font-serif text-sm font-bold text-[#F4F1EB]">
              Monitored Consenting Personnel ({cases.length})
            </h3>
            <span className="text-[10px] text-[#A87C56]">Click row to inspect events</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#0A0E28] border-b border-[#262E5F] text-[#A87C56] uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-4">Employee ID</th>
                  <th className="py-3.5 px-4">Case Ref</th>
                  <th className="py-3.5 px-4">Monitoring Start</th>
                  <th className="py-3.5 px-4">Events</th>
                  <th className="py-3.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262E5F]/60">
                {cases.map((cs) => {
                  const isSelected = selectedCase.employeeId === cs.employeeId;
                  const hasAlert = cs.status === "Alert Triggered";

                  return (
                    <tr
                      key={cs.employeeId}
                      onClick={() => setSelectedCase(cs)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#262E5F] text-[#DDA162]"
                          : "hover:bg-[#262E5F]"
                      }`}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-[#F4F1EB]">
                        {cs.employeeId}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#DDA162]">
                        {cs.caseReference}
                      </td>
                      <td className="py-3.5 px-4 text-[#A87C56]">{cs.monitoringStartDate}</td>
                      <td className="py-3.5 px-4 font-mono">{cs.eventsLogged} logged</td>
                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            hasAlert
                              ? "bg-amber-950 text-[#EBBA4A] border border-[#EBBA4A]"
                              : "bg-[#0E1438] text-[#DDA162] border border-[#262E5F]"
                          }`}
                        >
                          {cs.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Case Event Log Detail */}
        <div className="lg:col-span-5 bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="pb-4 border-b border-[#262E5F]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-xs font-bold text-[#DDA162]">
                Personnel: {selectedCase.employeeId}
              </span>
              <span className="text-xs text-[#A87C56]">
                Reference: <strong className="text-[#F4F1EB]">{selectedCase.caseReference}</strong>
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#F4F1EB]">
              Recorded HR Action Audit Events
            </h3>
            <p className="text-xs text-[#A87C56] mt-0.5">
              Performance reviews, role reassignments, and transfers logged for this employee.
            </p>
          </div>

          <div className="space-y-3">
            {selectedCase.events.map((ev) => (
              <div
                key={ev.id}
                className={`p-4 border rounded-xl text-xs space-y-2 transition-colors ${
                  ev.hasMissingJustification
                    ? "bg-amber-950/20 border-[#EBBA4A]"
                    : "bg-[#0E1438] border-[#262E5F] hover:bg-[#262E5F]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#F4F1EB]">{ev.eventType}</span>
                  <span className="text-[10px] text-[#A87C56] font-mono">{ev.date}</span>
                </div>

                <div className="text-[11px] text-[#A87C56]">
                  Logged by: <span className="text-[#F4F1EB]">{ev.loggedBy}</span>
                </div>

                <div className="pt-2 border-t border-[#262E5F]/60 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase text-[#A87C56] block">Justification:</span>
                    <span
                      className={`text-xs block mt-0.5 ${
                        ev.hasMissingJustification
                          ? "text-[#EBBA4A] font-bold"
                          : "text-[#F4F1EB]"
                      }`}
                    >
                      {ev.justification}
                    </span>
                  </div>

                  {ev.hasMissingJustification && (
                    <span className="text-[10px] bg-[#EBBA4A] text-[#0A0E28] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 mt-1">
                      Missing Justification Alert
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#0E1438] border border-[#262E5F] rounded-xl text-[11px] text-[#A87C56] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#EBBA4A] shrink-0" />
            <span>
              Unjustified performance changes during active inquiry trigger mandatory notification to the Presiding Officer.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
