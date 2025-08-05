import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isAdmin, user, loading }) {
  const token = localStorage.getItem('token');
  console.log("ProtectedRoute user:", JSON.stringify(user, null, 2));
  console.log("ProtectedRoute token:", token);
  console.log("ProtectedRoute isAdmin:", isAdmin);
  console.log("ProtectedRoute loading:", loading);
  
  // Token yoksa ana sayfaya yönlendir
  if (!token) {
    return <Navigate to="/" />;
  }
  
  if (isAdmin) {
    // Loading durumunda bekle
    if (loading) {
      return <div>Loading...</div>;
    }
    
    // Admin route için: token var ve user admin ise göster
    if (user && user.role === "admin") {
      return <Outlet />;
    }
    // Admin değilse ana sayfaya yönlendir
    return <Navigate to="/" />;
  }
  
  // Normal route için: token varsa göster
  return <Outlet />;
}

export default ProtectedRoute