import { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Loader from 'components/Shared/Loader';
import { useAppSelector } from 'store/hooks';
import { userData } from 'features/user';
import { AuthRoutes, NoAuthRoutes, Routes } from 'navigation/constants';

const AppRouter = () => {
  const { isAuth, isRefreshLoading, user } = useAppSelector(userData);
  const history = useHistory();

  useEffect(() => {
    if (isAuth && user?.isFirstEnter) {
      history.push('/guide');
    }
  }, [isAuth, user]);

  const renderSwitch = ({ routes, redirect }: Routes) => (
    <Switch>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} />
      ))}
      <Redirect to={redirect} />
    </Switch>
  );

  if (isAuth === null || isRefreshLoading) {
    return <Loader fullHeight />;
  }

  return renderSwitch(isAuth ? AuthRoutes : NoAuthRoutes);
};

export default AppRouter;
