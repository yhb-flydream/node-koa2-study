module.exports = app => {
  const router = app._router
  const middleware = app._middleware
  const controller = app._controller
  // router.prefix('/goods')

  // 上传图片
  router.post('/goods/upload', middleware.auth.auth, middleware.auth.hadAdminPermission, controller.goods.upload)
  // 添加商品
  router.post('/goods/create', middleware.auth.auth, middleware.auth.hadAdminPermission, middleware.goods.validator, controller.goods.create)
  // 修改商品
  router.put('/goods/update/:id', middleware.auth.auth, middleware.auth.hadAdminPermission, middleware.goods.validator, controller.goods.update)
  // 删除商品
  router.delete('/goods/remove/:id', middleware.auth.auth, middleware.auth.hadAdminPermission, controller.goods.remove)
  // 下架商品
  router.post('/goods/off/:id', middleware.auth.auth, middleware.auth.hadAdminPermission, controller.goods.remove)
  // 上架商品
  router.post('/goods/on/:id', middleware.auth.auth, middleware.auth.hadAdminPermission, controller.goods.restore)
  // 商品列表
  router.get('/goods/list', controller.goods.findAll)
}
