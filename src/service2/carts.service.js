const { Op } = require('sequelize')

const { cartsAddError } = require('../constant/err.type')

module.exports = app => {
  class CartsService {
    async createOrUpdate(user_id, goods_id) {
      try {
        let res = await app._model.Carts.findOne({
          where: {
            [Op.and]: {
              user_id,
              goods_id,
            },
          },
        })
        if (res) {
          await res.increment('number')
          return await res.reload()
        } else {
          return await app._model.Carts.create({ user_id, goods_id })
        }
      } catch (error) {
        console.error('createOrUpdate error :>> ', error)
        ctx._errorHandler(cartsAddError)
      }
    }
    async findCarts(pageNum, pageSize) {
      const offset = (pageNum - 1) * pageSize
      const { count, rows } = await app._model.Carts.findAndCountAll({
        attributes: ['id', 'number', 'selected'],
        offset,
        limit: +pageSize,
        include: {
          model: app._model.Goods,
          as: 'goods_info',
          attributes: ['id', 'goods_name', 'goods_price', 'goods_img'],
        },
      })
      return {
        total: count,
        pageNum,
        pageSize,
        data: rows,
      }
    }
    async updateCarts({ id, number, selected }) {
      const res = await app._model.Carts.findByPk(+id)
      if (!res) return ''
      number !== undefined ? (res.number = number) : ''
      selected !== undefined ? (res.selected = selected) : ''
      return await res.save()
    }
    async removeCarts(ids) {
      return await app._model.Carts.destroy({
        where: {
          id: {
            [Op.in]: ids,
          },
        },
      })
    }
    async selectAllCarts(user_id) {
      return await app._model.Carts.update(
        { selected: true },
        {
          where: { user_id },
        }
      )
    }
    async unSelectAllCarts(user_id) {
      return await app._model.Carts.update(
        { selected: false },
        {
          where: { user_id },
        }
      )
    }
    async toggleSelectAllCarts(user_id, selected) {
      return await app._model.Carts.update(
        {
          selected,
        },
        {
          where: { user_id },
        }
      )
    }
    async cartsCount() {
      return await app._model.Carts.count()
    }
  }
  return new CartsService()
}
