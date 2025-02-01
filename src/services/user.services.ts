import User from '~/models/schemas/User.schema'
import { databaseService } from '~/services/database.services'
import { UserRegisterReqBody } from '~/models/requests/user.requests'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { jwtExpiresIn, tokenTypes } from '~/constants/enum'

class UserServices {
  async register(payload: UserRegisterReqBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password)
      })
    )
    const user_id = result.insertedId.toString()
    const [accessToken, refreshToken] = await this.signAccessAndRefreshToken(user_id)
    return {
      accessToken,
      refreshToken
    }
  }

  async login(user_id: string) {
    const [accessToken, refreshToken] = await this.signAccessAndRefreshToken(user_id)
    return {
      accessToken,
      refreshToken
    }
  }

  async checkEmailExist(email: string): Promise<boolean> {
    const result = await databaseService.users.findOne({ email })
    return Boolean(result)
  }

  private signAccessToken = async (user_id: string) => {
    return signToken({
      payload: {
        user_id,
        tokenType: tokenTypes.ACCESS_TOKEN
      },
      option: {
        expiresIn: jwtExpiresIn.ACCESS_TOKEN
      }
    })
  }

  private signRefreshToken = async (user_id: string) => {
    return signToken({
      payload: {
        user_id,
        tokenType: tokenTypes.REFRESH_TOKEN
      },
      option: {
        expiresIn: jwtExpiresIn.REFRESH_TOKEN
      }
    })
  }

  private signAccessAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }
}

const userServices = new UserServices()
export default userServices
