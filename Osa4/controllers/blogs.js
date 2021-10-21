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

blogsRouter.delete('/:id', async (request, response) => {
     try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
         
     } catch (e) {
         response.status(404).send({error: e.message})

     }
})

blogsRouter.put('/:id', async (request, response) => {
    try{
        body = request.body
        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        }
        const result = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
        response.json(result)
        
    } catch (e) {
        response.status(404).end()
    }
})
module.exports = blogsRouter




