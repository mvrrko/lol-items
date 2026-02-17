# LoL Item Master 🎮

A modern, interactive web application for mastering League of Legends items through gamified learning.

## Features ✨

### 🎯 Learning Modes

- **Study Mode**: Browse and filter all LoL items with detailed information
- **Flashcard Mode**: Master items with spaced repetition learning
- **Crafting Quiz**: Drag and drop item components to craft items
- **Pricing Quiz**: Test your knowledge of item costs
- **Build Path Quiz**: Learn what items build from and into

### 🎮 Gamification

- **XP System**: Earn experience points for correct answers
- **Level Progression**: Progress through ranks from Iron to Challenger
- **Achievements**: Unlock badges for completing challenges
- **Streak Tracking**: Build and maintain answer streaks
- **Daily Challenges**: (Coming soon) Complete daily quests for bonus rewards

### 💻 Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS with custom LoL-themed design
- **Routing**: React Router DOM
- **State Management**: React hooks (useState, useEffect, custom hooks)
- **Data Source**: Riot Data Dragon CDN with offline fallback
- **Persistence**: Local Storage

## Getting Started 🚀

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mvrrko/lol-items.git
cd lol-items
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure 📁

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── study/           # Study mode components
│   ├── flashcard/       # Flashcard mode components
│   ├── crafting/        # Crafting quiz components
│   ├── pricing/         # Pricing quiz components
│   ├── buildpath/       # Build path quiz components
│   ├── gamification/    # XP, achievements, etc.
│   └── layout/          # Layout components
├── hooks/               # Custom React hooks
├── data/                # Constants, achievements, mock data
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── pages/               # Page components
```

## Features in Detail 📖

### Study Mode
- Search items by name
- Filter by tags (Damage, Armor, AP, etc.)
- Filter by cost range
- View detailed item information including:
  - Stats breakdown
  - Build path (what it builds from/into)
  - Item description and passives
  - Gold costs

### Flashcard Mode
- 3D flip animation for cards
- Mark items as "Known" or "Difficult"
- Spaced repetition algorithm
- Progress tracking
- Mastery percentage

### Quiz Modes
- **Pricing Quiz**: Guess item costs with timer
- **Crafting Quiz**: Select correct components from a pool
- **Build Path Quiz**: Answer questions about item relationships
- Multiple difficulty levels
- Real-time scoring and streak tracking
- Speed bonuses for quick answers

### Gamification System
- XP rewards based on:
  - Answer correctness
  - Difficulty level
  - Answer speed
  - Current streak
- Level system with ranks:
  - Iron → Bronze → Silver → Gold → Platinum → Diamond → Master → Grandmaster → Challenger
- Achievements with progress tracking
- Score history (coming soon)

## Data Source 📊

The app fetches real-time item data from Riot's Data Dragon CDN:
- Automatically gets the latest game version
- Downloads current item data and images
- Falls back to comprehensive mock data if offline

## Local Storage 💾

Progress is automatically saved to browser local storage:
- User XP and level
- Item mastery data
- Achievements
- Statistics (total questions, streaks, etc.)

## Browser Support 🌐

- Chrome/Edge (recommended)
- Firefox
- Safari
- Modern mobile browsers

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is for educational purposes. League of Legends and all related content are property of Riot Games.

## Acknowledgments 🙏

- Item data and images from [Riot Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon)
- Icons from emoji
- Animations powered by CSS and Canvas Confetti

---

Made with ❤️ for the League of Legends community
