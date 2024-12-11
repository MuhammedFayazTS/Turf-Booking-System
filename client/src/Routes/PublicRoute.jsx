import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
  const authPaths = ['/sign-in', '/sign-up'];
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  // If the user is authenticated, redirect to the home page
  if (isAuthenticated && authPaths.includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
