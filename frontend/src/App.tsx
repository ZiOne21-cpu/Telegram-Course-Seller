import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getTelegramUser } from './telegram';
import CoursesPage from './pages/CoursesPage';
import CheckoutPage from './pages/CheckoutPage';
import MyOrdersPage from './pages/MyOrdersPage';
import BottomNav from './components/BottomNav';

export default function App() {
  const [_isAdmin] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      const params = tg.themeParams;
      if (params) {
        // Override with our dark theme regardless of Telegram theme
      }
    }
    getTelegramUser(); // just initialize
  }, []);

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#0a0e27' }}>
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-white/5">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold gradient-text">Nilexis.Et</h1>
          <p className="text-xs text-gray-400 mt-0.5">Premium Learning Platform</p>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<CoursesPage />} />
        <Route path="/checkout/:courseId" element={<CheckoutPage />} />
        <Route path="/orders" element={<MyOrdersPage />} />
      </Routes>
      <BottomNav isAdmin={false} />
    </div>
  );
}
