import { useState, useCallback } from 'react';
import type { Item, QuizQuestion, QuizResult } from '../types';
import { useXP } from './useXP';

interface QuizState {
  currentQuestion: number;
  score: number;
  questions: QuizQuestion[];
  answers: boolean[];
  timeSpent: number[];
}

export function useQuizEngine(
  items: Item[],
  questionGenerator: (items: Item[], difficulty: 'easy' | 'medium' | 'hard') => QuizQuestion[],
  difficulty: 'easy' | 'medium' | 'hard' = 'medium',
  questionCount: number = 10
) {
  const [quizState, setQuizState] = useState<QuizState>(() => ({
    currentQuestion: 0,
    score: 0,
    questions: questionGenerator(items, difficulty).slice(0, questionCount),
    answers: [],
    timeSpent: [],
  }));
  const [isComplete, setIsComplete] = useState(false);
  const { addXP } = useXP();

  const currentQuestion = quizState.questions[quizState.currentQuestion];

  const answerQuestion = useCallback(
    (answer: string | string[], timeToAnswer: number): QuizResult => {
      const correct = Array.isArray(currentQuestion.correctAnswer)
        ? JSON.stringify(answer) === JSON.stringify(currentQuestion.correctAnswer)
        : answer === currentQuestion.correctAnswer;

      const xpGained = correct ? addXP(correct, timeToAnswer, difficulty) : 0;

      setQuizState((prev) => {
        const newAnswers = [...prev.answers, correct];
        const newTimeSpent = [...prev.timeSpent, timeToAnswer];
        const newScore = correct ? prev.score + 1 : prev.score;
        const newCurrentQuestion = prev.currentQuestion + 1;

        if (newCurrentQuestion >= prev.questions.length) {
          setIsComplete(true);
        }

        return {
          ...prev,
          currentQuestion: newCurrentQuestion,
          score: newScore,
          answers: newAnswers,
          timeSpent: newTimeSpent,
        };
      });

      return {
        correct,
        xpGained,
        timeToAnswer,
        bonusPoints: timeToAnswer < 5 ? 10 : 0,
      };
    },
    [currentQuestion, addXP, difficulty]
  );

  const restart = useCallback(() => {
    setQuizState({
      currentQuestion: 0,
      score: 0,
      questions: questionGenerator(items, difficulty).slice(0, questionCount),
      answers: [],
      timeSpent: [],
    });
    setIsComplete(false);
  }, [items, questionGenerator, difficulty, questionCount]);

  const getResults = useCallback(() => {
    const totalQuestions = quizState.questions.length;
    const accuracy = totalQuestions > 0 ? (quizState.score / totalQuestions) * 100 : 0;
    const averageTime =
      quizState.timeSpent.length > 0
        ? quizState.timeSpent.reduce((a, b) => a + b, 0) / quizState.timeSpent.length
        : 0;

    return {
      score: quizState.score,
      totalQuestions,
      accuracy,
      averageTime,
      answers: quizState.answers,
    };
  }, [quizState]);

  return {
    currentQuestion,
    questionNumber: quizState.currentQuestion + 1,
    totalQuestions: quizState.questions.length,
    score: quizState.score,
    isComplete,
    answerQuestion,
    restart,
    getResults,
  };
}
