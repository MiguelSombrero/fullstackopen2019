import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Blog from './components/Blog'
import Users from './components/Users'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { createNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs, updateBlog, removeBlog } from './reducers/blogReducers'
import { connect } from 'react-redux'
import { logout, setUser } from './reducers/loginReducer'
import { getAll } from './reducers/userReducer'

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

  const updateBlog = (blog) => {
    const updateableBlog = {
      ...blog, likes: blog.likes + 1, user: blog.user.id }

    try {
      props.updateBlog(updateableBlog)
      notify('Blog updated!')
    } catch (exception) {
      notify('Updating a blog failed', 'error')
    }
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} ?`)) {

      try {
        props.removeBlog(blog.id)
        notify('Blog removed succesfully!')
      } catch (exception) {
        notify('Remove blog failed', 'error')
      }
    }
  }

  const handleLogout = () => {
    props.logout()
    notify('User logged out')
  }

  if (props.user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm notify={notify}/>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />

      <p>
        {props.user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <h2>Create new</h2>
      <Togglable buttonLabel='new blog'>
        <CreateBlogForm
          onSubmit={addBlog}
          title={title}
          author={author}
          url={url}
        />
      </Togglable>

      <Users />

      {props.blogs.map(blog =>
        <Blog
          key={blog.id}
          updateBlog={() => updateBlog(blog)}
          removeBlog={() => removeBlog(blog)}
          blog={blog}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  createNotification,
  createBlog,
  initializeBlogs,
  updateBlog,
  removeBlog,
  logout,
  setUser,
  getAll
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
