import React from "react";
import { BarChart3, HelpCircle, ShieldCheck } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MOCK_PEER_BENCHMARKS } from "../../data/mockData";

export const HRBenchmarksPage: React.FC = () => {
  // Chart data formatted
  const chartData = MOCK_PEER_BENCHMARKS.map((b) => ({
    name: b.metric.length > 20 ? b.metric.substring(0, 18) + "..." : b.metric,
    fullName: b.metric,
    THEODRA: b.theodraOrg,
    "Industry Average": b.industryAvg,
    "Top Quartile": b.topQuartile,
    unit: b.unit,
    tooltip: b.tooltip,
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262E5F]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
            Comparative Industry Telemetry
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            Peer Benchmarks
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            Benchmarking Your Organization vs IT & Technology Sector Average and Top Quartile performers.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-[#0A0E28] px-3.5 py-2 border border-[#262E5F] rounded-xl text-[#DDA162]">
          <BarChart3 className="w-4 h-4" />
          <span>India Tech Sector Cohort</span>
        </div>
      </div>

      {/* Main Bar Chart (Recharts) */}
      <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="pb-3 border-b border-[#262E5F] flex items-center justify-between">
          <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
            Cross-Company Performance Comparison
          </h3>
          <span className="text-xs text-[#A87C56]">Normalized comparative index</span>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid stroke="#262E5F" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="#A87C56" fontSize={11} tickLine={false} />
              <YAxis stroke="#A87C56" fontSize={11} tickLine={false} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-[#0A0E28] border border-[#262E5F] rounded-xl p-3 text-xs shadow-2xl max-w-xs text-[#F4F1EB]">
                        <p className="font-serif font-bold text-[#DDA162] mb-1">{data.fullName}</p>
                        <p className="text-[11px] text-[#A87C56] mb-2 leading-relaxed">{data.tooltip}</p>
                        <div className="space-y-1 font-mono text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-[#DDA162]">Your Org:</span>
                            <span>{data.THEODRA} {data.unit}</span>
                          </div>
                          <div className="flex justify-between text-[#A87C56]">
                            <span>Industry Avg:</span>
                            <span>{data["Industry Average"]} {data.unit}</span>
                          </div>
                          <div className="flex justify-between text-[#EBBA4A]">
                            <span>Top Quartile:</span>
                            <span>{data["Top Quartile"]} {data.unit}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                formatter={(val) => <span className="text-[#F4F1EB]">{val}</span>}
              />
              <Bar dataKey="THEODRA" fill="#DDA162" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Industry Average" fill="#262E5F" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Top Quartile" fill="#EBBA4A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Numerical Data Table */}
      <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 bg-[#0E1438] border-b border-[#262E5F]">
          <h3 className="font-serif text-sm font-bold text-[#F4F1EB]">
            Benchmark Metrics Detailed Table
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0A0E28] border-b border-[#262E5F] text-[#A87C56] uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Metric</th>
                <th className="py-3.5 px-4 text-[#DDA162]">Your Organization</th>
                <th className="py-3.5 px-4">Industry Average</th>
                <th className="py-3.5 px-4">Top Quartile (P75)</th>
                <th className="py-3.5 px-4">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262E5F]/60">
              {MOCK_PEER_BENCHMARKS.map((row) => (
                <tr key={row.metric} className="hover:bg-[#262E5F] transition-colors cursor-pointer group">
                  <td className="py-3.5 px-4 font-semibold text-[#F4F1EB] group-hover:text-[#DDA162]">
                    {row.metric}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#DDA162]">
                    {row.theodraOrg} {row.unit}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#A87C56]">
                    {row.industryAvg} {row.unit}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#EBBA4A]">
                    {row.topQuartile} {row.unit}
                  </td>
                  <td className="py-3.5 px-4 text-[#A87C56] max-w-md leading-relaxed">
                    {row.tooltip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
