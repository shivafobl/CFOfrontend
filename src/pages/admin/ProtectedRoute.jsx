import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  return isAdminLoggedIn ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;