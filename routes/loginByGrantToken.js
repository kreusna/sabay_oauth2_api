var express = require('express');
var router = express.Router();
const ServiceModel = require('../models/servicesModel')
const mongoose = require('mongoose');
const RedisClient = require('../redis/client')
const { generateJWT, generateJWTByAppId } = require('../helper/commonHelper')

const forge = require('node-forge');
const { v4: uuidv4 } = require('uuid')


router.post('/', async (req, res, next) => {
  try {
    const code = req.body.code
    const codeVerifier = req.body.code_verifier
    if (!code) {
      return res.status(200).json({
        status: 403,
        message: 'code is required'
      })
    }
    const getCode = await RedisClient.get(code)
    if (!getCode) {
      return res.status(200).json({
        status: 403,
        message: 'code is invalid'
      })
    }

    const codeData = JSON.parse(getCode)

    const createHash = forge.md.sha256.create();
    createHash.update(codeVerifier);

    const hashSecret = createHash.digest().toHex()

    if (hashSecret != codeData.code_challenge){
      return res.status(200).json({
        status: 403,
        message: 'code_verified is invalid'
      })
    }

    const getAppData = await ServiceModel.findOne({
      _id: req.headers.app_id
    })
    const result = {}
    const type = 'oauth'
    const tokenId = uuidv4()
    const generateJwtData = {
      userId: codeData.mysabay_user_id,
      mysabayUserId: codeData.mysabay_user_id,
      tokenId,
      type,
    }

    const jwtData = await generateJWTByAppId(
      getAppData,
      generateJwtData
    )
    result.access_token = jwtData.access_token
    result.refresh_token = jwtData.refresh_token
    result.expire = jwtData.expire
    console.log('111111111111111111111', result)
    await RedisClient.del(code)


    return res.status(200).json(result)

  } catch (error) {
    console.log('erroroorrro==', error);
  }

});

module.exports = router;