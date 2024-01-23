const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const _Address = require('./address.model')
const _Carts = require('./carts.model')
const _Goods = require('./goods.model')
const _Orders = require('./orders.model')
const _Users = require('./users.model')

function initModels(sequelize) {
  const Address = _Address(sequelize, DataTypes)
  const Carts = _Carts(sequelize, DataTypes)
  const Goods = _Goods(sequelize, DataTypes)
  const Orders = _Orders(sequelize, DataTypes)
  const Users = _Users(sequelize, DataTypes)

  // 创建数据表，如果数据表已经存在，则删除后再重新创建，为避免重新创建，初始运行之后即可把代码注释掉
  // Address.sync({ force: true })
  // Carts.sync({ force: true })
  // Goods.sync({ force: true })
  // Orders.sync({ force: true })
  // Users.sync({ force: true })

  // 关联数据表
  Carts.belongsTo(Goods, {
    foreignKey: 'goods_id',
    as: 'goods_info',
  })

  return {
    Address,
    Carts,
    Goods,
    Orders,
    Users,
  }
}

module.exports = app => {
  app._model = initModels(seq)
  console.log('model2 :>> ', 'init')
}
