import { useEffect, useState } from 'react';
import { getAllOrders, approveOrder, rejectOrder, Order } from '../../api';
import { tg } from '../../telegram';

const STATUSES = ['all', 'pending', 'approved', 'rejected'];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    getAllOrders(filter === 'all' ? undefined : filter)
      .then(setOrders)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [filter]);

  const handleApprove = async (id: number) => {
    tg?.showConfirm('Approve this order and send invite link?', async (ok) => {
      if (!ok) return;
      setActionId(id);
      try {
        await approveOrder(id);
        load();
      } catch (err: any) {
        tg?.showAlert(err?.response?.data?.error || 'Failed to approve');
      } finally {
        setActionId(null);
      }
    });
  };

  const handleReject = async (id: number) => {
    const note = prompt('Rejection reason (optional):') || '';
    setActionId(id);
    try {
      await rejectOrder(id, note);
      load();
    } catch (err: any) {
      tg?.showAlert(err?.response?.data?.error || 'Failed to reject');
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📦 Orders</h1>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {STATUSES.map(s => (
          <button key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap capitalize ${filter === s ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
            {s}
          </button>
        ))}
      </div>

      {loading ? <div className="text-center py-8 text-gray-400">Loading...</div> : (
        orders.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-2">📭</div>
            <p>No orders found</p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="rounded-xl border mb-3 overflow-hidden"
              style={{ borderColor: '#e5e7eb' }}>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold">{order.course_title}</div>
                    <div className="text-blue-600 font-bold">{order.course_price?.toLocaleString()} ETB</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === 'approved' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>{order.status}</span>
                </div>
                <div className="text-sm space-y-1 text-gray-600">
                  <div>👤 {order.full_name} {order.telegram_username && `(@${order.telegram_username})`}</div>
                  <div>📞 {order.phone}</div>
                  <div>🕐 {new Date(order.created_at).toLocaleString()}</div>
                </div>
                {order.screenshot_path && (
                  <a href={`/uploads/${order.screenshot_path}`} target="_blank" rel="noreferrer"
                    className="mt-2 inline-block text-sm text-blue-500 underline">
                    📷 View Screenshot
                  </a>
                )}
                {order.reject_note && (
                  <div className="mt-2 text-xs text-red-500 bg-red-50 p-2 rounded">Reason: {order.reject_note}</div>
                )}
                {order.invite_link && (
                  <div className="mt-2 text-xs text-green-600 bg-green-50 p-2 rounded break-all">
                    🔗 {order.invite_link}
                  </div>
                )}
              </div>
              {order.status === 'pending' && (
                <div className="flex border-t" style={{ borderColor: '#e5e7eb' }}>
                  <button
                    onClick={() => handleApprove(order.id)}
                    disabled={actionId === order.id}
                    className="flex-1 py-3 text-sm font-medium text-green-600 hover:bg-green-50 disabled:opacity-50 border-r"
                    style={{ borderColor: '#e5e7eb' }}>
                    {actionId === order.id ? '...' : '✅ Approve'}
                  </button>
                  <button
                    onClick={() => handleReject(order.id)}
                    disabled={actionId === order.id}
                    className="flex-1 py-3 text-sm font-medium text-red-500 hover:bg-red-50 disabled:opacity-50">
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )
      )}
    </div>
  );
}
