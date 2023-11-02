import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Header from 'components/Layout/Header';
import AppRouter from 'navigation/AppRouter';
import { refreshTokenThunk, setAuth, userData } from 'features/user';
import { checkIsAccessTokenExpired } from 'features/user/utils/checkIsAccessTokenExpired';

import './App.scss';

const App = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(userData);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const isTokenExpired = checkIsAccessTokenExpired();

      if (isTokenExpired) {
        dispatch(refreshTokenThunk());
      } else {
        dispatch(setAuth(true));
      }
    } else {
      dispatch(setAuth(false));
    }
  }, []);

  return (
    <>
      {isAuth && <Header />}
      <AppRouter />
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
