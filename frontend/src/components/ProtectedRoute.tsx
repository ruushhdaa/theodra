import React from "react";
import { Navigate, useLocation, Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    const isIC = location.pathname.startsWith("/ic");
    const loginTarget = isIC ? "/ic/login" : "/hr/login";
    return <Navigate to={`${loginTarget}?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Real enforcement: check if user's role is permitted on this route
  if (!allowedRoles.includes(user.role)) {
    const isTryingToAccessIC = location.pathname.startsWith("/ic");
    const isTryingToAccessHR = location.pathname.startsWith("/hr");

    return (
      <div className="min-h-screen bg-[#0A0E28] flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-[#0A0E28] border border-[#262E5F] p-8 text-center rounded-2xl shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-[#0E1438] border border-[#262E5F] flex items-center justify-center mx-auto mb-5 text-[#EBBA4A]">
            <Lock className="w-6 h-6 text-[#DDA162]" />
          </div>

          <span className="font-sans text-[11px] font-semibold tracking-[0.14em] uppercase text-[#DDA162] block mb-2">
            Statutory Access Control
          </span>

          <h1 className="font-serif text-2xl font-bold text-[#F4F1EB] mb-3">
            Not Authorized for This Role
          </h1>

          <p className="font-sans text-sm text-[#F4F1EB]/80 leading-relaxed mb-6">
            You are currently authenticated as <strong className="text-[#F4F1EB]">{user.name}</strong> with the role of{" "}
            <span className="text-[#DDA162] font-semibold">{user.role}</span>.
            {isTryingToAccessIC && (
              <span> Under Section 16 of India&apos;s POSH Act, case-level pattern and investigation data is cryptographically restricted to appointed Internal Committee members. Corporate HR Administrators are strictly legally barred from reviewing case investigations or anonymous reports.</span>
            )}
            {isTryingToAccessHR && (
              <span> The administrative configuration console is reserved for HR System Administrators.</span>
            )}
          </p>

          <div className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl mb-6 text-left">
            <div className="flex items-center gap-2 font-sans text-xs font-semibold text-[#DDA162] mb-1">
              <ShieldAlert className="w-4 h-4 text-[#EBBA4A]" />
              Role Enforcement in Action
            </div>
            <p className="font-sans text-xs text-[#A87C56] leading-relaxed">
              Required role for this view:{" "}
              <span className="text-[#F4F1EB] font-medium">{allowedRoles.join(" or ")}</span>. Your session role does not have authorization.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {user.role === "HR Admin" && isTryingToAccessIC && (
              <button
                type="button"
                onClick={() => {
                  switchRole("IC Member");
                  navigate("/ic/dashboard");
                }}
                className="w-full sm:w-auto font-sans text-xs font-medium bg-[#EBBA4A] text-[#0A0E28] px-5 py-2.5 rounded-xl hover:bg-[#DDA162] transition-colors flex items-center justify-center gap-2 cursor-pointer font-semibold shadow-md"
              >
                Switch to IC Member Role <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {user.role === "IC Member" && isTryingToAccessHR && (
              <button
                type="button"
                onClick={() => {
                  switchRole("HR Admin");
                  navigate("/hr/dashboard");
                }}
                className="w-full sm:w-auto font-sans text-xs font-medium bg-[#EBBA4A] text-[#0A0E28] px-5 py-2.5 rounded-xl hover:bg-[#DDA162] transition-colors flex items-center justify-center gap-2 cursor-pointer font-semibold shadow-md"
              >
                Switch to HR Admin Role <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {user.role === "Employee" && (
              <Link
                to="/report"
                className="w-full sm:w-auto font-sans text-xs font-medium bg-[#EBBA4A] text-[#0A0E28] px-5 py-2.5 rounded-xl hover:bg-[#DDA162] transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                Go to Anonymous Reporting Portal
              </Link>
            )}

            <Link
              to={user.role === "IC Member" ? "/ic/dashboard" : user.role === "HR Admin" ? "/hr/dashboard" : "/"}
              className="w-full sm:w-auto font-sans text-xs font-medium border border-[#262E5F] text-[#F4F1EB]/80 hover:text-[#F4F1EB] hover:bg-[#262E5F] px-5 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
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
