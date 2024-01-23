const Router = require('koa-router')
const router = new Router()

module.exports = app => {
  app._router = router
  // app.use(router.routes()).use(router.allowedMethods())
  console.log('app._router :>> ', 'init')

  return async (ctx, next) => {
    try {
      console.log('app._router :>> ', 'next before')
      await next()
      console.log('app._router :>> ', 'next after')
    } catch (error) {
      console.error('routerHandler error :>> ', error)
      ctx._errorHandler(error)
    }
  }
}
