class OrderController {
  async create(ctx, next) {
    const { id: user_id } = ctx.state.user
    const order_number = 'AAA' + Date.now()
    const res = await ctx._service.orders.createOrder({
      user_id,
      ...ctx.request.body,
      order_number,
    })
    ctx._successHandler(res)
  }
  async findAll(ctx, next) {
    const { pageNum = 1, pageSize = 10, status = 0 } = ctx.request.query
    const res = await ctx._service.orders.findAllOrder({ pageNum, pageSize, status })
    ctx._successHandler(res)
  }
  async update(ctx, next) {
    const { id } = ctx.request.params
    const { status } = ctx.request.body
    const res = await ctx._service.orders.updateOrder(id, status)
    ctx._successHandler(res)
  }
}

module.exports = new OrderController()
