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
}
