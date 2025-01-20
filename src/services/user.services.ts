import User from '~/models/schemas/User.schema'
import { databaseService } from '~/services/database.services'

class UserServices {
  async register({ email, password }: { email: string; password: string }) {
    try {
      return await databaseService.users.insertOne(
        new User({
          email,
          password
        })
      )
    } catch {
      throw new Error('Register fail')
    }
  }
}

const userServices = new UserServices()
export default userServices
