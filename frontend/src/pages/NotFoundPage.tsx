import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-[#0A0E28] text-[#F4F1EB]">
      <div className="max-w-md w-full bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-8 text-center shadow-2xl">
        <div className="w-14 h-14 bg-[#0E1438] border border-[#262E5F] rounded-2xl mx-auto flex items-center justify-center mb-6">
          <AlertCircle className="w-7 h-7 text-[#DDA162]" />
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-[#DDA162]">
          Error 404
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-2 mb-3">
          This page doesn't exist.
        </h1>
        <p className="font-serif text-sm text-[#A87C56] leading-relaxed mb-6">
          The requested statutory resource, cohort pattern, or report endpoint could not be located or has been archived.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-semibold rounded-xl hover:bg-[#EBBA4A] transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-5 py-2.5 border border-[#262E5F] text-[#F4F1EB] text-xs font-semibold rounded-xl hover:bg-[#262E5F] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};
