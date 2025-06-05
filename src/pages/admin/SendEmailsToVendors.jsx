import React, { useEffect, useState } from "react";
import axios from "axios";

const SendEmailToVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/vendors`);
        setVendors(res.data);
      } catch (err) {
        console.error("Error fetching vendors", err);
      }
    };
    fetchVendors();
  }, []);

  const handleSendEmail = async () => {
    if (!selectedVendor || !subject || !message) {
      setStatus("Please fill all fields");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/admin/send-email`, {
        vendorId: selectedVendor,
        subject,
        message,
      });
      setStatus("Email sent successfully");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error("Error sending email", err);
      setStatus("Failed to send email");
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
        className="p-8 rounded-xl shadow-xl w-full max-w-xl"
        style={{
          background: "rgba(248,248,248,1)",
        }}
      >
        <h2
          className="text-2xl font-bold mb-4 text-center"
          style={{ color: "rgba(0,0,0,1)" }}
        >
          Send Email to Vendor
        </h2>

        <div className="mb-4">
          <label className="block font-semibold mb-1" style={{ color: "rgba(0,0,0,1)" }}>
            Select Vendor
          </label>
          <select
            className="w-full p-2 border rounded"
            style={{ color: "rgba(0,0,0,1)", borderColor: "rgba(228,113,4,1)" }}
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
          >
            <option value="">-- Select Vendor --</option>
            {vendors.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1" style={{ color: "rgba(0,0,0,1)" }}>
            Subject
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            style={{ color: "rgba(0,0,0,1)", borderColor: "rgba(193,4,34,1)" }}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1" style={{ color: "rgba(0,0,0,1)" }}>
            Message
          </label>
          <textarea
            rows="5"
            className="w-full p-2 border rounded"
            style={{ color: "rgba(0,0,0,1)", borderColor: "rgba(228,113,4,1)" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button
          onClick={handleSendEmail}
          className="w-full py-2 rounded font-bold"
          style={{
            background: "linear-gradient(90deg, rgba(228,113,4,1), rgba(193,4,34,1))",
            color: "rgba(248,248,248,1)",
          }}
        >
          Send Email
        </button>

        {status && (
          <p className="mt-4 text-sm font-semibold text-center" style={{ color: "rgba(193,4,34,1)" }}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default SendEmailToVendor;