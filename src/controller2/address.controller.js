class AddrController {
  async create(ctx, next) {
    const { id: user_id } = ctx.state.user
    const { consignee, phone, address } = ctx.request.body
    const res = await ctx._service.address.createAddress({ user_id, consignee, phone, address })
    // console.log('res :>> ', res)
    // res 为 truly 操作成功，为 falsely 操作失败
    ctx._successHandler(res)
  }
  async findAll(ctx, next) {
    const { id: user_id } = ctx.state.user
    const res = await ctx._service.address.findAllAddress(user_id)
    ctx._successHandler(res)
  }
  async update(ctx, next) {
    const { id } = ctx.request.params
    const { consignee, phone, address } = ctx.request.body
    const res = await ctx._service.address.updateAddress({ id, consignee, phone, address })
    ctx._successHandler(res)
  }
  async remove(ctx, next) {
    const { id } = ctx.request.params
    const res = await ctx._service.address.removeAddress(id)
    ctx._successHandler(res)
  }
  async setDefault(ctx, next) {
    const { id: user_id } = ctx.state.user
    const { id } = ctx.request.params
    const res = await ctx._service.address.setDefaultAddress(user_id, id)
    ctx._successHandler(res)
  }
}

module.exports = new AddrController()
