const bcrypt = require('bcrypt')
const {
  User,
  validateUser,
  validateUserEdit
} = require('../../model/user')

// 添加/修改用户
const addUser = async (req, res, next) => {
  const {
    username,
    email,
    password,
    role,
    state,
    id
  } = req.body
  if (id) {
    // 实时验证输入内容是否符合规则
    try {
      await validateUserEdit({
        id,
        username,
        email,
        role,
        state
      })
    } catch (e) {
      return next(JSON.stringify({
        url: '/admin/user-edit',
        msg: e.message
      }))
    }
    // 修改用户信息
    const result = await User.updateOne({
      _id: id
    }, {
      username,
      email,
      state,
      role
    })
    if (result.ok == 1) {
      res.redirect('/admin/user')
    } else {
      return next(JSON.stringify({
        url: '/admin/user-edit',
        msg: '修改用户信息失败'
      }))
    }
  } else {
    // 实时验证输入内容是否符合规则
    try {
      await validateUser({
        username,
        email,
        password,
        role,
        state
      })
    } catch (e) {
      return next(JSON.stringify({
        url: '/admin/user-edit',
        msg: e.message
      }))
    }
    // 添加
    // 判断邮箱是否已经注册
    const obj = await User.findOne({
      email
    })
    if (obj) {
      const message = '该邮箱已被注册，请更换邮箱后重试'
      return next(JSON.stringify({
        url: '/admin/user-edit',
        msg: message
      }))
    }
    // 随机字符串
    const salt = await bcrypt.genSalt(10);
    // 加密
    req.body.password = await bcrypt.hash(password, salt)

    const result = await User.create(req.body)
    if (result) {
      res.redirect('/admin/user')
    } else {
      return res.status(400).render('admin/error', {
        msg: '添加失败'
      })
    }
  }
}
// 删除用户
const removeUser = async (req, res) => {
  const {
    id
  } = req.body
  const result = await User.deleteOne({
    _id: id
  })
  if (result.ok == 1)
    res.redirect('/admin/user')
}
// 用户列表
const getUserList = async (req, res) => {
  // 标记左侧菜单栏选中
  req.app.locals.currentLink = 'user'
  const page = req.query.page || 1
  const pagesize = 10
  // 用户总条数
  const count = await User.countDocuments({})
  // 总页数
  const total = Math.ceil(count / pagesize)
  const list = await User.find().skip((page - 1) * pagesize).limit(pagesize).sort({
    '_id': -1
  })
  res.render('admin/user', {
    list,
    page,
    total
  })
}
// 根据id查找用户
const getUserById = async id => {
  const user = await User.findOne({
    _id: id
  })
  if (user) return user
}

module.exports = {
  addUser,
  getUserList,
  getUserById,
  removeUser
}
