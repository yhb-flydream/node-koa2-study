const Router = require('koa-router')
const router = new Router({
  prefix: '/orders',
})

const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/order.middleware')

const { create, findAll, update } = require('../controller/order.controller')

// 生成订单
router.post(
  '/create',
  auth,
  validator({
    address_id: 'string',
    goods_info: 'string',
    total: 'string',
  }),
  create
)
// 订单列表
router.get('/list', auth, findAll)
// 更新订单
router.patch(
  '/update/:id',
  auth,
  validator({
    status: 'number',
  }),
  update
)

module.exports = router
