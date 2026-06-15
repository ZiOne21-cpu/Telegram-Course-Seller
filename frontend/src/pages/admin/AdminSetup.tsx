import { useEffect, useState } from 'react';
import { getPaymentSettings, updateSettings, PaymentSettings } from '../../api';
import { tg } from '../../telegram';

export default function AdminSetup() {
  const [form, setForm] = useState<PaymentSettings>({
    cbe_account: '',
    cbe_name: '',
    telebirr_account: '',
    telebirr_name: '',
    payment_instructions: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getPaymentSettings().then(setForm).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings(form);
      tg?.showAlert('✅ Settings saved!');
    } catch (err: any) {
      tg?.showAlert(err?.response?.data?.error || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">💳 Payment Setup</h1>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2 text-blue-600">🏦 CBE Account</h3>
          <input type="text" placeholder="Account Name"
            value={form.cbe_name}
            onChange={e => setForm(f => ({ ...f, cbe_name: e.target.value }))}
            className="w-full border rounded-lg px-4 py-3 text-sm mb-2 outline-none"
            style={{ borderColor: '#e5e7eb' }}
          />
          <input type="text" placeholder="Account Number"
            value={form.cbe_account}
            onChange={e => setForm(f => ({ ...f, cbe_account: e.target.value }))}
            className="w-full border rounded-lg px-4 py-3 text-sm outline-none"
            style={{ borderColor: '#e5e7eb' }}
          />
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-green-600">📱 Telebirr Account</h3>
          <input type="text" placeholder="Account Name"
            value={form.telebirr_name}
            onChange={e => setForm(f => ({ ...f, telebirr_name: e.target.value }))}
            className="w-full border rounded-lg px-4 py-3 text-sm mb-2 outline-none"
            style={{ borderColor: '#e5e7eb' }}
          />
          <input type="text" placeholder="Phone Number"
            value={form.telebirr_account}
            onChange={e => setForm(f => ({ ...f, telebirr_account: e.target.value }))}
            className="w-full border rounded-lg px-4 py-3 text-sm outline-none"
            style={{ borderColor: '#e5e7eb' }}
          />
        </div>
        <div>
          <h3 className="font-semibold mb-2">📝 Buyer Instructions</h3>
          <textarea
            placeholder="Instructions shown to buyers before payment..."
            rows={4}
            value={form.payment_instructions}
            onChange={e => setForm(f => ({ ...f, payment_instructions: e.target.value }))}
            className="w-full border rounded-lg px-4 py-3 text-sm resize-none outline-none"
            style={{ borderColor: '#e5e7eb' }}
          />
        </div>
        <button onClick={handleSave} disabled={saving}
          className="w-full py-3 rounded-xl font-semibold text-white disabled:opacity-50"
          style={{ backgroundColor: 'var(--tg-theme-button-color)' }}>
          {saving ? 'Saving...' : '💾 Save Settings'}
        </button>
      </div>
    </div>
  );
}
