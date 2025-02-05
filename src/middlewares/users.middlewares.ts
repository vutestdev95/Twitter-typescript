import { checkSchema } from 'express-validator'
import userServices from '~/services/user.services'
import { ErrorWithStatus } from '~/models/Error'
import { USER_MESSAGES } from '~/constants/messages'
import { databaseService } from '~/services/database.services'
import { hashPassword } from '~/utils/crypto'
import { verifyToken } from '~/utils/jwt'
import { HttpStatus } from '~/constants/http-status'

export const loginValidator = checkSchema(
  {
    email: {
      notEmpty: {
        errorMessage: USER_MESSAGES.EMAIL_REQUIRED
      },
      isEmail: {
        errorMessage: USER_MESSAGES.EMAIL_INVALID
      },
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const user = await databaseService.users.findOne({ email: value, password: hashPassword(req.body.password) })
          if (!user) {
            throw new Error(USER_MESSAGES.EMAIL_OR_PASSWORD_INCORRECT)
          }
          req.user = user
          return true
        }
      }
    },
    password: {
      notEmpty: {
        errorMessage: USER_MESSAGES.PASSWORD_REQUIRED
      },
      isString: {
        errorMessage: USER_MESSAGES.PASSWORD_STRING
      },
      isLength: {
        options: {
          min: 1,
          max: 50
        },
        errorMessage: USER_MESSAGES.PASSWORD_LENGTH
      },
      isStrongPassword: {
        options: {
          minLength: 1,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage: USER_MESSAGES.PASSWORD_WEAK
      },
      trim: true
    }
  },
  ['body']
)

export const registerValidator = checkSchema(
  {
    name: {
      notEmpty: {
        errorMessage: USER_MESSAGES.NAME_REQUIRED
      },
      isString: {
        errorMessage: USER_MESSAGES.NAME_STRING
      },
      isLength: {
        options: {
          min: 1,
          max: 255
        },
        errorMessage: USER_MESSAGES.NAME_LENGTH
      },
      trim: true
    },

    email: {
      notEmpty: {
        errorMessage: USER_MESSAGES.EMAIL_REQUIRED
      },
      isEmail: {
        errorMessage: USER_MESSAGES.EMAIL_INVALID
      },
      trim: true,
      custom: {
        options: async (value) => {
          const isExistEmail = await userServices.checkEmailExist(value)
          if (isExistEmail) {
            throw new ErrorWithStatus({ message: USER_MESSAGES.EMAIL_EXISTS, status: 401 })
          }
          return true
        }
      }
    },
    password: {
      notEmpty: {
        errorMessage: USER_MESSAGES.PASSWORD_REQUIRED
      },
      isString: {
        errorMessage: USER_MESSAGES.PASSWORD_STRING
      },
      isLength: {
        options: {
          min: 1,
          max: 50
        },
        errorMessage: USER_MESSAGES.PASSWORD_LENGTH
      },
      isStrongPassword: {
        options: {
          minLength: 1,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage: USER_MESSAGES.PASSWORD_WEAK
      },
      trim: true
    },
    confirm_password: {
      notEmpty: {
        errorMessage: USER_MESSAGES.CONFIRM_PASSWORD_REQUIRED
      },
      isString: {
        errorMessage: USER_MESSAGES.CONFIRM_PASSWORD_STRING
      },
      isLength: {
        options: {
          min: 1,
          max: 50
        },
        errorMessage: USER_MESSAGES.CONFIRM_PASSWORD_LENGTH
      },
      isStrongPassword: {
        options: {
          minLength: 1,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage: USER_MESSAGES.CONFIRM_PASSWORD_WEAK
      },
      custom: {
        options: (value, { req }) => {
          return value === req.body.password
        },
        errorMessage: USER_MESSAGES.CONFIRM_PASSWORD_MISMATCH
      },
      trim: true
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        },
        errorMessage: USER_MESSAGES.DATE_OF_BIRTH_INVALID
      }
    }
  },
  ['body']
)

export const accessTokenValidator = checkSchema(
  {
    Authorization: {
      notEmpty: {
        errorMessage: USER_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
      },
      custom: {
        options: async (value, { req }) => {
          const accessToken = value.split(' ')[1]
          if (!accessToken) {
            throw new ErrorWithStatus({
              message: USER_MESSAGES.ACCESS_TOKEN_IS_REQUIRED,
              status: HttpStatus.UNAUTHORIZED
            })
          }

          const decoded_authorization = await verifyToken({ token: accessToken })
          req.decoded_authorization = decoded_authorization
          return true
        }
      }
    }
  },
  ['headers']
)
