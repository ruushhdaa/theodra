import React from "react";
import { Navigate } from "react-router-dom";

export const ICDashboardPage: React.FC = () => {
  return <Navigate to="/ic/dashboard" replace />;
};
