"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { openBriefingModal } from "./BriefingModal";

const NAV_LINKS = [
  { href: "/",           label: "Home" },
  { href: "/problem",    label: "The Problem" },
  { href: "/system",     label: "How It Works" },
  { href: "/privacy",    label: "Privacy & Trust" },
  { href: "/report",     label: "For Employees" },
  { href: "/dashboard",  label: "For HR & IC" },
  { href: "/about",      label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-14 bg-navy border-b border-midblue/50 flex items-center px-4 sm:px-6 lg:px-10">
      {/* Wordmark Left */}
      <Link
        href="/"
        className="font-serif text-base font-bold text-text tracking-tight shrink-0 select-none mr-6 lg:mr-8"
        aria-label="THEODRA — Return to home"
      >
        THE<span className="text-gold">O</span>DRA
      </Link>

      {/* Desktop Tabs Center / Right */}
      <nav className="hidden xl:flex items-center gap-1 flex-1" aria-label="Primary navigation">
        {NAV_LINKS.map(({ href, label }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={[
                "font-sans text-xs font-medium tracking-normal px-2.5 py-1.5 transition-colors whitespace-nowrap",
                active
                  ? "text-text border-b-2 border-gold pb-1"
                  : "text-text-muted hover:text-text-sec",
              ].join(" ")}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Compact nav for tablet screens */}
      <nav className="hidden md:flex xl:hidden items-center gap-1 flex-1" aria-label="Tablet navigation">
        {NAV_LINKS.slice(0, 5).map(({ href, label }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={[
                "font-sans text-[11px] font-medium px-2 py-1 transition-colors whitespace-nowrap",
                active ? "text-text" : "text-text-muted hover:text-text-sec",
              ].join(" ")}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Right CTA Button using Gold accent sparingly */}
      <div className="ml-auto flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={openBriefingModal}
          className="font-sans text-xs font-medium bg-gold text-dark px-4 py-1.5 hover:bg-gold/90 transition-colors cursor-pointer"
          style={{ borderRadius: "2px" }}
        >
          Talk to us
        </button>

        {/* Mobile toggle button (small screens only) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-text-muted hover:text-text p-1.5 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 bg-navy border-b border-midblue/60 p-4 shadow-xl flex flex-col gap-2">
          {NAV_LINKS.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={[
                  "font-sans text-sm font-medium px-3 py-2 transition-colors",
                  active ? "text-gold bg-dark/40" : "text-text-sec hover:text-text",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
