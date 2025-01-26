import express from 'express'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { loginController, registerController } from '~/controllers/users.controllers'
import { validate } from '~/utils/validation'

const usersRouter = express.Router()

usersRouter.post('/login', loginValidator, loginController)

/**
 Register Route
 body: {name: string, email: string, password: string, confirmPassword: string, date_of_birth: ISOString}
 **/

usersRouter.post('/register', validate(registerValidator), registerController)

export default usersRouter
