import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourses, getPaymentSettings, submitOrder, Course, PaymentSettings } from '../api';
import { getTelegramUser } from '../telegram';

export default function CheckoutPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [settings, setSettings] = useState<PaymentSettings | null>(null);
  const [form, setForm] = useState({ full_name: '', phone: '' });
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getCourses(), getPaymentSettings()])
      .then(([courses, s]) => {
        const c = courses.find(c => c.id === Number(courseId));
        setCourse(c || null);
        setSettings(s);
        const user = getTelegramUser();
        if (user) setForm(f => ({ ...f, full_name: user.first_name + (user.last_name ? ' ' + user.last_name : '') }));
      })
      .finally(() => setLoading(false));
  }, [courseId]);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleFile = (file: File | null) => {
    setScreenshot(file);
    if (file) setPreviewUrl(URL.createObjectURL(file));
    else setPreviewUrl(null);
  };

  const handleSubmit = async () => {
    if (!form.full_name || !form.phone) {
      alert('Please fill in all required fields');
      return;
    }
    if (!screenshot) {
      alert('Please upload your payment screenshot');
      return;
    }
    setSubmitting(true);
    const fd = new FormData();
    fd.append('course_id', String(courseId));
    fd.append('full_name', form.full_name);
    fd.append('phone', form.phone);
    fd.append('screenshot', screenshot);
    try {
      await submitOrder(fd);
      alert('✅ Order submitted! You will receive your invite link once payment is verified.');
      navigate('/orders');
    } catch (err: any) {
      alert(err?.response?.data?.error || 'Failed to submit order');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!course) return <div className="p-4 text-center text-red-400">Course not found</div>;

  return (
    <div className="p-4 pb-8 max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-orange-400 mb-5 text-sm">
        ← Back
      </button>

      {/* Course summary */}
      <div className="rounded-2xl overflow-hidden border border-white/10 mb-5" style={{ backgroundColor: '#1a1a1a' }}>
        {course.thumbnail_url && <img src={course.thumbnail_url} alt={course.title} className="w-full h-36 object-cover" />}
        <div className="p-4 flex justify-between items-center">
          <div>
            <h2 className="font-bold text-white text-lg">{course.title}</h2>
            <p className="text-gray-400 text-xs mt-0.5">{course.description}</p>
          </div>
          <div className="ml-4 shrink-0">
            <span className="bg-orange-500 text-white font-bold text-sm px-3 py-1.5 rounded-full whitespace-nowrap">
              {course.price.toLocaleString()} ETB
            </span>
          </div>
        </div>
      </div>

      {/* Payment accounts */}
      <div className="rounded-2xl p-4 border border-white/10 mb-5" style={{ backgroundColor: '#1a1a1a' }}>
        <h3 className="font-semibold text-white mb-1">💳 Send Payment To</h3>
        <p className="text-xs text-gray-500 italic mb-3">ክፍያ ወደ • Send Payment To</p>
        {settings?.payment_instructions && (
          <p className="text-xs text-gray-400 mb-3 leading-relaxed">{settings.payment_instructions}</p>
        )}
        <div className="space-y-2">
          {settings?.cbe_account && (
            <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: '#111' }}>
              <div>
                <div className="text-xs text-blue-400 font-semibold mb-0.5">CBE Bank</div>
                <div className="text-white font-semibold text-sm">{settings.cbe_name}</div>
                <div className="text-blue-300 font-mono text-sm">{settings.cbe_account}</div>
              </div>
              <button onClick={() => copy(settings.cbe_account, 'cbe')}
                className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-medium border border-blue-500/30">
                {copied === 'cbe' ? '✓' : 'Copy'}
              </button>
            </div>
          )}
          {settings?.telebirr_account && (
            <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: '#111' }}>
              <div>
                <div className="text-xs text-green-400 font-semibold mb-0.5">Telebirr</div>
                <div className="text-white font-semibold text-sm">{settings.telebirr_name}</div>
                <div className="text-green-300 font-mono text-sm">{settings.telebirr_account}</div>
              </div>
              <button onClick={() => copy(settings.telebirr_account, 'telebirr')}
                className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-xs font-medium border border-green-500/30">
                {copied === 'telebirr' ? '✓' : 'Copy'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Buyer form */}
      <div className="space-y-3 mb-5">
        <h3 className="font-semibold text-white mb-1">📝 Your Details</h3>
        <p className="text-xs text-gray-500 italic mb-2">የእርስዎ ዝርዝሮች • Your Details</p>
        <input type="text" placeholder="Full Name * / ሙሉ ስም *" value={form.full_name}
          onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
          className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-orange-500/50 border border-white/10"
          style={{ backgroundColor: '#1a1a1a' }} />
        <input type="tel" placeholder="Phone Number * / ስልክ ቁጥር *" value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-orange-500/50 border border-white/10"
          style={{ backgroundColor: '#1a1a1a' }} />
      </div>

      {/* Screenshot upload */}
      <div className="mb-6">
        <h3 className="font-semibold text-white mb-1">📸 Payment Screenshot *</h3>
        <p className="text-xs text-gray-500 italic mb-2">የክፍያ ፎቶ • Payment Screenshot</p>
        <label className="block border-2 border-dashed rounded-2xl cursor-pointer transition-colors overflow-hidden"
          style={{ borderColor: screenshot ? '#22c55e' : '#333' }}>
          {previewUrl ? (
            <div className="relative">
              <img src={previewUrl} alt="screenshot" className="w-full h-40 object-cover" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white text-sm">Tap to change</span>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="text-4xl mb-2">📷</div>
              <div className="text-sm text-gray-400">Tap to upload screenshot</div>
              <div className="text-xs text-gray-600 mt-1">PNG, JPG up to 5MB</div>
            </div>
          )}
          <input type="file" accept="image/*" className="hidden"
            onChange={e => handleFile(e.target.files?.[0] || null)} />
        </label>
      </div>

      <button onClick={handleSubmit} disabled={submitting}
        className="w-full py-4 rounded-2xl font-bold text-white text-base disabled:opacity-50 transition-opacity hover:opacity-90"
        style={{ background: submitting ? '#555' : 'linear-gradient(135deg, #f97316, #ea580c)' }}>
        {submitting ? 'Submitting... / በመላክ ላይ...' : '✅ Submit Payment / ክፍያ ያስገቡ'}
      </button>
    </div>
  );
}
