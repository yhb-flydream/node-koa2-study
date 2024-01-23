const { upload, create, update, remove, restore, findAll } = require('../controller/goods.controller')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')

module.exports = app => {
  const router = app._router
  // router.prefix('/goods')

  // 上传图片
  router.post('/goods/upload', auth, hadAdminPermission, upload)
  // 添加商品
  router.post('/goods/create', auth, hadAdminPermission, validator, create)
  // 修改商品
  router.put('/goods/update/:id', auth, hadAdminPermission, validator, update)
  // 删除商品
  router.delete('/goods/remove/:id', auth, hadAdminPermission, remove)
  // 下架商品
  router.post('/goods/off/:id', auth, hadAdminPermission, remove)
  // 上架商品
  router.post('/goods/on/:id', auth, hadAdminPermission, restore)
  // 商品列表
  router.get('/goods/list', findAll)
}
