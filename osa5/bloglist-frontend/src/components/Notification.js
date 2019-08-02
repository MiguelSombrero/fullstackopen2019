import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.notification.message === '') {
    return null
  }

  const style = {
    color: props.notification.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 15,
    borderStyle: 'solid',
    padding: 10,
    margin: 5
  }

  return (
    <div style={style}>
      {props.notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)