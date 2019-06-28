const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
  const listWithOneBlog = listHelper.listWithOneBlog
  const listWithManyBlogs = listHelper.listWithManyBlogs

  test('only one blog return it', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('many blogs return highest likes blog', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(result).toEqual(listWithManyBlogs[2])
  })

  test('no blogs return empty array', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual([])
  })
})