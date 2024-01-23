module.exports = app => {
  return async (ctx, next) => {
    // 操作成功
    app.context._successHandler = (data = '') => {
      ctx.body = {
        code: 0,
        msg: 'success',
        data,
      }
    }

    // 操作失败
    app.context._errorHandler = data => {
      ctx.app.emit('error', data, ctx)
    }
    await next()
  }
}
