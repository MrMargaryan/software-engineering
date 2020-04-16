import {
  LOGIN,
  LOGOUT
} from './types'

export const login = email => ({
  type: LOGIN,
  payload: email
})

export const logout = () => ({
  type: LOGOUT
})