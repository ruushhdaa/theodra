import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Shield, Menu, X, ChevronDown, Lock } from "lucide-react";

export const PublicNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

  const navLinks = [
    { label: "The Problem", to: "/problem" },
    { label: "How It Works", to: "/how-it-works" },
    { label: "Why THEODRA", to: "/why-theodra" },
    { label: "Pricing", to: "/pricing" },
    { label: "About", to: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0E28] border-b border-[#304A78]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand with authentic theodra-logo.png */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/theodra-logo.png"
            alt="THEODRA Logo"
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-serif text-xl font-bold tracking-wider text-[#F4F1EB]">
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
                    ? "text-[#DDA162] border-b-2 border-[#DDA162] pb-1"
                    : "text-[#F4F1EB] hover:text-[#DDA162]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Action buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            to="/report"
            className="px-4 py-2 border border-[#DDA162] text-[#DDA162] text-xs font-semibold tracking-wide hover:bg-[#DDA162] hover:text-[#0A0E28] transition-colors flex items-center gap-2"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Anonymous Portal</span>
          </Link>

          {/* Login Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
              className="px-4 py-2 bg-[#2C3259] border border-[#304A78] text-[#F4F1EB] text-xs font-semibold tracking-wide hover:bg-[#304A78] transition-colors flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-[#DDA162]" />
              <span>Log In</span>
              <ChevronDown className="w-3 h-3 text-[#A87C56]" />
            </button>

            {loginDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-52 bg-[#2C3259] border border-[#304A78] shadow-2xl py-1 z-50"
                onClick={() => setLoginDropdownOpen(false)}
              >
                <Link
                  to="/ic/login"
                  className="block px-4 py-2.5 text-xs text-[#F4F1EB] hover:bg-[#304A78] transition-colors"
                >
                  <span className="font-semibold block text-[#DDA162]">IC Member Portal</span>
                  <span className="text-[10px] text-[#A87C56]">Internal Committee Members</span>
                </Link>
                <div className="border-t border-[#304A78]" />
                <Link
                  to="/hr/login"
                  className="block px-4 py-2.5 text-xs text-[#F4F1EB] hover:bg-[#304A78] transition-colors"
                >
                  <span className="font-semibold block text-[#DDA162]">HR Admin Console</span>
                  <span className="text-[10px] text-[#A87C56]">VP / Directors & Compliance</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            to="/report"
            className="px-2.5 py-1.5 border border-[#DDA162] text-[#DDA162] text-xs font-semibold"
          >
            Report
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#F4F1EB] hover:text-[#DDA162]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#2C3259] border-b border-[#304A78] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-semibold text-[#F4F1EB] hover:bg-[#304A78]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#304A78] flex flex-col gap-2">
            <Link
              to="/ic/login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 bg-[#0A0E28] border border-[#304A78] text-xs font-semibold text-[#DDA162] text-center"
            >
              IC Member Login
            </Link>
            <Link
              to="/hr/login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 bg-[#0A0E28] border border-[#304A78] text-xs font-semibold text-[#F4F1EB] text-center"
            >
              HR Admin Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
