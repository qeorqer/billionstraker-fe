import axios, { AxiosResponse } from 'axios';
import {
  AuthResponse,
  logOutRequest,
  refreshTokenRequest,
} from 'features/user';
import { toast } from 'react-toastify';
import { clearDataFromLocalStorage } from 'features/user/store/utils';
import i18next from 'i18next';

export const baseUrl: string = process.env.REACT_APP_BASE_URL!;
let isRefreshingToken = false;
let refreshRequest: Promise<AxiosResponse<AuthResponse>> | null = null;

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${baseUrl}/api`,
  headers: {
    'Content-type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        if (!isRefreshingToken) {
          isRefreshingToken = true;

          refreshRequest = refreshTokenRequest();
        }

        if (refreshRequest) {
          const response = await refreshRequest;
          isRefreshingToken = false;
          localStorage.setItem('token', response.data.accessToken);
        }

        refreshRequest = null;

        return axiosInstance.request(originalRequest);
      } catch (e) {
        toast(i18next.t('your session has expired'), {
          type: 'warning',
        });

        const refreshToken = localStorage.getItem('refreshToken');
        logOutRequest({ refreshToken });
        clearDataFromLocalStorage();
      }
    }
    throw error;
  },
);

export default axiosInstance;
