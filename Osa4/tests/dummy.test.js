const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Total likes', () => {
    const blog = {title:'', author: '', url: '', likes: 5}
    const blogs =[{...blog, likes: 1}, {...blog, likes: 10}, {...blog, likes: 100}]
    const result1 = listHelper.totalLikes([])
    const result2 = listHelper.totalLikes([blog])
    const result3 = listHelper.totalLikes(blogs)
    
    test('of empty list zero', () => expect(result1).toBe(0))
    test('of length one list is the likes of the element', () => {
        expect(result2).toBe(5)
    })
    test('of bigger calculated right', () => {
        expect(result3).toBe(111)})
})

describe('Favourite blog', () => {
  const blogs =[{title: "a", author: "a", url: '', likes: 12},{title: "b", author: "b", url: '', likes: 21}, {title: "ac", author: "c", url: '', likes: 2}]
  const result1 = listHelper.favoriteBlog([])
  const result2 = listHelper.favoriteBlog([{title: "Wretched of the Earth", author: "Franz Fanon", url: '', likes: 19321}])
  const result3 = listHelper.favoriteBlog(blogs)
  
  test('of empty list is empty element', () => expect(result1).toEqual({}))
  test('of length one list is the likes of the element', () => {
      expect(result2).toEqual({title: "Wretched of the Earth", author: "Franz Fanon", url: '', likes: 19321})
  })
  test('of bigger calculated right', () => {
      expect(result3).toEqual({title: "b", author: "b", url: '', likes: 21})})
})