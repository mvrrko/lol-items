#!/bin/bash

# Remove unused imports
sed -i 's/, QuizQuestion//g' src/components/pricing/PricingQuiz.tsx
sed -i 's/, FlashcardData//g' src/hooks/useFlashcards.ts
sed -i '/getRandomItems/d' src/hooks/useQuizEngine.ts
sed -i 's/, shuffleArray//g' src/pages/BuildPathMode.tsx
sed -i 's/import { Button }/\/\/ import { Button }/g' src/pages/DailyChallenge.tsx

