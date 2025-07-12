import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export default function EditProfileForm() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  console.log('User ID:', id);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    skillsOffered: [],
    skillsWanted: [],
    availability: '',
    profileType: '',
    profilePhoto: '',
  });

  const [loading, setLoading] = useState(true);
  const [newSkillOffered, setNewSkillOffered] = useState('');
  const [newSkillWanted, setNewSkillWanted] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/users/${id}`);
        const user = res.data;
        setFormData({
          name: user.name || '',
          location: user.location || '',
          skillsOffered: user.skillsOffered || [],
          skillsWanted: user.skillsWanted || [],
          availability: user.availability || '',
          profileType: user.profileType || 'Public',
          profilePhoto: user.profilePhoto || '',
        });
      } catch (err) {
        console.error('Failed to fetch user:', err);
        showToast('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUserData();
  }, [id]);

  const handleSkillRemove = (type, skill) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((s) => s !== skill),
    }));
  };

  const addSkill = (type, skill) => {
    if (!skill.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], skill.trim()],
    }));

    if (type === 'skillsOffered') setNewSkillOffered('');
    if (type === 'skillsWanted') setNewSkillWanted('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveOrDiscard = async (action) => {
    if (action === 'save') {
      try {
        await axios.put(`${API_BASE}/users/${id}`, formData);
        showToast('Profile updated successfully!');
      } catch (err) {
        console.error('Update failed:', err);
        showToast('Failed to update profile');
      }
    } else {
      window.location.reload();
    }
  };

  if (loading) return <p className="text-center py-20">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-12 py-10 font-sans">
      {toast &&
        createPortal(
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow-lg z-50">
            {toast}
          </div>,
          document.body
        )}

      <header className="flex justify-between items-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Edit Profile</h1>
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleSaveOrDiscard('save')}
            className="text-green-600 font-semibold hover:underline"
          >
            Save
          </button>
          <button
            onClick={() => handleSaveOrDiscard('discard')}
            className="text-red-600 font-semibold hover:underline"
          >
            Discard
          </button>
        </div>
      </header>

      {/* Continue rendering your form like before using formData */}
      {/* Your full form fields go here (not repeated for brevity) */}
    </div>
  );
}