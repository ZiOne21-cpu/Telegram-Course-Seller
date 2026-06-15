import { useEffect, useState } from 'react';
import { getAllCourses, createCourse, updateCourse, deleteCourse, Course } from '../../api';
import { tg } from '../../telegram';

const EMPTY: Partial<Course> = { title: '', description: '', price: 0, thumbnail_url: '', channel_id: '', active: 1 };

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editing, setEditing] = useState<Partial<Course> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = () => getAllCourses().then(setCourses).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!editing?.title || !editing?.channel_id || !editing?.price) {
      tg?.showAlert('Title, price, and channel ID are required');
      return;
    }
    setSaving(true);
    try {
      if (editing.id) {
        await updateCourse(editing.id, editing);
      } else {
        await createCourse(editing);
      }
      setEditing(null);
      load();
    } catch (err: any) {
      tg?.showAlert(err?.response?.data?.error || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: number) => {
    tg?.showConfirm('Delete this course?', async (ok) => {
      if (!ok) return;
      await deleteCourse(id);
      load();
    });
  };

  if (editing !== null) {
    return (
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => setEditing(null)} className="text-blue-500">← Back</button>
          <h1 className="text-xl font-bold">{editing.id ? 'Edit Course' : 'Add Course'}</h1>
        </div>
        <div className="space-y-3">
          <input
            type="text" placeholder="Course Title *"
            value={editing.title || ''}
            onChange={e => setEditing(p => ({ ...p!, title: e.target.value }))}
            className="w-full border rounded-lg px-4 py-3 text-sm outline-none"
            style={{ borderColor: '#e5e7eb' }}
          />
          <textarea
            placeholder="Description *" rows={3}
            value={editing.description || ''}
            onChange={e => setEditing(p => ({ ...p!, description: e.target.value }))}
            className="w-full border rounded-lg px-4 py-3 text-sm outline-none resize-none"
            style={{ borderColor: '#e5e7eb' }}
          />
          <input
            type="number" placeholder="Price (ETB) *"
            value={editing.price || ''}
            onChange={e => setEditing(p => ({ ...p!, price: Number(e.target.value) }))}
            className="w-full border rounded-lg px-4 py-3 text-sm outline-none"
            style={{ borderColor: '#e5e7eb' }}
          />
          <input
            type="text" placeholder="Thumbnail URL (optional)"
            value={editing.thumbnail_url || ''}
            onChange={e => setEditing(p => ({ ...p!, thumbnail_url: e.target.value }))}
            className="w-full border rounded-lg px-4 py-3 text-sm outline-none"
            style={{ borderColor: '#e5e7eb' }}
          />
          <input
            type="text" placeholder="Channel ID (e.g. -1001234567890) *"
            value={editing.channel_id || ''}
            onChange={e => setEditing(p => ({ ...p!, channel_id: e.target.value }))}
            className="w-full border rounded-lg px-4 py-3 text-sm outline-none"
            style={{ borderColor: '#e5e7eb' }}
          />
          {editing.id && (
            <label className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color)' }}>
              <input type="checkbox" checked={editing.active === 1}
                onChange={e => setEditing(p => ({ ...p!, active: e.target.checked ? 1 : 0 }))} />
              <span className="text-sm">Course is active (visible to buyers)</span>
            </label>
          )}
          <button onClick={handleSave} disabled={saving}
            className="w-full py-3 rounded-xl font-semibold text-white disabled:opacity-50"
            style={{ backgroundColor: 'var(--tg-theme-button-color)' }}>
            {saving ? 'Saving...' : 'Save Course'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📚 Courses</h1>
        <button onClick={() => setEditing({ ...EMPTY })}
          className="px-4 py-2 rounded-lg text-white text-sm font-medium"
          style={{ backgroundColor: 'var(--tg-theme-button-color)' }}>
          + Add
        </button>
      </div>
      {loading ? <div className="text-center py-8 text-gray-400">Loading...</div> : (
        courses.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-2">📭</div>
            <p>No courses yet</p>
          </div>
        ) : (
          courses.map(course => (
            <div key={course.id} className="rounded-xl border mb-3 p-4"
              style={{ borderColor: '#e5e7eb' }}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-semibold">{course.title}</div>
                  <div className="text-blue-600 font-bold">{course.price.toLocaleString()} ETB</div>
                  <div className="text-xs text-gray-400 mt-1 font-mono">{course.channel_id}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${course.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {course.active ? 'Active' : 'Hidden'}
                  </span>
                </div>
                <div className="flex gap-2 ml-3">
                  <button onClick={() => setEditing(course)}
                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm">Edit</button>
                  <button onClick={() => handleDelete(course.id)}
                    className="px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-sm">Del</button>
                </div>
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
}
