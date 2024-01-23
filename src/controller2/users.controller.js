const jwt = require('jsonwebtoken')

const { userRegisterError, userLoginError, userPatchPasswordError } = require('../constant/err.type')

class UserController {
  async register(ctx, next) {
    // console.log('ctx.request.body :>> ', ctx.request.body)
    const { user_name, password } = ctx.request.body

    try {
      const { id } = await ctx._service.users.createUser(user_name, password)
      ctx._successHandler({ id, user_name })
    } catch (error) {
      console.error('register error :>> ', error)
      return ctx._errorHandler(userRegisterError)
    }
  }
  async login(ctx, next) {
    const { user_name } = ctx.request.body
    try {
      const { password, ...info } = await ctx._service.users.getUserInfo({ user_name })
      ctx._successHandler({ token: jwt.sign(info, ctx._config.JWT_SECRET, { expiresIn: '1d' }) })
    } catch (error) {
      console.error('login error :>> ', error)
      return ctx._errorHandler(userLoginError)
    }
  }

  async changePassword(ctx, next) {
    const { id } = ctx.state.user
    const { password } = ctx.request.body
    try {
      const res = await ctx._service.users.updateUserInfo({ id, password })
      if (!res) return ctx._errorHandler(userPatchPasswordError)
      ctx._successHandler()
    } catch (error) {
      console.error('changePassword error :>> ', error)
      ctx._errorHandler(userPatchPasswordError)
    }
  }
  async logout(ctx, next) {
    ctx._successHandler('logout')
  }
}

module.exports = new UserController()
