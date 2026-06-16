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
      className="rounded-2xl overflow-hidden cursor-pointer group hover-lift card-shadow-hover smooth-transition"
      style={{ 
        background: 'linear-gradient(135deg, rgba(20, 25, 56, 0.8) 0%, rgba(30, 35, 66, 0.8) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)'
      }}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden" style={{ backgroundColor: '#0a0e27' }}>
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl opacity-50">🎓</div>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Status badge overlay */}
        {orderStatus === 'approved' && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
            <span className="flex items-center gap-1">
              <span>✓</span> Purchased
            </span>
          </div>
        )}
        {orderStatus === 'pending' && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm pulse-glow">
            <span className="flex items-center gap-1">
              <span>⏱</span> Pending
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Category */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 inline-block"></span>
          <span className="text-indigo-400 text-xs font-semibold tracking-wide uppercase">Premium Course</span>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-base leading-snug line-clamp-2 mb-3">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
          {course.description}
        </p>

        {/* Price + action */}
        {orderStatus === 'approved' && inviteLink ? (
          <button className="w-full btn-primary text-sm">
            <span className="flex items-center justify-center gap-2">
              <span>Join Channel</span>
              <span>→</span>
            </span>
          </button>
        ) : orderStatus === 'pending' ? (
          <div className="flex items-center justify-center py-2 text-amber-400 text-sm font-medium">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              Awaiting approval
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div>
              <div className="text-xs text-gray-500 mb-1">Price</div>
              <div className="text-2xl font-bold gradient-text">{course.price.toLocaleString()} ETB</div>
            </div>
            <button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm smooth-transition hover:shadow-lg">
              Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
