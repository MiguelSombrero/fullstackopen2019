import React from 'react'

const Notification = (props) => {
  if (props.store.getState().message === '') {
    return null
  }
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {props.store.getState().message}
    </div>
  )
}

export default Notification