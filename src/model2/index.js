const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const _Addr = require('./addr.model')
const _Carts = require('./cart.model')
const _Goods = require('./goods.model')
const _Order = require('./order.model')
const _User = require('./user.model')

function initModels(sequelize) {
  const Addr = _Addr(sequelize, DataTypes)
  const Carts = _Carts(sequelize, DataTypes)
  const Goods = _Goods(sequelize, DataTypes)
  const Order = _Order(sequelize, DataTypes)
  const User = _User(sequelize, DataTypes)

  // 创建数据表，如果数据表已经存在，则删除后再重新创建，为避免重新创建，初始运行之后即可把代码注释掉
  // Addr.sync({ force: true })
  // Carts.sync({ force: true })
  // Goods.sync({ force: true })
  // Order.sync({ force: true })
  // User.sync({ force: true })

  // 关联数据表
  Carts.belongsTo(Goods, {
    foreignKey: 'goods_id',
    as: 'goods_info',
  })

  return {
    Addr,
    Carts,
    Goods,
    Order,
    User,
  }
}

module.exports = initModels(seq)
