import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
  const navigate = useNavigate();

  // Check on mount if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setError("User is already logged in.");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check before login
    if (localStorage.getItem("token")) {
      setError("User is already logged in.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        employee_id: employeeId,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('employeeId', response.data.employeeId);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid Employee ID or Password");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-red-900 to-orange-700">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Employee Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black">Employee ID</label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-semibold text-black">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-blue-600 cursor-pointer mt-2" onClick={() => navigate('/forgot-password')}>
          Forgot Password?
        </p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full mt-4 py-2 rounded-lg font-bold border-2"
          style={{
            background: "rgba(248,248,248,1)",
            color: "rgba(228,113,4,1)",
            borderColor: "rgba(228,113,4,1)",
          }}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
