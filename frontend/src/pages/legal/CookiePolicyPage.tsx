import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft, Check, CheckCircle2 } from "lucide-react";
import { CookieBanner } from "../../components/CookieBanner";

export const CookiePolicyPage: React.FC = () => {
  const [resetNotice, setResetNotice] = useState(false);

  const handleResetPreferences = () => {
    localStorage.removeItem("theodra_cookie_consent");
    setResetNotice(true);
    setTimeout(() => {
      setResetNotice(false);
      window.location.reload();
    }, 1200);
  };

  return (
    <div className="bg-[#0A0E28] text-[#F4F1EB] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-[#A87C56] hover:text-[#DDA162] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Title */}
        <div className="border-b border-[#262E5F] pb-6">
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-mono font-semibold">
            Cookie & Local Storage Governance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4F1EB] mt-2">
            Cookie Policy
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-2">
            Last Updated: 18 February 2026 • Strict Essential-Only Framework
          </p>
        </div>

        {resetNotice && (
          <div className="p-3 bg-[#0E1438] border border-[#DDA162] rounded-xl text-xs text-[#DDA162] flex items-center gap-2 shadow">
            <CheckCircle2 className="w-4 h-4 text-[#EBBA4A]" />
            <span>Cookie preferences reset. Reloading session banner...</span>
          </div>
        )}

        {/* Document Body in Editorial Lora */}
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-8 sm:p-12 shadow-2xl space-y-8 font-serif leading-relaxed text-xs sm:text-sm text-[#F4F1EB] opacity-95">
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">1. Introduction & Zero-Tracking Architecture</h2>
            <p>
              THEODRA operates on a strict minimal-data principle. Unlike conventional web applications that deploy advertising beacons, cross-site telemetry trackers, and retargeting scripts, <strong className="text-[#F4F1EB]">THEODRA deploys essential session cookies and local storage tokens only</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">2. What Cookies & Local Storage Tokens We Deploy</h2>
            <p>
              We maintain only three strictly functional, non-advertising tokens required for platform security:
            </p>
            <div className="overflow-x-auto font-sans rounded-xl border border-[#262E5F]">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#0E1438] text-[#A87C56] uppercase text-[10px]">
                    <th className="p-3">Identifier Name</th>
                    <th className="p-3">Classification</th>
                    <th className="p-3">Purpose & Lifespan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262E5F]/50">
                  <tr className="hover:bg-[#262E5F]/40 transition-colors">
                    <td className="p-3 font-mono text-[#DDA162]">theodra_auth_user</td>
                    <td className="p-3">Essential Functional</td>
                    <td className="p-3 text-[#A87C56]">Maintains encrypted session authentication for logged-in IC and HR members. Expires upon logout.</td>
                  </tr>
                  <tr className="hover:bg-[#262E5F]/40 transition-colors">
                    <td className="p-3 font-mono text-[#DDA162]">theodra_cookie_consent</td>
                    <td className="p-3">Essential Preference</td>
                    <td className="p-3 text-[#A87C56]">Remembers user acknowledgment of this essential cookie policy. Stored for 365 days.</td>
                  </tr>
                  <tr className="hover:bg-[#262E5F]/40 transition-colors">
                    <td className="p-3 font-mono text-[#DDA162]">theodra_tour_seen_*</td>
                    <td className="p-3">Essential Interface</td>
                    <td className="p-3 text-[#A87C56]">Records whether a user has completed the first-time onboarding walkthrough tour.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">3. Absolute Zero-Cookie Policy on Employee Reporting Portal</h2>
            <p>
              When an employee visits <strong className="text-[#F4F1EB]">/report</strong>, <strong className="text-[#F4F1EB]">/report/track</strong>, or any reporting sub-routes:
            </p>
            <div className="p-4 bg-[#0E1438] border border-[#DDA162] rounded-xl text-xs text-[#F4F1EB] space-y-2">
              <p className="font-semibold text-[#DDA162]">Statutory Protection Guarantee:</p>
              <p>
                Zero cookies of any kind are set. No localStorage tokens are written unless the user explicitly copies their anonymous reference code. Your browser fingerprint, IP address, and session headers are never recorded.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">4. How to Manage or Disable Cookies</h2>
            <p>
              You may manage or disable cookies at any time via your browser settings (Chrome, Firefox, Safari, Edge). Please note that because our tokens are strictly essential for cryptographic session authentication, blocking them will prevent Internal Committee and HR members from maintaining authenticated dashboard access.
            </p>
            <div className="pt-2 font-sans">
              <button
                type="button"
                onClick={handleResetPreferences}
                className="px-4 py-2 bg-[#0E1438] border border-[#262E5F] text-[#F4F1EB] text-xs font-semibold rounded-lg hover:bg-[#DDA162] hover:text-[#0A0E28] transition-colors shadow-sm"
              >
                Reset Cookie Consent Preferences
              </button>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#DDA162]">5. Inquiries</h2>
            <p>
              For questions concerning our zero-tracking architecture, contact our Data Protection Officer at:
              <br />
              <span className="font-mono text-[#DDA162]">privacy@theodra.in</span>
            </p>
          </section>
        </div>
      </div>
      <CookieBanner />
    </div>
  );
};
