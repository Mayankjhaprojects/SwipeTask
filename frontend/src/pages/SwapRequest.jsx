import React, { useState } from "react";

export default function SwapRequestForm() {
  const [formData, setFormData] = useState({
    offeredSkill: "",
    wantedSkill: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle submission logic here (API call or modal etc.)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10 font-sans">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Send Swap Request
        </h2>

        <label className="block text-gray-700 mb-1">
          Choose one of your offered skills
        </label>
        <select
          name="offeredSkill"
          value={formData.offeredSkill}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">-- Select a skill --</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Design">Graphic Design</option>
          <option value="Video Editing">Video Editing</option>
        </select>

        <label className="block text-gray-700 mb-1">
          Choose one of their wanted skills
        </label>
        <select
          name="wantedSkill"
          value={formData.wantedSkill}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">-- Select a skill --</option>
          <option value="Photoshop">Photoshop</option>
          <option value="Python">Python</option>
          <option value="Manager">Manager</option>
        </select>

        <label className="block text-gray-700 mb-1">Message</label>
        <textarea
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}