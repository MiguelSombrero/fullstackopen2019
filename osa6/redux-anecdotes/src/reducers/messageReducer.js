
const initialState = ''

export const setMessage = (message, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      message
    })

    setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE'
      })
    }, timeout*1000)
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