const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')

const { add, findAll, update, remove, selectAll, unSelectAll, toggleSelectAll, count } = require('../controller/cart.controller')

module.exports = app => {
  const router = app._router
  // router.prefix('/carts')

  // 加入购物车
  router.post('/carts/add', auth, validator({ goods_id: 'number' }), add)

  // 获取购物车列表
  router.get('/carts/list', auth, findAll)

  // 更新购物车
  router.patch(
    '/carts/update/:id',
    auth,
    validator({
      number: {
        type: 'number',
        required: false,
      },
      selected: {
        type: 'bool',
        required: false,
      },
    }),
    update
  )

  // 删除商品
  router.delete(
    '/carts/del/:id',
    auth,
    validator({
      ids: { type: 'array', required: false },
    }),
    remove
  )

  // 全选/取消全选
  router.post('/carts/selectAll', auth, selectAll)
  router.post('/carts/unSelectAll', auth, unSelectAll)
  router.post('/carts/toggleSelectAll', auth, validator({ selected: 'bool' }), toggleSelectAll)

  // 购物车总数
  router.get('/carts/count', auth, count)
}
