const Router = require('koa-router')

const { register, login, logout, changePassword } = require('../controller/user.controller')
const { userValidator, verifyUser, bcryptPassword, verifyLogin, verifyPassword } = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')

const router = new Router({
  prefix: '/users',
})

// 注册
router.post('/register', userValidator, verifyUser, bcryptPassword, register)
// 登录
router.post('/login', userValidator, verifyLogin, login)
// 修改密码
router.patch('/changePassword', auth, verifyPassword, bcryptPassword, changePassword)
// 退出
router.get('/logout', logout)

module.exports = router
