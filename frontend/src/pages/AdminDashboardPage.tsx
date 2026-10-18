import React from "react";
import { Navigate } from "react-router-dom";

export const AdminDashboardPage: React.FC = () => {
  return <Navigate to="/hr/dashboard" replace />;
};
