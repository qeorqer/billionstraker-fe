import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Flip, toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from 'hooks/react-redux.hook';
import { checkAuth, logOut, setAuth } from 'store/reducers/user.reducer';
import { userData } from 'store/selectors';
import AppHeader from 'components/AppHeader';
import AppRouter from 'navigation/';
import { loginResponseType } from 'types/user.type';
import axiosInstance, { baseUrl } from 'api/axiosInstance';

import './App.scss';

const App = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { isAuth, user } = useAppSelector(userData);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(checkAuth());
    } else {
      dispatch(setAuth(false));
    }
  }, []);

  useEffect(() => {
    if (isAuth && user.isFirstEnter) {
      history.push('/initialization');
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
          const response = await axios.get<loginResponseType>(
            `${baseUrl}/api/user/refresh`,
            { withCredentials: true },
          );
          localStorage.setItem('token', response.data.accessToken);
          return axiosInstance.request(originalRequest);
        } catch (e) {
          toast(
            localStorage.getItem('i18nextLng') === 'en'
              ? 'Your session has expired'
              : 'Время сессии истекло',
            {
              type: 'warning',
            },
          );

          dispatch(logOut());
        }
      }
      throw error;
    },
  );

  return (
    <>
      {isAuth && user?.isFirstEnter === false && <AppHeader />}
      <AppRouter isAuth={isAuth} />
      <ToastContainer
        transition={Flip}
        position="bottom-right"
        autoClose={2000}
        theme="dark"
        hideProgressBar
        closeOnClick
      />
    </>
  );
};

export default App;
