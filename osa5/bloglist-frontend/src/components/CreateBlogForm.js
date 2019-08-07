import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'

const CreateBlogForm = ({ onSubmit, title, author, url }) => {
  return (
    <Container>
      <h2>Create new blog</h2>
      <form onSubmit={onSubmit}>
        title:
        <input {...title} />
        <br />
        author:
        <input {...author} />
        <br />
        url:
        <input {...url} />
        <br />
        <button type="submit">create</button>
      </form>
    </Container>
  )
}

CreateBlogForm.propTypes = {
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default CreateBlogForm