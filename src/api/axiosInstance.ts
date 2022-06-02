import axios from 'axios';

export const baseUrl: string = process.env.REACT_APP_BASE_URL!;

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${baseUrl}/api`,
  headers: {
    'Content-type': 'application/json',
  },
});

export default axiosInstance;
