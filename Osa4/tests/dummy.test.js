const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

test('totalLikes returns 111', () => {
    const blog = {title:'', author: '', url: '', likes: 0}
    const blogs =[{...blog, likes: 1}, {...blog, likes: 10}, {...blog, likes: 100}]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(111)
})

