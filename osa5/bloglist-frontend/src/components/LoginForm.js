import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'
import { login } from '../reducers/loginReducer'
import { createNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Container, Form, Button } from 'react-bootstrap'

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
    <Container className='d-flex justify-content-center'>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label >username:</Form.Label>
          <Form.Control {...username} data-cy='username' />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control {...password} data-cy='password' />
        </Form.Group>
        <Button type="submit" data-cy='login' >login</Button>
      </Form>
    </Container>
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