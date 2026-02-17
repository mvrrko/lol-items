import React, { useState, useEffect } from 'react';
import type { Item } from '../../types';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { getItemImageUrl } from '../../utils/itemUtils';

interface BuildPathQuizProps {
  item: Item;
  version: string;
  question: string;
  correctAnswer: string;
  options: string[];
  onAnswer: (answer: string, timeToAnswer: number) => void;
  timeLimit: number;
}

export const BuildPathQuiz: React.FC<BuildPathQuizProps> = ({
  item,
  version,
  question,
  correctAnswer,
  options,
  onAnswer,
  timeLimit,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [startTime] = useState(Date.now());
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!answered) {
            handleSubmit();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answered]);

  const handleSubmit = () => {
    if (answered) return;
    const timeToAnswer = (Date.now() - startTime) / 1000;
    const answer = selectedAnswer || '';
    setAnswered(true);
    setTimeout(() => {
      onAnswer(answer, timeToAnswer);
    }, 1000);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        {/* Timer */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lol-gold font-semibold">Time Remaining</span>
            <span className={`text-xl font-bold ${timeLeft <= 5 ? 'text-lol-red' : 'text-lol-accent'}`}>
              {timeLeft}s
            </span>
          </div>
          <div className="w-full h-2 bg-lol-primary rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${
                timeLeft <= 5 ? 'bg-lol-red' : 'bg-lol-accent'
              }`}
              style={{ width: `${(timeLeft / timeLimit) * 100}%` }}
            />
          </div>
        </div>

        {/* Item Display */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 mb-4 rounded-xl overflow-hidden border-2 border-lol-accent">
            <img
              src={getItemImageUrl(version, item.image.full)}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E%3Crect fill="%23333" width="96" height="96"/%3E%3C/svg%3E';
              }}
            />
          </div>
          <h2 className="text-2xl font-bold text-lol-gold mb-2">{item.name}</h2>
          <p className="text-gray-400 text-center">{question}</p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => !answered && setSelectedAnswer(option)}
              disabled={answered}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left font-semibold ${
                answered
                  ? option === correctAnswer
                    ? 'border-lol-green bg-lol-green/20 text-lol-green animate-glow'
                    : option === selectedAnswer
                    ? 'border-lol-red bg-lol-red/20 text-lol-red animate-shake'
                    : 'border-lol-accent/30 text-gray-500'
                  : selectedAnswer === option
                  ? 'border-lol-accent bg-lol-accent/20 text-lol-accent'
                  : 'border-lol-accent/30 text-lol-gold hover:border-lol-accent hover:bg-lol-accent/10'
              } disabled:cursor-not-allowed`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        {!answered && (
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="w-full"
          >
            Submit Answer
          </Button>
        )}

        {/* Result */}
        {answered && (
          <div
            className={`text-center p-4 rounded-lg ${
              isCorrect ? 'bg-lol-green/20 text-lol-green' : 'bg-lol-red/20 text-lol-red'
            }`}
          >
            <p className="text-xl font-bold">
              {isCorrect ? '✓ Correct!' : `✗ Wrong! Correct answer: ${correctAnswer}`}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};
