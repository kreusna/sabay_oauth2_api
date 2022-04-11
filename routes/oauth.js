var express = require('express');
var router = express.Router();
const ServiceModel = require('../models/servicesModel')
const ProfileModel = require('../models/profilesModel')
const mongoose = require('mongoose');
const RedisClient = require('../redis/client')
const { generateJWTByAppId } = require('../helper/commonHelper')


const { v4: uuidV4 } = require('uuid')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {


    const getQuery = Object.keys(req.query)[0]

    let params = new URLSearchParams(getQuery);

    if (!params.get("app_id")) {
      res.status(200).json({
        status: 403,
        message: 'app_id is required'
      })
    }
    const getAppData = await ServiceModel.findOne({
      _id: params.get("app_id")
    })

    if (!getAppData.allowed_domains.find((item) => item == params.get('origin_domain'))) {
      res.status(200).json({
        status: 403,
        message: 'origin domain is mismatch'
      })
    }

    const getProfile = await ProfileModel.findOne({
      mysabay_user_id: req.user.mysabayUserID
    })

    const mysabayLogin = getProfile.logins.find((item) => {
      if (item.provider === 'sabay') {
        return item.username
      }
    })

    const result = {}

    if (params.get("response_type") === 'code') {
      const code = uuidV4()
      await RedisClient.set(code, JSON.stringify({
        mysabay_user_id: req.user.mysabayUserID,
        redirect_uri: params.get('redirect_uri'),
        code_challenge: params.get('code_challenge'),
        code_challenge_method: params.get('code_challenge_method'),
        user_uuid: req.user.uuid,
        login_username: mysabayLogin.username
      }));
      result.code = code


    } else if (params.get("response_type") === 'token') {

      const type = 'oauth'
      const tokenId = uuidV4()
      const generateJwtData = {
        userId: getProfile.mysabayUserId,
        mysabayUserId: getProfile.mysabayUserId,
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
    }

    return res.status(200).json(result)

  } catch (error) {
    console.log('==================', error);
    return res.status(200).json({
      status: 400,
      message: error.message
    })

  }

});

module.exports = router;