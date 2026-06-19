import { NavLink, useNavigate } from 'react-router-dom';

const links = [
  { to: '/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/orders', icon: '📦', label: 'Orders' },
  { to: '/courses', icon: '📚', label: 'Courses' },
  { to: '/setup', icon: '💳', label: 'Payment Setup' },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('admin_telegram_id');
    navigate('/');
    window.location.reload();
  };

  const handleNavClick = () => {
    if (onNavigate) onNavigate();
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shrink-0 shadow-sm">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">
            N
          </div>
          <div>
            <div className="font-black text-gray-900 text-base gradient-text">Nilexis.Et</div>
            <div className="text-xs text-gray-500 font-medium">Admin Panel</div>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map(l => (
          <NavLink key={l.to} to={l.to} onClick={handleNavClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold smooth-transition ${
                isActive 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }>
            <span className="text-lg">{l.icon}</span>
            <span>{l.label}</span>
          </NavLink>
        ))}
      </nav>
      
      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-red-50 hover:text-red-600 smooth-transition">
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
