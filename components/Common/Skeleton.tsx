"use client";

import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}) => {
  const baseClasses = 'bg-white/10';

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-xl',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'skeleton-wave',
    none: '',
  };

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

// Pre-built skeleton components for common use cases
export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`glass-card p-6 space-y-4 ${className}`}>
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" height={20} className="w-3/4" />
        <Skeleton variant="text" height={16} className="w-1/2" />
      </div>
    </div>
    <Skeleton variant="rounded" height={100} className="w-full" />
    <div className="flex gap-2">
      <Skeleton variant="rounded" height={36} className="w-24" />
      <Skeleton variant="rounded" height={36} className="w-24" />
    </div>
  </div>
);

export const SkeletonModuleCard: React.FC = () => (
  <div className="glass-card p-6 space-y-4">
    <div className="flex items-center gap-4">
      <Skeleton variant="rounded" width={56} height={56} />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" height={24} className="w-2/3" />
        <Skeleton variant="text" height={16} className="w-full" />
      </div>
    </div>
    <Skeleton variant="rounded" height={8} className="w-full" />
    <div className="flex justify-between items-center">
      <Skeleton variant="text" width={80} height={16} />
      <Skeleton variant="circular" width={24} height={24} />
    </div>
  </div>
);

export const SkeletonTutorialContent: React.FC = () => (
  <div className="space-y-6">
    <Skeleton variant="text" height={32} className="w-1/2" />
    <div className="space-y-3">
      <Skeleton variant="text" height={16} className="w-full" />
      <Skeleton variant="text" height={16} className="w-full" />
      <Skeleton variant="text" height={16} className="w-3/4" />
    </div>
    <Skeleton variant="rounded" height={200} className="w-full" />
    <div className="space-y-3">
      <Skeleton variant="text" height={16} className="w-full" />
      <Skeleton variant="text" height={16} className="w-5/6" />
    </div>
  </div>
);

export const SkeletonGameCard: React.FC = () => (
  <div className="glass-card p-8 space-y-6">
    <div className="flex justify-between items-center">
      <Skeleton variant="text" height={28} className="w-1/3" />
      <div className="flex gap-2">
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
      </div>
    </div>
    <Skeleton variant="rounded" height={120} className="w-full" />
    <div className="grid grid-cols-2 gap-4">
      <Skeleton variant="rounded" height={48} className="w-full" />
      <Skeleton variant="rounded" height={48} className="w-full" />
      <Skeleton variant="rounded" height={48} className="w-full" />
      <Skeleton variant="rounded" height={48} className="w-full" />
    </div>
  </div>
);

export const SkeletonProgressTree: React.FC = () => (
  <div className="glass-card p-6 space-y-4">
    <Skeleton variant="text" height={24} className="w-1/3" />
    <div className="flex items-end justify-center gap-2 h-48">
      {[40, 60, 80, 100, 70, 50, 90].map((h, i) => (
        <Skeleton key={i} variant="rounded" width={32} height={h} />
      ))}
    </div>
    <div className="flex justify-between">
      <Skeleton variant="text" width={60} height={14} />
      <Skeleton variant="text" width={60} height={14} />
    </div>
  </div>
);

export const SkeletonAchievementCard: React.FC = () => (
  <div className="glass-card p-4 flex items-center gap-4">
    <Skeleton variant="circular" width={48} height={48} />
    <div className="flex-1 space-y-2">
      <Skeleton variant="text" height={18} className="w-1/2" />
      <Skeleton variant="text" height={14} className="w-3/4" />
    </div>
  </div>
);

export const SkeletonList: React.FC<{ count?: number; className?: string }> = ({
  count = 5,
  className = ''
}) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" height={16} className="w-3/4" />
          <Skeleton variant="text" height={12} className="w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonDashboard: React.FC = () => (
  <div className="space-y-8">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton variant="text" height={32} className="w-48" />
        <Skeleton variant="text" height={20} className="w-64" />
      </div>
      <Skeleton variant="rounded" width={120} height={40} />
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass-card p-4 flex items-center gap-4">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="space-y-2">
            <Skeleton variant="text" height={14} className="w-20" />
            <Skeleton variant="text" height={24} className="w-16" />
          </div>
        </div>
      ))}
    </div>

    {/* Module Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <SkeletonModuleCard key={i} />
      ))}
    </div>
  </div>
);

// Skeleton for code editor/sandbox
export const SkeletonCodeEditor: React.FC = () => (
  <div className="glass-card p-6 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton variant="text" height={24} className="w-32" />
      <div className="flex gap-2">
        <Skeleton variant="rounded" width={80} height={32} />
        <Skeleton variant="rounded" width={80} height={32} />
      </div>
    </div>
    <Skeleton variant="rounded" height={300} className="w-full" />
    <div className="flex justify-between">
      <Skeleton variant="text" height={16} className="w-24" />
      <Skeleton variant="rounded" width={100} height={36} />
    </div>
  </div>
);

// Skeleton for AI Coach popup
export const SkeletonAICoach: React.FC = () => (
  <div className="glass-card p-4 space-y-4 w-80">
    <div className="flex items-center gap-3">
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="text" height={20} className="w-24" />
    </div>
    <div className="space-y-2">
      <Skeleton variant="text" height={14} className="w-full" />
      <Skeleton variant="text" height={14} className="w-3/4" />
      <Skeleton variant="text" height={14} className="w-5/6" />
    </div>
    <Skeleton variant="rounded" height={80} className="w-full" />
    <Skeleton variant="rounded" height={36} className="w-full" />
  </div>
);

// Skeleton for Learning Tree
export const SkeletonLearningTree: React.FC = () => (
  <div className="glass-card p-6 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton variant="text" height={24} className="w-32" />
      <Skeleton variant="circular" width={24} height={24} />
    </div>
    <div className="flex items-end justify-center gap-3 h-40">
      <Skeleton variant="rounded" width={20} height={60} />
      <Skeleton variant="rounded" width={24} height={80} />
      <Skeleton variant="rounded" width={28} height={100} />
      <Skeleton variant="rounded" width={24} height={90} />
      <Skeleton variant="rounded" width={20} height={70} />
    </div>
    <div className="text-center">
      <Skeleton variant="text" height={14} className="w-32 mx-auto" />
    </div>
  </div>
);

// Skeleton for language selection grid
export const SkeletonLanguageGrid: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="glass-card p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton variant="rounded" width={40} height={40} />
          <Skeleton variant="text" height={18} className="flex-1" />
        </div>
        <Skeleton variant="text" height={12} className="w-full" />
        <Skeleton variant="rounded" height={6} className="w-full" />
      </div>
    ))}
  </div>
);

// Skeleton for search/filter bar
export const SkeletonSearchBar: React.FC = () => (
  <div className="flex gap-4 items-center">
    <Skeleton variant="rounded" height={44} className="flex-1 max-w-md" />
    <Skeleton variant="rounded" width={120} height={44} />
    <Skeleton variant="rounded" width={120} height={44} />
  </div>
);

export default Skeleton;
