import { useEffect, useState } from 'react';
import { getStats, Stats } from '../api';

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getStats().then(setStats).finally(() => setLoading(false)); }, []);

  const cards = [
    { label: 'Total Revenue', value: `${(stats?.totalRevenue || 0).toLocaleString()} ETB`, icon: '💰', color: 'bg-orange-50 text-orange-600 border-orange-100' },
    { label: 'Total Buyers', value: stats?.totalBuyers || 0, icon: '👥', color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { label: 'Pending Orders', value: stats?.pendingCount || 0, icon: '⏳', color: 'bg-yellow-50 text-yellow-600 border-yellow-100' },
    { label: 'Approved Orders', value: stats?.approvedCount || 0, icon: '✅', color: 'bg-green-50 text-green-600 border-green-100' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your course shop</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {cards.map((c, i) => (
              <div key={i} className={`rounded-2xl p-4 border ${c.color}`}>
                <div className="text-2xl mb-2">{c.icon}</div>
                <div className="text-xl font-bold">{c.value}</div>
                <div className="text-sm opacity-70 mt-0.5">{c.label}</div>
              </div>
            ))}
          </div>

          {stats?.revenueByCourse && stats.revenueByCourse.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Revenue by Course</h2>
              <div className="space-y-3">
                {stats.revenueByCourse.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <div className="font-medium text-sm text-gray-900">{item.title}</div>
                      <div className="text-xs text-gray-400">{item.sales} sale{item.sales !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="font-bold text-orange-500">{item.revenue.toLocaleString()} ETB</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
