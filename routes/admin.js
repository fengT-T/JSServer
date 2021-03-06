const router = require('koa-router')()

router.prefix('/admin')

router.use('/', async (ctx, next) => {
  ctx.assert(ctx.session.user && ctx.session.user.isAdmin, 401)
  await next()
})

router.post('/createGoods', async function (ctx, next) {
  let { Goods } = ctx.models
  let body = ctx.request.body
  let goods = await new Goods(body).save()
  ctx.body = goods
})

router.post('/modifyGoods', async function (ctx, next) {
  let { Goods } = ctx.models
  let body = ctx.request.body
  let goods = await Goods.findByIdAndUpdate(body.id, body, {
    new: true, // 很坑的一个东西，返回新的，不然默认返回旧的
    runValidators: true// 一定要验证不然完全gg
  }).exec()
  ctx.body = goods
})

router.get('/orderList', async function (ctx, next) {
  let { Order } = ctx.models
  let orderList = await Order.find().populate('goods').sort({ '_id': -1 }).exec()
  ctx.body = orderList
})

router.post('/modifyOrder', async function (ctx, next) {
  let { Order } = ctx.models
  let body = ctx.request.body
  let order = await Order.findByIdAndUpdate(body.id, body, {
    new: true, // 很坑的一个东西，返回新的，不然默认返回旧的
    runValidators: true// 一定要验证不然完全gg
  }).exec()
  ctx.body = order
})
module.exports = router
