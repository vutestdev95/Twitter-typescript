import express from 'express'
import { loginValidator } from '~/middlewares/users.middlewares'
import { loginController } from '~/controllers/users.controllers'

const usersRouter = express.Router()

usersRouter.post('/login', loginValidator, loginController)

export default usersRouter
