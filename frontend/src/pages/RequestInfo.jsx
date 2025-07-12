import React, { useState } from "react";

const initialRequests = [
  {
    id: 1,
    name: "Marc Demo",
    skillsOffered: ["JavaScript"],
    skillsWanted: ["Photoshop"],
    rating: 3.9,
  },
  {
    id: 2,
    name: "John Smith",
    skillsOffered: [],
    skillsWanted: [],
    rating: 3.9,
  },
];

export default function SwapRequests() {
  const [requests, setRequests] = useState(initialRequests);

  const handleAction = (id, action) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-8 py-10 font-sans">
      <header className="flex justify-between items-center mb-10 border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-bold">Skill Swap Platform</h1>
        <div className="flex items-center gap-4">
          <a href="#" className="underline">Home</a>
          <img
            src="https://avatars.githubusercontent.com/u/1?v=4"
            className="w-10 h-10 rounded-full border border-gray-300 object-cover"
            alt="Profile"
          />
        </div>
      </header>

      <div className="flex gap-4 mb-8">
        <select className="px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-800">
          <option>Pending</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border border-gray-300 rounded-xl w-64 text-gray-800"
        />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
          Search
        </button>
      </div>

      {requests.map((user) => (
        <div
          key={user.id}
          className="bg-white shadow-xl rounded-2xl p-6 flex justify-between items-center mb-6"
        >
          <div className="flex items-center gap-6 w-full">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-sm text-gray-600">
              <span>Photo</span>
            </div>
            <div className="flex flex-col justify-between w-full h-full py-2">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-left align-centre">{user.name}</h3>
              </div>
              <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-4">
                <div>
                  <p className="text-teal-600 font-medium mb-1">Skills Offered</p>
                  <div className="flex gap-2 flex-wrap">
                    {user.skillsOffered.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-full text-sm bg-teal-100 text-teal-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-indigo-600 font-medium mb-1">Skills Wanted</p>
                  <div className="flex gap-2 flex-wrap">
                    {user.skillsWanted.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-2 text-center md:text-left">Rating: {user.rating}/5</p>
            </div>
          </div>

          <div className="text-right flex flex-col gap-2">
            <button
              onClick={() => handleAction(user.id, "Accepted")}
              className="text-green-600 border border-green-600 px-4 py-1 rounded-xl hover:bg-green-600 hover:text-white"
            >
              Accept
            </button>
            <button
              onClick={() => handleAction(user.id, "Rejected")}
              className="text-red-600 border border-red-600 px-4 py-1 rounded-xl hover:bg-red-600 hover:text-white"
            >
              Reject
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-10 gap-2 text-gray-800">
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-200"
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}