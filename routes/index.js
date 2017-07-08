const router = require('koa-router')()

router.prefix('/index')

router.get('/', async (ctx, next) => {
  let a = 12
  ctx.body = a
})

router.get('/info', async (ctx, next) => {
  let { Order, User, Goods } = ctx.models
  let orderList = (await Order.find().exec())
  let orderCount = orderList.length
  let orderSum = orderList.reduce((a, b) => {
    return a + b.cost
  }, 0)

  let userList = (await User.find({isAdmin: false}).sort({'buyNum': -1}).exec())
  let userCount = userList.length
  let userRank = userList.slice(0, 5)

  let goodList = (await Goods.find().sort({salesNum: -1}).limit(5).exec())
  ctx.body = {orderCount, orderSum, userCount, goodList, userRank}
})

module.exports = router
