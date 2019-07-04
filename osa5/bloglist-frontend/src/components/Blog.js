import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, notify }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const style = {
    border: 'solid',
    borderWidth: 1,
    padding: 5,
    margin: 5
  }

  const updateBlog = () => {
     const updateableBlog = {
      ...blog, likes: blog.likes + 1, user: blog.user.id}
    
    blogService
      .update(blog.id, updateableBlog)
      .then(updatedBlog => {
        setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
        notify('Blog updated!')
      })
      .catch(error => {
        notify('Updating a blog failed', 'error')
      })
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} ?`)) {

      console.log(blog.id)

      blogService
        .remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== blog.id))
          notify('Blog removed succesfully!')
        })
        .catch(error => {
          notify('Remove blog failed', 'error')
        })
    }
  }

  if (!blog) {
    return null
  }

  if (visible) {
    return (
      <div style={style}>
        <div onClick={toggleVisibility} >
          {blog.title} {blog.author}<br />
        </div>
        {blog.url}<br />
        {blog.likes} likes <button onClick={updateBlog}>like</button><br />
        added by {blog.user.name}<br />
        <button onClick={removeBlog}>remove</button>
      </div>
    )
  }

  return (
    <div onClick={toggleVisibility}>
      {blog.title} {blog.author}
    </div>
  )
}

export default Blog