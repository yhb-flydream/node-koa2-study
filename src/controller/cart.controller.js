const {
  createOrUpdate,
  findCarts,
  updateCarts,
  removeCarts,
  selectAllCarts,
  unSelectAllCarts,
  toggleSelectAllCarts,
  cartsCount,
} = require('../service/cart.service')

const { cartsFormatError } = require('../constant/err.type')

class CartsController {
  async add(ctx, next) {
    const { id: user_id } = ctx.state.user
    const { goods_id } = ctx.request.body
    const res = await createOrUpdate(user_id, goods_id)
    ctx._successHandler(res)
  }
  async findAll(ctx, next) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query
    const res = await findCarts(pageNum, pageSize)
    ctx._successHandler(res)
  }
  async update(ctx, next) {
    const { id } = ctx.request.params
    const { number, selected } = ctx.request.body
    if (number === undefined && selected === undefined) {
      let msg = 'number 和 selected 不能同时为空'
      return ctx._errorHandler({ ...cartsFormatError, msg })
    }
    const res = await updateCarts({ id, number, selected })
    ctx._successHandler(res)
  }
  async remove(ctx, next) {
    let id = ctx.params.id || ''
    let ids = (ctx.request.body && ctx.request.body.ids) || [] || []
    if (id) ids = [...new Set([...ids, +id])]
    const res = await removeCarts(ids)
    ctx._successHandler(res)
  }
  async selectAll(ctx, next) {
    const { id: user_id } = ctx.state.user
    const res = await selectAllCarts(user_id)
    ctx._successHandler(res)
  }
  async unSelectAll(ctx, next) {
    const { id: user_id } = ctx.state.user
    const res = await unSelectAllCarts(user_id)
    ctx._successHandler(res)
  }
  async toggleSelectAll(ctx, next) {
    const { id: user_id } = ctx.state.user
    const { selected } = ctx.request.body
    const res = await toggleSelectAllCarts(user_id, selected)
    ctx._successHandler(res)
  }
  async count(ctx, next) {
    const res = await cartsCount()
    ctx._successHandler(res)
  }
}

module.exports = new CartsController()
