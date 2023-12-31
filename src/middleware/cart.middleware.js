const { cartsFormatError } = require('../constant/err.type')

const validator = rule => async (ctx, next) => {
  try {
    await ctx.verifyParams(rule)
  } catch (error) {
    cartsFormatError.data = error
    return ctx.app.emit('error', cartsFormatError, ctx)
  }
  await next()
}

module.exports = {
  validator,
}
