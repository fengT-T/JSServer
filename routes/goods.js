const router = require('koa-router')()

router.prefix('/goods')

router.get('/list', async function (ctx, next) {
  let { Goods } = ctx.models
  let { startId = await Goods.getFirstId() } = ctx.query
  let operation = ctx.query.startId ? '$lt' : '$lte'
  let list = await Goods.find({
    _id: {
      [operation]: startId
    }
  }).limit(12)
    .sort({ '_id': -1 })
    .exec()
  ctx.body = list
})

router.get('/info', async function (ctx, next) {
  let { Goods } = ctx.models
  let { id } = ctx.query
  let goods = await Goods.findById(id).exec()
  ctx.body = goods
})

router.post('/modify', async function (ctx, next) {
  let { Goods } = ctx.models
  let { user } = ctx.session
  let body = ctx.request.body
  ctx.assert(user.isAdmin, 401)
  let goods = await Goods.findByIdAndUpdate(body.id, body, {
    new: true, // 很坑的一个东西，返回新的，不然默认返回旧的
    runValidators: true// 一定要验证不然完全gg
  }).exec()
  ctx.body = goods
})

module.exports = router
