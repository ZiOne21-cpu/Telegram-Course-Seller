import { useEffect, useState } from 'react';
import { getMyOrders, Order } from '../api';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders().then(setOrders).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-1">My Orders / የእኔ ትዕዛዞች</h1>
      <p className="text-gray-400 text-sm mb-1">Track your course purchases</p>
      <p className="text-gray-500 text-xs italic mb-5">የኮርስ ግዢዎችዎን ይከታተሉ</p>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-white font-semibold mb-1">No orders yet / ገና ትዕዛዝ የለም</p>
          <p className="text-gray-400 text-sm mb-1">Browse courses and make your first purchase</p>
          <p className="text-gray-500 text-xs italic">ኮርሶችን ያስሱ እና የመጀመሪያ ግዢዎን ያድርጉ</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => (
            <div key={order.id} className="rounded-2xl p-4 border border-white/10" style={{ backgroundColor: '#1a1a1a' }}>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-white flex-1 pr-3">{order.course_title}</h3>
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 ${
                  order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                  order.status === 'approved' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {order.status === 'pending' ? '⏳ Pending' : order.status === 'approved' ? '✅ Approved' : '❌ Rejected'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-orange-400 font-bold">{order.course_price?.toLocaleString()} ETB</span>
                <span className="text-gray-500 text-xs">{new Date(order.created_at).toLocaleDateString()}</span>
              </div>
              {order.status === 'approved' && order.invite_link && (
                <a href={order.invite_link} target="_blank" rel="noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-500/20 text-green-400 font-semibold text-sm border border-green-500/30">
                  🔗 Join Private Channel
                </a>
              )}
              {order.status === 'rejected' && order.reject_note && (
                <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-xs text-red-400">Reason: {order.reject_note}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
