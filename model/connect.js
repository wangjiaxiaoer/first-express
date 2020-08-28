// 导入mongoose第三方模块
const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/blog', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(_ => {
  console.log('数据库连接成功')
}).catch(_ => {
  console.log('数据库连接失败')
})
