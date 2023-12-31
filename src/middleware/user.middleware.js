const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service')
const {
  userFormateError,
  userAlreadyExists,
  userRegisterError,
  userNotExistsError,
  userLoginError,
  userPasswordError,
  userOldPasswordEmptyError,
  userOldPasswordVerifyError,
  userNewPasswordEmptyError,
} = require('../constant/err.type')

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  if (!user_name || !password) {
    console.log('userValidator :>> ', { user_name, password })
    return ctx.app.emit('error', userFormateError, ctx)
  }
  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body
  try {
    const info = await getUserInfo({ user_name })
    if (info) {
      console.log('verifyUser :>> ', { user_name })
      return ctx.app.emit('error', userAlreadyExists, ctx)
    }
  } catch (error) {
    console.error('error :>> ', error)
    return ctx.app.emit('error', userRegisterError, ctx)
  }
  await next()
}

const bcryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(String(password), salt)

  ctx.request.body.password = hash
  await next()
}

const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  let info = null
  try {
    info = await getUserInfo({ user_name })
    if (!info) {
      console.log('verifyLogin :>> ', { user_name })
      return ctx.app.emit('error', userNotExistsError, ctx)
    }
    if (!bcrypt.compareSync(password, info.password)) {
      return ctx.app.emit('error', userPasswordError, ctx)
    }
  } catch (error) {
    console.error('error :>> ', error)
    return ctx.app.emit('error', userLoginError, ctx)
  }
  await next()
}

const verifyPassword = async (ctx, next) => {
  const { old_password, password } = ctx.request.body
  if (old_password === '') {
    return ctx.app.emit('error', userOldPasswordEmptyError, ctx)
  }
  const { user_name } = ctx.state.user
  let info = null
  try {
    info = await getUserInfo({ user_name })
    if (!info) {
      return ctx.app.emit('error', userNotExistsError, ctx)
    }
  } catch (error) {
    console.error('error :>> ', error)
    return ctx.app.emit('error', userPasswordError, ctx)
  }
  if (!bcrypt.compareSync(old_password, info.password)) {
    return ctx.app.emit('error', userOldPasswordVerifyError, ctx)
  }
  if (password === '') {
    return ctx.app.emit('error', userNewPasswordEmptyError, ctx)
  }
  await next()
}

module.exports = {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin,
  verifyPassword,
}
