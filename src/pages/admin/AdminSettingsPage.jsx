import React, { useState, useEffect } from "react";
import axios from "axios";

const SettingsPage = () => {
  const [lunchCutoff, setLunchCutoff] = useState("10:00");
  const [dinnerCutoff, setDinnerCutoff] = useState("16:00");
  const [closedDates, setClosedDates] = useState("");
  const [status, setStatus] = useState("");
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/settings`);
        const settings = res.data;
        setLunchCutoff(settings.lunch_cutoff || "10:00");
        setDinnerCutoff(settings.dinner_cutoff || "16:00");
        setClosedDates(settings.canteen_closed_dates || "");
      } catch (err) {
        console.error("Failed to fetch settings", err);
      }
    };
    fetchSettings();
  }, []);

  const saveSettings = async () => {
    try {
      await axios.put(`${BASE_URL}/api/admin/settings`, {
        lunch_cutoff: lunchCutoff,
        dinner_cutoff: dinnerCutoff,
        canteen_closed_dates: closedDates,
      });
      setStatus("Settings updated successfully");
    } catch (err) {
      console.error("Error updating settings", err);
      setStatus("Failed to update settings");
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
          Admin Settings
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-semibold" style={{ color: "rgba(228,113,4,1)" }}>
            Lunch Cutoff Time
          </label>
          <input
            type="time"
            value={lunchCutoff}
            onChange={(e) => setLunchCutoff(e.target.value)}
            className="w-full p-2 border rounded"
            style={{
              color: "rgba(0,0,0,1)",
              borderColor: "rgba(228,113,4,1)",
              background: "rgba(248,248,248,1)",
            }}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold" style={{ color: "rgba(193,4,34,1)" }}>
            Dinner Cutoff Time
          </label>
          <input
            type="time"
            value={dinnerCutoff}
            onChange={(e) => setDinnerCutoff(e.target.value)}
            className="w-full p-2 border rounded"
            style={{
              color: "rgba(0,0,0,1)",
              borderColor: "rgba(193,4,34,1)",
              background: "rgba(248,248,248,1)",
            }}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold" style={{ color: "rgba(228,113,4,1)" }}>
            Canteen Closed Dates
          </label>
          <input
            type="text"
            placeholder="YYYY-MM-DD,YYYY-MM-DD"
            value={closedDates}
            onChange={(e) => setClosedDates(e.target.value)}
            className="w-full p-2 border rounded"
            style={{
              color: "rgba(0,0,0,1)",
              borderColor: "rgba(228,113,4,1)",
              background: "rgba(248,248,248,1)",
            }}
          />
        </div>

        <button
          onClick={saveSettings}
          className="w-full py-2 rounded font-bold"
          style={{
            background: "linear-gradient(90deg, rgba(228,113,4,1), rgba(193,4,34,1))",
            color: "rgba(248,248,248,1)",
          }}
        >
          Save Settings
        </button>

        {status && (
          <p className="mt-4 text-center font-semibold" style={{ color: status.includes("success") ? "rgba(228,113,4,1)" : "rgba(193,4,34,1)" }}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
