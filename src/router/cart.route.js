const Router = require('koa-router')

const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')

const { add, findAll, update, remove, selectAll, unSelectAll, toggleSelectAll, count } = require('../controller/cart.controller')

const router = new Router({
  prefix: '/carts',
})

// 加入购物车
router.post('/add', auth, validator({ goods_id: 'number' }), add)

// 获取购物车列表
router.get('/list', auth, findAll)

// 更新购物车
router.patch(
  '/update/:id',
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
  '/del/:id',
  auth,
  validator({
    ids: { type: 'array', required: false },
  }),
  remove
)

// 全选/取消全选
router.post('/selectAll', auth, selectAll)
router.post('/unSelectAll', auth, unSelectAll)
router.post('/toggleSelectAll', auth, validator({ selected: 'bool' }), toggleSelectAll)

// 购物车总数
router.get('/count', auth, count)

module.exports = router
