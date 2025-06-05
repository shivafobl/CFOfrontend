import React from "react";
import { useEffect, useRef } from "react";
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
import ProtectedRoute from "./pages/admin/ProtectedRoute"; // Import the ProtectedRoute component
import ProtectedUserRoute from "./pages/ProtectedRoute"; // Import the ProtectedRoute component for user routes
function App() {
  const employeeId = localStorage.getItem('employeeId');
  const logoutTimer = useRef();

  useEffect(() => {
    const logout = () => {
      localStorage.clear();
      window.location.href = '/';
    };

    const resetTimer = () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
      logoutTimer.current = setTimeout(logout, 10 * 60 * 1000); // 20 minutes
    };

    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        <Route path="/dashboard" element={<ProtectedUserRoute><DashboardPage /></ProtectedUserRoute>}/>
        <Route path="/forgot-password" element={<Forgotpassword />} /> {/* Add Forgotpassword */}
        <Route path="/orderHistory" element={<OrderHistory employeeId={employeeId} />} /> {/* Add OrderHistory */}

        {/* // Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/vendors" element={
          <ProtectedRoute>
            <VendorManagement />
          </ProtectedRoute>
        } />
        <Route path="/admin/send-emails" element={
          <ProtectedRoute>
            <SendEmails />
          </ProtectedRoute>
        } />
        <Route path="/admin/most-bought" element={
          <ProtectedRoute>
            <MostBoughtItems />
          </ProtectedRoute>
        } />
        <Route path="/admin/orders-history" element={
          <ProtectedRoute>
            <DateWiseOrdersHistory />
          </ProtectedRoute>
        } />
        <Route path="/admin/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="/admin/notifications" element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } />
       
      </Routes>
    </Router>
  );
}

export default App;
