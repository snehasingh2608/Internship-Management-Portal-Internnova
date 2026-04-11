import React, { useState, useEffect } from 'react';
import { userAPI } from '../../api/api';
import StudentLayout from '../../layout/StudentLayout';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    year: '',
    skills: '',
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // ================= FETCH PROFILE =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userAPI.getProfile();
        const u = res.data;

        setFormData({
          name: u.name || '',
          email: u.email || '',
          department: u.department || '',
          year: u.year || '',
          skills: Array.isArray(u.skills) ? u.skills.join(', ') : u.skills || '',
        });
      } catch (err) {
        console.error(err);
        setMessage({ type: 'error', text: 'Error fetching profile' });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const data = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        resume: resumeFile,
      };

      await userAPI.updateProfile(data);

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setEdit(false);

    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="animate-spin h-10 w-10 border-b-2 border-indigo-600 rounded-full"></div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">

        {edit ? (
          // ================= EDIT MODE =================
          <div className="bg-white rounded-xl shadow-md p-8 pt-6">

            <h2 className="text-xl font-bold mb-6 text-gray-800">Edit Profile</h2>

            {message.text && (
              <div className={`mb-4 text-sm p-3 rounded-lg ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">FULL NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">EMAIL ADDRESS</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 border bg-gray-50 rounded-lg cursor-not-allowed text-gray-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">DEPARTMENT</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Department (e.g. CSE)"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">YEAR</label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="Year (e.g. 3rd Year)"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">SKILLS</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Skills (comma separated, e.g. React, Node.js, Python)"
                  className="w-full px-4 py-3 border rounded-lg min-h-[100px] resize-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2">RESUME UPLOAD</label>
                <input
                  type="file"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer"
                />
              </div>

              <div className="flex gap-4 pt-4 border-t mt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center min-w-[120px]"
                >
                  {saving ? (
                    <div className="flex items-center gap-2">
                       <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                       </svg>
                       Saving...
                    </div>
                  ) : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => setEdit(false)}
                  className="px-8 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>

        ) : (
          // ================= VIEW MODE =================
          <div className="bg-white rounded-xl shadow-md p-8 relative overflow-hidden">
            
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-500"></div>

            <div className="flex justify-between items-start mb-8 mt-2">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-sm border border-indigo-200">
                  {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">Student Information</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Manage your personal profile details
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setEdit(true)}
                className="px-5 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium rounded-lg transition-colors border border-indigo-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                Edit
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8 mt-6 pt-6 border-t border-gray-100">

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 font-bold tracking-wider mb-2">FULL NAME</p>
                <p className="font-medium text-gray-900 text-lg">{formData.name || "Not set"}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 font-bold tracking-wider mb-2">EMAIL</p>
                <p className="font-medium text-gray-900 text-lg">{formData.email}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 font-bold tracking-wider mb-2">DEPARTMENT</p>
                <p className="font-medium text-gray-900 text-lg">{formData.department || "Not set"}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 font-bold tracking-wider mb-2">YEAR</p>
                <p className="font-medium text-gray-900 text-lg">{formData.year || "Not set"}</p>
              </div>

              <div className="col-span-1 md:col-span-2 bg-gray-50 p-5 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 font-bold tracking-wider mb-3">TECHNICAL SKILLS</p>
                <div className="flex gap-2.5 flex-wrap">
                  {formData.skills
                    ? formData.skills.split(',').map((s, i) => {
                        const skill = s.trim();
                        if(!skill) return null;
                        return (
                          <span key={i} className="px-3.5 py-1.5 bg-indigo-100 text-indigo-800 text-sm font-semibold rounded-full border border-indigo-200/50 shadow-sm">
                            {skill}
                          </span>
                        )
                      })
                    : <span className="text-gray-500 text-sm">No skills added yet</span>}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </StudentLayout>
  );
};

export default Profile;
