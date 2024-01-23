const fs = require('fs')

module.exports = app => {
  const service = {}

  fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
      let name = file.slice(0, file.indexOf('.'))
      service[name] = require(`./${file}`)(app)
    }
  })

  app.context._service = service
  console.log('service2 :>> ', 'init')

  return async (ctx, next) => {
    try {
      console.log('service2 :>> ', 'next before')
      await next()
      console.log('service2 :>> ', 'next after')
    } catch (error) {
      console.error('service2 error :>> ', error)
      ctx._errorHandler(error)
    }
  }
}
