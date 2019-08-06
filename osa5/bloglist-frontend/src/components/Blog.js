import React from 'react'
import { connect } from 'react-redux'
import { updateBlog, removeBlog, commentBlog } from '../reducers/blogReducers'
import { Form, FormGroup, Button } from 'react-bootstrap'

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

  const handleComment = async (event) => {
    event.preventDefault()

    try {
      await props.commentBlog(blog.id, { comment: event.target.comment.value })
      props.notify('Blog commented succesfully!')
    } catch (exception) {
      props.notify('Commenting blog failed', 'error')
    }
  }

  return (
    <div style={style} className='blog' >
      <h2>{blog.title} {blog.author}</h2>
      <p>{blog.url}</p>
      <p>{blog.likes} likes <button onClick={updateBlog}>like</button></p>
      <p>added by {blog.user.name}</p>
      <h3>Comments</h3>
      <Form onSubmit={handleComment} >
        <FormGroup>
          <Form.Control
            type='text'
            name='comment'
            placeholder='add comment'
          />
          <Button type='submit'>Comment</Button>
        </FormGroup>
      </Form>
      <ul>
        {blog.comments.map((comment, index) =>
          <li key={index}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

const mapDispatchToProps = {
  updateBlog,
  removeBlog,
  commentBlog
}

export default connect(null, mapDispatchToProps)(Blog)