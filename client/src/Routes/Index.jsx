import React, { lazy, Suspense } from 'react';
import Lottie from 'react-lottie-player';
import { Routes, Route } from 'react-router-dom';
import loader from '../Assets/lottie/loader.json';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// Lazy-loaded components
const LandingPage = lazy(() => import('../Pages/LandingPage'));
const SignUp = lazy(() => import('../Components/pages/SignUp'));
const SignIn = lazy(() => import('../Components/pages/SignIn'));

// Fallback component to show while loading
const Loading = () => (
  <div className="w-full h-screen flex justify-center items-center fixed top-0 backdrop-blur-[2px] left-0 z-50 bg-slate-200">
    <Lottie loop animationData={loader} play style={{ width: 150, height: 150 }} />
  </div>
);

// Routes component
const Index = () => {
  return (
    <Suspense fallback={<Loading />}>
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
