const Blog = require('../models/blog')
const User = require('../models/user')

const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  const sum = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(sum, 0)
}

const favoriteBlog = blogs => {
  const compare = (before, current) => {
    return before.likes > current.likes
      ? before
      : current
  }

  return blogs.reduce(compare, [])
}

const mostLikes = blogs => {
  const reducer = (before, current) => {

  }

  return favoriteBlog( blogs.reduce(reducer, []) )
}

const mostBlogs = blogs => {
  const reducer = (before, current) => {

  }

  return blogs.reduce(reducer, [])
}

const listWithOneBlog = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const listWithManyBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Beer is good for you',
    author: 'Michael Jackson',
    url: 'http://www.hs.fi',
    likes: 0
  },
  {
    title: 'Is there dead after life',
    author: 'Monk Thelonius',
    url: 'http://www.il.fi',
    likes: 12
  },
  {
    title: 'Is there dead after life',
    author: 'Monk Thelonius',
    url: 'http://www.il.fi',
    likes: 3
  }
]

const nonExistingId = async () => {
  const blog = new blog({ title: 'willremovesoon', url: 'www.test.fi' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  listWithOneBlog,
  listWithManyBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}