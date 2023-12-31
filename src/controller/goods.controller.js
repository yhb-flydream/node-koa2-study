const path = require('path')

const { fileUploadError, goodsCreateError, goodsIdError, goodsUpdateError, goodsRemoveError, goodsRestoreError } = require('../constant/err.type')
const { createGoods, updateGoods, removeGoods, restoreGoods, findGoods } = require('../service/goods.service')

class GoodsController {
  async upload(ctx, next) {
    // console.log('ctx :>> ', ctx.request.files.file)
    const { file } = ctx.request.files
    if (file) {
      ctx.body = {
        code: 0,
        msg: 'success',
        data: {
          url: file.newFilename,
        },
      }
    } else {
      ctx.app.emit('error', fileUploadError, ctx)
    }
    // ctx.body = ctx.request.files
  }
  async create(ctx, next) {
    try {
      const { createdAt, updatedAt, ...res } = await createGoods(ctx.request.body)
      ctx.body = {
        code: 0,
        msg: 'success',
        data: res,
      }
    } catch (error) {
      ctx.app.emit('error', goodsCreateError, ctx)
    }
  }
  async update(ctx, next) {
    try {
      const res = await updateGoods({ ...ctx.request.body, id: ctx.params.id })
      if (res) {
        ctx.body = {
          code: 0,
          msg: 'success',
          data: '',
        }
      } else {
        ctx.app.emit('error', goodsIdError, ctx)
      }
    } catch (error) {
      ctx.app.emit('error', goodsUpdateError, ctx)
    }
  }
  async remove(ctx, next) {
    try {
      const res = await removeGoods(ctx.params.id)
      if (res) {
        ctx.body = {
          code: 0,
          msg: 'success',
          data: '',
        }
      } else {
        ctx.app.emit('error', goodsIdError, ctx)
      }
    } catch (error) {
      ctx.app.emit('error', goodsRemoveError, ctx)
    }
  }
  async restore(ctx, next) {
    try {
      const res = await restoreGoods(ctx.params.id)
      if (res) {
        ctx.body = {
          code: 0,
          msg: 'success',
          data: '',
        }
      } else {
        ctx.app.emit('error', goodsIdError, ctx)
      }
    } catch (error) {
      ctx.app.emit('error', goodsRestoreError, ctx)
    }
  }
  async findAll(ctx, next) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query
    const res = await findGoods(pageNum, pageSize)
    ctx.body = {
      code: 0,
      msg: 'success',
      data: res,
    }
  }
}

module.exports = new GoodsController()
