import React, { Component, FC, ReactNode } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppSelector } from "../../hooks/react-redux.hook";
import { userData } from "../../store/selectors";


interface propsType extends RouteProps {
  restricted: boolean
}

const PublicRoute: FC<propsType> = ({ restricted, ...rest }) => {
  const userSelector = useAppSelector(userData)
  const isAuth: boolean = userSelector.isAuth
  const isPending: boolean = userSelector.loading

  if (isPending) {
    return <div>LOADING...</div>
  }
  console.log(isAuth)
  return (
    <Route {...rest} render={props => (
      isAuth && restricted ?
         <Redirect to="/home"/>
        : <Component {...props}/>
    )}/>
  );
};

export default PublicRoute;