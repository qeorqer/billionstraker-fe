import React, { FC, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import CreateTransaction from 'pages/CreateTransaction';
import ProfilePage from 'pages/Profile';
import AuthorizationPage from 'pages/Authorization';
import Loader from 'components/Loader';
const InitPage = lazy(() => import('pages/initPage/Init'));
const StatisticPage = lazy(() => import('pages/statistic/Statistic'));
const BalancesPage = lazy(() => import('pages/Balances'));
const CategoriesPage = lazy(() => import('pages/Categories'));
import { useAppSelector } from 'hooks/react-redux.hook';
import { userData } from 'store/selectors';

type propsType = {
  isAuth: boolean | null;
};

const AppRouter: FC<propsType> = ({ isAuth }) => {
  const { isRefreshLoading } = useAppSelector(userData);

  if (isAuth === null || isRefreshLoading) {
    return <Loader fullHeight={true} />;
  }

  return (
    <>
      {isAuth ? (
        <Switch>
          <Route path="/statistic" component={StatisticPage} />
          <Route path="/createTransaction" component={CreateTransaction} />
          <Route path="/home" component={ProfilePage} />
          <Route path="/initialization" component={InitPage} />
          <Route path="/balances" component={BalancesPage} />
          <Route path="/categories" component={CategoriesPage} />
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/authorization" component={AuthorizationPage} />
          <Redirect to="/authorization" />
        </Switch>
      )}
    </>
  );
};

export default AppRouter;
