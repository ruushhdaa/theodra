import React, { useState } from "react";
import { GraduationCap, Award, BellRing, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { MOCK_IC_TRAINING, ICTrainingRecord } from "../../data/mockData";

export const ICTrainingPage: React.FC = () => {
  const [records, setRecords] = useState<ICTrainingRecord[]>(MOCK_IC_TRAINING);
  const [remindedMember, setRemindedMember] = useState<string | null>(null);

  const certifiedCount = records.filter((r) => r.status === "Completed").length;
  const totalCount = records.length;

  const handleSendReminder = (memberName: string) => {
    setRemindedMember(memberName);
    setTimeout(() => setRemindedMember(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262E5F]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
            Statutory Competency & Training
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            IC Training Tracker
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            Tracking mandatory annual jurisprudence certification and trauma-informed inquiry training.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-[#0E1438] px-3.5 py-2 border border-[#262E5F] rounded-xl text-[#DDA162]">
          <Award className="w-4 h-4 text-[#DDA162]" />
          <span>Annual Compliance Standard §4</span>
        </div>
      </div>

      {remindedMember && (
        <div className="p-3.5 bg-[#0E1438] border border-[#DDA162] text-xs text-[#DDA162] rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4 text-[#EBBA4A]" />
          <span>Official training renewal reminder dispatched to {remindedMember}.</span>
        </div>
      )}

      {/* Top Summary Banner */}
      <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#DDA162]">
            Certification Quorum Status
          </span>
          <div className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            {certifiedCount} of {totalCount} Members Certified
          </div>
          <p className="text-xs text-[#A87C56] mt-1">
            {Math.round((certifiedCount / totalCount) * 100)}% compliance rate. 1 member has expired accreditation requiring immediate renewal.
          </p>
        </div>

        <div className="w-full sm:w-64 bg-[#0E1438] p-4 rounded-xl border border-[#262E5F]">
          <div className="flex justify-between text-xs text-[#A87C56] mb-1.5">
            <span>Overall Readiness</span>
            <span className="text-[#DDA162] font-mono font-semibold">
              {Math.round((certifiedCount / totalCount) * 100)}%
            </span>
          </div>
          <div className="w-full bg-[#11173D] h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#DDA162] rounded-full transition-all duration-300"
              style={{ width: `${(certifiedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Training Table */}
      <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0A0E28] border-b border-[#262E5F] text-[#A87C56] uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Member Name</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Training Module</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Completion Date</th>
                <th className="py-3.5 px-4">Certificate ID</th>
                <th className="py-3.5 px-4">Days Remaining</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262E5F]/60">
              {records.map((rec) => {
                const isOverdue = rec.status === "Overdue";
                const isCompleted = rec.status === "Completed";

                return (
                  <tr key={rec.id} className="hover:bg-[#262E5F] transition-colors cursor-pointer group">
                    <td className="py-3.5 px-4 font-semibold text-[#F4F1EB] group-hover:text-[#DDA162]">{rec.memberName}</td>
                    <td className="py-3.5 px-4 text-[#A87C56]">{rec.role}</td>
                    <td className="py-3.5 px-4 text-[#F4F1EB] max-w-xs">{rec.trainingModule}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                          isCompleted
                            ? "bg-[#161E48] text-[#DDA162] border-[#262E5F]"
                            : isOverdue
                            ? "bg-amber-950/80 text-[#EBBA4A] border-[#EBBA4A]"
                            : "bg-[#0E1438] text-[#A87C56] border-[#262E5F]"
                        }`}
                      >
                        {rec.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#A87C56]">{rec.completionDate || "—"}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#DDA162]">
                      {rec.certificateId || "—"}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {isOverdue ? (
                        <span className="text-[#EBBA4A] font-bold">
                          {rec.daysUntilExpiry} days (Expired)
                        </span>
                      ) : (
                        <span className="text-[#F4F1EB]">{rec.daysUntilExpiry} days</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleSendReminder(rec.memberName)}
                        className="px-3 py-1.5 bg-[#0E1438] border border-[#262E5F] text-[11px] font-semibold text-[#DDA162] hover:bg-[#DDA162] hover:text-[#0A0E28] rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <BellRing className="w-3 h-3" />
                        <span>Send Reminder</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
