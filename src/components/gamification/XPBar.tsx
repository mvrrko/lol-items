import React from 'react';
import { useXP } from '../../hooks/useXP';
import { ProgressBar } from '../common/ProgressBar';
import { getXPForNextLevel, getXPForCurrentLevel, getRankName } from '../../utils/xpUtils';

export const XPBar: React.FC = () => {
  const { progress } = useXP();
  const currentLevelXP = getXPForCurrentLevel(progress.xp);
  const nextLevelXP = getXPForNextLevel(progress.xp);
  const xpInLevel = progress.xp - currentLevelXP;
  const xpNeeded = nextLevelXP - currentLevelXP;
  const rankName = getRankName(progress.xp);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lol-gold font-bold">Level {progress.level}</span>
          <span className="text-lol-accent text-sm">({rankName})</span>
        </div>
        <span className="text-sm text-gray-400">
          {xpInLevel} / {xpNeeded} XP
        </span>
      </div>
      <ProgressBar
        current={xpInLevel}
        max={xpNeeded}
        showPercentage={false}
        height="h-3"
      />
    </div>
  );
};
