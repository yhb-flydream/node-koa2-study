const jwt = require('jsonwebtoken')

const { createUser, getUserInfo, updateUserInfo } = require('../service/user.service')
const { userRegisterError, userLoginError, userPatchPasswordError } = require('../constant/err.type')
const { JWT_SECRET } = require('../config/config.default')

class UserController {
  async register(ctx, next) {
    // console.log('ctx.request.body :>> ', ctx.request.body)
    const { user_name, password } = ctx.request.body

    try {
      const { id } = await createUser(user_name, password)
      ctx._successHandler({ id, user_name })
    } catch (error) {
      console.error('register error :>> ', error)
      return ctx._errorHandler(userRegisterError)
    }
  }
  async login(ctx, next) {
    const { user_name } = ctx.request.body
    try {
      const { password, ...info } = await getUserInfo({ user_name })
      ctx._successHandler({ token: jwt.sign(info, JWT_SECRET, { expiresIn: '1d' }) })
    } catch (error) {
      console.error('login error :>> ', error)
      return ctx._errorHandler(userLoginError)
    }
  }

  async changePassword(ctx, next) {
    const { id } = ctx.state.user
    const { password } = ctx.request.body
    try {
      const res = await updateUserInfo({ id, password })
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
