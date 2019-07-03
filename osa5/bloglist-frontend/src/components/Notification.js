import React from 'react'

const Notification = ({ notification }) => {
  if (notification.message === null) {
      return null
  }

  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 15,
    borderStyle: 'solid',
    padding: 10,
    margin: 5
  }

  return (
    <div style={style}>
        {notification.message}
    </div>
  )
}

export default Notification