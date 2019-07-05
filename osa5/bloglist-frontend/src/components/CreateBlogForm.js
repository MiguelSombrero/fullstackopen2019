import React from 'react'
import Input from './Input'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ onSubmit, title, author, url, handleAuthorChange, handleTitleChange, handleUrlChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <Input name='title' value={title} handleChange={handleTitleChange} />
      <Input name='author' value={author} handleChange={handleAuthorChange} />
      <Input name='url' value={url} handleChange={handleUrlChange} />
      <button type="submit">create</button>
    </form>
  )
}

CreateBlogForm.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired
}

export default CreateBlogForm