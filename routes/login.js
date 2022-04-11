var express = require('express');
var router = express.Router();
const ServiceModel = require('../models/servicesModel')
const ProfileModel = require('../models/profilesModel')
const PersonaModel = require('../models/personasModel')
const { generateJWT } = require('../helper/commonHelper')
const bcrypt = require('bcrypt')

/* GET users listing. */
router.post('/', async (req, res, next) => {
  try {

    const { app_id: appId, username, password } = req.body

    if (!appId) {
      res.status(200).json({
        status: 403,
        message: 'app_id is required'
      })
    }
    const getAppData = await ServiceModel.findOne({
      _id: appId
    })

    const getProfile = await ProfileModel.findOne({
      "logins.username": username
    })

    const getPersona = await PersonaModel.findOne({
      mysabay_user_id: getProfile.mysabay_user_id,
      service_code:getAppData.service_code
    })

    const loginMysabay = getProfile.logins.find((item) => item.provider === 'sabay')

    const checkBcryptPassword = bcrypt.compareSync(
      password,
      loginMysabay.password
    )
    
    if (!getProfile || !checkBcryptPassword){
      res.status(200).json({
        status: 400,
        message: 'user name or password is incorrect'
      })
    }

    const result = {}
    const jwtData = await generateJWT(
      getPersona.uuid,
      getAppData.service_code,
      username,
      'test',
      req.traceContext
    )
    result.access_token = jwtData.access_token
    result.refresh_token = jwtData.refresh_token
    result.expire = jwtData.expire
    return res.status(200).json(result)

  } catch (error) {
    return res.status(200).json({
      status: 400,
      message: error.message
    })

  }

});

module.exports = router;