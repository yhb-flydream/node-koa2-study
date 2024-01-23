const { fileUploadError, goodsCreateError, goodsIdError, goodsUpdateError, goodsRemoveError, goodsRestoreError } = require('../constant/err.type')

class GoodsController {
  async upload(ctx, next) {
    // console.log('ctx :>> ', ctx.request.files.file)
    const { file } = ctx.request.files
    if (!file) return ctx._errorHandler(fileUploadError)
    ctx._successHandler({ url: file.newFilename })
  }
  async create(ctx, next) {
    try {
      const { createdAt, updatedAt, ...res } = await ctx._service.goods.createGoods(ctx.request.body)
      ctx._successHandler(res)
    } catch (error) {
      console.error('create error :>> ', error)
      ctx._errorHandler(goodsCreateError)
    }
  }
  async update(ctx, next) {
    try {
      const res = await ctx._service.goods.updateGoods({ ...ctx.request.body, id: ctx.params.id })
      if (!res) return ctx._errorHandler(goodsIdError)
      ctx._successHandler()
    } catch (error) {
      console.error('update error :>> ', error)
      ctx._errorHandler(goodsUpdateError)
    }
  }
  async remove(ctx, next) {
    try {
      const res = await ctx._service.goods.removeGoods(ctx.params.id)
      if (!res) return ctx._errorHandler(goodsIdError)
      ctx._successHandler()
    } catch (error) {
      console.error('remove error :>> ', error)
      ctx._errorHandler(goodsRemoveError)
    }
  }
  async restore(ctx, next) {
    try {
      const res = await ctx._service.goods.restoreGoods(ctx.params.id)
      if (!res) return ctx._errorHandler(goodsIdError)
      ctx._successHandler()
    } catch (error) {
      console.error('restore error :>> ', error)
      ctx._errorHandler(goodsRestoreError)
    }
  }
  async findAll(ctx, next) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query
    const res = await ctx._service.goods.findGoods(pageNum, pageSize)
    ctx._successHandler(res)
  }
}

module.exports = new GoodsController()
