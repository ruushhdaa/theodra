import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ShieldCheck, ArrowRight, Building, Sparkles, Send, CheckCircle } from "lucide-react";

export const PricingPage: React.FC = () => {
  const [salesSubmitted, setSalesSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [headcount, setHeadcount] = useState("250 - 1,000 employees");
  const [message, setMessage] = useState("");

  const handleSalesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSalesSubmitted(true);
  };

  return (
    <div className="bg-[#0A0E28] text-[#F4F1EB] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold block mb-2">
            Transparent Statutory Subscriptions
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4F1EB] leading-tight">
            Predictable Pricing for Corporate POSH Compliance
          </h1>
          <p className="font-serif text-base text-[#A87C56] mt-4 leading-relaxed">
            Protect your workforce, empower your Internal Committee, and fulfill statutory Section 21 mandates with privacy-first engineering.
          </p>
        </div>

        {/* Pricing Cards (2 Tiers: Essentials & Enterprise) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Essentials Tier */}
          <div className="bg-[#2C3259] border border-[#304A78] p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-[#DDA162] uppercase tracking-wider block mb-1">
                For Growing Teams
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#F4F1EB]">Essentials</h2>
              <p className="font-serif text-xs text-[#A87C56] mt-2 mb-6">
                Complete statutory grievance compliance, anonymous portal, and standard IC inquiry management.
              </p>

              <div className="my-6 pb-6 border-b border-[#304A78]">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-bold text-[#F4F1EB]">₹2,999</span>
                  <span className="text-xs text-[#A87C56] font-sans">/ month</span>
                </div>
                <span className="text-[11px] text-[#A87C56] block mt-1">Billed annually • Up to 250 employees</span>
              </div>

              <div className="space-y-3 text-xs text-[#F4F1EB] mb-8">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#DDA162] shrink-0 mt-0.5" />
                  <span>Public Anonymous Reporting Portal (Zero Login)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#DDA162] shrink-0 mt-0.5" />
                  <span>Case Tracking with Reference Codes & 2-Way Chat</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#DDA162] shrink-0 mt-0.5" />
                  <span>Internal Committee Kanban Case Management Board</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#DDA162] shrink-0 mt-0.5" />
                  <span>Statutory 90-Day Inquiry Compliance Clocks</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#DDA162] shrink-0 mt-0.5" />
                  <span>Annual POSH Report Form A PDF Generator</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#DDA162] shrink-0 mt-0.5" />
                  <span>Quiet Flag Escrow Matching System</span>
                </div>
              </div>
            </div>

            <a
              href="#demo-form"
              className="w-full py-3 bg-[#0A0E28] border border-[#304A78] text-[#DDA162] text-xs font-bold uppercase tracking-wider hover:bg-[#304A78] hover:text-[#F4F1EB] transition-colors text-center cursor-pointer block"
            >
              Get Started with Essentials
            </a>
          </div>

          {/* Enterprise Tier */}
          <div className="bg-[#2C3259] border-2 border-[#DDA162] p-8 shadow-2xl flex flex-col justify-between relative">
            <span className="absolute -top-3.5 right-6 text-[10px] font-bold px-3 py-1 bg-[#DDA162] text-[#0A0E28] uppercase tracking-wider shadow">
              Most Popular for Enterprises
            </span>
            <div>
              <span className="text-xs font-mono text-[#EBBA4A] uppercase tracking-wider block mb-1">
                Full Telemetry Architecture
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#F4F1EB]">Enterprise</h2>
              <p className="font-serif text-xs text-[#A87C56] mt-2 mb-6">
                Advanced communication rhythm telemetry, k-anonymity pattern alerts, Retaliation Shield, and SEBI BRSR reconciliation.
              </p>

              <div className="my-6 pb-6 border-b border-[#304A78]">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-bold text-[#EBBA4A]">₹7,999</span>
                  <span className="text-xs text-[#A87C56] font-sans">/ month</span>
                </div>
                <span className="text-[11px] text-[#A87C56] block mt-1">Billed annually • Unlimited corporate workforce</span>
              </div>

              <div className="space-y-3 text-xs text-[#F4F1EB] mb-8">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#EBBA4A] shrink-0 mt-0.5" />
                  <span className="font-medium text-[#F4F1EB]">Everything in Essentials, plus:</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#EBBA4A] shrink-0 mt-0.5" />
                  <span>Early-Warning Telemetry Ingestion (Slack / Teams / Google)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#EBBA4A] shrink-0 mt-0.5" />
                  <span>Mathematical k-Anonymity Guard (k ≥ 5 Cohort Surfacing)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#EBBA4A] shrink-0 mt-0.5" />
                  <span>Retaliation Shield Automated Career Anomaly Monitor</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#EBBA4A] shrink-0 mt-0.5" />
                  <span>SEBI BRSR Principle 5 Disclosure Reconciliation</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#EBBA4A] shrink-0 mt-0.5" />
                  <span>Organisation Health Score & Peer Industry Benchmarks</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#EBBA4A] shrink-0 mt-0.5" />
                  <span>Dedicated External IC Member Guidance & Legal SLA</span>
                </div>
              </div>
            </div>

            <a
              href="#demo-form"
              className="w-full py-3 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors text-center cursor-pointer block shadow-lg"
            >
              Book Corporate Pilot
            </a>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-[#2C3259] border border-[#304A78] overflow-hidden shadow-2xl">
          <div className="p-4 bg-[#0A0E28] border-b border-[#304A78]">
            <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
              Feature Comparison Matrix
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="bg-[#0A0E28] border-b border-[#304A78] text-[#A87C56] uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-6">Capability</th>
                  <th className="py-3 px-6 text-center">Essentials (₹2,999/mo)</th>
                  <th className="py-3 px-6 text-center text-[#DDA162]">Enterprise (₹7,999/mo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#304A78]/60 font-serif">
                <tr>
                  <td className="py-3.5 px-6 font-sans font-medium text-[#F4F1EB]">Anonymous Reporting Gateway</td>
                  <td className="py-3.5 px-6 text-center text-[#DDA162]">✓ Included</td>
                  <td className="py-3.5 px-6 text-center text-[#EBBA4A] font-bold">✓ Included</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-sans font-medium text-[#F4F1EB]">Quiet Flag Escrow Matching</td>
                  <td className="py-3.5 px-6 text-center text-[#DDA162]">✓ Included</td>
                  <td className="py-3.5 px-6 text-center text-[#EBBA4A] font-bold">✓ Included</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-sans font-medium text-[#F4F1EB]">90-Day Inquiry Clock & Minutes</td>
                  <td className="py-3.5 px-6 text-center text-[#DDA162]">✓ Included</td>
                  <td className="py-3.5 px-6 text-center text-[#EBBA4A] font-bold">✓ Included</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-sans font-medium text-[#F4F1EB]">Off-Hours Communication Telemetry</td>
                  <td className="py-3.5 px-6 text-center text-[#A87C56]">—</td>
                  <td className="py-3.5 px-6 text-center text-[#EBBA4A] font-bold">✓ Active (Slack / Teams / GSuite)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-sans font-medium text-[#F4F1EB]">k-Anonymity Cohort Surfacing (k ≥ 5)</td>
                  <td className="py-3.5 px-6 text-center text-[#A87C56]">—</td>
                  <td className="py-3.5 px-6 text-center text-[#EBBA4A] font-bold">✓ Mathematical Guarantee</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-sans font-medium text-[#F4F1EB]">Retaliation Shield Automated Tracking</td>
                  <td className="py-3.5 px-6 text-center text-[#A87C56]">—</td>
                  <td className="py-3.5 px-6 text-center text-[#EBBA4A] font-bold">✓ Automated Oversight</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-sans font-medium text-[#F4F1EB]">SEBI BRSR Disclosure Reconciliation</td>
                  <td className="py-3.5 px-6 text-center text-[#A87C56]">—</td>
                  <td className="py-3.5 px-6 text-center text-[#EBBA4A] font-bold">✓ Tri-Partite Tool</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact Sales Form */}
        <div id="demo-form" className="bg-[#2C3259] border border-[#304A78] p-8 sm:p-10 shadow-2xl max-w-3xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#DDA162] block mb-1">
              Connect With Statutory Advisory
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F4F1EB]">
              Schedule a Confidential Enterprise Walkthrough
            </h2>
            <p className="font-serif text-xs text-[#A87C56] mt-2">
              Speak with our senior POSH legal specialists to tailor an implementation pilot for your organization.
            </p>
          </div>

          {!salesSubmitted ? (
            <form onSubmit={handleSalesSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#F4F1EB] font-semibold mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Shalini Roy"
                    className="w-full bg-[#0A0E28] border border-[#304A78] px-3.5 py-2.5 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
                  />
                </div>

                <div>
                  <label className="block text-[#F4F1EB] font-semibold mb-1">Official Work Email</label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-[#0A0E28] border border-[#304A78] px-3.5 py-2.5 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#F4F1EB] font-semibold mb-1">Company / Entity Name</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Tech India Pvt Ltd"
                    className="w-full bg-[#0A0E28] border border-[#304A78] px-3.5 py-2.5 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
                  />
                </div>

                <div>
                  <label className="block text-[#F4F1EB] font-semibold mb-1">Total Employee Headcount</label>
                  <select
                    value={headcount}
                    onChange={(e) => setHeadcount(e.target.value)}
                    className="w-full bg-[#0A0E28] border border-[#304A78] px-3.5 py-2.5 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
                  >
                    <option value="50 - 250 employees">50 – 250 employees</option>
                    <option value="250 - 1,000 employees">250 – 1,000 employees</option>
                    <option value="1,000 - 5,000 employees">1,000 – 5,000 employees</option>
                    <option value="5,000+ employees">5,000+ enterprise employees</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#F4F1EB] font-semibold mb-1">Specific Compliance Goals or Questions</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your current IC setup or specific compliance needs..."
                  className="w-full bg-[#0A0E28] border border-[#304A78] p-3 text-xs text-[#F4F1EB] focus:outline-none focus:border-[#DDA162]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Confidential Demo</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-8 text-center space-y-4">
              <div className="w-14 h-14 bg-[#0A0E28] border border-[#DDA162] mx-auto flex items-center justify-center text-[#DDA162]">
                <CheckCircle className="w-8 h-8 text-[#EBBA4A]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#F4F1EB]">
                Thank you. Request Received.
              </h3>
              <p className="font-serif text-xs text-[#A87C56] max-w-md mx-auto leading-relaxed">
                Our statutory compliance advisory team will reach out to {workEmail} within one business day to coordinate an executive pilot walkthrough.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
