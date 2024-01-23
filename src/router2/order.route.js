const { create, findAll, update } = require('../controller/order.controller')

module.exports = app => {
  const router = app._router
  const middleware = app._middleware
  // router.prefix('/orders')

  // 生成订单
  router.post(
    '/orders/create',
    middleware.auth.auth,
    middleware.orders.validator({
      address_id: 'string',
      goods_info: 'string',
      total: 'string',
    }),
    create
  )
  // 订单列表
  router.get('/orders/list', middleware.auth.auth, findAll)
  // 更新订单
  router.patch(
    '/orders/update/:id',
    middleware.auth.auth,
    middleware.orders.validator({
      status: 'number',
    }),
    update
  )
}
