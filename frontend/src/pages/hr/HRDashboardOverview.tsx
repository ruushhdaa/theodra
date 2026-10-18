import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ShieldCheck,
  HeartPulse,
  Users,
  FileText,
  Eye,
  Download,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react";
import {
  MOCK_ORG_HEALTH_SCORE,
  MOCK_ANNUAL_REPORT_DATA,
  MOCK_IC_ROSTER,
} from "../../data/mockData";
import { CardSkeleton } from "../../components/SkeletonLoader";

export const HRDashboardOverview: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 bg-[#2C3259] skeleton-shimmer" />
        <CardSkeleton count={5} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Banner: Organisation Name, Reporting Period, Compliance Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#304A78]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-3xl font-bold text-[#F4F1EB]">
              Meridian Technologies Pvt. Ltd.
            </h1>
            <span className="text-[10px] bg-[#304A78] text-[#DDA162] font-semibold px-2.5 py-0.5 uppercase tracking-wider">
              Statutory Compliance Active
            </span>
          </div>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            Corporate HR & Statutory Governance Oversight • Financial Year 2025–26 (Q4 Active)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/hr/report-generator"
            className="px-4 py-2 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors shadow-md"
          >
            Annual Report
          </Link>
          <Link
            to="/hr/exports"
            className="px-4 py-2 border border-[#304A78] text-[#F4F1EB] text-xs font-semibold hover:bg-[#2C3259] transition-colors"
          >
            Compliance Pack
          </Link>
        </div>
      </div>

      {/* Overdue actions alert banner if any exist */}
      <div className="p-4 bg-[#2C3259] border-2 border-[#EBBA4A] flex items-start justify-between gap-3 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="p-1 bg-[#0A0E28] text-[#EBBA4A]">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-sm font-bold text-[#EBBA4A]">
              Statutory Attention Required: 1 Inquiry Beyond 90 Days
            </h4>
            <p className="text-xs text-[#F4F1EB] mt-0.5 leading-relaxed">
              Internal records flag 1 matter running beyond the 90-day ceiling due to witness medical delay. Reconcile with draft Board Report figures in Statutory Disclosures.
            </p>
          </div>
        </div>
        <Link
          to="/hr/disclosure"
          className="px-3.5 py-1.5 bg-[#EBBA4A] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#DDA162] transition-colors shrink-0 self-center"
        >
          Reconcile Now
        </Link>
      </div>

      {/* Stat Row: Total Reports Filed / Active Cases / Avg Resolution Time / Training Completion Rate / Compliance Score */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Total Reports Filed */}
        <div className="bg-[#2C3259] border border-[#304A78] p-4">
          <span className="text-[10px] uppercase tracking-wider text-[#A87C56] font-semibold block">
            Total Reports Filed
          </span>
          <div className="font-serif text-2xl font-bold text-[#F4F1EB] mt-1.5">6</div>
          <span className="text-[10px] text-[#DDA162] mt-1 block">FY 2025–26 cumulative</span>
        </div>

        {/* Active Cases */}
        <div className="bg-[#2C3259] border border-[#304A78] p-4">
          <span className="text-[10px] uppercase tracking-wider text-[#A87C56] font-semibold block">
            Active Cases
          </span>
          <div className="font-serif text-2xl font-bold text-[#F4F1EB] mt-1.5">2</div>
          <span className="text-[10px] text-[#A87C56] mt-1 block">Under IC examination</span>
        </div>

        {/* Avg Resolution Time */}
        <div className="bg-[#2C3259] border border-[#304A78] p-4">
          <span className="text-[10px] uppercase tracking-wider text-[#A87C56] font-semibold block">
            Avg Resolution Time
          </span>
          <div className="font-serif text-2xl font-bold text-[#F4F1EB] mt-1.5">58 Days</div>
          <span className="text-[10px] text-[#DDA162] mt-1 block">Within 90-day ceiling</span>
        </div>

        {/* Training Completion Rate */}
        <div className="bg-[#2C3259] border border-[#304A78] p-4">
          <span className="text-[10px] uppercase tracking-wider text-[#A87C56] font-semibold block">
            Training Rate
          </span>
          <div className="font-serif text-2xl font-bold text-[#F4F1EB] mt-1.5">94.2%</div>
          <span className="text-[10px] text-[#DDA162] mt-1 block">1,420 of 1,507 staff</span>
        </div>

        {/* Compliance Score */}
        <div className="bg-[#2C3259] border border-[#304A78] p-4">
          <span className="text-[10px] uppercase tracking-wider text-[#A87C56] font-semibold block">
            Health Index
          </span>
          <div className="font-serif text-2xl font-bold text-[#DDA162] mt-1.5">67 / 100</div>
          <span className="text-[10px] text-[#A87C56] mt-1 block">+3% vs last quarter</span>
        </div>
      </div>

      {/* Two Panels: Left (Health Score Radial Gauge) & Right (Quick Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Left Panel: Organisation Health Score (6 cols) */}
        <div className="lg:col-span-6 bg-[#2C3259] border border-[#304A78] p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#304A78] mb-4">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-[#DDA162]" />
                <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
                  Organisation Health Score
                </h3>
              </div>
              <Link to="/hr/health" className="text-xs text-[#DDA162] hover:underline flex items-center gap-1">
                <span>Detailed Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 py-2">
              {/* Circular Radial Score Display (Flat fills only, no gradients) */}
              <div className="relative w-36 h-36 rounded-full bg-[#0A0E28] border-4 border-[#DDA162] flex flex-col items-center justify-center shrink-0">
                <span className="font-serif text-4xl font-bold text-[#EBBA4A]">67</span>
                <span className="text-[11px] uppercase tracking-wider text-[#A87C56]">out of 100</span>
              </div>

              {/* Sub-scores Listed */}
              <div className="flex-1 w-full space-y-2.5 text-xs">
                {MOCK_ORG_HEALTH_SCORE.subScores.map((sub) => (
                  <div key={sub.name} className="flex items-center justify-between">
                    <span className="text-[#F4F1EB] font-medium">{sub.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-[#DDA162]">{sub.score}/100</span>
                      <span className="text-[10px] text-[#A87C56] w-10 text-right">{sub.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#304A78] text-[11px] text-[#A87C56] flex items-center justify-between">
            <span>Score calculation integrates reporting culture, resolution velocity, and training completeness.</span>
          </div>
        </div>

        {/* Right Panel: Quick Actions (4 cols) */}
        <div className="lg:col-span-4 bg-[#2C3259] border border-[#304A78] p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-[#304A78] mb-4">
              <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
                Executive Actions
              </h3>
            </div>

            <div className="space-y-3">
              <Link
                to="/hr/report-generator"
                className="w-full p-3 bg-[#0A0E28] border border-[#304A78] hover:border-[#DDA162] text-xs font-semibold text-[#F4F1EB] flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#DDA162]" />
                  <span>Generate Annual POSH Report</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A87C56] group-hover:text-[#DDA162]" />
              </Link>

              <Link
                to="/hr/audit"
                className="w-full p-3 bg-[#0A0E28] border border-[#304A78] hover:border-[#DDA162] text-xs font-semibold text-[#F4F1EB] flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Eye className="w-4 h-4 text-[#DDA162]" />
                  <span>View Tamper-Evident Audit Log</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A87C56] group-hover:text-[#DDA162]" />
              </Link>

              <Link
                to="/hr/roster"
                className="w-full p-3 bg-[#0A0E28] border border-[#304A78] hover:border-[#DDA162] text-xs font-semibold text-[#F4F1EB] flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-[#DDA162]" />
                  <span>Manage IC Roster & Training</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A87C56] group-hover:text-[#DDA162]" />
              </Link>

              <Link
                to="/hr/exports"
                className="w-full p-3 bg-[#0A0E28] border border-[#304A78] hover:border-[#DDA162] text-xs font-semibold text-[#F4F1EB] flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-[#DDA162]" />
                  <span>Export Compliance Pack (PDF/CSV)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A87C56] group-hover:text-[#DDA162]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
