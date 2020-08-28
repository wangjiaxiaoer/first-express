const bcrypt = require('bcrypt')
// 导入用户集合
const {
  User
} = require('../../model/user')

module.exports = async (req, res) => {
  // 接收参数
  const {
    email,
    password
  } = req.body
  // if (email.trim().length == 0 || password.trim().length == 0)
  //   return res.status(400).send('<h4>邮件地址或者密码错误</h4>')
  if (email.trim().length == 0 || password.trim().length == 0)
    return res.status(400).render('admin/error', {
      msg: '邮件地址或者密码错误'
    })
  const user = await User.findOne({
    email
  })
  if (!user) {
    return res.status(400).render('admin/error', {
      msg: '邮件地址或者密码错误'
    })
  } else {
    const isEqual = await bcrypt.compare(password, user.password)
    if (isEqual) {
      req.session.username = user.username
      req.session.role = user.role
      req.app.locals.userInfo = user
      if (user.role === 'admin') {
        res.redirect('/admin/user?page=1')
      } else if (user.role === 'normal') {
        res.redirect('/home')
      }
    } else {
      return res.status(400).render('admin/error', {
        msg: '邮件地址或者密码错误'
      })
    }
  }
}

// module.exports = login
