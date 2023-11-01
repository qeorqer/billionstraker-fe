import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import CreateTransaction from 'pages/CreateTransaction';
import ProfilePage from 'pages/Profile';
import AuthorizationPage from 'pages/Authorization';
import AboutApp from 'pages/About';
import GuidePage from 'pages/Guide';
import StatisticsPage from 'pages/Statistics';
import BalancePage from 'pages/Balance';
import CategoriesPage from 'pages/Categories';
import Loader from 'components/Layout/Loader';
import { useAppSelector } from 'store/hooks';
import { userData } from 'features/user';

type propsType = {
  isAuth: boolean | null;
};

const AppRouter: FC<propsType> = ({ isAuth }) => {
  const { isRefreshLoading } = useAppSelector(userData);

  if (isAuth === null || isRefreshLoading) {
    return <Loader fullHeight={true} />;
  }
  console.log(isAuth);

  return (
    <>
      {isAuth ? (
        <Switch>
          <Route path="/statistics" component={StatisticsPage} />
          <Route path="/createTransaction" component={CreateTransaction} />
          <Route path="/home" component={ProfilePage} />
          <Route path="/guide" component={GuidePage} />
          <Route path="/balance" component={BalancePage} />
          <Route path="/categories" component={CategoriesPage} />
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/authorization" component={AuthorizationPage} />
          <Route path="/about" component={AboutApp} />
          <Redirect to="/authorization" />
        </Switch>
      )}
    </>
  );
};

export default AppRouter;
