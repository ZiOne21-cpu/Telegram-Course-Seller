import axios from 'axios';
import { getInitData } from './telegram';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const initData = getInitData();
  if (initData) {
    config.headers['x-telegram-init-data'] = initData;
  }
  return config;
});

export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail_url: string;
  channel_id?: string;
  active?: number;
  created_at?: string;
}

export interface Order {
  id: number;
  course_id: number;
  telegram_id: string;
  telegram_username: string;
  full_name: string;
  phone: string;
  screenshot_path: string;
  status: 'pending' | 'approved' | 'rejected';
  reject_note?: string;
  invite_link?: string;
  created_at: string;
  course_title?: string;
  course_price?: number;
  channel_id?: string;
}

export interface Stats {
  totalRevenue: number;
  totalBuyers: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
  revenueByCourse: { title: string; revenue: number; sales: number }[];
}

export interface PaymentSettings {
  cbe_account: string;
  cbe_name: string;
  telebirr_account: string;
  telebirr_name: string;
  payment_instructions: string;
}

// Courses
export const getCourses = () => api.get<Course[]>('/courses').then(r => r.data);
export const getAllCourses = () => api.get<Course[]>('/courses/all').then(r => r.data);
export const createCourse = (data: Partial<Course>) => api.post('/courses', data).then(r => r.data);
export const updateCourse = (id: number, data: Partial<Course>) => api.put(`/courses/${id}`, data).then(r => r.data);
export const deleteCourse = (id: number) => api.delete(`/courses/${id}`).then(r => r.data);

// Orders
export const submitOrder = (formData: FormData) => api.post('/orders', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
export const getMyOrders = () => api.get<Order[]>('/orders/mine').then(r => r.data);
export const getAllOrders = (status?: string) => api.get<Order[]>('/orders/all', { params: { status } }).then(r => r.data);
export const approveOrder = (id: number) => api.post(`/orders/${id}/approve`).then(r => r.data);
export const rejectOrder = (id: number, note: string) => api.post(`/orders/${id}/reject`, { note }).then(r => r.data);

// Settings
export const getPaymentSettings = () => api.get<PaymentSettings>('/settings/payment').then(r => r.data);
export const updateSettings = (data: Partial<PaymentSettings>) => api.put('/settings', data).then(r => r.data);

// Stats
export const getStats = () => api.get<Stats>('/stats').then(r => r.data);

export default api;
