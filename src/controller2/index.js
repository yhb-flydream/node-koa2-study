const fs = require('fs')

module.exports = app => {
  const controller = {}

  fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
      let name = file.slice(0, file.indexOf('.'))
      controller[name] = require(`./${file}`)
    }
  })

  app._controller = controller
  console.log('controller2 :>> ', 'init')

  return async (ctx, next) => {
    try {
      console.log('controller2 :>> ', 'next before')
      await next()
      console.log('controller2 :>> ', 'next after')
    } catch (error) {
      console.error('controller2 error :>> ', error)
      ctx._errorHandler(error)
    }
  }
}
