import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = null

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      await blogService.setToken(user.token)

      dispatch({
        type: 'LOGIN',
        user
      })
    } catch (exception) {

    }

  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser')
    await blogService.setToken(null)
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const setUser = user => {
  return async dispatch => {
    await blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      user
    })
  }
}

export default loginReducer