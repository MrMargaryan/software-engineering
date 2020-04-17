import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import Login from '../components/Login'
import reducers from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
)

afterEach(cleanup)

describe('Change email input', () => {
  it('correctly updates on change', () => {
    const { queryByPlaceholderText } = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    )

    const emailInput = queryByPlaceholderText('nozo@gmail.com')

    fireEvent.change(emailInput, { target: { value: 'hamlet@gmail.com' } })

    expect(emailInput.value).toBe('hamlet@gmail.com')
  }),
    it('incorrectly updates on change', () => {
      const { queryByPlaceholderText } = render(
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>
      )

      const emailInput = queryByPlaceholderText('nozo@gmail.com')

      fireEvent.change(emailInput, { target: { value: 'hamlet' } })

      expect(emailInput.value).not.toBe('hamlet@gmail.com')
    })
})

describe('Page check', () => {
  it('is signin page', () => {
    // const history = createMemoryHistory()
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    )
    expect(document.querySelector('h1').textContent).toBe('Вход')
  })
})