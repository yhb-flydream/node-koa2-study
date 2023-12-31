const statusEnum = {
  10001: 400,
  10002: 409,
}
module.exports = (err, ctx) => {
  ctx.status = statusEnum[err.code] || 500
  ctx.body = err
}
