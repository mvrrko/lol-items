import React from 'react';
import type { Achievement } from '../../types';
import { Card } from '../common/Card';

interface AchievementCardProps {
  achievement: Achievement;
  unlocked?: boolean;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  unlocked = false,
}) => {
  return (
    <Card
      className={`${
        unlocked ? 'border-lol-green' : 'opacity-50 grayscale'
      } transition-all duration-300`}
    >
      <div className="flex items-start gap-3">
        <div className="text-4xl">{achievement.icon}</div>
        <div className="flex-1">
          <h3 className="text-lol-gold font-bold text-lg">{achievement.name}</h3>
          <p className="text-gray-400 text-sm mb-2">{achievement.description}</p>
          <div className="flex items-center justify-between">
            <div className="text-xs text-lol-accent">
              {achievement.progress} / {achievement.maxProgress}
            </div>
            <div className="text-xs text-lol-gold">+{achievement.xpReward} XP</div>
          </div>
          <div className="w-full h-2 bg-lol-primary rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-lol-accent transition-all duration-300"
              style={{
                width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
