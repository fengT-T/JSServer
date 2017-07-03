/**
 * Created by feng on 17-5-15.
 */
const config = require('../config/app')
const crypto = require('crypto')
let cryptoTools = {
  passwordCrypto (str) {
    return crypto.createHmac('sha1', config.appKey).update(str).digest('hex')
  }
}
module.exports = cryptoTools
