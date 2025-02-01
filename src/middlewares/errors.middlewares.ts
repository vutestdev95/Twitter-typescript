import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '~/constants/http-status'
import { omit } from 'lodash'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json(omit(err, 'status'))
}
