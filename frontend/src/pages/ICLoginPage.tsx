import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const ICLoginPage: React.FC = () => {
  const [email, setEmail] = useState("ic@theodra.demo");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(async () => {
      const res = await login(email, password);
      setLoading(false);
      if (res.success) {
        navigate("/ic/dashboard");
      } else {
        setError(res.error || "Invalid credentials for IC Member Portal.");
      }
    }, 400);
  };

  const handleUseDemo = () => {
    setEmail("ic@theodra.demo");
    setPassword("demo1234");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0E28] text-[#F4F1EB] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* THEODRA Logo Centered */}
        <Link to="/" className="inline-block group mb-4">
          <img
            src="/theodra-logo.png"
            alt="THEODRA Logo"
            className="h-16 w-auto mx-auto object-contain rounded-xl transition-transform group-hover:scale-105"
          />
        </Link>
        <span className="font-mono text-xs uppercase tracking-widest text-[#DDA162] block">
          Internal Committee Portal
        </span>
        <h1 className="font-serif text-2xl font-bold text-[#F4F1EB] mt-2">
          Statutory IC Member Login
        </h1>
        <p className="font-serif text-xs text-[#A87C56] mt-1 max-w-xs mx-auto">
          Confidential access for Presiding Officers, Internal Members, and External Experts under POSH Act 2013.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="mb-5 p-3.5 bg-amber-950/40 border border-[#EBBA4A] text-[#EBBA4A] text-xs rounded-xl flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#F4F1EB] mb-1.5">
                Official Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ic@theodra.demo"
                  className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl px-3.5 py-2.5 text-xs text-[#F4F1EB] placeholder-[#A87C56] focus:outline-none focus:border-[#DDA162]"
                />
                <Mail className="w-4 h-4 text-[#A87C56] absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F4F1EB] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0E1438] border border-[#262E5F] rounded-xl px-3.5 py-2.5 text-xs text-[#F4F1EB] placeholder-[#A87C56] focus:outline-none focus:border-[#DDA162]"
                />
                <Lock className="w-4 h-4 text-[#A87C56] absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-[#DDA162] text-[#0A0E28] text-xs font-bold tracking-wider uppercase hover:bg-[#EBBA4A] rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md"
            >
              {loading ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <span>Sign In as IC Member</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Visible Hint Box Below Form */}
          <div className="mt-6 pt-5 border-t border-[#262E5F]">
            <div className="bg-[#0E1438] border border-[#262E5F] rounded-xl p-3.5 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-[#DDA162] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Demo Credentials
                </span>
                <button
                  type="button"
                  onClick={handleUseDemo}
                  className="text-[11px] text-[#EBBA4A] hover:underline cursor-pointer font-semibold"
                >
                  Auto-fill
                </button>
              </div>
              <div className="space-y-1 font-mono text-[11px] text-[#A87C56]">
                <p>Email: <span className="text-[#F4F1EB]">ic@theodra.demo</span></p>
                <p>Password: <span className="text-[#F4F1EB]">demo1234</span></p>
              </div>
            </div>

            <div className="mt-4 text-center space-y-2">
              <Link
                to="/hr/login"
                className="text-xs text-[#A87C56] hover:text-[#DDA162] transition-colors block"
              >
                Need HR Admin Console instead? Switch to HR Login →
              </Link>
              <Link
                to="/employee/dashboard"
                className="text-xs text-[#EBBA4A] hover:underline transition-colors block"
              >
                Looking for Employee Portal? Go to Employee Dashboard →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
