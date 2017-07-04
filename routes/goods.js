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
  let goods = await Goods.findById(id)
  ctx.body = goods
})

module.exports = router
