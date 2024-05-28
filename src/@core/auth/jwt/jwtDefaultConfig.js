// ** Auth Endpoints
export default {
  adminLoginEndpoint: '/auth/admin/login',
  loginEndpoint: '/auth/login',
  registerEndpoint: '/auth/register',
  refreshEndpoint: '/auth/refresh-token',
  logoutEndpoint: '/auth/logout',
  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3500',

  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
