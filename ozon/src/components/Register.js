import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Jumbotron, Form, Button, Alert, Badge } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { login } from '../actions/actions'

const Register = () => {
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

    axios.post('http://localhost:3000/register', {
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
      <h1>Регистрация</h1>
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
          Зарегистрироваться
        </Button>
      </Form>

      <NavLink to="/login"><Badge variant="primary">Уже есть аккаунт?</Badge></NavLink>
    </Jumbotron>
  )
}

export default Register
