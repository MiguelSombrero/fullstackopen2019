import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'
import { login } from '../reducers/loginReducer'
import { createNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await props.login(username.value, password.value)
      username.reset()
      password.reset()
      props.notify('Login succesfull')
    } catch (exception) {
      props.notify('Login failed', 'error')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      username:
      <input {...username} />
      <br />
      password:
      <input {...password} />
      <br />
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  notify: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  createNotification,
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)