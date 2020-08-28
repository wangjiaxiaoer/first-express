const formidable = require('formidable')
const pagination = require('mongoose-sex-page')

const path = require('path')
const {
  Article
} = require('../../model/article')
const {
  User
} = require('../../model/user')
// 所有文章列表
const getArticleList = async (req, res) => {
  const {
    page
  } = req.query
  // 标记左侧菜单栏选中
  req.app.locals.currentLink = 'article'
  // page 当前页
  // size 每页显示的条数
  // display 指定客户端要显示的页码数量
  // exec 向数据库中发送查询请求
  // 查询文章列表
  const list = await pagination(Article).find().page(page).size(2).display(3).populate("cate", "name -_id").populate("author", "username -_id").exec()
  // res.send(list)
  const data = JSON.stringify(list)
  res.render('admin/article', {
    list: JSON.parse(data)
  })
}
// 添加文章
const addArticle = (req, res) => {
  // 创建表单解析对象
  const form = new formidable.IncomingForm()
  // 设置文件上传路径
  form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')
  // 是否保留文件上传后缀扩展名
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    // err 错误对象，如果表单解析失败，err存储错误对象，成功则为空
    // fields 对象类型 保存普通表单对象
    // files 对象类型 保存了和上传文件相关的数据
    console.log(err, fields, files);
    if (!err) {
      const cover = files.cover.path.split('public')[1]
      fields.cover = cover
      const result = await Article.create(fields)
      if (result) {
        res.redirect('/admin/article')
      } else {
        return res.status(400).render('admin/error', {
          msg: '添加失败'
        })
      }
    }
  })


}
// 删除文章
const removeArticle = async (req, res) => {
  const {
    id
  } = req.body
  const result = await Article.deleteOne({
    _id: id
  })
  if (result.ok == 1)
    res.redirect('/admin/article')
}

module.exports = {
  getArticleList,
  addArticle,
  removeArticle
}
