export default {
  meEndpoint: '/auth/me',
  loginEndpoint: 'https://f17a-102-88-35-202.ngrok-free.app/api/users/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  storageDatekeyName: 'userData',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
