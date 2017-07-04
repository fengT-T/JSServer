const router = require('koa-router')()

router.prefix('order')

router.use(async (ctx, next) => {
  ctx.assert(ctx.session.user, 401)
})

module.exports = router
