// 创建用户集合
const mongoose = require('mongoose')
// 导入第三方加密模块
const bcrypt = require('bcrypt');
const Joi = require('joi')

const admin = require('../route/admin');

// 创建用户集合
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // 超级管理员 admin，普通用户 normal
  role: {
    type: String,
    required: true
  },
  state: {
    type: Number,
    // 0 启用，1 禁用
    default: 0
  },
  create_time: {
    type: Date,
    default: Date.now()
  }
})

// 验证添加内容是否合规
const validateUser = user => {
  // 定义验证规则
  const schema = {
    username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
    email: Joi.string().email().required().error(new Error('邮箱不符合验证规则')),
    password: Joi.string().regex(/^[a-zA-Z0-9]{4,20}$/).required('').error(new Error('密码不符合验证规则')),
    role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值不符合验证规则')),
    state: Joi.number().valid(0, 1).required().error(new Error('状态值不符合验证规则')),
  }
  return Joi.validate(user, schema)
}

// 验证添加内容是否合规
const validateUserEdit = user => {
  // 定义验证规则
  const schema = {
    id: Joi.string().empty(),
    username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
    email: Joi.string().email().required().error(new Error('邮箱不符合验证规则')),
    role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值不符合验证规则')),
    state: Joi.number().valid(0, 1).required().error(new Error('状态值不符合验证规则')),
  }
  return Joi.validate(user, schema)
}

// 新建用户示例
async function createUser() {
  // 随机字符串
  const salt = await bcrypt.genSalt(10);
  // 加密
  const pass = await bcrypt.hash('1111', salt)

  const user = User.create({
    username: 'admin',
    email: 'admin@admin.com',
    password: pass,
    role: 'admin',
    state: 0
  })
}
// createUser()

// 创建集合
const User = mongoose.model('User', userSchema)


// User.findOne({
//   'username': 'admin'
// }).then(res => {
//   console.log(res);
// })
// 导出
module.exports = {
  User,
  validateUser,
  validateUserEdit
}
