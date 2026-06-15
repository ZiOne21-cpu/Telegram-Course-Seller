import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStats, Stats } from '../../api';

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats().then(setStats).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">⚙️ Admin Panel</h1>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="rounded-xl p-4 bg-blue-50">
          <div className="text-2xl font-bold text-blue-600">{stats?.totalRevenue?.toLocaleString() || 0}</div>
          <div className="text-xs text-blue-400 mt-1">Total Revenue (ETB)</div>
        </div>
        <div className="rounded-xl p-4 bg-purple-50">
          <div className="text-2xl font-bold text-purple-600">{stats?.totalBuyers || 0}</div>
          <div className="text-xs text-purple-400 mt-1">Total Buyers</div>
        </div>
        <div className="rounded-xl p-4 bg-yellow-50">
          <div className="text-2xl font-bold text-yellow-600">{stats?.pendingCount || 0}</div>
          <div className="text-xs text-yellow-400 mt-1">Pending Orders</div>
        </div>
        <div className="rounded-xl p-4 bg-green-50">
          <div className="text-2xl font-bold text-green-600">{stats?.approvedCount || 0}</div>
          <div className="text-xs text-green-400 mt-1">Approved Orders</div>
        </div>
      </div>

      {stats?.revenueByCourse && stats.revenueByCourse.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold mb-3">📊 Revenue by Course</h2>
          {stats.revenueByCourse.map((item, i) => (
            <div key={i} className="flex justify-between items-center p-3 rounded-lg mb-2"
              style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color)' }}>
              <div>
                <div className="font-medium text-sm">{item.title}</div>
                <div className="text-xs text-gray-400">{item.sales} sales</div>
              </div>
              <div className="font-bold text-blue-600">{item.revenue.toLocaleString()} ETB</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-3">
        <Link to="/admin/orders" className="flex items-center gap-3 p-4 rounded-xl border font-medium"
          style={{ borderColor: '#e5e7eb' }}>
          <span className="text-2xl">📦</span>
          <div>
            <div>Manage Orders</div>
            <div className="text-xs text-yellow-500">{stats?.pendingCount} pending</div>
          </div>
          <span className="ml-auto text-gray-400">→</span>
        </Link>
        <Link to="/admin/courses" className="flex items-center gap-3 p-4 rounded-xl border font-medium"
          style={{ borderColor: '#e5e7eb' }}>
          <span className="text-2xl">📚</span>
          <div>Manage Courses</div>
          <span className="ml-auto text-gray-400">→</span>
        </Link>
        <Link to="/admin/setup" className="flex items-center gap-3 p-4 rounded-xl border font-medium"
          style={{ borderColor: '#e5e7eb' }}>
          <span className="text-2xl">💳</span>
          <div>Payment Setup</div>
          <span className="ml-auto text-gray-400">→</span>
        </Link>
      </div>
    </div>
  );
}
