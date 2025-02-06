import express from 'express'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { loginController, logoutController, registerController } from '~/controllers/users.controllers'
import { validate } from '~/utils/validation'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = express.Router()

/**
 Login Route
 body: {email: string, password: string}
 **/

usersRouter.post('/login', validate(loginValidator), wrapRequestHandler(loginController))

/**
 Register Route
 body: {name: string, email: string, password: string, confirmPassword: string, date_of_birth: ISOString}
 **/

usersRouter.post('/register', validate(registerValidator), wrapRequestHandler(registerController))

/**
 Logout Route
 header : {Authorization: Bearer <access_token>}
 body: {refresh_token : string}
 **/

usersRouter.post(
  '/logout',
  validate(accessTokenValidator),
  validate(refreshTokenValidator),
  wrapRequestHandler(logoutController)
)

export default usersRouter
