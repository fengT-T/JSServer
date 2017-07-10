let config = {
  appKey: '4ede969db795252f0b5f1bb00b0594b4210f1223', // 可以用require("crypto").randomBytes(20).toString('hex');生成
  session: {
    key: 'ohMyKoa', /** (string) cookie key (default is koa:sess) */
    maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: false, /** (boolean) signed or not (default true) */// 加密个锤子session存redis
    store: require('../bin/sessionStore')
  },
  mongodb: {
    connUrl: 'mongodb://localhost:27017/js'
  },
  qiniu: { // 测试key,用一次换一个的,换成自己的key
    ACCESS_KEY: 'BIA57A1Pdt0W7rsEx1fBrBt5PEcUzU9s0aiYjICz',
    SECRET_KEY: 'DWXQwP0Czh-tfbNlNHC-klCvCkDzrGUn85rFNxS2',
    bucketUrl: 'http://osidtmaiq.bkt.clouddn.com',
    uploadUrl: 'http://upload-z2.qiniu.com'
  }
}
module.exports = config
