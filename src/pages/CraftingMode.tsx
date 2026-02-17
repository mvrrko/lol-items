import React, { useState, useCallback } from 'react';
import { useItems } from '../hooks/useItems';
import type { Item } from '../types';
import { CraftingQuiz } from '../components/crafting/CraftingQuiz';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { useXP } from '../hooks/useXP';
import { getRandomItems, getItemComponents, generateCraftingDistractors } from '../utils/quizUtils';

export const CraftingMode: React.FC = () => {
  const { items, itemsById, loading, version } = useItems();
  const { addXP, progress } = useXP();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<{
    targetItem: Item;
    components: Item[];
    distractors: Item[];
  }[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const generateQuestions = useCallback(() => {
    const validItems = items.filter((item) => item.from && item.from.length > 0 && item.from.length <= 3);
    const selectedItems = getRandomItems(validItems, 10);
    
    const questions = selectedItems.map((item) => {
      const components = getItemComponents(item.id, itemsById);
      const distractors = generateCraftingDistractors(
        components.map(c => c.id),
        items,
        difficulty
      );
      
      return {
        targetItem: item,
        components,
        distractors,
      };
    });
    
    return questions;
  }, [items, itemsById, difficulty]);

  const startQuiz = useCallback(() => {
    const questions = generateQuestions();
    setQuizQuestions(questions);
    setCurrentQuestion(0);
    setScore(0);
    setIsComplete(false);
  }, [generateQuestions]);

  const handleAnswer = useCallback(
    (correct: boolean, timeToAnswer: number) => {
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
          <h1 className="text-4xl font-bold text-lol-gold mb-2 text-center">Crafting Quiz</h1>
          <p className="text-gray-400 mb-8 text-center">Drag and drop the correct item components</p>

          <Card>
            <h2 className="text-2xl font-bold text-lol-gold mb-4">Select Difficulty</h2>
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setDifficulty('easy')}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  difficulty === 'easy'
                    ? 'border-lol-accent bg-lol-accent/20 text-lol-accent'
                    : 'border-lol-accent/30 text-lol-gold hover:border-lol-accent'
                }`}
              >
                <span className="font-semibold">Easy</span>
                <span className="text-sm text-gray-400 ml-2">(1 distractor)</span>
              </button>
              <button
                onClick={() => setDifficulty('medium')}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  difficulty === 'medium'
                    ? 'border-lol-accent bg-lol-accent/20 text-lol-accent'
                    : 'border-lol-accent/30 text-lol-gold hover:border-lol-accent'
                }`}
              >
                <span className="font-semibold">Medium</span>
                <span className="text-sm text-gray-400 ml-2">(3 distractors)</span>
              </button>
              <button
                onClick={() => setDifficulty('hard')}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  difficulty === 'hard'
                    ? 'border-lol-accent bg-lol-accent/20 text-lol-accent'
                    : 'border-lol-accent/30 text-lol-gold hover:border-lol-accent'
                }`}
              >
                <span className="font-semibold">Hard</span>
                <span className="text-sm text-gray-400 ml-2">(6 distractors)</span>
              </button>
            </div>
            <Button variant="primary" onClick={startQuiz} className="w-full">
              Start Quiz (10 Questions)
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

  return (
    <div className="min-h-screen bg-lol-primary">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-lol-gold mb-2">Crafting Quiz</h1>
          <p className="text-gray-400 mb-4">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </p>
          <p className="text-lol-accent">
            Score: {score} | Streak: {progress.currentStreak}
          </p>
        </div>

        <CraftingQuiz
          targetItem={currentQ.targetItem}
          components={currentQ.components}
          distractors={currentQ.distractors}
          version={version}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
};
