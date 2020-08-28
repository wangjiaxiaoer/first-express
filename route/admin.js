const express = require('express')
const admin = express.Router()
const Category = require('../model/category')
const {
  addUser,
  getUserList,
  getUserById,
  removeUser
} = require('./admin/user')
const {
  getArticleList,
  addArticle,
  removeArticle
} = require('./admin/article')

const {
  getCategoryList,
  addCategory,
  removeCategory
} = require('./admin/category')


// 渲染登录页面
admin.get('/login', (req, res) => {
  res.render('admin/login')
})
// 登录提交
admin.post('/login', require('./admin/login'))
// 渲染用户页面
admin.get('/user', getUserList)
// 退出登录
admin.get('/logout', require('./admin/logout.js'))
// 渲染用户编辑页面
admin.get('/user-edit', async (req, res) => {
  const {
    message,
    id
  } = req.query
  let user = null
  if (id) {
    user = await getUserById(id)
  }
  if (user) {
    res.render('admin/user-edit', {
      message,
      user
    })
  } else {
    res.render('admin/user-edit', {
      message,
    })
  }
})
// 用户编辑提交
admin.post('/user-edit', addUser)
// 删除用户
admin.post('/remove-user', removeUser)
// 渲染文章页面
admin.get('/article', getArticleList)
// 文章添加、编辑页面
admin.get('/article-edit', async (req, res) => {
  const cate = await Category.find()
  res.render('admin/article-edit', {
    cate
  })
})
admin.post('/article-edit', addArticle)
admin.post('/removeArticle', removeArticle)
// 渲染文章页面
admin.get('/category', getCategoryList)
// 文章添加、编辑页面
admin.get('/category-edit', async (req, res) => {
  const cate = await Category.find()
  res.render('admin/category-edit', {
    cate
  })
})
admin.post('/category-edit', addCategory)
admin.post('/remove-category', removeCategory)






module.exports = admin
