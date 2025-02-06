import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { ErrorWithStatus } from '~/models/Error'

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

export const verifyToken = ({
  token,
  secretOrPublicKey = process.env.JWT_SECRET as string
}: {
  token: string
  secretOrPublicKey?: string
}) => {
  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (error, decoded) => {
      if (error) {
        reject(new ErrorWithStatus({ message: error.message, status: 401 }))
      }
      resolve(decoded as jwt.JwtPayload)
    })
  })
}
