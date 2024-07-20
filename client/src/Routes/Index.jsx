import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Loader from '../Components/core/loader/Loader';
// Lazy-loaded components
const LandingPage = lazy(() => import('../Pages/LandingPage'));
const SignUp = lazy(() => import('../Components/pages/SignUp'));
const SignIn = lazy(() => import('../Components/pages/SignIn'));
const TurfList = lazy(() => import('../Components/pages/TurfList'));
const TurfDisplay = lazy(() => import('../Components/pages/TurfDisplay'));
const PageNotFound = lazy(() => import('../Components/pages/PageNotFound'));

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
        <Route element={<ProtectedRoute />}>
          <Route path="/turf-list" element={<TurfList />} />
          <Route path="/turf/:id" element={<TurfDisplay />} />
        </Route>
        {/* page not found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Index;
