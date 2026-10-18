import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, X } from "lucide-react";

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("theodra_cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("theodra_cookie_consent", "accepted");
    setVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem("theodra_cookie_consent", "dismissed");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-[#2C3259] border border-[#304A78] p-4 text-[#F4F1EB] shadow-2xl">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#DDA162] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-[#F4F1EB] leading-relaxed">
              We use <span className="text-[#DDA162] font-semibold">essential cookies only</span> for secure authenticated sessions. The anonymous employee reporting portal sets zero cookies and stores no tracking telemetry.
            </p>
            <div className="mt-2.5 flex items-center gap-3">
              <button
                type="button"
                onClick={handleAccept}
                className="px-3 py-1.5 bg-[#DDA162] text-[#0A0E28] text-xs font-semibold hover:bg-[#EBBA4A] transition-colors"
              >
                Accept Essential
              </button>
              <Link
                to="/cookies"
                className="text-xs text-[#DDA162] hover:underline"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="text-[#A87C56] hover:text-[#F4F1EB] transition-colors p-1"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
