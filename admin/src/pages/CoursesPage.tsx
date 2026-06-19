import { useEffect, useRef, useState } from 'react';
import { getAllCourses, createCourse, updateCourse, deleteCourse, uploadThumbnail, Course } from '../api';

const EMPTY: Partial<Course> = { title: '', description: '', price: 0, thumbnail_url: '', channel_id: '', active: 1 };

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editing, setEditing] = useState<Partial<Course> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [thumbUploading, setThumbUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = () => getAllCourses()
    .then(data => {
      if (Array.isArray(data)) {
        setCourses(data);
      } else {
        console.error('API returned non-array:', data);
        setCourses([]);
      }
    })
    .catch(err => {
      console.error('Failed to load courses:', err);
      setCourses([]);
    })
    .finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const startEdit = (course: Partial<Course>) => {
    setEditing(course);
    setThumbPreview(course.thumbnail_url || null);
  };

  const handleThumbnailChange = async (file: File | null) => {
    if (!file) return;
    setThumbPreview(URL.createObjectURL(file));
    setThumbUploading(true);
    try {
      const url = await uploadThumbnail(file);
      setEditing(p => ({ ...p!, thumbnail_url: url }));
    } catch {
      alert('Failed to upload image');
      setThumbPreview(editing?.thumbnail_url || null);
    } finally {
      setThumbUploading(false);
    }
  };

  const handleSave = async () => {
    if (!editing?.title || !editing?.channel_id || !editing?.price) {
      alert('Title, price, and channel link are required');
      return;
    }
    setSaving(true);
    try {
      editing.id ? await updateCourse(editing.id, editing) : await createCourse(editing);
      setEditing(null);
      setThumbPreview(null);
      load();
    } catch (err: any) {
      alert(err?.response?.data?.error || 'Failed to save');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this course?')) return;
    await deleteCourse(id);
    load();
  };

  if (editing !== null) {
    return (
      <div className="p-6 max-w-xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => { setEditing(null); setThumbPreview(null); }}
            className="text-gray-400 hover:text-gray-600 text-lg">←</button>
          <h1 className="text-xl font-bold text-gray-900">{editing.id ? 'Edit Course' : 'Add New Course'}</h1>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">

          {/* Thumbnail image upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative w-full h-44 rounded-xl border-2 border-dashed border-gray-200 overflow-hidden cursor-pointer hover:border-orange-400 transition-colors group"
            >
              {thumbPreview ? (
                <>
                  <img src={thumbPreview} alt="thumbnail" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-medium">
                      {thumbUploading ? 'Uploading...' : 'Click to change'}
                    </span>
                  </div>
                  {thumbUploading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">Click to upload thumbnail</span>
                  <span className="text-xs text-gray-300">PNG, JPG up to 5MB</span>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => handleThumbnailChange(e.target.files?.[0] || null)}
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input type="text" placeholder="Course title" value={editing.title || ''}
              onChange={e => setEditing(p => ({ ...p!, title: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea rows={3} placeholder="Course description" value={editing.description || ''}
              onChange={e => setEditing(p => ({ ...p!, description: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (ETB) *</label>
            <input type="number" placeholder="500" value={editing.price || ''}
              onChange={e => setEditing(p => ({ ...p!, price: Number(e.target.value) }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
          </div>

          {/* Channel Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Channel Link *</label>
            <input
              type="text"
              placeholder="https://t.me/+abc123 or @channelname or -1001234567890"
              value={editing.channel_id || ''}
              onChange={e => setEditing(p => ({ ...p!, channel_id: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
            <p className="text-xs text-gray-400 mt-1">
              Paste your private channel invite link, @username, or numeric ID
            </p>
          </div>

          {/* Active toggle (edit mode only) */}
          {editing.id && (
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={editing.active === 1}
                onChange={e => setEditing(p => ({ ...p!, active: e.target.checked ? 1 : 0 }))}
                className="w-4 h-4 accent-orange-500" />
              <span className="text-sm text-gray-700">Active (visible to buyers)</span>
            </label>
          )}

          <button onClick={handleSave} disabled={saving || thumbUploading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors disabled:opacity-50">
            {saving ? 'Saving...' : editing.id ? 'Update Course' : 'Create Course'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your course catalogue</p>
        </div>
        <button onClick={() => startEdit({ ...EMPTY })}
          className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors">
          + Add Course
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-2">📭</div>
          <p>No courses yet. Add your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4">
              {course.thumbnail_url ? (
                <img src={course.thumbnail_url} alt={course.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-2xl shrink-0">🎓</div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-gray-900 truncate">{course.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${course.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {course.active ? 'Active' : 'Hidden'}
                  </span>
                </div>
                <div className="text-orange-500 font-bold text-sm mt-0.5">{course.price.toLocaleString()} ETB</div>
                <div className="text-xs text-gray-400 mt-0.5 truncate">{course.channel_id}</div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(course)}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100">Edit</button>
                <button onClick={() => handleDelete(course.id)}
                  className="px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-sm font-medium hover:bg-red-100">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
