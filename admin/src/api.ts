import axios from 'axios';

// Use Railway backend directly for file uploads, Vercel proxy for API calls
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://vibrant-intuition-production-c1e8.up.railway.app';
const api = axios.create({ baseURL: '/api' });
const directApi = axios.create({ baseURL: `${BACKEND_URL}/api` });

api.interceptors.request.use(config => {
  const id = localStorage.getItem('admin_telegram_id') || '';
  if (id) config.headers['x-admin-id'] = id;
  return config;
});

directApi.interceptors.request.use(config => {
  const id = localStorage.getItem('admin_telegram_id') || '';
  if (id) config.headers['x-admin-id'] = id;
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

export const getAllCourses = () => directApi.get<Course[]>('/courses/all').then(r => r.data);
export const createCourse = (data: Partial<Course>) => directApi.post('/courses', data).then(r => r.data);
export const updateCourse = (id: number, data: Partial<Course>) => directApi.put(`/courses/${id}`, data).then(r => r.data);
export const deleteCourse = (id: number) => directApi.delete(`/courses/${id}`).then(r => r.data);
export const uploadThumbnail = (file: File) => {
  const fd = new FormData();
  fd.append('thumbnail', file);
  return directApi.post<{ url: string }>('/courses/upload-thumbnail', fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(r => r.data.url);
};
export const getAllOrders = (status?: string) => directApi.get<Order[]>('/orders/all', { params: { status } }).then(r => r.data);
export const approveOrder = (id: number) => directApi.post(`/orders/${id}/approve`).then(r => r.data);
export const rejectOrder = (id: number, note: string) => directApi.post(`/orders/${id}/reject`, { note }).then(r => r.data);
export const getPaymentSettings = () => directApi.get<PaymentSettings>('/settings/payment').then(r => r.data);
export const updateSettings = (data: Partial<PaymentSettings>) => directApi.put('/settings', data).then(r => r.data);
export const getStats = () => directApi.get<Stats>('/stats').then(r => r.data);

export default api;
