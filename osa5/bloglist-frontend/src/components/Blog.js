import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
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

  if (!blog) {
    return null
  }

  return (
    <div style={style} className='blog' >
      <div onClick={toggleVisibility} className='heading' >
        {blog.title} {blog.author}<br />
      </div>

      {visible &&
        <div className='content' >
          {blog.url}<br />
          {blog.likes} likes <button onClick={updateBlog}>like</button><br />
          added by {blog.user.name}<br />

          {user.username === blog.user.username &&
            <button onClick={removeBlog}>remove</button>
          }
        </div>
      }
    </div>
  )


}

export default Blog