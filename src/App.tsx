import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/react-redux.hook'
import { checkAuth, setAuth } from "./store/reducers/user.reducer"
import { Slide, ToastContainer } from 'react-toastify'
import { userData } from "./store/selectors"
import AppHeader from "./components/header/AppHeader";
import AppRouter from "./components/router/AppRouter";
import 'react-toastify/dist/ReactToastify.css';
import './App.scss'

const App = () => {
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector(userData)

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(checkAuth());
    } else{
      dispatch(setAuth(false))
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
