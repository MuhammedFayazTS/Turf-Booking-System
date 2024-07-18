import React from 'react';
import Lottie from 'react-lottie-player';
import loaderAnimation from '../lottie/loader.json';

const Loader = () => {
  return loaderAnimation ? (
    <div className="w-full h-screen flex justify-center items-center fixed top-0 backdrop-blur-[2px] left-0 z-50 bg-slate-200">
      <Lottie loop animationData={loaderAnimation} play style={{ width: 150, height: 150 }} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Loader;