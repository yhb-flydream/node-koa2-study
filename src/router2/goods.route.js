const { upload, create, update, remove, restore, findAll } = require('../controller/goods.controller')

module.exports = app => {
  const router = app._router
  const middleware = app._middleware
  // router.prefix('/goods')

  // 上传图片
  router.post('/goods/upload', middleware.auth.auth, middleware.auth.hadAdminPermission, upload)
  // 添加商品
  router.post('/goods/create', middleware.auth.auth, middleware.auth.hadAdminPermission, middleware.goods.validator, create)
  // 修改商品
  router.put('/goods/update/:id', middleware.auth.auth, middleware.auth.hadAdminPermission, middleware.goods.validator, update)
  // 删除商品
  router.delete('/goods/remove/:id', middleware.auth.auth, middleware.auth.hadAdminPermission, remove)
  // 下架商品
  router.post('/goods/off/:id', middleware.auth.auth, middleware.auth.hadAdminPermission, remove)
  // 上架商品
  router.post('/goods/on/:id', middleware.auth.auth, middleware.auth.hadAdminPermission, restore)
  // 商品列表
  router.get('/goods/list', findAll)
}
