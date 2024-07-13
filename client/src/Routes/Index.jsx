import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
const LandingPage = lazy(() => import('../Pages/LandingPage'));
const SignUp = lazy(() => import('../Components/Pages/SignUp'));

//open routes - sign in, sign up,landing page

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path='/sign-in' element={
                <Login />
            } /> */}
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};

export default Index;
