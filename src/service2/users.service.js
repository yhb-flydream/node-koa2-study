module.exports = app => {
  class UserService {
    async createUser(user_name, password) {
      const res = await app._model.Users.create({ user_name, password })
      return res.dataValues
    }
    async getUserInfo({ id, user_name, password, is_admin }) {
      let whereOpt = {}
      id && Object.assign(whereOpt, { id })
      user_name && Object.assign(whereOpt, { user_name })
      password && Object.assign(whereOpt, { password })
      is_admin && Object.assign(whereOpt, { is_admin })

      const res = await app._model.Users.findOne({
        attributes: ['id', 'user_name', 'password', 'is_admin'],
        where: whereOpt,
      })
      // console.log('res :>> ', res)
      return res ? res.dataValues : null
    }
    async updateUserInfo({ id, user_name, password, is_admin }) {
      const whereOpt = { id }
      const userInfo = {}
      user_name && Object.assign(userInfo, { user_name })
      password && Object.assign(userInfo, { password })
      is_admin && Object.assign(userInfo, { is_admin })

      const res = await app._model.Users.update(userInfo, { where: whereOpt })
      return res[0] > 0
    }
  }
  return new UserService()
}
