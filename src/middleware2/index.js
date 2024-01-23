const fs = require('fs')

module.exports = app => {
  const middleware = {}

  fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
      let name = file.slice(0, file.indexOf('.'))
      middleware[name] = require(`./${file}`)
    }
  })

  app._middleware = middleware
  console.log('app.context._middleware :>> ', 'init')

  return async (ctx, next) => {
    try {
      console.log('app.context._middleware :>> ', 'next before')
      await next()
      console.log('app.context._middleware :>> ', 'next after')
    } catch (error) {
      console.error('_middleware error :>> ', error)
      ctx._errorHandler(error)
    }
  }
}
