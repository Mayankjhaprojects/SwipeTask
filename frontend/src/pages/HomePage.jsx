import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const SkillCard = ({ user, onCardClick, onRequestClick }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 p-6 grid grid-cols-1 md:grid-cols-4 gap-6 cursor-pointer"
      onClick={onCardClick}
    >
      <div className="flex md:flex-col items-center gap-4 md:items-start">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-sm text-gray-500">
          {user.profilePhoto ? (
            <img src={user.profilePhoto} alt="Profile" className="rounded-full w-full h-full object-cover" />
          ) : (
            'Photo'
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-500">Rating: {user.averageRating?.toFixed(1) || 'N/A'} / 5</p>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-teal-600 mb-2">Skills Offered</p>
        <div className="flex flex-wrap gap-2">
          {user.skillsOffered.map((skill, idx) => (
            <span key={idx} className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-indigo-600 mb-2">Skills Wanted</p>
        <div className="flex flex-wrap gap-2">
          {user.skillsWanted.map((skill, idx) => (
            <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div
        className="flex md:justify-end items-start md:items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onRequestClick}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          Request Swap
        </button>
      </div>
    </div>
  );
};

export default function UserSearchPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/users/public`);
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-12 py-10 font-sans">
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Skill Swap Platform</h1>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/requests')}
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Swap Requests
          </button>
          <button
            type="button"
            onClick={() => navigate('/editprofile')}
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Edit Profile
          </button>
        </div>
      </header>

      {/* Optional Filter/Search */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center mb-10">
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 w-full md:w-auto">
          <option>Availability</option>
          <option>Weekends</option>
          <option>Evenings</option>
        </select>
        <input
          type="text"
          placeholder="Search skills..."
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 w-full md:w-64"
        />
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Search
        </button>
      </div>

      {/* User Cards */}
      <div className="space-y-6">
        {users.map((user) => (
          <SkillCard
            key={user._id}
            user={user}
           onCardClick={() => navigate(`/user?id=${user._id}`)}


            onRequestClick={() => navigate(`/swaprequest?to=${user._id}`)}
          />
        ))}
      </div>
    </div>
  );
}
