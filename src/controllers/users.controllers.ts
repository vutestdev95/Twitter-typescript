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
  try {
    const result = await userServices.register({
      ...req.body
    })
    if (!result) {
      res.status(400).json({
        error: 'Register Failed'
      })
      return
    }
    res.json({
      message: 'Register Success',
      ...result
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error: 'Register Failed'
    })
  }
}
