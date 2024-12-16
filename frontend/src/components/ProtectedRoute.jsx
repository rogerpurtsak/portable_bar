import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ message: "Palun logi esmalt sisse, et jätkata." }} />;
  }
  return children;
};

export default ProtectedRoute;
