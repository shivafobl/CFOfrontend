import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Settings = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    try {
      await axios.post('/api/admin/update-password', { password });
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => navigate('/admin/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleUpdatePassword}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;