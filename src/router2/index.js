const Router = require('koa-router')
const router = new Router()

const fs = require('fs')

module.exports = app => {
  app._router = router

  fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
      require(`./${file}`)(app)
    }
  })
  app.use(app._router.routes()).use(app._router.allowedMethods())
  console.log('router2 :>> ', 'init')

  return async (ctx, next) => {
    try {
      console.log('router2 :>> ', 'next before')
      await next()
      console.log('router2 :>> ', 'next after')
    } catch (error) {
      console.error('router2 error :>> ', error)
      ctx._errorHandler(error)
    }
  }
}
