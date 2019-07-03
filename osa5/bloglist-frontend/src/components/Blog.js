import React from 'react'

const Blog = ({ blog }) => {
  if (!blog) {
    return null
  }

  return (
    <div>
      {blog.title} {blog.author}
    </div>
  )
}

export default Blog