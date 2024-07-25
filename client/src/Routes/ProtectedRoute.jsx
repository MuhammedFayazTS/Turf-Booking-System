import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { protectedRoute } from '../redux/slices/auth.slice';

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(protectedRoute());
  }, [dispatch]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
