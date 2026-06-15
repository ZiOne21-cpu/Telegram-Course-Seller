import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import CoursesPage from './pages/CoursesPage';
import SetupPage from './pages/SetupPage';

export default function App() {
  const [authed, setAuthed] = useState<boolean>(() => !!localStorage.getItem('admin_telegram_id'));

  useEffect(() => {
    const id = localStorage.getItem('admin_telegram_id');
    setAuthed(!!id);
  }, []);

  if (!authed) return <LoginPage onLogin={() => setAuthed(true)} />;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/setup" element={<SetupPage />} />
        </Routes>
      </main>
    </div>
  );
}
