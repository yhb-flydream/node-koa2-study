const jwt = require('jsonwebtoken')

const { tokenExpiredError, tokenInvalid, hasNotAdminPermission } = require('../constant/err.type')

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  // console.log('token :>> ', token)

  try {
    const user = jwt.verify(token, ctx._config.JWT_SECRET)
    ctx.state.user = user
  } catch (error) {
    switch (error.name) {
      case 'TokenExpiredError':
        console.error('token 过期 :>> ', error)
        return ctx._errorHandler(tokenExpiredError)
      case 'JsonWebTokenError':
        console.error('token 无效 :>> ', error)
        return ctx._errorHandler(tokenInvalid)
    }
  }
  await next()
}

const hadAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user
  if (!is_admin) {
    console.log('is_admin :>> ', ctx.state.user);
    return ctx._errorHandler(hasNotAdminPermission)
  }
  await next()
}

module.exports = {
  auth,
  hadAdminPermission,
}
