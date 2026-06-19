import { useEffect, useState } from 'react';
import { getPaymentSettings, updateSettings, PaymentSettings } from '../api';

export default function SetupPage() {
  const [form, setForm] = useState<PaymentSettings>({ cbe_account: '', cbe_name: '', telebirr_account: '', telebirr_name: '', payment_instructions: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { 
    getPaymentSettings()
      .then(setForm)
      .catch(err => {
        console.error('Failed to load payment settings:', err);
        // Keep default empty form
      })
      .finally(() => setLoading(false)); 
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: any) {
      alert(err?.response?.data?.error || 'Failed to save');
    } finally { setSaving(false); }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-6 max-w-xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payment Setup</h1>
        <p className="text-gray-500 text-sm mt-1">Configure your CBE and Telebirr payment accounts</p>
      </div>

      <div className="space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-sm">🏦</span>
            CBE Bank Account
          </h3>
          <div className="space-y-3">
            <input type="text" placeholder="Account Holder Name" value={form.cbe_name}
              onChange={e => setForm(f => ({ ...f, cbe_name: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400" />
            <input type="text" placeholder="Account Number" value={form.cbe_account}
              onChange={e => setForm(f => ({ ...f, cbe_account: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center text-sm">📱</span>
            Telebirr Account
          </h3>
          <div className="space-y-3">
            <input type="text" placeholder="Account Holder Name" value={form.telebirr_name}
              onChange={e => setForm(f => ({ ...f, telebirr_name: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400" />
            <input type="tel" placeholder="Phone Number" value={form.telebirr_account}
              onChange={e => setForm(f => ({ ...f, telebirr_account: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-sm">📝</span>
            Buyer Instructions
          </h3>
          <textarea rows={4} placeholder="Instructions shown to buyers on the checkout page..."
            value={form.payment_instructions}
            onChange={e => setForm(f => ({ ...f, payment_instructions: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
        </div>

        <button onClick={handleSave} disabled={saving}
          className={`w-full py-3 rounded-xl font-semibold text-white transition-colors ${saved ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-600'} disabled:opacity-50`}>
          {saved ? '✅ Saved!' : saving ? 'Saving...' : '💾 Save Settings'}
        </button>
      </div>
    </div>
  );
}
