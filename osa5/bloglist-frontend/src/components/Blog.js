import React from 'react'
import { connect } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducers'

const Blog = (props) => {
  if (!props.blogToView) {
    return null
  }

  const blog = props.blogToView

  const style = {
    border: 'solid',
    borderWidth: 1,
    padding: 5,
    margin: 5
  }

  const updateBlog = () => {
    const updateableBlog = {
      ...blog, likes: blog.likes + 1, user: blog.user.id }

    try {
      props.updateBlog(updateableBlog)
      props.notify('Blog updated!')
    } catch (exception) {
      props.notify('Updating a blog failed', 'error')
    }
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} ?`)) {

      try {
        props.removeBlog(blog.id)
        props.notify('Blog removed succesfully!')
      } catch (exception) {
        props.notify('Remove blog failed', 'error')
      }
    }
  }

  return (
    <div style={style} className='blog' >
      <h2>{blog.title} {blog.author}</h2>
      <p>{blog.url}</p>
      <p>{blog.likes} likes <button onClick={updateBlog}>like</button></p>
      <p>added by {blog.user.name}</p>
    </div>
  )
}

const mapDispatchToProps = {
  updateBlog,
  removeBlog
}

export default connect(null, mapDispatchToProps)(Blog)