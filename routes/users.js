var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  const accessTokenHeader = Buffer.from(JSON.stringify({
    app_id: "asdfwerwesadfasdf", "alg": "HS256",
    "typ": "JWT"
  }))
  console.log('=================', accessTokenHeader.toString('base64'));
  return res.json(accessTokenHeader.toString('base64'));
});

module.exports = router;
