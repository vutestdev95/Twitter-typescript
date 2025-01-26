import express from 'express'
import { ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'

export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req)
      if (!result.isEmpty()) {
        res.status(400).json({ errors: result.mapped() })
        return
      }
    }
    next()
  }
}
