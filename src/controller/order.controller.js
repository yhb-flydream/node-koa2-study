const { createOrder, findAllOrder, updateOrder } = require('../service/order.service')

class OrderController {
  async create(ctx, next) {
    const { id: user_id } = ctx.state.user
    const order_number = 'AAA' + Date.now()
    const res = await createOrder({
      user_id,
      ...ctx.request.body,
      order_number,
    })
    ctx.body = {
      code: 0,
      msg: 'success',
      data: res,
    }
  }
  async findAll(ctx, next) {
    const { pageNum = 1, pageSize = 10, status = 0 } = ctx.request.query
    const res = await findAllOrder({ pageNum, pageSize, status })
    ctx.body = {
      code: 0,
      msg: 'success',
      data: res,
    }
  }
  async update(ctx, next) {
    const { id } = ctx.request.params
    const { status } = ctx.request.body
    const res = await updateOrder(id, status)
    ctx.body = {
      code: 0,
      msg: 'success',
      data: res,
    }
  }
}

module.exports = new OrderController()
