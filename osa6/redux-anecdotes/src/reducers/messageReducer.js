
const initialState = ''

export const setMessage = (message) => {
  return {
    type: 'SET_MESSAGE',
    message: message
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.message
    case 'CLEAR_MESSAGE':
      return ''
    default:
      return state
  }
}

export default reducer