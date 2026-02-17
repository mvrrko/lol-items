#!/bin/bash

# Fix type-only imports
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s/import { Item }/import type { Item }/g" {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s/import { Achievement }/import type { Achievement }/g" {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s/import { UserProgress }/import type { UserProgress }/g" {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s/import { Item, DataDragonResponse }/import type { Item, DataDragonResponse }/g" {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s/import { Item, FlashcardData }/import type { Item, FlashcardData }/g" {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s/import { Item, QuizQuestion, QuizResult }/import type { Item, QuizQuestion, QuizResult }/g" {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s/import { Item, QuizQuestion }/import type { Item, QuizQuestion }/g" {} \;

