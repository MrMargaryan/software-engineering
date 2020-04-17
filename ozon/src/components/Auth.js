import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../actions/actions'

const Auth = () => {
  const isSignedIn = useSelector(state => state.auth.isSignedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    // Декодируем JWT
    const email = localStorage.getItem('token') && JSON.parse(window.atob(localStorage.getItem('token').split('.')[1].replace('-', '+').replace('_', '/'))).email
    email && dispatch(login(email))
  }, [])

  const logOut = () => {
    dispatch(logout())
    localStorage.setItem('token', '')
  }

  return (
    isSignedIn
      ? <Button variant="danger" onClick={logOut}>Выход</Button>
      : <NavLink to="/login"><Button variant="primary">Войти</Button></NavLink>
  )
}

export default Auth
