import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { logout } from '../reducers/loginReducer'

const Navigation = (props) => {

  const handleLogout = () => {
    props.logout()
    props.notify('User logged out')
  }

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#'>
            <Link to='/blogs' >Blogs</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link to='/users' >Users</Link>
          </Nav.Link>

          {props.user &&
          <Nav.Link href='#' as='span'>
            {props.user.name} logged in
          </Nav.Link>
          }
          {props.user &&
          <Nav.Link href='#' as='span' onClick={handleLogout} >
            Logout
          </Nav.Link>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)