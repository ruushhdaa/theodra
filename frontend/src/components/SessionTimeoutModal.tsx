import React from "react";
import { useAuth } from "../context/AuthContext";
import { AlertCircle, Clock } from "lucide-react";

export const SessionTimeoutModal: React.FC = () => {
  const { sessionWarningOpen, dismissSessionWarning, logout } = useAuth();

  if (!sessionWarningOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0E28]/80 backdrop-blur-none p-4">
      <div className="bg-[#2C3259] border border-[#304A78] max-w-md w-full p-6 text-[#F4F1EB] shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-6 h-6 text-[#EBBA4A]" />
          <h3 className="font-serif text-lg text-[#F4F1EB]">Session Inactivity Notice</h3>
        </div>
        <p className="text-sm text-[#F4F1EB] leading-relaxed mb-4">
          For statutory compliance and data protection, your authenticated session will automatically expire in <span className="text-[#DDA162] font-semibold">2 minutes</span> due to inactivity.
        </p>
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#304A78]">
          <button
            type="button"
            onClick={logout}
            className="px-4 py-2 border border-[#304A78] text-xs font-semibold text-[#F4F1EB] hover:bg-[#304A78] transition-colors"
          >
            Log Out Now
          </button>
          <button
            type="button"
            onClick={dismissSessionWarning}
            className="px-4 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-semibold hover:bg-[#EBBA4A] transition-colors"
          >
            Continue Session
          </button>
        </div>
      </div>
    </div>
  );
};
