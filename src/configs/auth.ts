export default {
  meEndpoint: '/auth/me',
  loginEndpoint: 'http://172.19.2.11:4000/api/users/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  storageDatekeyName: 'userData',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
