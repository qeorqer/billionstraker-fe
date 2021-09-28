import React, { FC } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import CreateTransaction from "../../pages/createTransaction/CreateTransaction";
import Profile from "../../pages/profile/Profile";
import Auth from "../../pages/auth/Auth";
import { useAppSelector } from "../../hooks/react-redux.hook";
import { userData } from "../../store/selectors";
import Statistic from "../../pages/statistic/Statistic";
import Loader from "../loader/Loader";

type propsType = {
  isAuth: boolean
}

const AppRouter: FC<propsType> = ({ isAuth }) => {
  const {isRefreshloading} = useAppSelector(userData)

  if(isRefreshloading){
    return <Loader fullHeight={true}/>
  }

  return (
    <>
      {isAuth ? (
          <Switch>
            <Route path='/statistic' component={Statistic}/>
            <Route path='/createTransaction' component={CreateTransaction}/>
            <Route path='/home' component={Profile}/>
            <Redirect to='/home'/>
          </Switch>
        ) :
        (
          <Switch>
            <Route path="/authorization" component={Auth}/>
            <Redirect to='/authorization'/>
          </Switch>
        )}
    </>
  );
}

export default AppRouter;