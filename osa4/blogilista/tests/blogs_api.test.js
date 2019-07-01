const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/list_helper')
const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.listWithManyBlogs
      .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('correct number of json blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length)
      .toBe(helper.listWithManyBlogs.length)
  })

  test('id field is defined', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('can add valid blog', async () => {
    const newBlog = {
      title: 'Test blog for life',
      author: 'Miguel Sombrero',
      url: 'http://www.is.fi',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()

    const contents = blogs.map(r => r.title)

    expect(blogs.length).toBe(helper.listWithManyBlogs.length + 1)
    expect(contents).toContain('Test blog for life')
  })

  test('likes is zero if not given', async () => {
    const newBlog = {
      title: 'Test blog for life',
      author: 'Miguel Sombrero',
      url: 'http://www.is.fi'
    }

    const answer = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(answer.body.likes).toBe(0)
  })

  test('cannot add blog without title', async () => {
    const newBlog = {
      author: 'Miguel Sombrero',
      url: 'http://www.is.fi'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('cannot add blog without url', async () => {
    const newBlog = {
      title: 'Test blog for life',
      author: 'Miguel Sombrero'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with statuscode 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(
      blogsAtStart.length - 1)

    const contents = blogsAtEnd.map(blog => blog.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('update of a blog', () => {
  test('succeeds with a valid parameters', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = { ...blogToUpdate, likes: 23 }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const returnedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
    expect(returnedBlog.likes).toBe(23)
  })
})

afterAll(() => {
  mongoose.connection.close()
})