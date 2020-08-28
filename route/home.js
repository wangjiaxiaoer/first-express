const express = require('express')

const home = express.Router()
const {
  getComments,
  addComment
} = require('./home/article')
// 首页
home.get('/', require('./home/home'))

home.get('/article', getComments)

home.post('/article', addComment)

module.exports = home
