const { orderFormatError } = require('../constant/err.type')

const validator = rule => async (ctx, next) => {
  try {
    await ctx.verifyParams(rule)
  } catch (error) {
    return ctx.app.emit('error', { ...orderFormatError, data: error }, ctx)
  }
  await next()
}

module.exports = {
  validator,
}
