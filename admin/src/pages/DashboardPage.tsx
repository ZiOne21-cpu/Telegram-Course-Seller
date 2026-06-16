import { useEffect, useState } from 'react';
import { getStats, Stats } from '../api';

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getStats().then(setStats).finally(() => setLoading(false)); }, []);

  const cards = [
    { label: 'Total Revenue', value: `${(stats?.totalRevenue || 0).toLocaleString()} ETB`, icon: '💰', color: 'from-emerald-500 to-green-500', bg: 'bg-emerald-50', text: 'text-emerald-700' },
    { label: 'Total Buyers', value: stats?.totalBuyers || 0, icon: '👥', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', text: 'text-blue-700' },
    { label: 'Pending Orders', value: stats?.pendingCount || 0, icon: '⏳', color: 'from-amber-500 to-yellow-500', bg: 'bg-amber-50', text: 'text-amber-700' },
    { label: 'Approved Orders', value: stats?.approvedCount || 0, icon: '✅', color: 'from-indigo-500 to-purple-500', bg: 'bg-indigo-50', text: 'text-indigo-700' },
  ];

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1.5 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
          <h1 className="text-3xl font-black text-gray-900">Dashboard</h1>
        </div>
        <p className="text-gray-500 text-sm ml-6">Welcome back to <span className="gradient-text font-semibold">Nilexis.Et</span> Admin</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          </div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {cards.map((c, i) => (
              <div key={i} className={`${c.bg} rounded-2xl p-6 card-shadow-hover smooth-transition border border-gray-200/50`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {c.icon}
                  </div>
                </div>
                <div className={`text-3xl font-black ${c.text} mb-1`}>{c.value}</div>
                <div className="text-sm text-gray-600 font-medium">{c.label}</div>
              </div>
            ))}
          </div>

          {/* Revenue by Course */}
          {stats?.revenueByCourse && stats.revenueByCourse.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 card-shadow">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-black text-xl text-gray-900">Revenue by Course</h2>
                  <p className="text-sm text-gray-500 mt-1">Top performing courses</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
              </div>
              <div className="space-y-4">
                {stats.revenueByCourse.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 smooth-transition border border-gray-100">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                        #{i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 text-sm mb-1">{item.title}</div>
                        <div className="text-xs text-gray-500">{item.sales} sale{item.sales !== 1 ? 's' : ''}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-lg gradient-text">{item.revenue.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">ETB</div>
                    </div>
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
