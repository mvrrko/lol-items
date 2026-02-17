import React, { useState, useCallback } from 'react';
import { useItems } from '../hooks/useItems';
import type { Item } from '../types';
import { BuildPathQuiz } from '../components/buildpath/BuildPathQuiz';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { useXP } from '../hooks/useXP';
import { QUIZ_TIMER } from '../data/constants';
import { getRandomItems, getItemComponents, getItemUpgrades, generateBuildPathOptions } from '../utils/quizUtils';

export const BuildPathMode: React.FC = () => {
  const { items, itemsById, loading, version } = useItems();
  const { addXP, progress } = useXP();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<{
    item: Item;
    question: string;
    correctAnswer: string;
    options: string[];
  }[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const generateQuestions = useCallback(() => {
    const validItems = items.filter((item) => (item.from && item.from.length > 0) || (item.into && item.into.length > 0));
    const selectedItems = getRandomItems(validItems, 10);
    
    const questions = selectedItems.map((item) => {
      const hasComponents = item.from && item.from.length > 0;
      const hasUpgrades = item.into && item.into.length > 0;
      
      let questionType: 'components' | 'upgrades';
      
      if (hasComponents && hasUpgrades) {
        questionType = Math.random() > 0.5 ? 'components' : 'upgrades';
      } else {
        questionType = hasComponents ? 'components' : 'upgrades';
      }
      
      if (questionType === 'components') {
        const components = getItemComponents(item.id, itemsById);
        const correctAnswer = components[0]?.name || '';
        const options = generateBuildPathOptions([correctAnswer], items);
        
        return {
          item,
          question: 'Which of these is a component of this item?',
          correctAnswer,
          options,
        };
      } else {
        const upgrades = getItemUpgrades(item.id, itemsById);
        const correctAnswer = upgrades[0]?.name || '';
        const options = generateBuildPathOptions([correctAnswer], items);
        
        return {
          item,
          question: 'What does this item build into?',
          correctAnswer,
          options,
        };
      }
    }).filter(q => q.correctAnswer !== '');
    
    return questions;
  }, [items, itemsById]);

  const startQuiz = useCallback(() => {
    const questions = generateQuestions();
    setQuizQuestions(questions);
    setCurrentQuestion(0);
    setScore(0);
    setIsComplete(false);
  }, [generateQuestions]);

  const handleAnswer = useCallback(
    (answer: string, timeToAnswer: number) => {
      const currentQ = quizQuestions[currentQuestion];
      const correct = answer === currentQ.correctAnswer;

      if (correct) {
        setScore((prev) => prev + 1);
      }

      addXP(correct, timeToAnswer, difficulty);

      if (currentQuestion + 1 >= quizQuestions.length) {
        setIsComplete(true);
      } else {
        setTimeout(() => {
          setCurrentQuestion((prev) => prev + 1);
        }, 1500);
      }
    },
    [currentQuestion, quizQuestions, addXP, difficulty]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-lol-primary flex items-center justify-center">
        <div className="text-lol-gold text-2xl">Loading quiz...</div>
      </div>
    );
  }

  if (quizQuestions.length === 0 && !isComplete) {
    return (
      <div className="min-h-screen bg-lol-primary">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-lol-gold mb-2 text-center">Build Path Quiz</h1>
          <p className="text-gray-400 mb-8 text-center">Test your item build path knowledge</p>

          <Card>
            <h2 className="text-2xl font-bold text-lol-gold mb-4">Select Difficulty</h2>
            <div className="space-y-3 mb-6">
              {(['easy', 'medium', 'hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    difficulty === diff
                      ? 'border-lol-accent bg-lol-accent/20 text-lol-accent'
                      : 'border-lol-accent/30 text-lol-gold hover:border-lol-accent'
                  }`}
                >
                  <span className="font-semibold capitalize">{diff}</span>
                </button>
              ))}
            </div>
            <Button variant="primary" onClick={startQuiz} className="w-full">
              Start Quiz
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (isComplete) {
    const accuracy = (score / quizQuestions.length) * 100;
    return (
      <div className="min-h-screen bg-lol-primary">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card>
            <div className="text-center">
              <h2 className="text-4xl font-bold text-lol-gold mb-4">Quiz Complete!</h2>
              <div className="text-6xl mb-4">
                {accuracy >= 80 ? '🏆' : accuracy >= 60 ? '⭐' : '📚'}
              </div>
              <p className="text-2xl text-lol-accent mb-6">
                Score: {score} / {quizQuestions.length}
              </p>
              <p className="text-xl text-lol-gold mb-8">Accuracy: {accuracy.toFixed(0)}%</p>
              <div className="space-y-4">
                <p className="text-gray-400">
                  Current Streak: {progress.currentStreak} | Best: {progress.bestStreak}
                </p>
                <Button variant="primary" onClick={startQuiz} className="w-full">
                  Try Again
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuestion];
  const timeLimit = QUIZ_TIMER[difficulty.toUpperCase() as keyof typeof QUIZ_TIMER];

  return (
    <div className="min-h-screen bg-lol-primary">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-lol-gold mb-2">Build Path Quiz</h1>
          <p className="text-gray-400 mb-4">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </p>
          <p className="text-lol-accent">
            Score: {score} | Streak: {progress.currentStreak}
          </p>
        </div>

        <BuildPathQuiz
          item={currentQ.item}
          version={version}
          question={currentQ.question}
          correctAnswer={currentQ.correctAnswer}
          options={currentQ.options}
          onAnswer={handleAnswer}
          timeLimit={timeLimit}
        />
      </div>
    </div>
  );
};
