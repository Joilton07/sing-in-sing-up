const { Router } = require('express')

const routes = new Router()

const UserController = require('./app/controllers/UserController')
const AuthMiddleware = require('./app/middlewares/AuthMiddleware')

const userController = new UserController()

routes.get('/', (req, res) => { return res.send('OK') })

routes.post('/user/create', userController.createUser)

routes.post('/login', userController.login)

routes.get('/user/:id', AuthMiddleware, userController.showUser)

module.exports = routes
