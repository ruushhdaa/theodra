import React from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserRole } from "../data/mockData";
import { ShieldAlert, ArrowLeft, ArrowRight, Lock } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, switchRole } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Real enforcement: check if user's role is permitted on this route
  if (!allowedRoles.includes(user.role)) {
    const isTryingToAccessIC = location.pathname.includes("/dashboard/ic");
    const isTryingToAccessAdmin = location.pathname.includes("/dashboard/admin");

    return (
      <div className="min-h-screen bg-[#0A0E28] flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-[#13193A] border border-[#262E5F] p-8 text-center rounded-[8px] shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-[#4E182A] border border-[#E0A96D]/30 flex items-center justify-center mx-auto mb-5 text-[#F0B83A]">
            <Lock className="w-6 h-6 text-[#E0A96D]" />
          </div>

          <span className="font-sans text-[11px] font-semibold tracking-[0.14em] uppercase text-[#E0A96D] block mb-2">
            Statutory Access Control
          </span>

          <h1 className="font-serif text-2xl font-bold text-[#F4F1EB] mb-3">
            Not Authorized for This Role
          </h1>

          <p className="font-sans text-sm text-[#BDB9AD] leading-relaxed mb-6">
            You are currently authenticated as <strong className="text-[#F4F1EB]">{user.name}</strong> with the role of{" "}
            <span className="text-[#E0A96D] font-semibold">{user.role}</span>.
            {isTryingToAccessIC && (
              <span> Under Section 16 of India&apos;s POSH Act, case-level pattern data is cryptographically restricted to appointed Internal Committee members. Corporate HR Administrators are legally barred from reviewing case investigations.</span>
            )}
            {isTryingToAccessAdmin && (
              <span> The administrative configuration console is reserved for HR System Administrators.</span>
            )}
          </p>

          <div className="p-4 bg-[#0A0E28] border border-[#1D244C] rounded-[6px] mb-6 text-left">
            <div className="flex items-center gap-2 font-sans text-xs font-semibold text-[#E0A96D] mb-1">
              <ShieldAlert className="w-4 h-4 text-[#F0B83A]" />
              Role Enforcement in Action
            </div>
            <p className="font-sans text-xs text-[#7A756B] leading-relaxed">
              Required role for this view:{" "}
              <span className="text-[#F4F1EB] font-medium">{allowedRoles.join(" or ")}</span>. Your session role does not have authorization.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {user.role === "HR Admin" && isTryingToAccessIC && (
              <button
                type="button"
                onClick={() => switchRole("IC Member")}
                className="w-full sm:w-auto font-sans text-xs font-medium bg-[#F0B83A] text-[#0A0E28] px-5 py-2.5 rounded-[6px] hover:bg-[#F0B83A]/90 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Switch to IC Member Role <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {user.role === "IC Member" && isTryingToAccessAdmin && (
              <button
                type="button"
                onClick={() => switchRole("HR Admin")}
                className="w-full sm:w-auto font-sans text-xs font-medium bg-[#F0B83A] text-[#0A0E28] px-5 py-2.5 rounded-[6px] hover:bg-[#F0B83A]/90 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Switch to HR Admin Role <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {user.role === "Employee" && (
              <Link
                to="/report"
                className="w-full sm:w-auto font-sans text-xs font-medium bg-[#F0B83A] text-[#0A0E28] px-5 py-2.5 rounded-[6px] hover:bg-[#F0B83A]/90 transition-colors flex items-center justify-center gap-2"
              >
                Go to Anonymous Reporting Portal
              </Link>
            )}

            <Link
              to={user.role === "IC Member" ? "/dashboard/ic" : user.role === "HR Admin" ? "/dashboard/admin" : "/"}
              className="w-full sm:w-auto font-sans text-xs font-medium border border-[#262E5F] text-[#BDB9AD] hover:text-[#F4F1EB] px-5 py-2.5 rounded-[6px] transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to My Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
