import { useEffect, useState } from 'react';
import { getAllOrders, approveOrder, rejectOrder, Order } from '../api';

const STATUSES = ['all', 'pending', 'approved', 'rejected'];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    getAllOrders(filter === 'all' ? undefined : filter).then(setOrders).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [filter]);

  const handleApprove = async (id: number) => {
    if (!window.confirm('Approve this order and send invite link to buyer?')) return;
    setActionId(id);
    try {
      await approveOrder(id);
      load();
    } catch (err: any) {
      alert(err?.response?.data?.error || 'Failed to approve');
    } finally {
      setActionId(null);
    }
  };

  const handleReject = async (id: number) => {
    const note = window.prompt('Rejection reason (optional):') ?? '';
    if (note === null) return;
    setActionId(id);
    try {
      await rejectOrder(id, note);
      load();
    } catch (err: any) {
      alert(err?.response?.data?.error || 'Failed to reject');
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500 text-sm mt-1">Review and approve payments</p>
        </div>
        <button onClick={load} className="px-4 py-2 text-sm bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200">
          ↻ Refresh
        </button>
      </div>

      <div className="flex gap-2 mb-5">
        {STATUSES.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
              filter === s ? 'bg-orange-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}>
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-2">📭</div>
          <p>No {filter === 'all' ? '' : filter} orders</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-gray-900">{order.course_title}</div>
                    <div className="text-orange-500 font-bold text-sm mt-0.5">{order.course_price?.toLocaleString()} ETB</div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === 'approved' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>{order.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div><span className="text-gray-400">Name:</span> {order.full_name}</div>
                  <div><span className="text-gray-400">Phone:</span> {order.phone}</div>
                  {order.telegram_username && <div><span className="text-gray-400">@:</span> {order.telegram_username}</div>}
                  <div><span className="text-gray-400">Date:</span> {new Date(order.created_at).toLocaleDateString()}</div>
                </div>
                <div className="flex gap-3 mt-3">
                  {order.screenshot_path && (
                    <a href={`/uploads/${order.screenshot_path}`} target="_blank" rel="noreferrer"
                      className="text-sm text-blue-500 underline">
                      📷 View Screenshot
                    </a>
                  )}
                  {order.invite_link && (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded truncate max-w-xs">{order.invite_link}</span>
                  )}
                </div>
                {order.reject_note && (
                  <div className="mt-2 p-2 bg-red-50 rounded-lg text-xs text-red-500">Reason: {order.reject_note}</div>
                )}
              </div>
              {order.status === 'pending' && (
                <div className="flex border-t border-gray-100">
                  <button onClick={() => handleApprove(order.id)} disabled={actionId === order.id}
                    className="flex-1 py-3 text-sm font-semibold text-green-600 hover:bg-green-50 transition-colors disabled:opacity-50 border-r border-gray-100">
                    {actionId === order.id ? '⏳' : '✅ Approve'}
                  </button>
                  <button onClick={() => handleReject(order.id)} disabled={actionId === order.id}
                    className="flex-1 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50">
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
