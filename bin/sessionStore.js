/**
 * Created by feng on 17-5-16.
 */
const Redis = require('ioredis')
let redis = new Redis({
  port: 6379,          // Redis port
  host: '127.0.0.1',   // Redis host
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  password: '',
  db: 0
})
let store = {
  async get (key) {
    let data = await redis.get(`KOASESSION:${key}`)
    return JSON.parse(data)
  },
  async set (key, sess, maxAge) {
    (maxAge === 'session') && (maxAge = 86400000)
    let res
    try {
      res = await redis.set(`KOASESSION:${key}`, JSON.stringify(sess), 'PX', maxAge)
    } catch (e) {
    }
    return res
  },
  async destroy (key) {
    let result = await redis.del(`KOASESSION:${key}`)
    return result
  }
}
module.exports = store
