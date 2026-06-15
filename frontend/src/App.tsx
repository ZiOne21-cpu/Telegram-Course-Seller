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
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#0f0f0f' }}>
      <Routes>
        <Route path="/" element={<CoursesPage />} />
        <Route path="/checkout/:courseId" element={<CheckoutPage />} />
        <Route path="/orders" element={<MyOrdersPage />} />
      </Routes>
      <BottomNav isAdmin={false} />
    </div>
  );
}
