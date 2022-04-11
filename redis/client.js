const redis = require('redis')
const InitEnv = require('../config/init-env')
const config = {
  host: InitEnv.REDIS_HOST,
  port: InitEnv.REDIS_PORT
}

// const RedisClient = async () =>{
//   const client = createClient({
//     url: 'redis://localhost:6379'
//   })
//   client.on('error', (err) => console.log('Redis Client Error', err));
//   await client.connect()
//   return client
// } 

// const RedisClient = async () =>{
//   const client = createClient({
//     url: 'redis://localhost:6379'
//   })
//   client.on('error', (err) => console.log('Redis Client Error', err));
//   await client.connect()
//   return client
// } 

const port = 6379
const host = "127.0.0.1"
const RedisClient =  redis.createClient(port, host)
RedisClient.connect()
RedisClient.on('connect', function() {
  console.log('Connected!');
});

RedisClient.on('error', (err) => console.log('Redis Client Error', err));

module.exports = RedisClient
