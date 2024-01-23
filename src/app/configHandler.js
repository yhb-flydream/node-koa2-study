const config = require('../config/config.default')

module.exports = app => {
  app.context._config = config

  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      console.error('_config error :>> ', error)
      ctx._errorHandler(error)
    }
  }
}
