import { ObjectId } from 'mongodb'

enum UserVerifyStatus {
  Unverified,
  Verified,
  Banned
}

export interface TUser {
  _id?: ObjectId
  name: string
  email: string
  date_of_birth: Date
  password: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus
  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string
}

class User implements TUser {
  _id?: ObjectId
  avatar: string
  bio: string
  cover_photo: string
  created_at: Date
  date_of_birth: Date
  email: string
  email_verify_token: string
  forgot_password_token: string
  location: string
  name: string
  password: string
  updated_at: Date
  username: string
  verify: UserVerifyStatus
  website: string

  constructor({
    _id,
    avatar,
    bio,
    cover_photo,
    created_at,
    date_of_birth,
    email,
    email_verify_token,
    forgot_password_token,
    location,
    name,
    password,
    updated_at,
    username,
    verify,
    website
  }: TUser) {
    const date = new Date()
    this._id = _id ?? new ObjectId()
    this.avatar = avatar ?? ''
    this.bio = bio ?? ''
    this.cover_photo = cover_photo ?? ''
    this.created_at = created_at ?? date
    this.date_of_birth = date_of_birth ?? date
    this.email = email
    this.email_verify_token = email_verify_token ?? ''
    this.forgot_password_token = forgot_password_token ?? ''
    this.location = location ?? ''
    this.name = name ?? ''
    this.password = password
    this.updated_at = updated_at ?? date
    this.username = username ?? ''
    this.verify = verify ?? UserVerifyStatus.Unverified
    this.website = website ?? ''
  }
}

export default User
