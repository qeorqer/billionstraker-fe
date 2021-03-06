import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import CreateTransaction from 'pages/CreateTransaction';
import BalancesPage from 'pages/Balances';
import CategoriesPage from 'pages/Categories';
import ProfilePage from 'pages/Profile';
import AuthorizationPage from 'pages/Authorization';
import Statistic from 'pages/statistic/Statistic';
import Init from 'pages/initPage/Init';
import Loader from 'components/Loader';
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
          <Route path="/statistic" component={Statistic} />
          <Route path="/createTransaction" component={CreateTransaction} />
          <Route path="/home" component={ProfilePage} />
          <Route path="/initialization" component={Init} />
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
