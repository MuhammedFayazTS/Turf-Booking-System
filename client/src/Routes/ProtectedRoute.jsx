import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, protectedRoute as protectedRouteAction } from '../redux/slices/auth.slice';
import Loader from '../Components/core/loader/Loader';

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeUser = async () => {
      await dispatch(loadUser());
      dispatch(protectedRouteAction());
      setIsInitialized(true); // Set initialization flag after user data is loaded
    };

    initializeUser();
  }, [dispatch]);

  // Show a loader while the user data is being fetched
  if (!isInitialized || loading) {
    return <Loader />;
  }

  // Only redirect if initialization is complete and the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
