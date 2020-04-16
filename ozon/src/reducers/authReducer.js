import {
  LOGIN,
  LOGOUT
} from '../actions/types'

const initialState = {
  user: null,
  isSignedIn: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        user: action.payload,
        isSignedIn: true
      }
    case LOGOUT:
      return {
        user: null,
        isSignedIn: null
      }
    default:
      return state
  }
}