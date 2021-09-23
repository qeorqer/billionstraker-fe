import axios from 'axios'
import { loginResponseType } from '../types/auth.type';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'https://young-peak-28727.herokuapp.com/api',
  headers: {
    "Content-type": "application/json"
  }

})

axiosInstance.interceptors.request.use((config) => {
  if(localStorage.getItem('token')){
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return config;
})

axiosInstance.interceptors.response.use((config) => {
  return config;
},async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get<loginResponseType>('http://localhost:5003/api/refresh', {withCredentials: true})
      localStorage.setItem('token', response.data.accessToken);
      return axiosInstance.request(originalRequest);
    } catch (e) {
      console.log('НЕ АВТОРИЗОВАН')
    }
  }
  throw error;
})

export default axiosInstance