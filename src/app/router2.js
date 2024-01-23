const model2 = require('../model2')
const service2 = require('../service2')
const middleware2 = require('../middleware2')
const controller2 = require('../controller2')
const router2 = require('../router2')

module.exports = app => {
  model2(app)
  service2(app)
  middleware2(app)
  controller2(app)
  router2(app)
  console.log('router2 :>> ', 'init down')

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
