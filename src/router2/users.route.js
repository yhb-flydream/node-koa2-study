module.exports = app => {
  const router = app._router
  const middleware = app._middleware
  const controller = app._controller
  // router.prefix('/users')

  // 注册
  router.post('/users/register', middleware.users.userValidator, middleware.users.verifyUser, middleware.users.bcryptPassword, controller.users.register)
  // 登录
  router.post('/users/login', middleware.users.userValidator, middleware.users.verifyLogin, controller.users.login)
  // 修改密码
  router.patch('/users/changePassword', middleware.auth.auth, middleware.users.verifyPassword, middleware.users.bcryptPassword, controller.users.changePassword)
  // 退出
  router.get('/users/logout', controller.users.logout)
}
