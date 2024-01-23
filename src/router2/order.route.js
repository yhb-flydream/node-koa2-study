// const Router = require('koa-router')
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/order.middleware')

const { create, findAll, update } = require('../controller/order.controller')

module.exports = app => {
  const router = app._router
  // router.prefix('/orders')

  // 生成订单
  router.post(
    '/orders/create',
    auth,
    validator({
      address_id: 'string',
      goods_info: 'string',
      total: 'string',
    }),
    create
  )
  // 订单列表
  router.get('/orders/list', auth, findAll)
  // 更新订单
  router.patch(
    '/orders/update/:id',
    auth,
    validator({
      status: 'number',
    }),
    update
  )
}
