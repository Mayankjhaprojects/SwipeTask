import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export default function UserProfilePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get('id');

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE}/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  if (!user) return <p className="text-center py-20">Loading user profile...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-12 py-10 font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Skill Swap Platform</h1>
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/requests')} className="text-sm font-medium text-gray-700 hover:text-teal-600">Swap Request</button>
          <button onClick={() => navigate('/')} className="text-sm font-medium text-gray-700 hover:text-teal-600">Home</button>
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <img src={user.profilePhoto || 'https://i.pravatar.cc/300'} alt="Profile" />
          </div>
        </div>
      </header>

      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-12">
        <div className="md:col-span-2">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <button
              onClick={() => navigate(`/swaprequest?to=${user._id}`)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Request
            </button>
          </div>

          <div className="mb-4">
            <p className="text-teal-600 font-medium mb-1">Skills Offered</p>
            <div className="flex flex-wrap gap-2">
              {user.skillsOffered.map((skill, idx) => (
                <span key={idx} className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full font-medium">{skill}</span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-indigo-600 font-medium mb-1">Skills Wanted</p>
            <div className="flex flex-wrap gap-2">
              {user.skillsWanted.map((skill, idx) => (
                <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-medium">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm overflow-hidden">
            {user.profilePhoto ? (
              <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              'Profile Photo'
            )}
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Rating & Feedback</h3>
        <p className="text-sm text-gray-600 mb-4">
          Average Rating: {user.averageRating ? user.averageRating.toFixed(1) : 'N/A'} / 5
        </p>
        <div className="space-y-4">
          {(user.feedback || []).map((fb, idx) => (
            <div key={idx} className="border-b pb-3">
              <p className="text-sm font-medium text-gray-700">{fb.by}</p>
              <p className="text-sm text-gray-600">{fb.comment}</p>
              <span className="text-xs text-gray-500">Rating: {fb.rating} / 5</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}