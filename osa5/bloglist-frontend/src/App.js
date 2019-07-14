import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [notification, setNotification] = useState({
    message: null
  })

  const notify = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 3000)
  }

  useEffect(() => {
    blogService.getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs.sort( (a, b) => b.likes - a.likes ))
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedUser = await loginService.login({
        username: username.value, password: password.value
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(loggedUser)
      )

      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      username.reset()
      password.reset()
      notify('Login succesfull')

    } catch (exception) {
      notify('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
    notify('User logged out')
  }

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    blogService
      .create(newBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        title.reset()
        author.reset()
        url.reset()
        notify('New blog created!')
      })
      .catch(() => {
        notify('Creating a new blog failed', 'error')
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />

        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />

      <p>
        {user.name} logged in
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

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          notify={notify}
          user={user}
        />
      )}
    </div>
  )
}

export default App
