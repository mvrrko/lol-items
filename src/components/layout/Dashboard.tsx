import React from 'react';
import { Link } from 'react-router-dom';
import { useXP } from '../../hooks/useXP';
import { Card } from '../common/Card';
import { LevelBadge } from '../gamification/LevelBadge';

const modes = [
  {
    path: '/study',
    title: 'Study Mode',
    icon: '📚',
    description: 'Browse and learn all items',
    color: 'from-blue-500 to-blue-700',
  },
  {
    path: '/flashcards',
    title: 'Flashcards',
    icon: '🃏',
    description: 'Master items with spaced repetition',
    color: 'from-purple-500 to-purple-700',
  },
  {
    path: '/crafting',
    title: 'Crafting Quiz',
    icon: '🧩',
    description: 'Drag & drop item components',
    color: 'from-green-500 to-green-700',
  },
  {
    path: '/pricing',
    title: 'Pricing Quiz',
    icon: '💰',
    description: 'Guess item costs',
    color: 'from-yellow-500 to-yellow-700',
  },
  {
    path: '/buildpath',
    title: 'Build Path Quiz',
    icon: '🔄',
    description: 'Test your item knowledge',
    color: 'from-red-500 to-red-700',
  },
  {
    path: '/daily',
    title: 'Daily Challenge',
    icon: '📅',
    description: 'Complete today\'s challenge',
    color: 'from-pink-500 to-pink-700',
  },
];

export const Dashboard: React.FC = () => {
  const { progress } = useXP();

  return (
    <div className="min-h-screen bg-lol-primary">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-hextech rounded-2xl p-8 mb-8 border border-lol-accent/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-lol-gold mb-2">
                Welcome to LoL Item Master
              </h1>
              <p className="text-gray-300 text-lg">
                Master League of Legends items through interactive learning
              </p>
            </div>
            <LevelBadge level={progress.level} xp={progress.xp} size="lg" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-lol-accent">
                {progress.totalQuestionsAnswered}
              </div>
              <div className="text-sm text-gray-400">Questions Answered</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-lol-green">
                {progress.correctAnswers}
              </div>
              <div className="text-sm text-gray-400">Correct Answers</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-lol-gold">
                {progress.currentStreak}
              </div>
              <div className="text-sm text-gray-400">Current Streak</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-lol-purple">
                {progress.bestStreak}
              </div>
              <div className="text-sm text-gray-400">Best Streak</div>
            </div>
          </Card>
        </div>

        {/* Learning Modes */}
        <h2 className="text-2xl font-bold text-lol-gold mb-4">Choose Your Mode</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modes.map((mode) => (
            <Link key={mode.path} to={mode.path}>
              <Card hover className="h-full">
                <div className={`bg-gradient-to-br ${mode.color} rounded-lg p-6 mb-4`}>
                  <div className="text-6xl text-center">{mode.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-lol-gold mb-2">{mode.title}</h3>
                <p className="text-gray-400 text-sm">{mode.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
