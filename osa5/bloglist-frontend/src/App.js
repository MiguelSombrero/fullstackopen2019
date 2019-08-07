import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Navigation from './components/Navigation'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { createNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducers'
import { connect } from 'react-redux'
import { setUser } from './reducers/loginReducer'
import { getAll } from './reducers/userReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

function App(props) {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const notify = (message, type='success') => {
    props.createNotification(message, type)
    setTimeout(() => props.createNotification('', type), 3000)
  }

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    props.getAll()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      props.setUser(loggedUser)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    try {
      props.createBlog(newBlog)
      title.reset()
      author.reset()
      url.reset()
      notify('New blog created!')

    } catch (exception) {
      notify('Creating a new blog failed', 'error')
    }
  }

  const userById = (id) =>
    props.users.find(user => user.id === id)

  const blogById = (id) =>
    props.blogs.find(blog => blog.id === id)

  return (
    <Container fluid>
      <Router>
        <div>
          <Navigation notify={notify} />
          <Notification />

          {!props.user &&
            <LoginForm notify={notify}/>
          }

          {props.user &&
            <div>
              <Togglable buttonLabel='new blog'>
                <CreateBlogForm
                  onSubmit={addBlog}
                  title={title}
                  author={author}
                  url={url}
                />
              </Togglable>

              <Route exact path='/users' render={() => <Users />} />
              <Route exact path='/blogs' render={() => <Blogs />} />
              <Route exact path='/users/:id' render={({ match }) =>
                <User userToView={userById(match.params.id)} /> }
              />
              <Route exact path='/blogs/:id' render={({ match }) =>
                <Blog blogToView={blogById(match.params.id)} notify={notify} /> }
              />
            </div>
          }
        </div>
      </Router>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  createNotification,
  createBlog,
  initializeBlogs,
  setUser,
  getAll
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
