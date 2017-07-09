const router = require('koa-router')()
const DANGER_FIELD = ['isAdmin', 'buyNum', 'order']

const DELETE_FIELD = function (field, obj) {
  field.forEach(function (ele) {
    delete obj[ele]
  })
}
router.prefix('/userPrivate')

router.use('/', async (ctx, next) => {
  if (ctx.session.user) {
    await next()
  } else {
    ctx.status = 401
  }
})

router.get('/info', async function (ctx, next) {
  ctx.body = ctx.session.user
})

router.get('/orderList', async function (ctx, next) {
  let { User } = ctx.models
  let userId = ctx.session.user._id
  ctx.body = (await User.findById(userId)
    .populate({
      path: 'order',
      populate: { path: 'goods' }
    })
    .exec()).order
})

router.post('/modify', async function (ctx, next) {
  let { User } = ctx.models
  let { body } = ctx.request
  let { user } = ctx.session
  DELETE_FIELD(DANGER_FIELD, body)// 删掉危险的filed 你懂得
  let newUser = await User.findByIdAndUpdate(user._id, body, {
    new: true, // 很坑的一个东西，返回新的，不然默认返回旧的
    runValidators: true// 一定要验证不然完全gg
  }).exec()
  newUser.password = undefined
  ctx.session.user = newUser
  ctx.body = newUser
})

router.get('/confirm', async function (ctx, next) {
  let { Order } = ctx.models
  let { orderId } = ctx.request.query
  let { user } = ctx.session
  ctx.assert(user.order.includes(orderId), 422)
  await Order.findByIdAndUpdate(orderId, {
    status: 2
  })
  ctx.status = 200
})

module.exports = router
