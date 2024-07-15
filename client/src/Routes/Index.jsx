import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
const LandingPage = lazy(() => import('../Pages/LandingPage'));
const SignUp = lazy(() => import('../Components/pages/SignUp'));
const SignIn = lazy(() => import('../Components/pages/SignIn'));

//open routes - sign in, sign up,landing page

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
};

export default Index;
