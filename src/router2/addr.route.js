const { create, findAll, update, remove, setDefault } = require('../controller/addr.controller')

module.exports = app => {
  const router = app._router
  const middleware = app._middleware
  // router.prefix('/address')

  // 添加地址
  router.post(
    '/address/add',
    middleware.auth.auth,
    middleware.address.validator({
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
  router.get('/address/list', middleware.auth.auth, findAll)

  // 更新地址
  router.put(
    '/address/update/:id',
    middleware.auth.auth,
    middleware.address.validator({
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
  router.delete('/address/del/:id', middleware.auth.auth, remove)

  // 设置默认地址
  router.patch('/address/default/:id', middleware.auth.auth, setDefault)
}
