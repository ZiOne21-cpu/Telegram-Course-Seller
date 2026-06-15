import { useState } from 'react';

interface Props { onLogin: () => void; }

const ADMIN_IDS = (import.meta.env.VITE_ADMIN_IDS || '').split(',').map((s: string) => s.trim()).filter(Boolean);

export default function LoginPage({ onLogin }: Props) {
  const [id, setId] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (ADMIN_IDS.includes(id.trim())) {
      localStorage.setItem('admin_telegram_id', id.trim());
      onLogin();
    } else {
      setError('Access denied. Your Telegram ID is not authorized.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🎓</div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">Course Shop Management</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Telegram ID</label>
            <input
              type="text"
              placeholder="e.g. 387957921"
              value={id}
              onChange={e => setId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button onClick={handleLogin}
            className="w-full py-3 rounded-xl font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors">
            Sign In
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-4">
          Only authorized Telegram IDs can access this panel
        </p>
      </div>
    </div>
  );
}
