import React from 'react';
import { Card } from '../components/common/Card';
// import { Button } from '../components/common/Button';

export const DailyChallenge: React.FC = () => {
  const today = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-lol-primary">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-lol-gold mb-2 text-center">Daily Challenge</h1>
        <p className="text-gray-400 mb-8 text-center">Complete today's challenge for bonus XP!</p>

        <Card>
          <div className="text-center py-12">
            <div className="text-6xl mb-6">📅</div>
            <h2 className="text-2xl font-bold text-lol-gold mb-4">{today}</h2>
            <p className="text-gray-400 mb-8">
              Daily challenges are coming soon! Check back later for exciting new challenges.
            </p>
            <div className="max-w-md mx-auto space-y-4">
              <div className="bg-lol-primary rounded-lg p-4 border border-lol-accent/30">
                <p className="text-lol-accent font-semibold">Coming Soon:</p>
                <ul className="text-sm text-gray-300 mt-2 space-y-1 text-left">
                  <li>• Daily randomized quiz challenges</li>
                  <li>• Streak bonuses for consecutive days</li>
                  <li>• Special rewards and achievements</li>
                  <li>• Leaderboard rankings</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
