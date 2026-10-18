import React from "react";
import { Outlet } from "react-router-dom";
import { PublicNavbar } from "./PublicNavbar";
import { PublicFooter } from "./PublicFooter";
import { CookieBanner } from "./CookieBanner";

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0E28] text-[#F4F1EB]">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
      <CookieBanner />
    </div>
  );
};
