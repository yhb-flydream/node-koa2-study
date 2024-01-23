const { cartsFormatError } = require('../constant/err.type')

const validator = rule => async (ctx, next) => {
  try {
    await ctx.verifyParams(rule)
  } catch (error) {
    console.error('validator error :>> ', error)
    cartsFormatError.data = error
    return ctx._errorHandler(cartsFormatError)
  }
  await next()
}

module.exports = {
  validator,
}
