import React, { useState } from "react";
import { Map, TrendingUp, TrendingDown, Users, ShieldCheck, ArrowRight } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MOCK_DEPARTMENT_HEATMAP, DepartmentHeatmapItem } from "../../data/mockData";

export const HRHeatmapPage: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentHeatmapItem[]>(MOCK_DEPARTMENT_HEATMAP);
  const [selectedDept, setSelectedDept] = useState<DepartmentHeatmapItem>(MOCK_DEPARTMENT_HEATMAP[0]);

  // Mini-chart historical points for side panel
  const miniChartData = selectedDept.miniHistory.map((val, idx) => ({
    week: `Wk ${idx + 1}`,
    score: val,
  }));

  // Color mapping based on palette
  const getBadgeColor = (score: number) => {
    if (score >= 80) return "bg-[#304A78] text-[#F4F1EB] border-[#304A78]"; // Healthy
    if (score >= 70) return "bg-[#2C3259] text-[#DDA162] border-[#DDA162]"; // Stable
    if (score >= 50) return "bg-amber-950/60 text-[#EBBA4A] border-[#EBBA4A]"; // Attention
    return "bg-amber-950 text-[#EBBA4A] border-[#EBBA4A]"; // Critical
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#304A78]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
            Anonymized Voluntary Pulse Telemetry
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            Department Wellness Heatmap
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            Aggregated voluntary workplace safety ratings across organizational divisions.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-[#2C3259] px-3.5 py-2 border border-[#304A78] text-[#DDA162]">
          <Map className="w-4 h-4" />
          <span>8 Departments Monitored</span>
        </div>
      </div>

      {/* Grid of Department Cards & Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
        {/* Heatmap Grid (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {departments.map((dep) => {
            const isSelected = selectedDept.id === dep.id;
            const isNegative = dep.trend.startsWith("-");

            return (
              <button
                key={dep.id}
                type="button"
                onClick={() => setSelectedDept(dep)}
                className={`p-5 text-left border transition-all cursor-pointer shadow-lg flex flex-col justify-between h-44 ${
                  isSelected
                    ? "bg-[#2C3259] border-2 border-[#DDA162]"
                    : "bg-[#2C3259] border-[#304A78] hover:border-[#DDA162]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-sm font-bold text-[#F4F1EB] line-clamp-1">
                      {dep.name}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider border ${getBadgeColor(
                        dep.score
                      )}`}
                    >
                      {dep.level}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#A87C56] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#DDA162]" />
                    <span>{dep.respondents} voluntary respondents</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#304A78] flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-[#A87C56] block">Safety Index</span>
                    <span className="font-serif text-2xl font-bold text-[#EBBA4A]">
                      {dep.score}
                      <span className="text-xs text-[#A87C56] font-normal"> / 100</span>
                    </span>
                  </div>

                  <div
                    className={`text-xs font-mono font-bold flex items-center gap-0.5 ${
                      isNegative ? "text-[#EBBA4A]" : "text-[#DDA162]"
                    }`}
                  >
                    {isNegative ? (
                      <TrendingDown className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingUp className="w-3.5 h-3.5" />
                    )}
                    <span>{dep.trend} vs last mo</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Side Panel: Selected Department Trend Chart (3 cols) */}
        <div className="lg:col-span-3 bg-[#2C3259] border border-[#304A78] p-6 shadow-2xl space-y-4">
          <div className="pb-3 border-b border-[#304A78]">
            <span className="text-[10px] uppercase tracking-wider text-[#DDA162] font-semibold block">
              Department Telemetry Detail
            </span>
            <h3 className="font-serif text-base font-bold text-[#F4F1EB] mt-0.5">
              {selectedDept.name}
            </h3>
            <p className="text-xs text-[#A87C56] mt-1">
              Sample size: <strong className="text-[#F4F1EB]">{selectedDept.respondents}</strong> employees
            </p>
          </div>

          <div>
            <span className="text-xs font-semibold text-[#F4F1EB] block mb-2">
              4-Week Safety Pulse Progression
            </span>
            <div className="h-44 w-full bg-[#0A0E28] border border-[#304A78] p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={miniChartData}>
                  <CartesianGrid stroke="#304A78" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" stroke="#A87C56" fontSize={10} tickLine={false} />
                  <YAxis domain={[30, 100]} stroke="#A87C56" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0A0E28",
                      borderColor: "#304A78",
                      fontSize: "11px",
                      color: "#F4F1EB",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#DDA162"
                    strokeWidth={2}
                    dot={{ fill: "#EBBA4A", r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-3 bg-[#0A0E28] border border-[#304A78] text-[11px] text-[#A87C56] leading-relaxed">
            Status assessment: {selectedDept.level === "Critical" ? (
              <span className="text-[#EBBA4A] font-semibold">
                High pressure indicator. Recommend dispatching proactive sensitization workshop.
              </span>
            ) : selectedDept.level === "Attention" ? (
              <span className="text-[#DDA162]">
                Mild downward drift over last month. Monitor weekly pulse cadence.
              </span>
            ) : (
              <span className="text-[#F4F1EB]">
                Consistently healthy climate rating within target baseline.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mandatory Footer Note */}
      <div className="p-4 bg-[#0A0E28] border border-[#304A78] text-xs text-[#A87C56] text-center">
        Scores reflect anonymous voluntary pulse responses. Departments with fewer than 5 respondents are not shown.
      </div>
    </div>
  );
};
