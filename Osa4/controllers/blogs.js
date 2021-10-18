const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    try{ 
        const result = await blog.save()
        response.status(201).json(result)
    } catch (e) {
        response.status(400).json({status: 400, message: e.message})
    }
})
module.exports = blogsRouter




