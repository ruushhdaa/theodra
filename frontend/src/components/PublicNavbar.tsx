import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Shield, Menu, X, ChevronDown, Lock, UserCheck, Briefcase } from "lucide-react";

export const PublicNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

  const navLinks = [
    { label: "The Problem", to: "/problem" },
    { label: "How It Works", to: "/how-it-works" },
    { label: "Why THEODRA", to: "/why-theodra" },
    { label: "Employee Portal", to: "/employee/dashboard" },
    { label: "Pricing", to: "/pricing" },
    { label: "About", to: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0E28] border-b border-[#262E5F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand with authentic theodra-logo.png */}
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <img
            src="/theodra-logo.png"
            alt="THEODRA Logo"
            className="h-9 w-auto object-contain rounded transition-transform group-hover:scale-105"
          />
          <span className="font-serif text-xl font-bold tracking-wider text-[#F4F1EB] group-hover:text-[#DDA162] transition-colors">
            THEODRA
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-xs font-semibold tracking-wide transition-colors ${
                  isActive
                    ? "text-[#DDA162] border-b-2 border-[#DDA162] pb-1 font-bold"
                    : "text-[#F4F1EB]/85 hover:text-[#DDA162]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Action buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link
            to="/report?mode=form"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("theodra-open-report-form"));
            }}
            className="px-4 py-2 border border-[#DDA162] text-[#DDA162] text-xs font-semibold tracking-wide rounded-xl hover:bg-[#DDA162] hover:text-[#0A0E28] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Anonymous Report</span>
          </Link>

          {/* Login / Portal Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
              className="px-4 py-2 bg-[#0A0E28] border border-[#262E5F] rounded-xl text-[#F4F1EB] text-xs font-semibold tracking-wide hover:bg-[#262E5F] hover:border-[#DDA162] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[#DDA162]" />
              <span>Portals & Login</span>
              <ChevronDown className="w-3 h-3 text-[#A87C56]" />
            </button>

            {loginDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-60 bg-[#0A0E28] border border-[#262E5F] rounded-xl shadow-2xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150 overflow-hidden"
                onClick={() => setLoginDropdownOpen(false)}
              >
                <Link
                  to="/employee/dashboard"
                  className="block px-4 py-3 text-xs text-[#F4F1EB] hover:bg-[#262E5F] transition-colors"
                >
                  <span className="font-semibold block text-[#EBBA4A] flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" /> Employee Dashboard
                  </span>
                  <span className="text-[10px] text-[#A87C56] mt-0.5 block">Confidential Case Tracker & Helplines</span>
                </Link>
                <div className="border-t border-[#262E5F]" />
                <Link
                  to="/ic/login"
                  className="block px-4 py-3 text-xs text-[#F4F1EB] hover:bg-[#262E5F] transition-colors"
                >
                  <span className="font-semibold block text-[#DDA162] flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5" /> IC Member Portal
                  </span>
                  <span className="text-[10px] text-[#A87C56] mt-0.5 block">Internal Committee Members Login</span>
                </Link>
                <div className="border-t border-[#262E5F]" />
                <Link
                  to="/hr/login"
                  className="block px-4 py-3 text-xs text-[#F4F1EB] hover:bg-[#262E5F] transition-colors"
                >
                  <span className="font-semibold block text-[#DDA162] flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" /> HR Admin Console
                  </span>
                  <span className="text-[10px] text-[#A87C56] mt-0.5 block">VP / Directors & Compliance Login</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            to="/report?mode=form"
            onClick={() => {
              setMobileMenuOpen(false);
              window.dispatchEvent(new CustomEvent("theodra-open-report-form"));
            }}
            className="px-3 py-1.5 border border-[#DDA162] text-[#DDA162] text-xs font-semibold rounded-lg"
          >
            Report
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#F4F1EB] hover:text-[#DDA162] hover:bg-[#262E5F] rounded-lg cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0E28] border-b border-[#262E5F] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-semibold text-[#F4F1EB] rounded-lg hover:bg-[#262E5F] hover:text-[#DDA162]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#262E5F] flex flex-col gap-2">
            <Link
              to="/employee/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 bg-[#11173D] border border-[#262E5F] rounded-lg text-xs font-semibold text-[#EBBA4A] text-center"
            >
              Employee Dashboard
            </Link>
            <Link
              to="/ic/login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 bg-[#0A0E28] border border-[#262E5F] rounded-lg text-xs font-semibold text-[#DDA162] text-center hover:bg-[#262E5F]"
            >
              IC Member Login
            </Link>
            <Link
              to="/hr/login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 bg-[#0A0E28] border border-[#262E5F] rounded-lg text-xs font-semibold text-[#F4F1EB] text-center hover:bg-[#262E5F]"
            >
              HR Admin Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
