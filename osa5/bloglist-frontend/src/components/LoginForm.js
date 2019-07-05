import React from 'react'
import PropTypes from 'prop-types'
import Input from './Input'

const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => {
  return (
    <form onSubmit={handleLogin}>
      <Input name='username' value={username} handleChange={handleUsernameChange} />
      <Input name='password' value={password} handleChange={handlePasswordChange} />
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm