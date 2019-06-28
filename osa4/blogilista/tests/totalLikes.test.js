const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = listHelper.listWithOneBlog
  const listWithManyBlogs = listHelper.listWithManyBlogs

  test('when list has one blog equals likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('sum of many blogs', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(20)
  })

  test('sum of empty blogs is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
})