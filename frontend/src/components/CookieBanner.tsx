import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, X } from "lucide-react";

const COOKIE_STORAGE_KEY = "theodra_cookie_consent_dismissed";

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!dismissed) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, "true");
    } catch {
      // Ignore
    }
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-50 bg-[#13193A] border border-[#262E5F] p-5 rounded-[8px] shadow-2xl animate-fade-in"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#F0B83A] shrink-0" />
          <span className="font-sans text-xs font-semibold text-[#F4F1EB]">
            Privacy &amp; Cookie Notice
          </span>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="text-[#7A756B] hover:text-[#F4F1EB] p-1 transition-colors"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="font-sans text-xs text-[#BDB9AD] leading-relaxed mb-4">
        THEODRA uses essential session storage and non-invasive technical cookies necessary for role-based authentication and anonymous reporting security. We never use tracking or ad cookies.
      </p>

      <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#1D244C]">
        <Link
          to="/legal/cookies"
          className="font-sans text-xs text-[#E0A96D] hover:underline"
        >
          Read Cookie Policy
        </Link>
        <button
          type="button"
          onClick={handleDismiss}
          className="font-sans text-xs font-semibold bg-[#F0B83A] text-[#0A0E28] px-4 py-1.5 rounded-[6px] hover:bg-[#F0B83A]/90 transition-colors cursor-pointer"
        >
          Accept &amp; Dismiss
        </button>
      </div>
    </div>
  );
};
