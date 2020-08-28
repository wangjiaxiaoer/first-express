const express = require('express')
const path = require('path')
// 引入body-parser 处理post请求参数
const bodyparser = require('body-parser')
const session = require('express-session')
const morgan = require('morgan')

const template = require('art-template')
const dataFormat = require('dataformat')

// 引入数据库连接
require('./model/connect')


const app = express()
// 处理post请求参数
app.use(bodyparser.urlencoded({
  extended: false,
}))
// 配置session
app.use(session({
  secret: 'secret key',
  // 未登录不保存cookie
  saveUninitialized: false,
  cookie: {
    // cookie保存时间 24小时
    maxAge: 24 * 60 * 60 * 1000
  }
}))

// 告诉express框架模板的位置
app.set('views', path.join(__dirname, 'views'))
// 告诉express框架模板的默认后缀
app.set('view engine', 'art')
// art的模板，模板引擎是什么
app.engine('art', require('express-art-template'))
// 向模板文件中导入外部变量
template.defaults.imports.dataFormat = dataFormat
// 开放静态资源文件 
app.use(express.static(path.join(__dirname, 'public')))

// 登录拦截
app.use('/admin', require('./middleware/loginGuard'))
// 将客户端发送到服务器的请求打印到控制台
app.use(morgan('dev'))

// 引入路由模块
const home = require('./route/home')
const admin = require('./route/admin')
const {
  urlencoded
} = require('body-parser')

// 为路由匹配请求路径
app.use('/home', home)
app.use('/admin', admin)

// 错误处理中间件
app.use((err, req, res, next) => {
  const error = JSON.parse(err)
  res.redirect(`${error.url}?message=${error.msg}`)
})

app.listen(80)
console.log('服务器启动成功')


// 2489
