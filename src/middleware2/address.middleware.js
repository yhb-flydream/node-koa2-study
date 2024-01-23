const { addrFormatError } = require('../constant/err.type')

const validator = rule => async (ctx, next) => {
  try {
    await ctx.verifyParams(rule)
  } catch (error) {
    console.error('validator error :>> ', error)
    return ctx._errorHandler({ ...addrFormatError, data: error })
  }
  await next()
}

module.exports = {
  validator,
}
