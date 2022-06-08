import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import CreateTransaction from '../../pages/CreateTransaction';
import BalancesPage from '../../pages/balances';
import Profile from '../../pages/profile/Profile';
import Auth from '../../pages/auth/Auth';
import { useAppSelector } from '../../hooks/react-redux.hook';
import { userData } from '../../store/selectors';
import Statistic from '../../pages/statistic/Statistic';
import Loader from '../loader/Loader';
import Init from '../../pages/initPage/Init';

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
          <Route path="/home" component={Profile} />
          <Route path="/initialization" component={Init} />
          <Route path="/balances" component={BalancesPage} />
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/authorization" component={Auth} />
          <Redirect to="/authorization" />
        </Switch>
      )}
    </>
  );
};

export default AppRouter;
