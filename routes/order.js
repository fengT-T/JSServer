const router = require('koa-router')()

router.prefix('/order')

router.use('/', async (ctx, next) => {
  ctx.assert(ctx.session.user, 401)
  await next()
})

router.post('/create', async function (ctx, next) {
  let { Order, Goods, User } = ctx.models
  let { body } = ctx.request
  let goods = (await Goods.findById(body.goods))
  let user = ctx.session.user
  let cost = goods.price * body.num
  let userNewMoney = user.money - cost
  ctx.assert(user.money > cost, 422)

  await User.findByIdAndUpdate(user._id, {
    money: userNewMoney,
    buyNum: user.buyNum + cost
  }).exec()
  ctx.session.user.money = userNewMoney
  ctx.session.user.buyNum = user.buyNum + cost
  await new Order(body).save()
  await Goods.findByIdAndUpdate(goods._id, {
    salesNum: goods.salesNum + 1
  }).exec()
  ctx.status = 200
})

module.exports = router
