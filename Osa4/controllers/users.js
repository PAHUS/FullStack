const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try{
    const body = request.body

    const saltRounds = 10
    if (body.password.length < 3) {
        throw new ValidationError('pwd length <3')
    }
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (e) {
      response.status(400).json({error:'Invalid username/password format'})}  
})


usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(u => u.toJSON()))
})


module.exports = usersRouter