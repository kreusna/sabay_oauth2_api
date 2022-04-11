/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { API_CHECKOUT_URL } = require('./init-env')

const ACCESS_TOKEN_LIFETIME = '12h'
const REFRESH_TOKEN_LIFETIME = '60 days'

const LOGIN_METHODS = [
  { name: 'sabay', code: 'sabay' },
  { name: 'phone', code: 'phone' },
  { name: 'facebook', code: 'facebook' }
]
const LOGIN_METHODS_CODE = ['sabay', 'phone', 'facebook', 'ldap', 'anon']

const SERVICE_URI = {
  checkout_api: API_CHECKOUT_URL + '/status'
}

module.exports = {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
  LOGIN_METHODS,
  LOGIN_METHODS_CODE,
  SERVICE_URI
}
