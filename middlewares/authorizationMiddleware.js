const { getJwtData } = require('../helper/commonHelper');

const authMiddleware = async (req, res, next) => {
  try {
    const getQuery = Object.keys(req.query)[0]

    let params = new URLSearchParams(getQuery);
    if (!req.headers["service-code"]) {
      throw new Error('service-code is required');
    }
    if (!params.get("access_token")) {
      throw new Error('access_token is required');
    }
    const token = params.get("access_token")


    // console.log('qerurur', params)

    const verifyToken = await getJwtData(
      req.headers['service-code'],
      token,
      req.span
    );

    req.user = verifyToken;
    next()
  } catch (error) {
    console.log('errrr', error);
    return res.status(200).json({
      status: 400,
      message: error.message
    })
  }
};

module.exports = authMiddleware;
