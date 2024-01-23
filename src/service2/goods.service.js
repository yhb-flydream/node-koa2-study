module.exports = app => {
  class GoodsService {
    async createGoods(goods) {
      const res = await app._model.Goods.create(goods)
      return res.dataValues
    }
    async updateGoods({ id, ...goods }) {
      const whereOpt = { id }

      const res = await app._model.Goods.update(goods, { where: whereOpt })
      return res[0] > 0
    }
    async removeGoods(id) {
      const res = await app._model.Goods.destroy({ where: { id } })
      return !!res
    }
    async restoreGoods(id) {
      const res = await app._model.Goods.restore({ where: { id } })
      return !!res
    }
    async findGoods(pageNum, pageSize) {
      // const count = await app._model.Goods.count()
      // const offset = (pageNum - 1) * pageSize
      // const rows = await app._model.Goods.findAll({ offset, limit: +pageSize })

      const offset = (pageNum - 1) * pageSize
      const { count, rows } = await app._model.Goods.findAndCountAll({ offset, limit: +pageSize })
      return {
        total: count,
        pageNum,
        pageSize,
        list: rows,
      }
    }
  }
  return new GoodsService()
}
