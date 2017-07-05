const router = require('koa-router')()

router.prefix('/userPrivate')

router.use('/', async (ctx, next) => {
  ctx.assert(ctx.session.user, 401)
  await next()
})

router.get('/info', async function (ctx, next) {
  ctx.body = ctx.session.user
})

module.exports = router
