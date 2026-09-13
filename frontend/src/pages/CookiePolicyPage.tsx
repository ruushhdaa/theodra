import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Cookie, ShieldCheck } from "lucide-react";

export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0E28] text-[#F4F1EB] py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-sans text-xs text-[#E0A96D] hover:underline mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F0B83A]">
              Technical Compliance
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4F1EB] leading-tight">
            Cookie Policy
          </h1>
          <p className="font-sans text-xs text-[#7A756B] mt-2">
            Strictly Essential Technical Cookies Only · No Advertising or Tracking Pixels
          </p>
        </div>

        <div className="bg-[#13193A] border border-[#262E5F] p-8 rounded-[8px] space-y-8 font-serif text-sm text-[#BDB9AD] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#F4F1EB]">
              1. Our Zero-Ad Tracking Philosophy
            </h2>
            <p>
              THEODRA is an enterprise workplace compliance platform, not an advertising network. We do not use third-party marketing cookies, Google Analytics, social media trackers, pixel beacons, or browser fingerprinting technologies.
            </p>
            <p>
              The only cookies and storage mechanisms used by the platform are strictly necessary for system authentication, rate-limiting anti-abuse safeguards, and UI session state.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#F4F1EB]">
              2. Cookies &amp; Storage Mechanisms in Use
            </h2>
            <div className="border border-[#262E5F] rounded-[6px] overflow-hidden bg-[#0A0E28]">
              <table className="w-full text-left font-sans text-xs">
                <thead className="bg-[#1C234E] text-[#7A756B] uppercase text-[10px] tracking-wider border-b border-[#262E5F]">
                  <tr>
                    <th className="p-3">Identifier</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Purpose</th>
                    <th className="p-3">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1D244C]">
                  <tr>
                    <td className="p-3 font-semibold text-[#F4F1EB]">theodra_demo_user_role</td>
                    <td className="p-3 text-[#E0A96D]">Strictly Essential</td>
                    <td className="p-3">Stores active demo persona (Employee, IC Member, HR Admin)</td>
                    <td className="p-3 text-[#7A756B]">Local Storage (cleared on sign out)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#F4F1EB]">theodra_cookie_consent_dismissed</td>
                    <td className="p-3 text-[#E0A96D]">Preferences</td>
                    <td className="p-3">Remembers that you have dismissed the cookie notice</td>
                    <td className="p-3 text-[#7A756B]">Persistent (1 Year)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#F4F1EB]">anon_report_rate_token</td>
                    <td className="p-3 text-[#E0A96D]">Security &amp; Anti-DDoS</td>
                    <td className="p-3">Prevents automated spam attacks on the anonymous reporting portal</td>
                    <td className="p-3 text-[#7A756B]">24 Hours (automatic purge)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#F4F1EB]">
              3. Anonymous Reporting Exemption
            </h2>
            <p>
              When an employee visits the anonymous reporting portal at <code className="text-[#E0A96D] bg-[#0A0E28] px-1.5 py-0.5 rounded text-xs font-sans">/report</code>, no session cookies or user tracking tokens are stored. You can safely access the reporting portal from personal devices, private browsing windows, or corporate laptops without leaving a residual persistent identifier.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#F4F1EB]">
              4. Managing Your Cookie Settings
            </h2>
            <p>
              Because THEODRA utilizes only strictly essential technical cookies, disabling cookies in your browser settings may prevent authenticated Internal Committee members and HR administrators from logging into their dashboards.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
