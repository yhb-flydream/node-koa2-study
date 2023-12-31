const Router = require('koa-router')

const { upload, create, update, remove, restore, findAll } = require('../controller/goods.controller')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')

const router = new Router({
  prefix: '/goods',
})

// 上传图片
router.post('/upload', auth, hadAdminPermission, upload)
// 添加商品
router.post('/create', auth, hadAdminPermission, validator, create)
// 修改商品
router.put('/update/:id', auth, hadAdminPermission, validator, update)
// 删除商品
router.delete('/remove/:id', auth, hadAdminPermission, remove)
// 下架商品
router.post('/off/:id', auth, hadAdminPermission, remove)
// 上架商品
router.post('/on/:id', auth, hadAdminPermission, restore)
// 商品列表
router.get('/list', findAll)

module.exports = router
