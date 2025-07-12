import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SwapRequests() {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.id;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/requests/user/${userId}`);
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchRequests();
  }, [userId]);

  const handleAction = async (requestId, action) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/${requestId}`, {
        status: action,
      });
      setRequests((prev) => prev.filter((r) => r._id !== requestId));
    } catch (err) {
      console.error("Failed to update request:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-8 py-10 font-sans">
      <header className="flex justify-between items-center mb-10 border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-bold">Skill Swap Requests</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/home", { state: { id: userId } })}
            className="underline text-sm"
          >
            Back to Home
          </button>
        </div>
      </header>

      {loading ? (
        <p className="text-center text-gray-500">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-500">No swap requests found.</p>
      ) : (
        requests.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-xl rounded-2xl p-6 flex justify-between items-center mb-6"
          >
            <div className="flex items-center gap-6 w-full">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-sm text-gray-600">
                <span>Photo</span>
              </div>
              <div className="flex flex-col justify-between w-full h-full py-2">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-left">{user.requesterId?.name || "User"}</h3>

                </div>
                <div className="flex flex-col md:flex-row justify-start md:items-center gap-4">
                  <div>
                    <p className="text-teal-600 font-medium mb-1">Skill Offered</p>
                    <span className="px-2 py-1 rounded-full text-sm bg-teal-100 text-teal-800">
                      {user.skillOffered}
                    </span>
                  </div>
                  <div>
                    <p className="text-indigo-600 font-medium mb-1">Skill Requested</p>
                    <span className="px-2 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800">
                      {user.skillRequested}
                    </span>
                  </div>
                </div>
                {user.message && (
                  <p className="text-gray-500 text-sm mt-2">
                    Message: {user.message}
                  </p>
                )}
              </div>
            </div>

            <div className="text-right flex flex-col gap-2">
              <button
                onClick={() => handleAction(user._id, "accepted")}
                className="text-green-600 border border-green-600 px-4 py-1 rounded-xl hover:bg-green-600 hover:text-white"
              >
                Accept
              </button>
              <button
                onClick={() => handleAction(user._id, "rejected")}
                className="text-red-600 border border-red-600 px-4 py-1 rounded-xl hover:bg-red-600 hover:text-white"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}

      {/* Pagination (Static) */}
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
