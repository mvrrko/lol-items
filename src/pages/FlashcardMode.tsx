import React from 'react';
import { useItems } from '../hooks/useItems';
import { useFlashcards } from '../hooks/useFlashcards';
import { Flashcard } from '../components/flashcard/Flashcard';
import { FlashcardControls } from '../components/flashcard/FlashcardControls';

export const FlashcardMode: React.FC = () => {
  const { items, loading, version } = useItems();
  const {
    currentItem,
    currentIndex,
    isFlipped,
    next,
    previous,
    flip,
    markAs,
    getProgress,
    totalCards,
  } = useFlashcards(items);

  const masteryProgress = getProgress();

  if (loading) {
    return (
      <div className="min-h-screen bg-lol-primary flex items-center justify-center">
        <div className="text-lol-gold text-2xl">Loading flashcards...</div>
      </div>
    );
  }

  if (!currentItem || totalCards === 0) {
    return (
      <div className="min-h-screen bg-lol-primary flex items-center justify-center">
        <div className="text-lol-gold text-2xl">No items available for flashcards</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lol-primary">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-lol-gold mb-2">Flashcard Mode</h1>
          <p className="text-gray-400">Master items with spaced repetition</p>
        </div>

        <Flashcard item={currentItem} version={version} isFlipped={isFlipped} onFlip={flip} />

        <FlashcardControls
          currentIndex={currentIndex}
          totalCards={totalCards}
          onNext={next}
          onPrevious={previous}
          onMarkKnown={() => markAs('easy')}
          onMarkDifficult={() => markAs('hard')}
          masteryProgress={masteryProgress}
        />
      </div>
    </div>
  );
};
