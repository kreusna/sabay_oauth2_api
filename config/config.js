module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'app_mysabay_user',
    password: process.env.DB_PASSWORD || 'o7WeEH8N',
    database: process.env.DB_DATABASE || 'app_km.mysabay.com',
    host: process.env.DB_HOST || '103.237.53.71',
    dialect: 'mysql',
    timezone: '+07:00'
  },
  test: {
    username: process.env.DB_USERNAME || 'developers',
    password: process.env.DB_PASSWORD || 'tuJAswEs6U',
    database: process.env.DB_DATABASE || 'app_km.mysabay.com',
    host: process.env.DB_HOST || '103.237.53.77',
    dialect: 'mysql',
    timezone: '+07:00'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    timezone: '+07:00'
  }
}
