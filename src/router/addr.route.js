const Router = require('koa-router')

const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/addr.middleware')

const { create, findAll, update, remove, setDefault } = require('../controller/addr.controller')

const router = new Router({
  prefix: '/address',
})

// 添加地址
router.post(
  '/add',
  auth,
  validator({
    consignee: 'string',
    phone: {
      type: 'string',
      format: /^1\d{10}$/,
    },
    address: 'string',
  }),
  create
)

// 地址列表
router.get('/list', auth, findAll)

// 更新地址
router.put(
  '/update/:id',
  auth,
  validator({
    consignee: 'string',
    phone: {
      type: 'string',
      format: /^1\d{10}$/,
    },
    address: 'string',
  }),
  update
)

// 删除地址
router.delete('/del/:id', auth, remove)

// 设置默认地址
router.patch('/default/:id', auth, setDefault)

module.exports = router
