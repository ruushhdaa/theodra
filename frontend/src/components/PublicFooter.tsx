import React from "react";
import { Link } from "react-router-dom";
import { Shield, Lock } from "lucide-react";

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#0A0E28] border-t border-[#262E5F] text-[#F4F1EB] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src="/theodra-logo.png" alt="THEODRA" className="h-8 w-auto object-contain rounded" />
              <span className="font-serif text-xl font-bold tracking-wider text-[#F4F1EB]">
                THEODRA
              </span>
            </Link>
            <p className="font-serif text-sm text-[#A87C56] max-w-sm leading-relaxed">
              Privacy-preserving workplace harassment early-warning platform. Protecting employees and equipping Internal Committees under India's POSH Act 2013 without ever inspecting message text.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#A87C56] pt-2">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#DDA162]" /> Zero Content Read
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#DDA162]" /> DPDP Act 2023 Compliant
              </span>
            </div>
          </div>

          {/* Product & Solutions */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DDA162] mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/problem" className="text-[#A87C56] hover:text-[#F4F1EB] transition-colors">
                  The Problem
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-[#A87C56] hover:text-[#F4F1EB] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/why-theodra" className="text-[#A87C56] hover:text-[#F4F1EB] transition-colors">
                  Why THEODRA
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-[#A87C56] hover:text-[#F4F1EB] transition-colors">
                  Pricing & Demo
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#A87C56] hover:text-[#F4F1EB] transition-colors">
                  Empress Theodora
                </Link>
              </li>
            </ul>
          </div>

          {/* Employee Support Portal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DDA162] mb-3">
              Employee Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/report?mode=form"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("theodra-open-report-form"));
                  }}
                  className="text-[#A87C56] hover:text-[#F4F1EB] transition-colors"
                >
                  Make Anonymous Report
                </Link>
              </li>
              <li>
                <Link to="/report/track" className="text-[#A87C56] hover:text-[#F4F1EB] transition-colors">
                  Track Report Code
                </Link>
              </li>
              <li>
                <Link to="/report/quiet-flag" className="text-[#A87C56] hover:text-[#F4F1EB] transition-colors">
                  Quiet Flag (Escrow)
                </Link>
              </li>
              <li>
                <Link to="/report/rights" className="text-[#A87C56] hover:text-[#F4F1EB] transition-colors">
                  Know Your Rights (POSH)
                </Link>
              </li>
              <li>
                <Link to="/report/resources" className="text-[#A87C56] hover:text-[#F4F1EB] transition-colors">
                  Emergency Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DDA162] mb-3">
              Portals & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/ic/login" className="text-[#DDA162] hover:underline">
                  IC Member Login
                </Link>
              </li>
              <li>
                <Link to="/hr/login" className="text-[#DDA162] hover:underline">
                  HR Admin Login
                </Link>
              </li>
              <li className="pt-2">
                <Link to="/terms" className="text-[#A87C56] hover:text-[#F4F1EB] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-[#A87C56] hover:text-[#F4F1EB] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-[#A87C56] hover:text-[#F4F1EB] transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#262E5F] flex flex-col sm:flex-row items-center justify-between text-xs text-[#A87C56] gap-4">
          <p>© {new Date().getFullYear()} THEODRA Systems Inc. All rights reserved.</p>
          <p className="text-center sm:text-right text-[11px]">
            Engineered in India under the Sexual Harassment of Women at Workplace Act 2013.
          </p>
        </div>
      </div>
    </footer>
  );
};
