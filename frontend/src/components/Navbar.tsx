import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserRole } from "../data/mockData";
import { Menu, X, Shield, User, LogOut, ChevronDown } from "lucide-react";

export const Navbar: React.FC = () => {
  const { user, logout, switchRole, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    setRoleDropdownOpen(false);
    if (role === "IC Member") {
      navigate("/dashboard/ic");
    } else if (role === "HR Admin") {
      navigate("/dashboard/admin");
    } else {
      navigate("/report");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0E28] border-b border-[#262E5F] h-16 flex items-center px-4 sm:px-8">
      {/* Left: Logo referencing the actual attached image asset */}
      <Link to="/" className="flex items-center gap-3 select-none mr-8 shrink-0">
        <img
          src="/theodra-logo.png"
          alt="THEODRA Logo"
          className="h-9 w-auto object-contain rounded-[4px]"
        />
        <div className="flex flex-col">
          <span className="font-serif text-lg font-bold text-[#E0A96D] tracking-tight leading-none">
            THE<span className="text-[#F0B83A]">O</span>DRA
          </span>
          <span className="font-sans text-[9px] uppercase tracking-[0.14em] text-[#7A756B] mt-0.5">
            Workplace Safety Platform
          </span>
        </div>
      </Link>

      {/* Center navigation links */}
      <nav className="hidden lg:flex items-center gap-1 flex-1">
        <Link
          to="/"
          className={`font-sans text-xs font-medium px-3 py-1.5 rounded-[6px] transition-colors ${
            isActive("/") && location.pathname === "/"
              ? "text-[#F0B83A] bg-[#13193A]"
              : "text-[#BDB9AD] hover:text-[#F4F1EB]"
          }`}
        >
          Product
        </Link>
        <Link
          to="/report"
          className={`font-sans text-xs font-medium px-3 py-1.5 rounded-[6px] transition-colors ${
            isActive("/report")
              ? "text-[#F0B83A] bg-[#13193A]"
              : "text-[#BDB9AD] hover:text-[#F4F1EB]"
          }`}
        >
          Anonymous Portal
        </Link>
        <Link
          to="/dashboard/ic"
          className={`font-sans text-xs font-medium px-3 py-1.5 rounded-[6px] transition-colors ${
            isActive("/dashboard/ic")
              ? "text-[#F0B83A] bg-[#13193A]"
              : "text-[#BDB9AD] hover:text-[#F4F1EB]"
          }`}
        >
          IC Dashboard
        </Link>
        <Link
          to="/dashboard/admin"
          className={`font-sans text-xs font-medium px-3 py-1.5 rounded-[6px] transition-colors ${
            isActive("/dashboard/admin")
              ? "text-[#F0B83A] bg-[#13193A]"
              : "text-[#BDB9AD] hover:text-[#F4F1EB]"
          }`}
        >
          HR Admin
        </Link>
      </nav>

      {/* Right actions: Role switcher / Login & primary CTA */}
      <div className="ml-auto flex items-center gap-3 shrink-0">
        {isAuthenticated && user ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="hidden sm:flex items-center gap-2 font-sans text-xs bg-[#13193A] border border-[#262E5F] px-3 py-1.5 rounded-[6px] text-[#F4F1EB] hover:border-[#E0A96D]/50 transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[#F0B83A]" />
              <span>{user.name}</span>
              <span className="text-[10px] font-semibold text-[#E0A96D] bg-[#4E182A]/50 px-1.5 py-0.5 rounded-[4px]">
                {user.role}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#7A756B]" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#13193A] border border-[#262E5F] rounded-[8px] shadow-2xl p-2 z-50">
                <div className="px-3 py-2 border-b border-[#1D244C] mb-1">
                  <div className="font-sans text-[10px] uppercase tracking-wider text-[#7A756B]">
                    Active Account Role
                  </div>
                  <div className="font-serif text-sm font-bold text-[#E0A96D]">
                    {user.role}
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="px-3 py-1 font-sans text-[10px] uppercase text-[#7A756B]">
                    Switch Demo Role
                  </div>
                  {(["Employee", "IC Member", "HR Admin"] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRoleSelect(r)}
                      className={`w-full text-left font-sans text-xs px-3 py-1.5 rounded-[4px] transition-colors flex items-center justify-between ${
                        user.role === r
                          ? "bg-[#262E5F] text-[#F0B83A] font-semibold"
                          : "text-[#BDB9AD] hover:bg-[#1C234E] hover:text-[#F4F1EB]"
                      }`}
                    >
                      <span>{r}</span>
                      {user.role === r && <span className="text-[10px] text-[#F0B83A]">Active</span>}
                    </button>
                  ))}
                </div>

                <div className="pt-2 mt-1 border-t border-[#1D244C]">
                  <button
                    onClick={() => {
                      logout();
                      setRoleDropdownOpen(false);
                      navigate("/");
                    }}
                    className="w-full text-left font-sans text-xs px-3 py-1.5 text-[#BDB9AD] hover:text-red-400 rounded-[4px] flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center gap-1.5 font-sans text-xs font-medium border border-[#262E5F] text-[#BDB9AD] hover:text-[#F4F1EB] px-3.5 py-1.5 rounded-[6px] transition-colors"
          >
            <User className="w-3.5 h-3.5 text-[#E0A96D]" /> Demo Login
          </Link>
        )}

        {/* Primary CTA (Bright Yellow-Gold, rounded 6px) */}
        <Link
          to="/report"
          className="font-sans text-xs font-semibold bg-[#F0B83A] text-[#0A0E28] px-4 py-2 rounded-[6px] hover:bg-[#F0B83A]/90 transition-colors whitespace-nowrap shadow-sm"
        >
          Anonymous Report
        </Link>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-1.5 text-[#BDB9AD] hover:text-[#F4F1EB] focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-[#0A0E28] border-b border-[#262E5F] p-4 shadow-2xl flex flex-col gap-2">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className={`font-sans text-sm font-medium px-3 py-2 rounded-[6px] ${
              isActive("/") && location.pathname === "/"
                ? "text-[#F0B83A] bg-[#13193A]"
                : "text-[#BDB9AD]"
            }`}
          >
            Product
          </Link>
          <Link
            to="/report"
            onClick={() => setMobileOpen(false)}
            className={`font-sans text-sm font-medium px-3 py-2 rounded-[6px] ${
              isActive("/report") ? "text-[#F0B83A] bg-[#13193A]" : "text-[#BDB9AD]"
            }`}
          >
            Anonymous Reporting Portal
          </Link>
          <Link
            to="/dashboard/ic"
            onClick={() => setMobileOpen(false)}
            className={`font-sans text-sm font-medium px-3 py-2 rounded-[6px] ${
              isActive("/dashboard/ic") ? "text-[#F0B83A] bg-[#13193A]" : "text-[#BDB9AD]"
            }`}
          >
            Internal Committee Dashboard
          </Link>
          <Link
            to="/dashboard/admin"
            onClick={() => setMobileOpen(false)}
            className={`font-sans text-sm font-medium px-3 py-2 rounded-[6px] ${
              isActive("/dashboard/admin") ? "text-[#F0B83A] bg-[#13193A]" : "text-[#BDB9AD]"
            }`}
          >
            HR Administrator Console
          </Link>

          <div className="pt-2 mt-2 border-t border-[#1D244C] flex flex-col gap-2">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between p-2 bg-[#13193A] rounded-[6px]">
                <div className="text-xs text-[#BDB9AD]">
                  Logged in as <strong className="text-[#F4F1EB]">{user.name}</strong> ({user.role})
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="text-xs text-[#E0A96D] hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="font-sans text-xs text-center border border-[#262E5F] text-[#F4F1EB] py-2 rounded-[6px]"
              >
                Sign In to Demo Workspace
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
