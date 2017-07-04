const router = require('koa-router')()

router.prefix('/user')

router.post('/login', async function (ctx, next) {
  let { User } = ctx.models
  let { body } = ctx.request
  let _user = await User.findUsersByName(body.name)
  ctx.assert(_user.length > 0, 422, {
    responseData: ['name', '用户名错误', 'auth'], isShow: true
  })
  let cryptoPassword = User.passwordCrypto(body.password)
  _user = _user[0]
  ctx.assert(_user.password === cryptoPassword, 422, {
    responseData: ['password', '密码错误', 'auth'], isShow: true
  })
  _user.password = undefined
  ctx.session.user = _user
  ctx.body = _user
  ctx.status = 200
})

router.post('/register', async function (ctx, next) {
  let { User } = ctx.models
  let { body } = ctx.request
  let _user = await User.findUsersByName(body.name)
  ctx.assert(_user.length === 0, 422,
    { responseData: ['name', '用户名重复', 'auth'], isShow: true })
  ctx.assert(User.passwordCheck(body.password), 422)
  body.password = User.passwordCrypto(body.password)
  try {
    await new User(body).save()
  } catch (e) {
    ctx.throw(422)
  }
  ctx.status = 200
})

module.exports = router
