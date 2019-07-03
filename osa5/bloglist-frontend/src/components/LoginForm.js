import React from 'react'

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <div>
        Username
          <input
          type="text"
          name="username"
          value={props.username}
          onChange={({ target }) => props.setUsername(target.value)}
          />
      </div>
      <div>
        Password
          <input
          type="password"
          name="password"
          value={props.password}
          onChange={({ target }) => props.setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm