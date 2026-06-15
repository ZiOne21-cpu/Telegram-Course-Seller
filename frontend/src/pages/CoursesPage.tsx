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
      <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) return <div className="p-4 text-center text-red-400">{error}</div>;

  return (
    <div style={{ backgroundColor: '#0f0f0f', minHeight: '100vh' }}>
      {/* Hero header */}
      <div className="px-4 pt-6 pb-5 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-orange-400 mb-2">
          Premium Courses
        </p>
        <h1 className="text-2xl font-bold text-white leading-tight mb-1">
          All the Creative Courses<br />You Need In One Place
        </h1>
        <p className="text-gray-500 text-xs mt-2">
          Tap a course to unlock access instantly
        </p>
      </div>

      {/* Course grid */}
      {courses.length === 0 ? (
        <div className="text-center py-16 px-4">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-400">No courses available yet</p>
        </div>
      ) : (
        <div className="px-3 pb-4 grid grid-cols-2 gap-3">
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
