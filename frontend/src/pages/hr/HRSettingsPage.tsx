import React, { useState } from "react";
import { Settings, Shield, User, Bell, CheckCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const HRSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [notifyRetaliation, setNotifyRetaliation] = useState(true);
  const [notifyAnnualWindow, setNotifyAnnualWindow] = useState(true);
  const [notifyQuorumChanges, setNotifyQuorumChanges] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-[#304A78]">
        <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
          Corporate Administrator Profile
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
          HR Admin Settings
        </h1>
        <p className="font-serif text-xs text-[#A87C56] mt-1">
          Organisation parameters, statutory disclosure alerts, and audit preferences.
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-[#0A0E28] border border-[#DDA162] text-xs text-[#DDA162] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#EBBA4A]" />
          <span>HR preferences updated successfully.</span>
        </div>
      )}

      {/* Admin Profile */}
      <div className="bg-[#2C3259] border border-[#304A78] p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#304A78]">
          <User className="w-4 h-4 text-[#DDA162]" />
          <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
            Administrator Credentials
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[#A87C56] mb-1">Corporate Officer Name</label>
            <input
              type="text"
              readOnly
              value={user?.name || "Rajesh Menon"}
              className="w-full bg-[#0A0E28] border border-[#304A78] p-2 text-[#F4F1EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#A87C56] mb-1">Corporate Email</label>
            <input
              type="text"
              readOnly
              value={user?.email || "hr@theodra.demo"}
              className="w-full bg-[#0A0E28] border border-[#304A78] p-2 text-[#F4F1EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#A87C56] mb-1">Executive Title</label>
            <input
              type="text"
              readOnly
              value={user?.title || "VP Human Resources & Compliance"}
              className="w-full bg-[#0A0E28] border border-[#304A78] p-2 text-[#F4F1EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#A87C56] mb-1">Corporate Entity</label>
            <input
              type="text"
              readOnly
              value="Meridian Technologies Pvt. Ltd."
              className="w-full bg-[#0A0E28] border border-[#304A78] p-2 text-[#F4F1EB] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Alert Dispatch Configuration */}
      <div className="bg-[#2C3259] border border-[#304A78] p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#304A78]">
          <Bell className="w-4 h-4 text-[#DDA162]" />
          <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
            Statutory Alert Routing
          </h3>
        </div>

        <form onSubmit={handleSave} className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 bg-[#0A0E28] border border-[#304A78] cursor-pointer">
            <div>
              <span className="font-semibold text-[#F4F1EB] block">
                Retaliation Shield anomalous action alert
              </span>
              <span className="text-[11px] text-[#A87C56]">
                Notifies when an unjustified review or transfer occurs for a monitored employee.
              </span>
            </div>
            <input
              type="checkbox"
              checked={notifyRetaliation}
              onChange={(e) => setNotifyRetaliation(e.target.checked)}
              className="w-4 h-4 accent-[#DDA162]"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-[#0A0E28] border border-[#304A78] cursor-pointer">
            <div>
              <span className="font-semibold text-[#F4F1EB] block">
                Annual report filing period reminder (30 days prior to DO deadline)
              </span>
              <span className="text-[11px] text-[#A87C56]">
                Automatic reminder for Form A compile and board submission.
              </span>
            </div>
            <input
              type="checkbox"
              checked={notifyAnnualWindow}
              onChange={(e) => setNotifyAnnualWindow(e.target.checked)}
              className="w-4 h-4 accent-[#DDA162]"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-[#0A0E28] border border-[#304A78] cursor-pointer">
            <div>
              <span className="font-semibold text-[#F4F1EB] block">
                Internal Committee tenure expiry warnings
              </span>
              <span className="text-[11px] text-[#A87C56]">
                Signals 60 days before any committee member's 3-year term expires.
              </span>
            </div>
            <input
              type="checkbox"
              checked={notifyQuorumChanges}
              onChange={(e) => setNotifyQuorumChanges(e.target.checked)}
              className="w-4 h-4 accent-[#DDA162]"
            />
          </label>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors cursor-pointer"
            >
              Save Admin Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
