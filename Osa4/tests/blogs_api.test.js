const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const initBlogs = [{title: "a", author: "a", url: '', likes: 12},{title: "b", author: "b", url: '', likes: 21}]
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

afterAll(() => {
  mongoose.connection.close()
})