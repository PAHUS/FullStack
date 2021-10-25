const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const { requestLogger } = require('../utils/middleware')

const getTokenFrom = request => {
      const authorization = request.get('authorization')
        if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
            return authorization.substring(7)  
        }
        return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const token = request.token
    if (!token ) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id){
        return response.status(401).json({ error: 'token missing or invalid' })
    } 
    

    try{ 
        const user = await User.findById(decodedToken.id)
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })

        const result = await blog.save()
        response.status(201).json(result)
    } catch (e) {
        response.status(400).json({status: 400, message: e.message})
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    if (!request.token) {
        console.log('no token')
        return response.status(401).json({ error: 'token missing or invalid' })
    }
     try {
        const user = request.user
        const blog = await Blog.findById(request.params.id)
        if (!user || user !== blog.user.toString()) {
            console.log(user, blog.user.toString())
            return response.status(401).json({ error: 'token missing or invalid' })
        }
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




