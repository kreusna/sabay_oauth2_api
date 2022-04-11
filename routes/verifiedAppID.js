var express = require('express');
var router = express.Router();
const ServiceModel = require('../models/servicesModel')
const mongoose = require('mongoose');
const { RedisClient } = require('../redis/client')

const { v4: uuidV4 } = require('uuid')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    console.log('11111111111111', req.query)

    if (!req.query.app_id) {
      res.status(200).json({
        status: 403,
        message: 'app_id is required'
      })
    }

    const result = {
      status: 200,
      is_verified: true
    }
    const getAppData = await ServiceModel.findOne({
      _id: req.query.app_id
    })
    if (!getAppData){
      result.status = 400
      result.is_verified = false
      result.message = "App ID is not found"
    }
    

    if (!getAppData.allowed_domains.find((item) => item == req.query.origin_domain)) {
      result.status = 400
      result.is_verified = false
      result.message = "Origin Domain is mismatch"
    }
    
    return res.status(200).json(result)

  } catch (error) {

  }

});

module.exports = router;