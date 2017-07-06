const router = require('koa-router')()

router.prefix('/order')

router.use('/', async (ctx, next) => {
  ctx.assert(ctx.session.user, 401)
  await next()
})

router.post('/create', async function (ctx, next) {
  let { Order, Goods, User } = ctx.models
  let { body } = ctx.request
  let goods = await Goods.findById(body.goods).exec()
  let user = ctx.session.user
  let cost = goods.price * body.num
  ctx.assert(user.money > cost, 422)

  body.cost = cost
  let order = await new Order(body).save()

  user.order.unshift(order.id)
  user.money = user.money - cost
  user.buyNum = user.buyNum + cost
  await User.findByIdAndUpdate(user._id, user).exec()

  await Goods.findByIdAndUpdate(goods._id, {
    salesNum: goods.salesNum + 1
  }).exec()

  ctx.body = order
})

router.get('/status', async function (ctx, next) {
  let {Order} = ctx.models
  let {id} = ctx.request.query
  let order = await Order.findById(id).populate('goods').exec()
  ctx.body = order
})

module.exports = router
