export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  tempStorageTokenKeyName: 'tempToken',
  userCreds: 'userCreds',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
