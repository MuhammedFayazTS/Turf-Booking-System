import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import loader from './Assets/lottie/loader.json';
import Lottie from 'react-lottie-player';
import Routes from './Routes/Index';
import { ScrollToTop } from 'react-simple-scroll-up';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useEffect } from 'react';
import { loadUser } from './redux/slices/auth.slice';

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API;
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alerts);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {loading && (
        <div
          className="w-full h-screen flex justify-center items-center fixed top-0 backdrop-blur-[2px] left-0 z-50"
          style={{ background: 'rgba(0,0,0,0.7)' }}
        >
          <Lottie loop animationData={loader} play style={{ width: 150, height: 150 }} />
        </div>
      )}

      <ScrollToTop
        className="z-20"
        strokeWidth={3}
        strokeFillColor={'#166534'}
        bgColor={'#16A34A'}
        symbol={<ArrowUpIcon className="w-6 h-6 text-gray-200" />}
      />

      <Routes />
    </>
  );
}

export default App;
