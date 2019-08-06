import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = (props) => {
  if (!props.blogs) {
    return null
  }

  const style = {
    border: 'solid',
    borderWidth: 1,
    padding: 5,
    margin: 5
  }

  return (
    <div>
      <h2>Blogs</h2>
      {props.blogs.map(blog =>
        <div key={blog.id} style={style} className='blog' >
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(Blogs)