import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '~/constants/http-status'
import { omit } from 'lodash'
import { ErrorWithStatus } from '~/models/Error'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorWithStatus) {
    res.status(err.status).json(omit(err, 'status'))
    return
  }
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    errorInfo: err
  })
}
