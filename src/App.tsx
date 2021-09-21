import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Profile from "./pages/profile/Profile"
import Auth from './pages/auth/Auth'
import { useAppDispatch, useAppSelector } from './hooks/react-redux.hook'
import { checkAuth } from "./store/reducers/user.reducer"
import CreateTransaction from "./pages/createTransaction/CreateTransaction";
import { Slide, ToastContainer } from 'react-toastify'
import { userData } from "./store/selectors"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss'
import AppHeader from "./components/header/AppHeader";
import AppRouter from "./components/router/AppRouter";

const App = () => {
  const dispatch = useAppDispatch()
  const userSelector = useAppSelector(userData)

  const isAuth: boolean = userSelector.isAuth

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(checkAuth());
    }
  }, []);

  return (
    <>
      {isAuth && <AppHeader/>}
      <AppRouter isAuth={isAuth}/>
      <ToastContainer
        transition={Slide}
      />
    </>
  )
}

export default App
