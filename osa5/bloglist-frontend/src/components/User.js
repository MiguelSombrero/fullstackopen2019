import React from 'react'

const User = (props) => {
  if (props.userToView === undefined) {
    return null
  }

  return (
    <div>
      <h2>{props.userToView.name}</h2>
      <p>Added blogs</p>
      <ul>
        {props.userToView.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User
