import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Jumbotron, Form, Button, Badge, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../actions/actions'
import axios from 'axios'

const Login = () => {
  const history = useHistory()

  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onEmailChange = event => {
    setError('')
    setEmail(event.target.value)
  }

  const onPasswordChange = event => {
    setError('')
    setPassword(event.target.value)
  }

  const logIn = async event => {
    event.preventDefault()

    axios.post('http://localhost:3000/login', {
      "email": email,
      "password": password
    })
      .then(response => {
        console.log(response)
        dispatch(login(email, response.data))
        localStorage.setItem('token', response.data.accessToken)
        history.push('/')
      })
      .catch(error => {
        console.log(error.response)
        setError(error.response.data)
        setEmail('')
        setPassword('')
      })
  }

  return (
    <Jumbotron>
      {
        error && <Alert variant="danger">{error}</Alert>
      }
      <h1>Вход</h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Почта</Form.Label>
          <Form.Control value={email} onChange={onEmailChange} type="email" placeholder="nozo@gmail.com" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control value={password} onChange={onPasswordChange} type="password" placeholder="********" />
        </Form.Group>

        <Button variant="success" type="submit" onClick={logIn}>
          Войти
        </Button>
      </Form>

      <NavLink to="/register"><Badge variant="primary">Нет аккаунта?</Badge></NavLink>
    </Jumbotron>
  )
}

export default Login
