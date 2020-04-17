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
    // Очищаем сообщение об ошибке
    setError('')
    setEmail(event.target.value)
  }

  const onPasswordChange = event => {
    // Очищаем сообщение об ошибке
    setError('')
    setPassword(event.target.value)
  }

  const logIn = async event => {
    event.preventDefault()

    // Для регистрации необходимы почта и пароль
    axios.post('http://localhost:3000/register', {
      "email": email,
      "password": password
    })
      .then(response => {
        console.log(response)
        dispatch(login(email, response.data))
        // Сохраняем JWT в localStorage для того, чтобы идентифицировать пользователя через некоторое время
        localStorage.setItem('token', response.data.accessToken)
        // Автоматический переход на главную страницу
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
