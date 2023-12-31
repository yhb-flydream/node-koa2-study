const { createOrUpdate, findCarts, updateCarts, removeCarts, selectAllCarts, unSelectAllCarts, toggleSelectAllCarts, cartsCount } = require('../service/cart.service')

const { cartsFormatError } = require('../constant/err.type')

class CartsController {
  async add(ctx, next) {
    const { id: user_id } = ctx.state.user
    const { goods_id } = ctx.request.body

    try {
      const res = await createOrUpdate(user_id, goods_id)
      ctx.body = {
        code: 0,
        msg: 'success',
        data: res,
      }
    } catch (error) {}
  }
  async findAll(ctx, next) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query
    const res = await findCarts(pageNum, pageSize)
    ctx.body = {
      code: 0,
      msg: 'success',
      data: res,
    }
  }
  async update(ctx, next) {
    const { id } = ctx.request.params
    const { number, selected } = ctx.request.body
    if (number === undefined && selected === undefined) {
      let msg = 'number 和 selected 不能同时为空'
      return ctx.app.emit('error', { ...cartsFormatError, msg }, ctx)
    }
    const res = await updateCarts({ id, number, selected })
    ctx.body = {
      code: 0,
      msg: 'success',
      data: res,
    }
  }
  async remove(ctx, next) {
    let id = ctx.params.id || ''
    let ids = (ctx.request.body && ctx.request.body.ids) || [] || []
    if (id) ids = [...new Set([...ids, +id])]
    const res = await removeCarts(ids)
    ctx.body = {
      code: 0,
      msg: 'success',
      data: res,
    }
  }
  async selectAll(ctx, next) {
    const { id: user_id } = ctx.state.user
    const res = await selectAllCarts(user_id)
    ctx.body = {
      code: 0,
      msg: 'success',
      data: res,
    }
  }
  async unSelectAll(ctx, next) {
    const { id: user_id } = ctx.state.user
    const res = await unSelectAllCarts(user_id)
    ctx.body = {
      code: 0,
      msg: 'success',
      data: res,
    }
  }
  async toggleSelectAll(ctx, next) {
    const { id: user_id } = ctx.state.user
    const { selected } = ctx.request.body
    const res = await toggleSelectAllCarts(user_id, selected)
    ctx.body = {
      code: 0,
      msg: 'success',
      data: res,
    }
  }
  async count(ctx, next) {
    const res = await cartsCount()
    ctx.body = {
      code: 0,
      msg: 'success',
      data: res,
    }
  }
}

module.exports = new CartsController()
