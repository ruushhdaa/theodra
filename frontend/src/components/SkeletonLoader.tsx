import React from "react";

interface SkeletonProps {
  className?: string;
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "h-4 w-full", count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`skeleton-shimmer bg-[#0E1438] rounded-xl ${className}`}
        />
      ))}
    </>
  );
};

export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({ rows = 5, cols = 6 }) => {
  return (
    <div className="w-full space-y-2 rounded-2xl overflow-hidden">
      <div className="h-10 skeleton-shimmer bg-[#0E1438] border border-[#262E5F] rounded-xl" />
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="h-12 skeleton-shimmer bg-[#0A0E28] border border-[#262E5F]/60 rounded-xl flex items-center px-4 space-x-4">
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} className="h-4 bg-[#0E1438] rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-5 space-y-3 shadow-xl">
          <div className="h-4 w-24 bg-[#0E1438] rounded skeleton-shimmer" />
          <div className="h-8 w-16 bg-[#0E1438] rounded skeleton-shimmer" />
          <div className="h-3 w-32 bg-[#0E1438]/60 rounded skeleton-shimmer" />
        </div>
      ))}
    </div>
  );
};
