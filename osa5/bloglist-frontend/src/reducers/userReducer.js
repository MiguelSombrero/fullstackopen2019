import userService from '../services/users'

const initialState = []

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'GET_ALL':
    return action.users
  default:
    return state
  }
}

export const getAll = () => {
  return async dispatch => {
    const users = await userService.getAll()

    dispatch({
      type: 'GET_ALL',
      users
    })
  }
}

export default userReducer