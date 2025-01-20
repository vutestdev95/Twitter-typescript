import { Request, Response } from 'express'
import userServices from '~/services/user.services'

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

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const result = await userServices.register({
      email,
      password
    })
    if (!result.acknowledged) {
      res.status(400).json({
        error: 'Register Failed'
      })
      return
    }
    res.json({
      error: 'Register Success'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error: 'Register Failed'
    })
  }
}
