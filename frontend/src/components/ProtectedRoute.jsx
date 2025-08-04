import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isAdmin, user }) {
  const token = localStorage.getItem('token');

  if (isAdmin) {
    if (token && user?.user?.role === "admin") {
      return <Outlet />;
    }
    
    return <Navigate to="/" />;
  }

  if (token) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
}

export default ProtectedRoute