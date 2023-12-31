const jwt = require('jsonwebtoken')

const { createUser, getUserInfo, updateUserInfo } = require('../service/user.service')
const { userRegisterError, userLoginError, userPatchPasswordError } = require('../constant/err.type')
const { JWT_SECRET } = require('../config/config.default')

class UserController {
  async register(ctx, next) {
    // console.log('ctx.request.body :>> ', ctx.request.body)
    const { user_name, password } = ctx.request.body

    try {
      const res = await createUser(user_name, password)
      ctx.body = {
        code: 0,
        msg: 'success',
        data: {
          id: res.id,
          user_name: res.user_name,
        },
      }
    } catch (error) {
      console.error('error :>> ', error)
      return ctx.app.emit('error', userRegisterError, ctx)
    }
  }
  async login(ctx, next) {
    const { user_name } = ctx.request.body
    try {
      const { password, ...info } = await getUserInfo({ user_name })
      ctx.body = {
        code: 0,
        msg: 'success',
        data: {
          token: jwt.sign(info, JWT_SECRET, { expiresIn: '1d' }),
        },
      }
    } catch (error) {
      console.error('error :>> ', error)
      return ctx.app.emit('error', userLoginError, ctx)
    }
  }

  async changePassword(ctx, next) {
    const { id } = ctx.state.user
    const { password } = ctx.request.body
    try {
      const res = await updateUserInfo({ id, password })
      if (res) {
        ctx.body = {
          code: 0,
          msg: 'success',
          data: '',
        }
      } else {
        ctx.app.emit('error', userPatchPasswordError, ctx)
      }
    } catch (error) {
      ctx.app.emit('error', userPatchPasswordError, ctx)
    }
  }
  async logout(ctx, next) {
    ctx.body = 'logout'
  }
}

module.exports = new UserController()
