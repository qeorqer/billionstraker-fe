import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Header from 'components/Layout/Header';
import AppRouter from 'navigation';
import axiosInstance, { baseUrl } from 'api/axiosInstance';
import {
  AuthResponse,
  logOutThunk,
  refreshTokenThunk,
  setAuth,
  userData,
} from 'features/user';

import './App.scss';

const App = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { isAuth, user } = useAppSelector(userData);
  const { t } = useTranslation();

  // TODO: move this somewhere

  const checkIsAccessTokenExpired = (): boolean => {
    const bufferTimeForRefreshToken = 1000 * 60;
    const accessExpiration = localStorage.getItem('accessExpiration');

    const refreshTime = Date.now() + bufferTimeForRefreshToken;
    return refreshTime >= Number(accessExpiration);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const isTokenExpired = checkIsAccessTokenExpired();
      console.log(isTokenExpired);

      if (isTokenExpired) {
        dispatch(refreshTokenThunk());
      } else {
        dispatch(setAuth(true));
      }
    } else {
      dispatch(setAuth(false));
    }
  }, []);

  let isRefreshingToken = false;
  let refreshRequest: Promise<AxiosResponse<AuthResponse>> | null = null;

  useEffect(() => {
    if (isAuth && user?.isFirstEnter) {
      history.push('/guide');
    }
  }, [isAuth, user]);

  axiosInstance.interceptors.request.use((config) => {
    if (localStorage.getItem('token')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (config) => {
      return config;
    },
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
            refreshRequest = axios.get<AuthResponse>(
              `${baseUrl}/api/user/refresh`,
              { withCredentials: true },
            );
          }

          if (refreshRequest) {
            const response = await refreshRequest;
            isRefreshingToken = false;
            localStorage.setItem('token', response.data.accessToken);
          }

          refreshRequest = null;

          return axiosInstance.request(originalRequest);
        } catch (e) {
          toast(t('your session has expired'), {
            type: 'warning',
          });

          const refreshToken = localStorage.getItem('refreshToken');
          dispatch(logOutThunk({ refreshToken }));
        }
      }
      throw error;
    },
  );

  return (
    <>
      {isAuth && <Header />}
      <AppRouter isAuth={isAuth} />
      <ToastContainer
        transition={Slide}
        position="top-right"
        autoClose={2000}
        theme="dark"
        hideProgressBar
        closeOnClick
      />
    </>
  );
};

export default App;
