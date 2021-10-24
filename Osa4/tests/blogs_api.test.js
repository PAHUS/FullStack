const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const initBlogs = [{title: "a", author: "a", url: 'a', likes: 12},{title: "b", author: "b", url: 'b', likes: 21}]
beforeEach(async () => {
      await Blog.deleteMany({})
      let blogObject = new Blog(initBlogs[0])
      await blogObject.save()  
      blogObject = new Blog(initBlogs[1])  
      await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initBlogs.length)
})
  
test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContainEqual('a')
})

test('id field is named correctly', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    
})

test('POST adds a blog', async () => {
    const res1 = await api.get('/api/blogs')
    const length1 = res1.body.length
    const blogObject = new Blog({title: "c", author: "c", url: 'c', likes: 3131})
    await blogObject.save()
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(length1 + 1)
})

test('likes is 0 by default', async () => {
    const blogObject = new Blog({title: 'c', author: 'c', url: 'c'})
    await blogObject.save()
    const response = await api.get('/api/blogs')
    expect(response.body[2].likes).toBe(0)
})

test('no title or url gives 400 Bad Request error', async () => {
    const blogObject = new Blog({author: 'faulty', likes: 2})
    await api.post('/api/blogs')
        .send(blogObject)
        .expect(400)

})

afterAll(() => {
  mongoose.connection.close()
})