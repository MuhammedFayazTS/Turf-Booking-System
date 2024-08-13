import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Loader from '../Components/core/loader/Loader';
// Lazy-loaded components
const LandingPage = lazy(() => import('../Components/pages/LandingPage'));
const SignUp = lazy(() => import('../Components/pages/SignUp'));
const SignIn = lazy(() => import('../Components/pages/SignIn'));
const TurfList = lazy(() => import('../Components/pages/TurfList'));
const TurfDisplay = lazy(() => import('../Components/pages/TurfDisplay'));
const MyProfile = lazy(() => import('../Components/pages/MyProfile'));
const EditProfile = lazy(() => import('../Components/pages/EditProfile'));
const Notifications = lazy(() => import('../Components/pages/Notifications'));
const NotificationView = lazy(() => import('../Components/pages/NotificationView'));
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
          <Route path="/profile" element={<MyProfile />}>
            <Route index element={<EditProfile />} />
            <Route path='notifications' element={<Notifications />} />
            <Route path='notification/:id' element={<NotificationView />} />
          </Route>
        </Route>
        {/* page not found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Index;
