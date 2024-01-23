const { register, login, logout, changePassword } = require('../controller/user.controller')
const { userValidator, verifyUser, bcryptPassword, verifyLogin, verifyPassword } = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')

module.exports = app => {
  const router = app._router
  // router.prefix('/users')

  // 注册
  router.post('/users/register', userValidator, verifyUser, bcryptPassword, register)
  // 登录
  router.post('/users/login', userValidator, verifyLogin, login)
  // 修改密码
  router.patch('/users/changePassword', auth, verifyPassword, bcryptPassword, changePassword)
  // 退出
  router.get('/users/logout', logout)
}
