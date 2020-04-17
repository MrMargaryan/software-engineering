import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Homepage = () => {
  const email = useSelector(state => state.auth.user)

  return (
    <Jumbotron>
      {
        email
          ? <h1>Добро Пожаловать, {email}</h1>
          : <h1>Аналог OZON</h1>
      }
    </Jumbotron>
  )
}

export default Homepage
