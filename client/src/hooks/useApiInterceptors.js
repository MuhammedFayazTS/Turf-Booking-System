import axios from 'axios';
import moment from 'moment';
import store from '../redux/store';
import { loadUser, refreshToken } from '../redux/slices/auth.slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const useAxiosInterceptors = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Request interceptor
  axios.interceptors.request.use(async (req) => {
    if (req?.url?.includes('auth')) return req;

    // Fetch the token expiry time
    const tokenExpiry = localStorage.getItem('tokenExpiresAt');
    const tokenExpiresAt = moment(tokenExpiry ? new Date(tokenExpiry) : new Date());
    const currentDate = moment(new Date());

    // Calculate the time to expire the token
    var difference = moment.duration(tokenExpiresAt.diff(currentDate)).asMinutes();

    // If the token expiry time is less than 5 minutes,
    // then refresh the token and continue with the request
    if (difference < 5) {
      console.log('Token expiry less than 5 minutes', difference);
      const refreshedToken = await dispatch(refreshToken());

      if (refreshToken.fulfilled.match(refreshedToken)) {
        // Retrieve updated token from state
        const updatedToken = store.getState().auth.token;
        // Set the new token as the authorization header
        req.headers.Authorization = `Bearer ${updatedToken}`;
        dispatch(loadUser());
        return;
      }
      toast.error('Session expired, please sign in again');
      setTimeout(() => {
        navigate('/sign-in');
      }, 1000);
    }

    return req;
  });
};

export default useAxiosInterceptors;
