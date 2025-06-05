import React, { useState } from "react";
import axios from "axios";

const EmployeeNotifications = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const updateBanner = async () => {
    if (!message.trim()) {
      setStatus("Banner message cannot be empty");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/banner`, { message });
      setStatus("Homepage banner updated successfully");
      setMessage("");
    } catch (error) {
      console.error("Error updating banner", error);
      setStatus("Failed to update homepage banner");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, rgba(228,113,4,1), rgba(193,4,34,1))",
      }}
    >
      <div
        className="p-8 rounded-xl shadow-xl w-full max-w-2xl"
        style={{
          background: "rgba(248,248,248,1)",
        }}
      >
        <h2
          className="text-2xl font-bold mb-4 text-center"
          style={{ color: "rgba(0,0,0,1)" }}
        >
          Update Homepage Banner
        </h2>

        <textarea
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g., The canteen will be closed on 15th August."
          className="w-full p-3 border rounded mb-4"
          style={{
            color: "rgba(0,0,0,1)",
            borderColor: "rgba(228,113,4,1)",
            background: "rgba(248,248,248,1)",
          }}
        />

        <button
          onClick={updateBanner}
          className="w-full py-2 rounded font-bold"
          style={{
            background: "linear-gradient(90deg, rgba(228,113,4,1), rgba(193,4,34,1))",
            color: "rgba(248,248,248,1)",
          }}
        >
          Update Banner
        </button>

        {status && (
          <p className="mt-4 text-center font-semibold" style={{ color: "rgba(193,4,34,1)" }}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default EmployeeNotifications;
