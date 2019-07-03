import React, { useState } from 'react'
import Input from './Input'
import blogService from '../services/blogs'

const CreateBlogForm = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    
    const addBlog = (event) => {
      event.preventDefault()
      const newBlog = { title, author, url }

      blogService
        .create(newBlog)
        .then((returnedBlog) => {
          props.setBlogs(props.blogs.concat(returnedBlog))
          setTitle('')
          setAuthor('')
          setUrl('')
          props.notify('New blog created!')
      })
      .catch(error => {
          props.nofity('Creating a new blog failed', 'error')
      })
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    return (
      <form onSubmit={addBlog}>
        <Input name='title' value={title} handleChange={handleTitleChange} />
        <Input name='author' value={author} handleChange={handleAuthorChange} />
        <Input name='url' value={url} handleChange={handleUrlChange} />
        <button type="submit">create</button>
      </form>
    )
  }
  
  export default CreateBlogForm