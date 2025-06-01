import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from './pages/DashboardPage'; // Import the Dashboard component
import Forgotpassword from './pages/ForgotPasswordPage';
import OrderHistory from "./pages/OrderHistory";
//admin part
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VendorManagement from "./pages/admin/VendorManagement";
import SendEmails from "./pages/admin/SendEmailsToVendors";
import MostBoughtItems from "./pages/admin/MostBoughtItems";
import DateWiseOrdersHistory from "./pages/admin/DateWiseOrders";
import Settings from "./pages/admin/AdminSettingsPage";
import Notifications from "./pages/admin/EmployeeNotifications";
import ProtectedRoute from "./pages/ProtectedRoute"; // Import the ProtectedRoute component
function App() {
  const employeeId = localStorage.getItem('employeeId');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}/>
        <Route path="/forgot-password" element={<Forgotpassword />} /> {/* Add Forgotpassword */}
        <Route path="/orderHistory" element={<OrderHistory employeeId={employeeId} />} /> {/* Add OrderHistory */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/vendors" element={<VendorManagement />} />
        <Route path="/admin/send-emails" element={<SendEmails />} />
        <Route path="/admin/most-bought" element={<MostBoughtItems />} />
        <Route path="/admin/orders-history" element={<DateWiseOrdersHistory />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/notifications" element={<Notifications />} />
       
      </Routes>
    </Router>
  );
}

export default App;
