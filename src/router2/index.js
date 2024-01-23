const fs = require('fs')

module.exports = app => {
  // fs.readdirSync(__dirname).forEach(file => {
  //   if (file !== 'index.js') {
  //     let r = require(`./${file}`)(app)
  //     router.use(r.routes())
  //   }
  // })
  // app.use(router.routes()).use(router.allowedMethods())

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
      console.error('router error :>> ', error)
      ctx._errorHandler(error)
    }
  }
}
