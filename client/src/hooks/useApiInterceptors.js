import axios from 'axios';
import moment from 'moment';
import store from '../redux/store';
import { loadUser, refreshToken, signOut } from '../redux/slices/auth.slice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const useAxiosInterceptors = () => {
  const dispatch = useDispatch();

  // Define your public routes
  const publicRoutes = ['/sign-in', '/sign-up', '/'];

  // Request interceptor
  axios.interceptors.request.use(
    async (req) => {
      // Check if the request URL is a public route
      if (publicRoutes.some(route => req.url.includes(route))) {
        return req;
      }

      const tokenExpiry = localStorage.getItem('tokenExpiresAt');
      const tokenExpiresAt = moment(tokenExpiry ? new Date(tokenExpiry) : new Date());
      const currentDate = moment(new Date());

      // Calculate the time to expire the token
      const difference = moment.duration(tokenExpiresAt.diff(currentDate)).asMinutes();

      if (difference < 5) {
        console.log('Token expiry less than 5 minutes', difference);
        const refreshResponse = await dispatch(refreshToken());

        if (refreshToken.fulfilled.match(refreshResponse)) {
          // Retrieve updated token from state
          const updatedToken = store.getState().auth.token;
          req.headers.Authorization = `Bearer ${updatedToken}`;
          dispatch(loadUser());
        } else {
          toast.error('Session expired, please sign in again');
          await dispatch(signOut());
          return Promise.reject(new Error('Session expired'));
        }
      } else {
        // If the token is not close to expiring, just set it in the headers
        const token = store.getState().auth.token;
        if (token) {
          req.headers.Authorization = `Bearer ${token}`;
        }
      }

      return req;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Skip handling for public routes
      if (publicRoutes.some(route => originalRequest.url.includes(route))) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && error.response.data?.message === 'Unauthorized - Invalid token') {
        try {
          const refreshResponse = await dispatch(refreshToken());

          if (refreshToken.fulfilled.match(refreshResponse)) {
            const updatedToken = store.getState().auth.token;
            originalRequest.headers.Authorization = `Bearer ${updatedToken}`;
            return axios(originalRequest);
          } else {
            toast.error('Session expired, please sign in again');
            await dispatch(signOut());
            return Promise.reject(new Error('Session expired'));
          }
        } catch (refreshError) {
          toast.error('Session expired, please sign in again');
          await dispatch(signOut());
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default useAxiosInterceptors;
