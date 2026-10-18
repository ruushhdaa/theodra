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
          className={`skeleton-shimmer bg-[#2C3259] rounded-none ${className}`}
        />
      ))}
    </>
  );
};

export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({ rows = 5, cols = 6 }) => {
  return (
    <div className="w-full space-y-2">
      <div className="h-10 skeleton-shimmer bg-[#2C3259] border border-[#304A78]" />
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="h-12 skeleton-shimmer bg-[#2C3259]/60 border border-[#304A78]/60 flex items-center px-4 space-x-4">
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} className="h-4 bg-[#304A78] flex-1" />
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
        <div key={i} className="bg-[#2C3259] border border-[#304A78] p-5 space-y-3">
          <div className="h-4 w-24 bg-[#304A78] skeleton-shimmer" />
          <div className="h-8 w-16 bg-[#304A78] skeleton-shimmer" />
          <div className="h-3 w-32 bg-[#304A78]/60 skeleton-shimmer" />
        </div>
      ))}
    </div>
  );
};
