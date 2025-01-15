import { Request, Response, NextFunction } from 'express'

export const loginValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(500).json({
      message: 'Missing email or password'
    })
    return
  }
  next()
}
