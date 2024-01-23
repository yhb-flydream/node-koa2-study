const { add, findAll, update, remove, selectAll, unSelectAll, toggleSelectAll, count } = require('../controller/cart.controller')

module.exports = app => {
  const router = app._router
  const middleware = app._middleware
  // router.prefix('/carts')

  // 加入购物车
  router.post('/carts/add', middleware.auth.auth, middleware.carts.validator({ goods_id: 'number' }), add)

  // 获取购物车列表
  router.get('/carts/list', middleware.auth.auth, findAll)

  // 更新购物车
  router.patch(
    '/carts/update/:id',
    middleware.auth.auth,
    middleware.carts.validator({
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
    middleware.auth.auth,
    middleware.carts.validator({
      ids: { type: 'array', required: false },
    }),
    remove
  )

  // 全选/取消全选
  router.post('/carts/selectAll', middleware.auth.auth, selectAll)
  router.post('/carts/unSelectAll', middleware.auth.auth, unSelectAll)
  router.post('/carts/toggleSelectAll', middleware.auth.auth, middleware.carts.validator({ selected: 'bool' }), toggleSelectAll)

  // 购物车总数
  router.get('/carts/count', middleware.auth.auth, count)
}
