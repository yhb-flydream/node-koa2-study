const { goodsFormatError } = require('../constant/err.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_name: { type: 'string', required: true },
      goods_price: { type: 'number', required: true },
      goods_num: { type: 'number', required: true },
      goods_img: { type: 'string', required: true },
    })
  } catch (error) {
    console.error('validator error :>> ', error)
    goodsFormatError.data = error
    return ctx._errorHandler(goodsFormatError)
  }
  await next()
}

module.exports = {
  validator,
}
