import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0E28] border-t border-[#262E5F] py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10">
          {/* Logo & Info */}
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-3 select-none mb-3">
              <img
                src="/theodra-logo.png"
                alt="THEODRA Logo"
                className="h-8 w-auto object-contain rounded-[4px]"
              />
              <span className="font-serif text-lg font-bold text-[#E0A96D]">
                THE<span className="text-[#F0B83A]">O</span>DRA
              </span>
            </Link>
            <p className="font-sans text-xs text-[#BDB9AD] leading-relaxed mb-4">
              Privacy-preserving workplace harassment early-warning platform for corporate HR departments and Internal Committees under India&apos;s POSH Act.
            </p>
            <p className="font-sans text-[11px] text-[#7A756B]">
              Engineered by Rushda Jagtap · B.Tech Data Science
            </p>
          </div>

          {/* Nav Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 font-sans text-xs">
            <div>
              <div className="font-semibold text-[#F4F1EB] uppercase tracking-wider mb-3">
                Product
              </div>
              <ul className="space-y-2 text-[#BDB9AD]">
                <li>
                  <Link to="/" className="hover:text-[#F0B83A] transition-colors">
                    Overview
                  </Link>
                </li>
                <li>
                  <Link to="/report" className="hover:text-[#F0B83A] transition-colors">
                    Anonymous Portal
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-[#F0B83A] transition-colors">
                    Demo Access
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-[#F4F1EB] uppercase tracking-wider mb-3">
                Workspaces
              </div>
              <ul className="space-y-2 text-[#BDB9AD]">
                <li>
                  <Link to="/dashboard/ic" className="hover:text-[#F0B83A] transition-colors">
                    IC Member View
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/admin" className="hover:text-[#F0B83A] transition-colors">
                    HR Admin Console
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-[#F4F1EB] uppercase tracking-wider mb-3">
                Legal &amp; Trust
              </div>
              <ul className="space-y-2 text-[#BDB9AD]">
                <li>
                  <Link to="/legal/terms" className="hover:text-[#F0B83A] transition-colors">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/legal/privacy" className="hover:text-[#F0B83A] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/legal/cookies" className="hover:text-[#F0B83A] transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#1D244C] flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[11px] text-[#7A756B]">
          <div>
            © {new Date().getFullYear()} THEODRA Technologies. All rights reserved.
          </div>
          <div>
            Zero message content read or stored · Minimum 5-person privacy threshold · Dual-member governance
          </div>
        </div>
      </div>
    </footer>
  );
};
