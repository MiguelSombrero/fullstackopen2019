import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password }) => {
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
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm