import React from 'react';
import { useXP } from '../hooks/useXP';
import { ACHIEVEMENTS } from '../data/achievements';
import { AchievementCard } from '../components/gamification/AchievementCard';
import { LevelBadge } from '../components/gamification/LevelBadge';

export const Achievements: React.FC = () => {
  const { progress } = useXP();

  const achievementsWithProgress = ACHIEVEMENTS.map((achievement) => {
    const unlocked = progress.achievements.includes(achievement.id);
    
    // Update progress based on user stats
    let currentProgress = achievement.progress;
    
    switch (achievement.id) {
      case 'century_club':
        currentProgress = progress.correctAnswers;
        break;
      case 'gold_genius':
        currentProgress = progress.currentStreak >= 20 ? 20 : progress.currentStreak;
        break;
      case 'streak_master':
        currentProgress = progress.bestStreak;
        break;
      case 'scholar':
        currentProgress = Object.values(progress.itemMastery).filter(
          (m) => m.timesCorrect >= 3
        ).length;
        break;
      default:
        break;
    }
    
    return {
      ...achievement,
      progress: currentProgress,
      unlocked,
    };
  });

  const unlockedCount = achievementsWithProgress.filter((a) => a.unlocked).length;

  return (
    <div className="min-h-screen bg-lol-primary">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-hextech rounded-2xl p-8 mb-8 border border-lol-accent/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-lol-gold mb-2">Achievements</h1>
              <p className="text-gray-300 text-lg">
                Unlocked {unlockedCount} of {ACHIEVEMENTS.length}
              </p>
            </div>
            <LevelBadge level={progress.level} xp={progress.xp} size="lg" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-lol-secondary border border-lol-accent/30 rounded-lg p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-lol-accent mb-2">
                {progress.totalQuestionsAnswered}
              </div>
              <div className="text-gray-400">Total Questions</div>
            </div>
          </div>
          <div className="bg-lol-secondary border border-lol-accent/30 rounded-lg p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-lol-green mb-2">
                {progress.correctAnswers}
              </div>
              <div className="text-gray-400">Correct Answers</div>
            </div>
          </div>
          <div className="bg-lol-secondary border border-lol-accent/30 rounded-lg p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-lol-gold mb-2">
                {progress.bestStreak}
              </div>
              <div className="text-gray-400">Best Streak</div>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievementsWithProgress.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              unlocked={achievement.unlocked}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
