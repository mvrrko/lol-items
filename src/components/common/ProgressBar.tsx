import React from 'react';

interface ProgressBarProps {
  current: number;
  max: number;
  color?: string;
  height?: string;
  showPercentage?: boolean;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  max,
  color = 'bg-lol-accent',
  height = 'h-4',
  showPercentage = true,
  label,
}) => {
  const percentage = max > 0 ? Math.min((current / max) * 100, 100) : 0;

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-2 text-sm text-lol-gold">
          <span>{label}</span>
          {showPercentage && <span>{percentage.toFixed(0)}%</span>}
        </div>
      )}
      <div className={`w-full ${height} bg-lol-primary rounded-full overflow-hidden border border-lol-accent/30`}>
        <div
          className={`${color} ${height} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
