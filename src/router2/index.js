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
}
