import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Home } from './pages/Home';
import { StudyMode } from './pages/StudyMode';
import { FlashcardMode } from './pages/FlashcardMode';
import { CraftingMode } from './pages/CraftingMode';
import { PricingMode } from './pages/PricingMode';
import { BuildPathMode } from './pages/BuildPathMode';
import { Achievements } from './pages/Achievements';
import { DailyChallenge } from './pages/DailyChallenge';
import { Confetti } from './components/gamification/Confetti';
import { useXP } from './hooks/useXP';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { leveledUp } = useXP();

  return (
    <Router>
      <div className="min-h-screen bg-lol-primary">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 lg:ml-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/study" element={<StudyMode />} />
              <Route path="/flashcards" element={<FlashcardMode />} />
              <Route path="/crafting" element={<CraftingMode />} />
              <Route path="/pricing" element={<PricingMode />} />
              <Route path="/buildpath" element={<BuildPathMode />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/daily" element={<DailyChallenge />} />
            </Routes>
          </main>
        </div>
        <Confetti trigger={leveledUp} />
      </div>
    </Router>
  );
}

export default App;
