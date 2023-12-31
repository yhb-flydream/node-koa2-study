const { createAddress, findAllAddress, updateAddress, removeAddress, setDefaultAddress } = require('../service/addr.service')

class AddrController {
  async create(ctx, next) {
    const { id: user_id } = ctx.state.user
    const { consignee, phone, address } = ctx.request.body
    const res = await createAddress({ user_id, consignee, phone, address })
    ctx.body = {
      code: 0,
      msg: 'success',
      data: res,
    }
  }
  async findAll(ctx, next) {
    const { id: user_id } = ctx.state.user
    const res = await findAllAddress(user_id)
    ctx.body = {
      code: 0,
      msg: 'success',
      data: res,
    }
  }
  async update(ctx, next) {
    const { id } = ctx.request.params
    const { consignee, phone, address } = ctx.request.body
    const res = await updateAddress({ id, consignee, phone, address })
    ctx.body = {
      code: 0,
      msg: 'success',
      data: res,
    }
  }
  async remove(ctx, next) {
    const { id } = ctx.request.params
    const res = await removeAddress(id)
    ctx.body = {
      code: 0,
      msg: 'success',
      data: res,
    }
  }
  async setDefault(ctx, next) {
    const { id: user_id } = ctx.state.user
    const { id } = ctx.request.params
    const res = await setDefaultAddress(user_id, id)
    ctx.body = {
      code: 0,
      msg: 'success',
      data: res,
    }
  }
}

module.exports = new AddrController()
