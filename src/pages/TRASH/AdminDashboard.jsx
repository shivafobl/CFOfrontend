import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
          className="bg-blue-600 text-white py-4 px-6 rounded-xl shadow hover:bg-blue-700"
          onClick={() => navigate('/admin/vendors')}
        >
          Vendor Management
        </button>
        <button
          className="bg-green-600 text-white py-4 px-6 rounded-xl shadow hover:bg-green-700"
          onClick={() => navigate('/admin/email-vendor')}
        >
          Send Emails to Vendor
        </button>
        <button
          className="bg-purple-600 text-white py-4 px-6 rounded-xl shadow hover:bg-purple-700"
          onClick={() => navigate('/admin/most-bought')}
        >
          Most Bought Items
        </button>
        <button
          className="bg-orange-600 text-white py-4 px-6 rounded-xl shadow hover:bg-orange-700"
          onClick={() => navigate('/admin/date-wise-orders')}
        >
          Date-wise Orders History
        </button>
        <button
          className="bg-gray-700 text-white py-4 px-6 rounded-xl shadow hover:bg-gray-800"
          onClick={() => navigate('/admin/settings')}
        >
          Settings
        </button>
        <button
          className="bg-pink-600 text-white py-4 px-6 rounded-xl shadow hover:bg-pink-700"
          onClick={() => navigate('/admin/notify-employees')}
        >
          Notifications to Employees
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;