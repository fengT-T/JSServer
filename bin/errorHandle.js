/**
 * Created by feng on 17-5-26.
 */
module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    // 是否显示
    if (e && e.isShow) {
      ctx.status = e.status
      console.log(e)// 我就想看看有多少错误“攻击”之类的出现
      ctx.body = e.responseData || 'Suprise!MotherFucker!'
    } else {
      // 如果没有 let it crash
      console.error(e)
      throw e
    }
  }
}
