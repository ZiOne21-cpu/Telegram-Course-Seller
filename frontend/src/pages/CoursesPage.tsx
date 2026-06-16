import { useEffect, useState } from 'react';
import { getCourses, getMyOrders, Course, Order } from '../api';
import CourseCard from '../components/CourseCard';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getCourses(), getMyOrders()])
      .then(([c, o]) => { setCourses(c); setOrders(o); })
      .catch(() => setError('Failed to load courses'))
      .finally(() => setLoading(false));
  }, []);

  const getOrder = (courseId: number) =>
    orders.find(o => o.course_id === courseId && o.status !== 'rejected');

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-purple-500/20 border-b-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
      </div>
    </div>
  );

  if (error) return (
    <div className="p-4 text-center">
      <div className="glass rounded-2xl p-6 max-w-sm mx-auto">
        <div className="text-4xl mb-3">⚠️</div>
        <p className="text-red-400 font-medium">{error}</p>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#0a0e27', minHeight: '100vh' }}>
      {/* Hero header */}
      <div className="px-4 pt-8 pb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
          <p className="text-sm font-bold tracking-wide uppercase gradient-text">
            Premium Courses
          </p>
        </div>
        <h1 className="text-3xl font-black text-white leading-tight mb-3 tracking-tight">
          All the Creative Courses<br />You Need In One Place
        </h1>
        <p className="text-gray-400 text-sm">
          Unlock exclusive content and join private channels instantly
        </p>
      </div>

      {/* Course grid */}
      {courses.length === 0 ? (
        <div className="text-center py-20 px-4">
          <div className="glass rounded-3xl p-10 max-w-sm mx-auto">
            <div className="text-7xl mb-4 opacity-50">📚</div>
            <p className="text-gray-300 font-semibold text-lg mb-2">No courses yet</p>
            <p className="text-gray-500 text-sm">Check back soon for new content!</p>
          </div>
        </div>
      ) : (
        <div className="px-4 pb-4 grid grid-cols-1 gap-4">
          {courses.map(course => {
            const order = getOrder(course.id);
            return (
              <CourseCard
                key={course.id}
                course={course}
                orderStatus={order?.status}
                inviteLink={order?.invite_link}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
