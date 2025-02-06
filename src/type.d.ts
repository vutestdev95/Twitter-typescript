import User from '~/models/schemas/User.schema'
import { TokenPayload } from '~/models/requests/user.requests'

declare module 'express' {
  interface Request {
    user?: User
    refresh_token?: string
    decoded_authorization?: TokenPayload
    decoded_refresh_token?: TokenPayload
  }
}
