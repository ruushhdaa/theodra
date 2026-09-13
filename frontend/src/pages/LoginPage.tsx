import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserRole, DEMO_USERS } from "../data/mockData";
import { Shield, User, Lock, ArrowRight, CheckCircle } from "lucide-react";

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "";
  const navigate = useNavigate();
  const { login } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>("IC Member");
  const [email, setEmail] = useState(DEMO_USERS["IC Member"].email);
  const [password, setPassword] = useState("••••••••••••");

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(DEMO_USERS[role].email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);

    if (redirectUrl) {
      navigate(redirectUrl);
    } else {
      if (selectedRole === "IC Member") {
        navigate("/dashboard/ic");
      } else if (selectedRole === "HR Admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/report");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E28] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 select-none mb-4">
            <img
              src="/theodra-logo.png"
              alt="THEODRA Logo"
              className="h-10 w-auto object-contain rounded-[4px]"
            />
            <span className="font-serif text-2xl font-bold text-[#E0A96D]">
              THE<span className="text-[#F0B83A]">O</span>DRA
            </span>
          </Link>
          <h1 className="font-serif text-2xl font-bold text-[#F4F1EB] mb-1">
            Enterprise Portal Login
          </h1>
          <p className="font-sans text-xs text-[#BDB9AD]">
            Select your persona below to experience role-based access enforcement.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#13193A] border border-[#262E5F] p-6 sm:p-8 rounded-[8px] shadow-2xl">
          {/* Role Selector Tabs (Role-Based Demo) */}
          <div className="mb-6">
            <label className="block font-sans text-[11px] font-semibold uppercase tracking-wider text-[#7A756B] mb-2">
              Select Demo Persona (Stores in State)
            </label>
            <div className="grid grid-cols-3 gap-2 bg-[#0A0E28] p-1.5 rounded-[6px] border border-[#262E5F]">
              {(["Employee", "IC Member", "HR Admin"] as UserRole[]).map((r) => {
                const isSelected = selectedRole === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRoleSelect(r)}
                    className={`font-sans text-xs font-semibold py-2 px-2 rounded-[4px] transition-colors cursor-pointer text-center ${
                      isSelected
                        ? "bg-[#F0B83A] text-[#0A0E28] shadow-sm"
                        : "text-[#BDB9AD] hover:text-[#F4F1EB]"
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Persona Explanation Callout */}
          <div className="p-3.5 bg-[#0A0E28] border border-[#1D244C] rounded-[6px] mb-6">
            <div className="flex items-center justify-between text-xs font-medium text-[#E0A96D] mb-1">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#F0B83A]" />
                {DEMO_USERS[selectedRole].name}
              </span>
              <span className="text-[10px] text-[#7A756B] uppercase">
                {DEMO_USERS[selectedRole].role}
              </span>
            </div>
            <p className="font-sans text-[11px] text-[#BDB9AD] leading-relaxed">
              {selectedRole === "IC Member" &&
                "Authorized to view anonymized communication pattern cohorts (5+ threshold) and cast dual-member escalation votes."}
              {selectedRole === "HR Admin" &&
                "Authorized to manage IC member rosters and filing deadlines. Strictly blocked from accessing case content."}
              {selectedRole === "Employee" &&
                "Authorized to submit anonymous incident reports. Has no dashboard access."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-sans text-xs font-medium text-[#BDB9AD] mb-1">
                Enterprise Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0A0E28] border border-[#262E5F] px-3.5 py-2.5 text-sm text-[#F4F1EB] rounded-[6px] focus:outline-none focus:border-[#F0B83A] font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs font-medium text-[#BDB9AD] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0A0E28] border border-[#262E5F] px-3.5 py-2.5 text-sm text-[#F4F1EB] rounded-[6px] focus:outline-none focus:border-[#F0B83A] font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full font-sans text-sm font-semibold bg-[#F0B83A] text-[#0A0E28] py-3 rounded-[6px] hover:bg-[#F0B83A]/90 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              Sign In as {selectedRole} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#1D244C] text-center">
            <Link to="/" className="font-sans text-xs text-[#7A756B] hover:text-[#BDB9AD]">
              ← Return to Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
