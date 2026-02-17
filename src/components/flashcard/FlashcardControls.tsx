import React from 'react';
import { Button } from '../common/Button';
import { ProgressBar } from '../common/ProgressBar';

interface FlashcardControlsProps {
  currentIndex: number;
  totalCards: number;
  onNext: () => void;
  onPrevious: () => void;
  onMarkKnown: () => void;
  onMarkDifficult: () => void;
  masteryProgress: { mastered: number; total: number; percentage: number };
}

export const FlashcardControls: React.FC<FlashcardControlsProps> = ({
  currentIndex,
  totalCards,
  onNext,
  onPrevious,
  onMarkKnown,
  onMarkDifficult,
  masteryProgress,
}) => {
  return (
    <div className="w-full max-w-md mx-auto mt-8 space-y-6">
      {/* Progress */}
      <div className="text-center">
        <p className="text-lol-gold mb-2">
          Card {currentIndex + 1} of {totalCards}
        </p>
        <ProgressBar
          current={masteryProgress.mastered}
          max={masteryProgress.total}
          label="Mastery Progress"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button variant="success" onClick={onMarkKnown}>
          ✓ Known
        </Button>
        <Button variant="danger" onClick={onMarkDifficult}>
          ✗ Difficult
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 justify-center">
        <Button variant="ghost" onClick={onPrevious}>
          ← Previous
        </Button>
        <Button variant="ghost" onClick={onNext}>
          Next →
        </Button>
      </div>
    </div>
  );
};
