const mongoose = require('mongoose')
const initEnv = require('../config/init-env')

const DB_URI = `mongodb://${initEnv.MONGODB_USERNAME}:${initEnv.MONGODB_PASSWORD}@${initEnv.MONGODB_CONNECTION_URI}`

const connectDB = async () => {
  try {
    mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(
      'Establishing connection to DB: ',
      initEnv.MONGODB_CONNECTION_URI
    )
  } catch (error) {
    console.log(
      'Error establishing connection to DB: ',
      initEnv.MONGODB_CONNECTION_URI
    )
  }
}

module.exports = connectDB
