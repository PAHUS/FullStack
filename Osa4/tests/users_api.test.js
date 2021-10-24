const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
})


test('short password returns correct error messages', async () => {
  await api
    .post('/api/users')
    .send({
        username: "aaaa",
        name: "aaaaa",
        password: "a"
    })
    .expect(400, {error: 'Invalid username/password format'})
    
})
test('short username returns correct error messages', async () => {
    await api
      .post('/api/users')
      .send({
          username: "a",
          name: "aaaaa",
          password: "aaaa"
      })
      .expect(400, {error: 'Invalid username/password format'})
      
})
test('no username or pw returns correct error messages', async () => {
    await api
      .post('/api/users')
      .send({
          name: "aaaaa",
      })
      .expect(400, {error: 'Invalid username/password format'})
      
})

afterAll(() => {
  mongoose.connection.close()
})