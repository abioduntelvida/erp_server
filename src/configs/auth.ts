export default {
  meEndpoint: '/auth/me',
  loginEndpoint: 'https://57ea-102-88-35-128.ngrok-free.app/api/users/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  storageDatekeyName: 'userData',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
