module.exports = app => {
  class OrderService {
    async createOrder(order) {
      return await app._model.Orders.create(order)
    }
    async findAllOrder({ pageNum, pageSize, status }) {
      const { count, rows } = await app._model.Orders.findAndCountAll({
        attributes: ['goods_info', 'total', 'order_number', 'status'],
        where: {
          status,
        },
        offset: (pageNum - 1) * pageSize,
        limit: +pageSize,
      })
      return {
        pageNum,
        pageSize,
        total: count,
        data: rows,
      }
    }
    async updateOrder(id, status) {
      return await app._model.Orders.update({ status }, { where: { id } })
    }
  }
  return new OrderService()
}
