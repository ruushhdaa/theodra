import React from "react";
import { HeartPulse, ArrowUp, ArrowDown, TrendingUp, ShieldCheck } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MOCK_ORG_HEALTH_SCORE } from "../../data/mockData";

export const HRHealthPage: React.FC = () => {
  const data = MOCK_ORG_HEALTH_SCORE;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262E5F]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
            Workforce Safety & Climate Index
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            Organisation Health Score
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            Holistic corporate score synthesized across reporting frequency, resolution velocity, and policy currency.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-[#0A0E28] px-3.5 py-2 border border-[#262E5F] rounded-xl text-[#DDA162]">
          <HeartPulse className="w-4 h-4" />
          <span>Quarterly Assessment Pulse</span>
        </div>
      </div>

      {/* Large Gauge / Radial Score Hero */}
      <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          {/* Radial Gauge Display */}
          <div className="relative w-40 h-40 rounded-full bg-[#0E1438] border-8 border-[#DDA162] flex flex-col items-center justify-center shrink-0 shadow-lg">
            <span className="font-serif text-5xl font-bold text-[#EBBA4A]">
              {data.overallScore}
            </span>
            <span className="text-xs uppercase tracking-wider text-[#A87C56] font-semibold mt-1">
              out of 100
            </span>
          </div>

          <div>
            <span className="text-xs font-mono text-[#DDA162] font-semibold uppercase">
              Current Evaluation: Q4 FY25–26
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#F4F1EB] mt-1">
              Workplace Climate: Moderate Health
            </h2>
            <p className="font-serif text-xs text-[#A87C56] mt-2 max-w-md leading-relaxed">
              Your overall score of 67 reflects solid training coverage and prompt initial committee response, tempered by an under-reporting index in technical teams.
            </p>
          </div>
        </div>

        <div className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl text-xs text-right space-y-1">
          <span className="text-[#A87C56] block">Trend vs Q3 FY25–26:</span>
          <span className="font-serif text-xl font-bold text-[#EBBA4A] flex items-center justify-end gap-1">
            <ArrowUp className="w-4 h-4 text-[#EBBA4A]" /> +3 Points
          </span>
          <span className="text-[11px] text-[#A87C56] block">Consistently improving</span>
        </div>
      </div>

      {/* 5 Sub-Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.subScores.map((sub) => {
          const isUp = sub.trend.startsWith("+");
          const isNeutral = sub.trend === "0%";

          return (
            <div
              key={sub.name}
              className="bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F] hover:border-[#DDA162] rounded-xl p-4 flex flex-col justify-between transition-all shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#F4F1EB] group-hover:text-[#DDA162] transition-colors">{sub.name}</span>
                  <div
                    className={`text-[10px] font-mono font-bold flex items-center gap-0.5 ${
                      isUp ? "text-[#EBBA4A]" : isNeutral ? "text-[#A87C56]" : "text-[#DDA162]"
                    }`}
                  >
                    {isUp ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : isNeutral ? null : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                    <span>{sub.trend}</span>
                  </div>
                </div>

                <div className="font-serif text-3xl font-bold text-[#DDA162] my-2">
                  {sub.score}
                  <span className="text-xs text-[#A87C56] font-normal"> / 100</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#262E5F] text-[11px] text-[#A87C56] leading-tight font-serif">
                {sub.interpretation}
              </div>
            </div>
          );
        })}
      </div>

      {/* Historical Trend Line Chart (4 Quarters) */}
      <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="pb-3 border-b border-[#262E5F] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#DDA162]" />
            <h3 className="font-serif text-base font-bold text-[#F4F1EB]">
              Historical Health Score Progression (Trailing 4 Quarters)
            </h3>
          </div>
          <span className="text-xs text-[#A87C56]">Quarterly trailing index</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.history} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid stroke="#262E5F" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="quarter" stroke="#A87C56" fontSize={11} tickLine={false} />
              <YAxis domain={[50, 80]} stroke="#A87C56" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0A0E28",
                  borderColor: "#262E5F",
                  borderRadius: "0.75rem",
                  fontSize: "11px",
                  color: "#F4F1EB",
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                name="Health Score"
                stroke="#DDA162"
                strokeWidth={3}
                dot={{ fill: "#EBBA4A", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
