import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, User, Shield, ArrowRightLeft, Home, Settings, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const UserProfileMenu: React.FC = () => {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSwitchToOtherRole = () => {
    if (user?.role === "IC Member") {
      switchRole("HR Admin");
      navigate("/hr/dashboard");
    } else {
      switchRole("IC Member");
      navigate("/ic/dashboard");
    }
    setIsOpen(false);
  };

  const name = user?.name || "Dr. Sunita Rao";
  const title = user?.title || "Presiding Officer, Internal Committee";
  const role = user?.role || "IC Member";
  const email = user?.email || "ic@theodra.demo";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-1.5 rounded-lg border border-transparent hover:border-[#262E5F] hover:bg-[#262E5F] transition-all text-left cursor-pointer group"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full bg-[#11173D] border border-[#262E5F] group-hover:border-[#DDA162] text-[#DDA162] flex items-center justify-center font-bold text-xs tracking-wider transition-colors shrink-0">
          {initials}
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-[#F4F1EB] group-hover:text-[#DDA162] block leading-tight transition-colors">
            {name}
          </span>
          <span className="text-[10px] text-[#A87C56] block leading-tight">
            {role === "IC Member" ? "POSH Act Statutory Panel" : "Corporate Administration"}
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#A87C56] transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#DDA162]" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-64 bg-[#0A0E28] border border-[#262E5F] rounded-xl shadow-2xl z-50 overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User Header */}
          <div className="px-4 py-3 border-b border-[#262E5F]/80 bg-[#0E1438]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[#F4F1EB] truncate">{name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1A2250] text-[#DDA162] font-semibold border border-[#262E5F]">
                {role}
              </span>
            </div>
            <p className="text-[11px] text-[#A87C56] truncate mb-0.5">{title}</p>
            <p className="text-[10px] text-[#DDA162]/80 font-mono truncate">{email}</p>
          </div>

          {/* Quick Actions */}
          <div className="py-1">
            <button
              type="button"
              onClick={handleSwitchToOtherRole}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#F4F1EB] hover:bg-[#262E5F] hover:text-[#DDA162] transition-colors cursor-pointer text-left"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-[#DDA162]" />
              <span>
                Switch to {role === "IC Member" ? "HR Admin Console" : "IC Member Portal"}
              </span>
            </button>

            <Link
              to="/employee/dashboard"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#F4F1EB] hover:bg-[#262E5F] hover:text-[#DDA162] transition-colors cursor-pointer text-left"
            >
              <Shield className="w-3.5 h-3.5 text-[#EBBA4A]" />
              <span>View Employee Portal</span>
            </Link>

            <Link
              to={role === "IC Member" ? "/ic/settings" : "/hr/settings"}
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#F4F1EB] hover:bg-[#262E5F] hover:text-[#DDA162] transition-colors cursor-pointer text-left"
            >
              <Settings className="w-3.5 h-3.5 text-[#A87C56]" />
              <span>Account & Security Settings</span>
            </Link>

            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#F4F1EB] hover:bg-[#262E5F] hover:text-[#DDA162] transition-colors cursor-pointer text-left"
            >
              <Home className="w-3.5 h-3.5 text-[#A87C56]" />
              <span>Return to Public Homepage</span>
            </Link>
          </div>

          {/* Logout Section */}
          <div className="pt-1 mt-1 border-t border-[#262E5F]/80">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-rose-400 hover:bg-[#262E5F] hover:text-rose-300 transition-colors cursor-pointer text-left"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Log out of session</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
