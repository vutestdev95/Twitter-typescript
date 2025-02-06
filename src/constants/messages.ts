export enum USER_MESSAGES {
  VALIDATION_ERROR = 'Validation error',
  NAME_REQUIRED = 'Name is required',
  NAME_STRING = 'Name must be a string',
  NAME_LENGTH = 'Name must be between 1 and 255 characters',

  EMAIL_REQUIRED = 'Email is required',
  EMAIL_INVALID = 'Invalid email format',
  EMAIL_EXISTS = 'Email already exists',

  EMAIL_OR_PASSWORD_INCORRECT = 'Email or password is incorrect',

  PASSWORD_REQUIRED = 'Password is required',
  PASSWORD_STRING = 'Password must be a string',
  PASSWORD_LENGTH = 'Password must be between 1 and 50 characters',
  PASSWORD_WEAK = 'Password must contain at least 1 character, 1 lowercase, 1 uppercase, 1 number, and 1 symbol',

  CONFIRM_PASSWORD_REQUIRED = 'Confirm password is required',
  CONFIRM_PASSWORD_STRING = 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH = 'Confirm password must be between 1 and 50 characters',
  CONFIRM_PASSWORD_WEAK = 'Confirm password must contain at least 1 character, 1 lowercase, 1 uppercase, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_MISMATCH = 'Confirm password must match password',

  DATE_OF_BIRTH_INVALID = 'Invalid date of birth format (must be ISO 8601)',

  LOGIN_SUCCESS = 'Login success',
  REGISTER_SUCCESS = 'Register success',
  LOGOUT_SUCCESS = 'Logout success',

  ACCESS_TOKEN_IS_REQUIRED = 'Access token is required',
  REFRESH_TOKEN_IS_REQUIRED = 'Refresh token is required',
  REFRESH_TOKEN_IS_INVALID = 'Refresh token is invalid',
  REFRESH_TOKEN_NOT_FOUND = 'Refresh token not found'
}
