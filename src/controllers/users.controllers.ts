import { Locals, Request, Response } from 'express'
import userServices from '~/services/user.services'
import * as core from 'express-serve-static-core'
import { UserRegisterReqBody } from '~/models/requests/user.requests'

export const loginController = (req: Request, res: Response) => {
  res.json({
    data: [
      {
        id: 1,
        name: 'Vu'
      }
    ]
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
    message: 'Register Success',
    ...result
  })
}
