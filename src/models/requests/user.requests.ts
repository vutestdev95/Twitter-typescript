import { JwtPayload } from 'jsonwebtoken'
import { tokenTypes } from '~/constants/enum'

export interface UserRegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface UserLogoutBody {
  refresh_token: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: tokenTypes
}
