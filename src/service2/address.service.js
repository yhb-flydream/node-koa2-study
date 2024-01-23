module.exports = app => {
  class AddrService {
    async createAddress(address) {
      return await app._model.Address.create(address)
    }
    async findAllAddress(user_id) {
      return await app._model.Address.findAll({
        attributes: ['id', 'consignee', 'phone', 'address', 'is_default'],
        where: { user_id },
      })
    }
    async updateAddress({ id, ...address }) {
      return await app._model.Address.update(address, { where: { id } })
    }
    async removeAddress(id) {
      return await app._model.Address.destroy({ where: { id } })
    }
    async setDefaultAddress(user_id, id) {
      await app._model.Address.update(
        {
          is_default: false,
        },
        {
          where: { user_id },
        }
      )
      return await app._model.Address.update(
        {
          is_default: true,
        },
        {
          where: { user_id, id },
        }
      )
    }
  }

  return new AddrService()
}
