const Goods = require('../model/goods.model')

class GoodsService {
  async createGoods(goods) {
    const res = await Goods.create(goods)
    return res.dataValues
  }
  async updateGoods({ id, ...goods }) {
    const whereOpt = { id }

    const res = await Goods.update(goods, { where: whereOpt })
    return res[0] > 0
  }
  async removeGoods(id) {
    const res = await Goods.destroy({ where: { id } })
    return !!res
  }
  async restoreGoods(id) {
    const res = await Goods.restore({ where: { id } })
    return !!res
  }
  async findGoods(pageNum, pageSize) {
    // const count = await Goods.count()
    // const offset = (pageNum - 1) * pageSize
    // const rows = await Goods.findAll({ offset, limit: +pageSize })

    const offset = (pageNum - 1) * pageSize
    const { count, rows } = await Goods.findAndCountAll({ offset, limit: +pageSize })
    return {
      total: count,
      pageNum,
      pageSize,
      list: rows,
    }
  }
}

module.exports = new GoodsService()
