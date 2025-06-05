import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save login flag
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("adminId", adminId); // Optional: save ID
        navigate("/admin/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center"
      style={{
        background: "linear-gradient(135deg, rgba(228,113,4,1), rgba(193,4,34,1))",
      }}
    >
      <form
        onSubmit={handleLogin}
        className="shadow-xl p-8 rounded-xl w-full max-w-sm"
        style={{ background: "rgba(248,248,248,1)" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "rgba(0,0,0,1)" }}>
          Admin Login
        </h2>
        <input
          type="text"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          placeholder="Admin ID"
          className="w-full mb-4 p-2 border rounded"
          style={{ color: "rgba(0,0,0,1)", borderColor: "rgba(228,113,4,1)" }}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-6 p-2 border rounded"
          style={{ color: "rgba(0,0,0,1)", borderColor: "rgba(193,4,34,1)" }}
          required
        />
        <button
          type="submit"
          className="w-full py-2 rounded font-bold mb-4"
          style={{
            background: "linear-gradient(90deg, rgba(228,113,4,1), rgba(193,4,34,1))",
            color: "rgba(248,248,248,1)",
          }}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full py-2 rounded font-bold"
          style={{
            background: "rgba(248,248,248,1)",
            color: "rgba(228,113,4,1)",
            border: "2px solid rgba(228,113,4,1)",
          }}
        >
          Go to Homepage
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
