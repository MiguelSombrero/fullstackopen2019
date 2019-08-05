import blogService from '../services/blogs'

export const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'UPDATE_BLOG':
    return state.map(blog => blog.id !== action.data.updatedBlog.id ? blog : action.data.updatedBlog)
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  default:
    return state
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const updateBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: { updatedBlog }
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort( (a, b) => b.likes - a.likes )
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer