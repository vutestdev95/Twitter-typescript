import { Locals, Request, Response } from 'express'
import userServices from '~/services/user.services'
import * as core from 'express-serve-static-core'
import { UserRegisterReqBody } from '~/models/requests/user.requests'
import { ObjectId } from 'mongodb'
import User from '~/models/schemas/User.schema'
import { USER_MESSAGES } from '~/constants/messages'

export const loginController = async (req: Request, res: Response) => {
  const { user } = req
  const { _id } = user as User
  const result = await userServices.login((_id as ObjectId).toString())
  res.status(200).json({
    message: USER_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const registerController = async (
  req: Request<core.ParamsDictionary, any, UserRegisterReqBody, any, Locals>,
  res: Response
) => {
  const result = await userServices.register({
    ...req.body
  })
  res.json({
    message: USER_MESSAGES.REGISTER_SUCCESS,
    ...result
  })
}
