import { NavLink, useNavigate } from 'react-router-dom';

const links = [
  { to: '/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/orders', icon: '📦', label: 'Orders' },
  { to: '/courses', icon: '📚', label: 'Courses' },
  { to: '/setup', icon: '💳', label: 'Payment Setup' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('admin_telegram_id');
    navigate('/');
    window.location.reload();
  };

  return (
    <aside className="w-56 bg-white border-r border-gray-100 flex flex-col h-full shrink-0">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">C</div>
          <div>
            <div className="font-bold text-gray-900 text-sm">Course Admin</div>
            <div className="text-xs text-gray-400">Management Panel</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {links.map(l => (
          <NavLink key={l.to} to={l.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'
              }`
            }>
            <span>{l.icon}</span>
            <span>{l.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-gray-100">
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors">
          <span>🚪</span><span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
