import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Scale,
  BarChart3,
  HeartPulse,
  ShieldAlert,
  Map,
  GraduationCap,
  Archive,
  Eye,
  Download,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Lock,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { NotificationBell } from "./NotificationBell";
import { GlobalSearchModal } from "./GlobalSearchModal";
import { SessionTimeoutModal } from "./SessionTimeoutModal";
import { OnboardingTour } from "./OnboardingTour";
import { MOCK_HR_NOTIFICATIONS } from "../data/mockData";

export const HRLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { label: "Overview", to: "/hr/dashboard", icon: LayoutDashboard },
    { label: "IC Roster", to: "/hr/roster", icon: Users },
    { label: "Annual Report", to: "/hr/report-generator", icon: FileText },
    { label: "Statutory Disclosure", to: "/hr/disclosure", icon: Scale },
    { label: "Peer Benchmarks", to: "/hr/benchmarks", icon: BarChart3 },
    { label: "Health Score", to: "/hr/health", icon: HeartPulse },
    { label: "Retaliation Shield", to: "/hr/retaliation", icon: ShieldAlert },
    { label: "Dept Heatmap", to: "/hr/heatmap", icon: Map },
    { label: "Training Management", to: "/hr/training", icon: GraduationCap },
    { label: "Policy Vault", to: "/hr/policy", icon: Archive },
    { label: "Audit Log", to: "/hr/audit", icon: Eye },
    { label: "Export Centre", to: "/hr/exports", icon: Download },
    {
      label: "Notifications",
      to: "/hr/notifications",
      icon: Bell,
      badge: MOCK_HR_NOTIFICATIONS.filter((n) => !n.read).length,
    },
    { label: "Settings", to: "/hr/settings", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate("/hr/login");
  };

  return (
    <div className="min-h-screen bg-[#0A0E28] text-[#F4F1EB] flex flex-col md:flex-row">
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <SessionTimeoutModal />
      <OnboardingTour />

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#2C3259] border-b border-[#304A78]">
        <Link to="/hr/dashboard" className="flex items-center gap-2">
          <img src="/theodra-logo.png" alt="THEODRA" className="h-7 w-auto object-contain" />
          <span className="font-serif text-sm tracking-wide text-[#F4F1EB]">THEODRA</span>
        </Link>
        <div className="flex items-center gap-2">
          <NotificationBell />
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 text-[#F4F1EB] hover:text-[#DDA162]"
            aria-label="Toggle Navigation"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Persistent Left Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-[#2C3259] border-r border-[#304A78] flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Top Header with Wordmark */}
          <div className="px-5 py-5 border-b border-[#304A78] flex items-center justify-between">
            <Link to="/hr/dashboard" className="flex items-center gap-3">
              <img
                src="/theodra-logo.png"
                alt="THEODRA Logo"
                className="h-8 w-auto object-contain"
              />
              <div>
                <span className="font-serif text-base font-bold tracking-wider text-[#F4F1EB] block leading-none">
                  THEODRA
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#DDA162] block mt-1 font-semibold">
                  HR Admin Console
                </span>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-[#A87C56] hover:text-[#F4F1EB]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Aggregate-Only Privacy Notice */}
          <div className="mx-3 mt-3 px-3 py-2 bg-[#0A0E28]/60 border border-[#304A78] flex items-start gap-2">
            <Lock className="w-3.5 h-3.5 text-[#DDA162] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#A87C56] leading-tight">
              Statutory separation: HR view is restricted to aggregate compliance data. Zero case/report content accessible.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-0.5 overflow-y-auto max-h-[calc(100vh-270px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-[#0A0E28] text-[#DDA162] border-l-2 border-[#DDA162]"
                        : "text-[#F4F1EB] hover:bg-[#304A78]/50 hover:text-[#DDA162]"
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="text-[10px] bg-[#EBBA4A] text-[#0A0E28] font-bold px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Logged in User info + Logout */}
        <div className="p-3 border-t border-[#304A78] bg-[#0A0E28]/50">
          <div className="px-2 py-2 mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-[#F4F1EB] truncate block max-w-[130px]">
                {user?.name || "Rajesh Menon"}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 bg-[#304A78] text-[#DDA162] font-semibold">
                HR Admin
              </span>
            </div>
            <span className="text-[11px] text-[#A87C56] block truncate">
              {user?.title || "VP People & Compliance"}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 border border-[#304A78] text-xs text-[#F4F1EB] hover:bg-[#304A78] hover:text-[#DDA162] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Top Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-3.5 bg-[#2C3259] border-b border-[#304A78]">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-3 px-3 py-1.5 bg-[#0A0E28] border border-[#304A78] text-xs text-[#A87C56] hover:border-[#DDA162] transition-colors w-72"
            >
              <Search className="w-3.5 h-3.5 text-[#DDA162]" />
              <span>Search policies, audits, exports...</span>
              <kbd className="ml-auto text-[10px] px-1.5 py-0.5 bg-[#2C3259] border border-[#304A78] text-[#F4F1EB]">
                ⌘K
              </kbd>
            </button>
            <div className="flex items-center gap-2 text-xs text-[#A87C56]">
              <span className="font-semibold text-[#F4F1EB]">Meridian Technologies Pvt. Ltd.</span>
              <span>•</span>
              <span className="text-[#DDA162]">FY 2025-26 Compliance</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs font-semibold text-[#F4F1EB] block leading-tight">
                {user?.name || "Rajesh Menon"}
              </span>
              <span className="text-[10px] text-[#A87C56]">HR Admin Console</span>
            </div>
            <NotificationBell />
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
