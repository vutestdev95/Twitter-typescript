import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const signToken = async ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  option = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  privateKey?: string
  option?: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, option, (error, encoded) => {
      if (error) {
        reject(error)
        throw new Error(error.message)
      }
      resolve(encoded as string)
    })
  })
}
