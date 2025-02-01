import express from 'express'
import { ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import { ErrorEntity, ErrorWithStatus } from '~/models/Error'
import { HttpStatus } from '~/constants/http-status'

export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req)
      if (!result.isEmpty()) {
        const errorObj = result.mapped()
        const errorEntity = new ErrorEntity({ errors: {} })
        for (const key in errorObj) {
          const { msg } = errorObj[key]
          if (msg instanceof ErrorWithStatus && msg.status !== HttpStatus.UNPROCESSABLE_ENTITY) {
            return next(msg)
          }
          errorEntity.errors[key] = errorObj[key]
        }
        console.log(errorEntity)
        next(errorEntity)
        return
      }
    }
    next()
  }
}
