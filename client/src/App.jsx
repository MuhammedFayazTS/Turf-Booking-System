import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Routes from './Routes/Index';
import { ScrollToTop } from 'react-simple-scroll-up';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import Loader from './Components/core/loader/Loader';
import useAxiosInterceptors from './hooks/useApiInterceptors';
import { useEffect } from 'react';
import { loadUser } from './redux/slices/auth.slice';
import { useLocation } from 'react-router-dom';

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API;
  axios.defaults.withCredentials = true;
  const { loading: userLoading, isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useAxiosInterceptors();

  // useEffect(() => {
  //   const paths = ['/sign-in', '/sign-up'];
  //   if (!userLoading && !paths.includes(location.pathname) && (!isAuthenticated || !user)) {
  //     dispatch(loadUser());
  //   }
  // }, [dispatch, isAuthenticated, userLoading, user, location]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {/* //TODO: Replace with loading form app slice */}
      {userLoading && <Loader />}

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
