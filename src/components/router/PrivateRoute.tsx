import React, { Component, FC, ReactNode } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppSelector } from "../../hooks/react-redux.hook";
import { userData } from "../../store/selectors";
import Loader from "../loader/Loader";


interface propsType extends RouteProps{

}

const PrivateRoute:FC<propsType> = ({...rest}) => {
  const userSelector = useAppSelector(userData)
  const isAuth: boolean = userSelector.isAuth
  const isPending: boolean = userSelector.loading

  if(isPending){
    return <Loader />
  }

  console.log(isAuth);
  return (
    <Route {...rest} render={props => (
      isAuth ?
        <Component {...props}/>
        : <Redirect to="/authorization" />
    )} />
  );
};

export default PrivateRoute;