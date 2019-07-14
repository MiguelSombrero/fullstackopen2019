import React from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ onSubmit, title, author, url }) => {
  return (
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
  )
}

CreateBlogForm.propTypes = {
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default CreateBlogForm