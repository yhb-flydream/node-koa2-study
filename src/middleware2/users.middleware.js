const bcrypt = require('bcryptjs')
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
    return ctx._errorHandler(userFormateError)
  }
  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body
  try {
    const info = await ctx._service.users.getUserInfo({ user_name })
    if (info) {
      console.log('verifyUser :>> ', { user_name })
      return ctx._errorHandler(userAlreadyExists)
    }
  } catch (error) {
    console.error('verifyUser error :>> ', error)
    return ctx._errorHandler(userRegisterError)
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
    info = await ctx._service.users.getUserInfo({ user_name })
    if (!info) {
      console.log('verifyLogin :>> ', { user_name })
      return ctx._errorHandler(userNotExistsError)
    }
    if (!bcrypt.compareSync(password, info.password)) {
      return ctx._errorHandler(userPasswordError)
    }
  } catch (error) {
    console.error('verifyLogin error :>> ', error)
    return ctx._errorHandler(userLoginError)
  }
  await next()
}

const verifyPassword = async (ctx, next) => {
  const { old_password, password } = ctx.request.body
  if (old_password === '') {
    return ctx._errorHandler(userOldPasswordEmptyError)
  }
  const { user_name } = ctx.state.user
  let info = null
  try {
    info = await ctx._service.users.getUserInfo({ user_name })
    if (!info) {
      return ctx._errorHandler(userNotExistsError)
    }
  } catch (error) {
    console.error('verifyPassword error :>> ', error)
    return ctx._errorHandler(userPasswordError)
  }
  if (!bcrypt.compareSync(old_password, info.password)) {
    return ctx._errorHandler(userOldPasswordVerifyError)
  }
  if (password === '') {
    return ctx._errorHandler(userNewPasswordEmptyError)
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
