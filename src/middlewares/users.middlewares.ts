import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import userServices from '~/services/user.services'

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

export const registerValidator = checkSchema({
  name: {
    notEmpty: true,
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 255
      }
    },
    trim: true
  },

  email: {
    notEmpty: true,
    isEmail: true,
    trim: true,
    custom: {
      options: async (value) => {
        const isExistEmail = await userServices.checkEmailExist(value)
        if (isExistEmail) {
          throw new Error('Email already exists')
        }
        return true
      }
    }
  },
  password: {
    notEmpty: true,
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 50
      }
    },
    isStrongPassword: {
      options: {
        minLength: 1,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      },
      errorMessage: 'Password must contain at least 1 character, 1 lower, 1 upper, 1 number, 1 symbol'
    },
    trim: true
  },
  confirm_password: {
    notEmpty: true,
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 50
      }
    },
    isStrongPassword: {
      options: {
        minLength: 1,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      },
      errorMessage: 'Password must contain at least 1 character, 1 lower, 1 upper, 1 number, 1 symbol'
    },
    custom: {
      options: (value, { req }) => {
        return value === req.body.password
      },
      errorMessage: 'Confirm password must match password'
    },
    trim: true
  },
  date_of_birth: {
    isISO8601: {
      options: {
        strict: true,
        strictSeparator: true
      }
    }
  }
})
