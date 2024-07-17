import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Loader from '../Components/loader/Loader';

// Lazy-loaded components
const LandingPage = lazy(() => import('../Pages/LandingPage'));
const SignUp = lazy(() => import('../Components/pages/SignUp'));
const SignIn = lazy(() => import('../Components/pages/SignIn'));

// Routes component
const Index = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* open routes */}
        <Route path="/" element={<LandingPage />} />
        {/* public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
        {/* protected routes */}
        <Route element={<ProtectedRoute />}>{/* <Route path="/" element={<LandingPage />} /> */}</Route>
      </Routes>
    </Suspense>
  );
};

export default Index;
