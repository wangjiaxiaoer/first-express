const Category = require('../../model/category')

// 添加/修改用户
const addCategory = async (req, res, next) => {
  const result = await Category.create(req.body)
  if (result) {
    res.redirect('/admin/category')
  } else {
    return res.status(400).render('admin/error', {
      msg: '添加失败'
    })
  }
}
// 删除用户
const removeCategory = async (req, res) => {
  const {
    id
  } = req.body
  const result = await Category.deleteOne({
    _id: id
  })
  if (result.ok == 1)
    res.redirect('/admin/category')
}
// 用户列表
const getCategoryList = async (req, res) => {
  // 标记左侧菜单栏选中
  req.app.locals.currentLink = 'category'
  const page = req.query.page || 1
  const pagesize = 10
  // 用户总条数
  const count = await Category.countDocuments({})
  // 总页数
  const total = Math.ceil(count / pagesize)
  const list = await Category.find().skip((page - 1) * pagesize).limit(pagesize).sort({
    '_id': -1
  })
  res.render('admin/category', {
    list,
    page,
    total,
    count
  })
}
// 根据id查找用户
const getCategoryById = async id => {
  const category = await Category.findOne({
    _id: id
  })
  if (category) return category
}

module.exports = {
  addCategory,
  getCategoryList,
  getCategoryById,
  removeCategory
}
