
const initialNotification = {
  message: '',
  type: 'success'
}

export const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
  case 'ADD_NOTIFICATION':
    return action.notification
  default:
    return state
  }
}

export const createNotification = (message, type) => {
  return {
    type: 'ADD_NOTIFICATION',
    notification: {
      message, type
    }
  }
}

export default notificationReducer