import axios from 'axios';

// HARDCODED Railway backend URL - no environment variables needed
const RAILWAY_BACKEND = 'https://telegram-course-seller-production-49a2.up.railway.app';
const api = axios.create({ baseURL: '/api' });
const directApi = axios.create({ baseURL: `${RAILWAY_BACKEND}/api` });

api.interceptors.request.use(config => {
  const id = localStorage.getItem('admin_telegram_id') || '';
  if (id) config.headers['x-admin-id'] = id;
  // Prevent caching
  config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
  config.headers['Pragma'] = 'no-cache';
  config.headers['Expires'] = '0';
  return config;
});

directApi.interceptors.request.use(config => {
  const id = localStorage.getItem('admin_telegram_id') || '';
  if (id) config.headers['x-admin-id'] = id;
  // Prevent caching
  config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
  config.headers['Pragma'] = 'no-cache';
  config.headers['Expires'] = '0';
  return config;
});

export interface Course {
  id: number; title: string; description: string; price: number;
  thumbnail_url: string; channel_id?: string; active?: number; created_at?: string;
}
export interface Order {
  id: number; course_id: number; telegram_id: string; telegram_username: string;
  full_name: string; phone: string; screenshot_path: string;
  status: 'pending' | 'approved' | 'rejected'; reject_note?: string;
  invite_link?: string; created_at: string; course_title?: string;
  course_price?: number; channel_id?: string;
}
export interface Stats {
  totalRevenue: number; totalBuyers: number; pendingCount: number;
  approvedCount: number; rejectedCount: number;
  revenueByCourse: { title: string; revenue: number; sales: number }[];
}
export interface PaymentSettings {
  cbe_account: string; cbe_name: string; telebirr_account: string;
  telebirr_name: string; payment_instructions: string;
}

export const getAllCourses = () => api.get<Course[]>('/courses/all').then(r => {
  // Validate response is an array
  if (!Array.isArray(r.data)) {
    console.error('getAllCourses: Expected array but got:', r.data);
    return [];
  }
  return r.data;
});
export const createCourse = (data: Partial<Course>) => api.post('/courses', data).then(r => r.data);
export const updateCourse = (id: number, data: Partial<Course>) => api.put(`/courses/${id}`, data).then(r => r.data);
export const deleteCourse = (id: number) => api.delete(`/courses/${id}`).then(r => r.data);
export const uploadThumbnail = (file: File) => {
  const fd = new FormData();
  fd.append('thumbnail', file);
  
  console.log('=== UPLOAD DEBUG ===');
  console.log('Uploading to Railway directly:', 'https://telegram-course-seller-production-49a2.up.railway.app/api/courses/upload-thumbnail');
  console.log('File:', file.name, file.size, 'bytes');
  
  return directApi.post<{ url: string }>('/courses/upload-thumbnail', fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  .then(r => {
    console.log('✅ Upload success:', r.data);
    return r.data.url;
  })
  .catch(err => {
    console.error('❌ Upload error:', err);
    console.error('Error response:', err.response?.data);
    console.error('Error status:', err.response?.status);
    throw err;
  });
};
export const getAllOrders = (status?: string) => api.get<Order[]>('/orders/all', { params: { status } }).then(r => {
  // Validate response is an array
  if (!Array.isArray(r.data)) {
    console.error('getAllOrders: Expected array but got:', r.data);
    return [];
  }
  return r.data;
});
export const approveOrder = (id: number) => api.post(`/orders/${id}/approve`).then(r => r.data);
export const rejectOrder = (id: number, note: string) => api.post(`/orders/${id}/reject`, { note }).then(r => r.data);
export const getPaymentSettings = () => api.get<PaymentSettings>('/settings/payment').then(r => {
  // Validate response is an object with expected shape
  if (!r.data || typeof r.data !== 'object' || 'error' in r.data) {
    console.error('getPaymentSettings: Invalid response:', r.data);
    return { cbe_account: '', cbe_name: '', telebirr_account: '', telebirr_name: '', payment_instructions: '' };
  }
  return r.data;
});
export const updateSettings = (data: Partial<PaymentSettings>) => api.put('/settings', data).then(r => r.data);
export const getStats = () => api.get<Stats>('/stats').then(r => r.data);

export default api;
