import React, { FC, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import CreateTransaction from 'pages/CreateTransaction';
import ProfilePage from 'pages/Profile';
import AuthorizationPage from 'pages/Authorization';
import AboutApp from 'pages/AboutApp';
import Loader from 'components/Loader';
import InitPage from 'pages/initPage/Init';
import StatisticsPage from 'pages/Statistics';
import BalancesPage from 'pages/Balances';
import CategoriesPage from 'pages/Categories';
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
          <Route path="/statistics" component={StatisticsPage} />
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
          <Route path="/about" component={AboutApp} />
          <Redirect to="/authorization" />
        </Switch>
      )}
    </>
  );
};

export default AppRouter;
