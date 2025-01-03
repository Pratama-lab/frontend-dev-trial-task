import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "contexts/authContext";

const ProtectedRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/login" />;
  return <Outlet />;
};

export default ProtectedRoute;