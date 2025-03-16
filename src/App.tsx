import { useEffect } from 'react';
import { Notifications } from '@mantine/notifications';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import Header from 'components/Layout/Header';
import AppRouter from 'navigation/AppRouter';
import { refreshTokenThunk, setAuth, userData } from 'features/user';
import { checkIsAccessTokenExpired } from 'features/user/utils/checkIsAccessTokenExpired';
import NoInternetConnectionPage from 'pages/NoInternetConnection';
import { usePwa } from '@dotmind/react-use-pwa';

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
      <Notifications limit={1} position="top-right" autoClose={2500} transitionDuration={500} />
    </>
  );
};

export default App;
