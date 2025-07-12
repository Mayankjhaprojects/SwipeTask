// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/users/public`);
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Ban (delete) a user
  const banUser = async (id) => {
    if (window.confirm("Are you sure you want to ban this user?")) {
      try {
        await axios.delete(`${API_BASE}/users/${id}`);
        fetchUsers(); // Refresh
      } catch (err) {
        console.error('Error banning user:', err);
      }
    }
  };

  // View feedbacks
  const handleUserClick = async (user) => {
    setSelectedUser(user);
    try {
      const res = await axios.get(`${API_BASE}/feedbacks/user/${user._id}`);
      setFeedbacks(res.data);
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* User list */}
      {!selectedUser && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition relative"
            >
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => handleUserClick(user)}
              >
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  {user.profilePhoto ? (
                    <img
                      src={user.profilePhoto}
                      alt="Profile"
                      className="rounded-full object-cover w-full h-full"
                    />
                  ) : (
                    "Photo"
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-700">
                <p>
                  <strong>Skills Offered:</strong>{" "}
                  {user.skillsOffered?.join(", ") || "N/A"}
                </p>
                <p>
                  <strong>Skills Wanted:</strong>{" "}
                  {user.skillsWanted?.join(", ") || "N/A"}
                </p>
              </div>

              {/* Ban Button */}
              <button
                onClick={() => banUser(user._id)}
                className="absolute top-3 right-4 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-xl text-xs font-medium"
              >
                Ban
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Selected User Profile */}
      {selectedUser && (
        <div className="bg-white shadow-xl rounded-2xl p-8 mt-6 max-w-3xl mx-auto">
          <button
            onClick={() => {
              setSelectedUser(null);
              setFeedbacks([]);
            }}
            className="mb-4 text-teal-600 hover:underline text-sm"
          >
            ← Back to Users
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
              {selectedUser.profilePhoto ? (
                <img
                  src={selectedUser.profilePhoto}
                  alt="Profile"
                  className="rounded-full object-cover w-full h-full"
                />
              ) : (
                "Photo"
              )}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{selectedUser.name}</h2>
              <p className="text-gray-500">{selectedUser.email}</p>
              <p className="text-gray-500">
                Location: {selectedUser.location || "Not specified"}
              </p>
              <p className="text-sm mt-2 text-gray-600">
                Role: <strong>{selectedUser.role}</strong>
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-teal-700 font-semibold mb-2">Skills Offered:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedUser.skillsOffered.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-indigo-700 font-semibold mb-2">Skills Wanted:</p>
            <div className="flex flex-wrap gap-2">
              {selectedUser.skillsWanted.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <hr className="my-6" />

          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Feedback & Ratings
          </h3>
          {feedbacks.length > 0 ? (
            feedbacks.map((fb, idx) => (
              <div
                key={idx}
                className="bg-gray-100 rounded-xl p-4 mb-3"
              >
                <p className="text-gray-800 text-sm">Rating: {fb.rating} / 5</p>
                <p className="text-gray-600 text-sm italic">"{fb.comment}"</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No feedback found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
