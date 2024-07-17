import axios from 'axios';
import moment from 'moment';
import { refreshToken } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function requestInterceptor(dispatch,token, loading) {

  axios.interceptors.request.use(async (req) => {
    if (req?.url?.includes('auth')) return req;

    // Fetch the token expiry time
    const tokenExpiry = localStorage.getItem('tokenExpiresAt');
    const tokenExpiresAt = moment(tokenExpiry ? new Date(tokenExpiry) : new Date());
    const currentDate = moment(new Date());

    // Calculate the time to expire the token
    const difference = moment.duration(tokenExpiresAt.diff(currentDate)).asMinutes();

    // If the token expiry time is less than 5 minutes, refresh the token and continue with the request
    if (difference < 5) {
      console.log('Token expiry less than 5 minutes', difference);
      await dispatch(refreshToken());

      // Wait until the refresh token action is complete
      while (loading) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // Get the updated token from the state
      const refreshedToken = token;

      // Set the new token as the authorization header
      req.headers.Authorization = `Bearer ${refreshedToken}`;
    }

    return req;
  });
}
