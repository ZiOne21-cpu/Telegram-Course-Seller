import { useNavigate } from 'react-router-dom';
import { Course } from '../api';

interface Props {
  course: Course;
  orderStatus?: 'pending' | 'approved' | 'rejected';
  inviteLink?: string;
}

export default function CourseCard({ course, orderStatus, inviteLink }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        if (!orderStatus) navigate(`/checkout/${course.id}`);
        else if (orderStatus === 'approved' && inviteLink) window.open(inviteLink, '_blank');
      }}
      className="rounded-xl overflow-hidden cursor-pointer group transition-transform hover:scale-[1.02]"
      style={{ backgroundColor: '#1c1c1c', border: '1px solid #2a2a2a' }}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden" style={{ backgroundColor: '#111' }}>
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">🎓</div>
        )}
        {/* Status badge overlay */}
        {orderStatus === 'approved' && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            ✅ Purchased
          </div>
        )}
        {orderStatus === 'pending' && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            ⏳ Pending
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        {/* Category dot */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block"></span>
          <span className="text-orange-400 text-xs font-medium">Course</span>
        </div>

        {/* Title */}
        <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 mb-2">
          {course.title}
        </h3>

        {/* Price + action */}
        {orderStatus === 'approved' && inviteLink ? (
          <span className="text-green-400 text-xs font-semibold">Tap to join →</span>
        ) : orderStatus === 'pending' ? (
          <span className="text-yellow-400 text-xs">Awaiting approval</span>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-orange-400 font-bold text-sm">{course.price.toLocaleString()} ETB</span>
            <span className="text-gray-400 text-xs">Buy Now →</span>
          </div>
        )}
      </div>
    </div>
  );
}
