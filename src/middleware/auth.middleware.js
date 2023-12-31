const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.default')
const { tokenExpiredError, tokenInvalid, hasNotAdminPermission } = require('../constant/err.type')

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  // console.log('token :>> ', token)

  try {
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (error) {
    switch (error.name) {
      case 'TokenExpiredError':
        console.error('token 过期 :>> ', error)
        return ctx.app.emit('error', tokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.error('token 无效 :>> ', error)
        return ctx.app.emit('error', tokenInvalid, ctx)
    }
  }
  await next()
}

const hadAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user
  if (!is_admin) {
    console.log('is_admin :>> ', ctx.state.user);
    return ctx.app.emit('error', hasNotAdminPermission, ctx)
  }
  await next()
}

module.exports = {
  auth,
  hadAdminPermission,
}
