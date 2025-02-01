import { HttpStatus } from '~/constants/http-status'
import { USER_MESSAGES } from '~/constants/messages'

type TError = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
>

export class ErrorWithStatus {
  message: string
  status: number

  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

export class ErrorEntity extends ErrorWithStatus {
  errors: TError

  constructor({ message = USER_MESSAGES.VALIDATION_ERROR, errors }: { message?: string; errors: TError }) {
    super({ message, status: HttpStatus.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
