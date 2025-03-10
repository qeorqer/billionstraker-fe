import { useEffect } from 'react';
import { Slide, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Header from 'components/Layout/Header';
import AppRouter from 'navigation/AppRouter';
import { refreshTokenThunk, setAuth, userData } from 'features/user';
import { checkIsAccessTokenExpired } from 'features/user/utils/checkIsAccessTokenExpired';
import NoInternetConnectionPage from 'pages/NoInternetConnection';
import { usePwa } from '@dotmind/react-use-pwa';

import './App.scss';

const App = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(userData);

  const { isOffline } = usePwa();

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

  if (isOffline) {
    return <NoInternetConnectionPage />;
  }

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
        limit={1}
      />
    </>
  );
};

export default App;
