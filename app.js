const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
const errorHandle = require('./bin/errorHandle')
const koaBody = require('koa-body')
const session = require('koa-session')
const logger = require('koa-logger')
const mongoose = require('mongoose')
const glob = require('glob')
const path = require('path')
const conf = require('./config/app')
const orderIo = require('./socket.io/order')

// error handler
app.use(errorHandle)
// onerror(app)

// middlewares
app.use(koaBody())
app.use(session(conf.session, app))
app.use(json())
app.use(logger())
orderIo.attach(app)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 机智的采用了glob引入模型文件
let models = {}
glob.sync('./models/*.js').forEach(function (file) {
  models[path.basename(file, '.js')] = require(file)
})
app.use(async (ctx, next) => {
  ctx.models = models
  await next()
})
// mongoose promise替换
mongoose.Promise = global.Promise
// 打开连接
mongoose.connect(conf.mongodb.connUrl, {
  useMongoClient: true
})

// routes
glob.sync('./routes/*.js').forEach(function (file) {
  let route = require(file)
  app.use(route.routes(), route.allowedMethods())
})

app.listen(process.env.PORT || 3000)
