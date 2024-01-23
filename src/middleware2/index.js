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
}
