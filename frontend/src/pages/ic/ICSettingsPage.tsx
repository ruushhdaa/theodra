import React, { useState } from "react";
import { Settings, Shield, User, Bell, Lock, CheckCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const ICSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [notifyOnNewReports, setNotifyOnNewReports] = useState(true);
  const [notifyOnFlaggedPatterns, setNotifyOnFlaggedPatterns] = useState(true);
  const [notifyOnStatutoryDeadlines, setNotifyOnStatutoryDeadlines] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-[#262E5F]">
        <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
          Committee Credentials & Security
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
          Profile & Security Settings
        </h1>
        <p className="font-serif text-xs text-[#A87C56] mt-1">
          Statutory member profile, notification dispatch parameters, and cryptographic session controls.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 bg-[#0E1438] border border-[#DDA162] text-xs text-[#DDA162] rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4 text-[#EBBA4A]" />
          <span>Committee preferences updated successfully.</span>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#262E5F]">
          <User className="w-4 h-4 text-[#DDA162]" />
          <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
            Statutory Member Profile
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[#A87C56] mb-1.5 font-medium">Full Legal Name</label>
            <input
              type="text"
              readOnly
              value={user?.name || "Dr. Sunita Rao"}
              className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl p-3 text-[#F4F1EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#A87C56] mb-1.5 font-medium">Authenticated Official Email</label>
            <input
              type="text"
              readOnly
              value={user?.email || "ic@theodra.demo"}
              className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl p-3 text-[#F4F1EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#A87C56] mb-1.5 font-medium">Statutory Committee Designation</label>
            <input
              type="text"
              readOnly
              value={user?.title || "Presiding Officer, Internal Committee"}
              className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl p-3 text-[#F4F1EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#A87C56] mb-1.5 font-medium">Tenure Period</label>
            <input
              type="text"
              readOnly
              value="15 Oct 2024 – 14 Oct 2027 (3 Years Mandate)"
              className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl p-3 text-[#F4F1EB] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#262E5F]">
          <Bell className="w-4 h-4 text-[#DDA162]" />
          <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
            High-Priority Alert Thresholds
          </h3>
        </div>

        <form onSubmit={handleSave} className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3.5 bg-[#0E1438] border border-[#262E5F] rounded-xl cursor-pointer hover:bg-[#262E5F] transition-colors">
            <div>
              <span className="font-semibold text-[#F4F1EB] block">
                Instant alert on new incoming anonymous report
              </span>
              <span className="text-[11px] text-[#A87C56]">
                Dispatches notification when employee files under Section 9.
              </span>
            </div>
            <input
              type="checkbox"
              checked={notifyOnNewReports}
              onChange={(e) => setNotifyOnNewReports(e.target.checked)}
              className="w-4 h-4 accent-[#DDA162]"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 bg-[#0E1438] border border-[#262E5F] rounded-xl cursor-pointer hover:bg-[#262E5F] transition-colors">
            <div>
              <span className="font-semibold text-[#F4F1EB] block">
                Alert when telemetry cohort reaches &apos;Flagged&apos; severity
              </span>
              <span className="text-[11px] text-[#A87C56]">
                Signals severe after-hours or exclusivity shifts.
              </span>
            </div>
            <input
              type="checkbox"
              checked={notifyOnFlaggedPatterns}
              onChange={(e) => setNotifyOnFlaggedPatterns(e.target.checked)}
              className="w-4 h-4 accent-[#DDA162]"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 bg-[#0E1438] border border-[#262E5F] rounded-xl cursor-pointer hover:bg-[#262E5F] transition-colors">
            <div>
              <span className="font-semibold text-[#F4F1EB] block">
                Statutory 90-day inquiry milestone countdown warnings
              </span>
              <span className="text-[11px] text-[#A87C56]">
                Notifies at 60, 75, and 85 days post-complaint receipt.
              </span>
            </div>
            <input
              type="checkbox"
              checked={notifyOnStatutoryDeadlines}
              onChange={(e) => setNotifyOnStatutoryDeadlines(e.target.checked)}
              className="w-4 h-4 accent-[#DDA162]"
            />
          </label>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#EBBA4A] transition-colors cursor-pointer shadow-md"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>

      {/* Security & Access Protection Card */}
      <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#262E5F]">
          <Shield className="w-4 h-4 text-[#DDA162]" />
          <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
            Cryptographic Integrity & Session Security
          </h3>
        </div>

        <div className="space-y-3 text-xs leading-relaxed">
          <div className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <span className="font-semibold text-[#F4F1EB] block">Hardware Key / 2FA Security</span>
              <span className="text-[11px] text-[#A87C56]">Mandatory for casting escalation votes</span>
            </div>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#161E48] text-[#DDA162] font-semibold border border-[#262E5F]">
              Active / Enforced
            </span>
          </div>

          <div className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <span className="font-semibold text-[#F4F1EB] block">Session Inactivity Lockout</span>
              <span className="text-[11px] text-[#A87C56]">15 minutes inactivity statutory ceiling</span>
            </div>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#161E48] text-[#DDA162] font-semibold border border-[#262E5F]">
              Enforced (15m)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
