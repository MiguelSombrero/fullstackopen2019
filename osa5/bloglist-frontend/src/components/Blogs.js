import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

const Blogs = (props) => {
  if (!props.blogs) {
    return null
  }

  const style = {
    border: 'solid',
    borderWidth: 1,
    width: '15rem'
  }

  return (
    <Container>
      <Row className='d-flex justify-content-center'>
        <h2>Blogs</h2>
      </Row>
      <Row className='d-flex justify-content-center'>
        {props.blogs.map(blog =>
          <div key={blog.id} style={style} className='m-3 p-3'>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
          </div>
        )}
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(Blogs)