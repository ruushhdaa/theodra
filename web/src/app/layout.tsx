import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import BriefingModal from "@/components/BriefingModal";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "THEODRA — Privacy-Preserving Workplace Harassment Early-Warning System",
  description:
    "An early-warning system for Internal Committees under the Indian POSH Act. Notices communication patterns correlated with harassment without reading message content.",
  keywords: [
    "POSH Act",
    "workplace harassment",
    "Internal Committee",
    "employee safety",
    "privacy-preserving early warning",
    "human resources compliance",
    "India",
  ],
  authors: [{ name: "Rushda Jagtap" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${jakarta.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <BriefingModal />
      </body>
    </html>
  );
}
