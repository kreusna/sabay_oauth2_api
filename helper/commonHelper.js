const axios = require('axios');
const ENV = require('../config/init-env');
const constant = require('../config/constant')
const jwt = require('jsonwebtoken')
const forge = require('node-forge')

const getJwtData = async (serviceCode, token, span) => {
  const requestJwtVerify = await axios.post(
    ENV.API_SSO_URL,
    {
      query: `
      query {
        verifyToken(
          accessToken:"${token}") {
            uuid
            serviceCode
            mysabayUserID
            type
        }
      }
      `,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'service-code': serviceCode,
      },
    }
  );
  if (requestJwtVerify.data.errors) {
    throw new Error(requestJwtVerify.data.errors[0].message);
  }
  return requestJwtVerify.data.data.verifyToken;
};

/**
 *
 * @param {string} userUuid
 * @param {string} serviceCode
 */
const generateJWT = async (
  userUuid,
  serviceCode,
  username,
  displayName,
  span
) => {
  const getJwt = await axios.post(
    ENV.API_JWT_URL + '/v1.2/jwt/sign',
    {
      user_uuid: userUuid,
      username,
      display_name: displayName
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'service-code': serviceCode,
      }
    }
  )
  return getJwt.data
}

const generateJWTByAppId = async (service, data) => {

  // generate refresh token with expire in 60 days
  const refreshToken = jwt.sign(
    {
      iss: 'https://sso.sabay.com/',// issuer url: "https://authorization-server.example.com/"
      sub: data.userId, // user's id: 5ba552d67
      app_id: service._id.toString(),
      aud: data.type,
      jti: data.tokenId,
      mysabay_user_id: data.mysabayUserId,
      scope: 'profile' // scope as "profile+picture+payments", "profile image payments"
    },
    Buffer.from(service.secret, 'base64'),
    {
      expiresIn: service.jwt_life_time
        ? service.jwt_life_time + ' days'
        : '60 days'
    }
  )

  // generate refresh token with expire in 12h
  const accessToken = jwt.sign(
    {
      iss: 'https://sso.sabay.com/',// issuer url: "https://authorization-server.example.com/"
      sub: data.userId, // user's id: 5ba552d67
      app_id: service._id.toString(),
      aud: data.type,
      jti: data.tokenId,
      mysabay_user_id: data.mysabayUserId,
      scope: 'profile' // scope as "profile+picture+payments", "profile image payments"
    },
    {
      key: Buffer.from(service.private_key).toString(),
      passphrase: service.secret
    },
    { algorithm: 'RS256', expiresIn: constant.ACCESS_TOKEN_LIFETIME, header: { app: service._id.toString() } }
  )

  const decoded = jwt.verify(
    accessToken,
    Buffer.from(service.public_key).toString()
  )

  const result = {
    access_token: accessToken,
    refresh_token: refreshToken,
    expire: decoded.exp
  };

  return result

}

const verifyAccessToken = (accessToken, publicKey) => {
  try {
    const decoded = jwt.verify(accessToken, Buffer.from(publicKey).toString(), {
      algorithm: 'RS256'
    })
    return decoded
  } catch (error) {
    debug('error==', error)
    return error
  }
}

module.exports = {
  getJwtData,
  generateJWT,
  generateJWTByAppId,
  verifyAccessToken
}