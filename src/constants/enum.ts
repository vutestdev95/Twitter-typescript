export enum tokenTypes {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  FORGOT_PASSWORD_TOKEN,
  EMAIL_VERIFY_TOKEN
}

export enum jwtExpiresIn {
  ACCESS_TOKEN = '15m',
  REFRESH_TOKEN = '100d'
}
