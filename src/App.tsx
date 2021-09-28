import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/react-redux.hook'
import { checkAuth, setAuth } from "./store/reducers/user.reducer"
import { Slide, ToastContainer } from 'react-toastify'
import { userData } from "./store/selectors"
import AppHeader from "./components/header/AppHeader";
import AppRouter from "./components/router/AppRouter";
import 'react-toastify/dist/ReactToastify.css';
import './App.scss'
import { useHistory } from 'react-router-dom'

const App = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { isAuth, user } = useAppSelector(userData)

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(checkAuth());
    } else {
      dispatch(setAuth(false))
    }
  }, []);

  useEffect(() => {
    if (isAuth && user.isFirstEnter) {
      history.push('/initialization')
    }
  }, [isAuth, user])

  return (
    <>
      {isAuth && user?.isFirstEnter === false && <AppHeader/>}
      <AppRouter isAuth={isAuth}/>
      <ToastContainer
        transition={Slide}
      />
    </>
  )
}

export default App
