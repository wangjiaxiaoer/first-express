const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '请填写标题'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, '请填写作者'],
  },
  cate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, '请填写分类'],
  },
  cover: {
    type: String,
    default: null
  },
  content: {
    type: String,
  },
  create_time: {
    type: Date,
    default: Date.now()
  }
})

const Article = mongoose.model('article', articleSchema)

// Article.create({
//   title: 'javascript,前端开发必备技能',
//   cate: '5f4136cc9bda0698c697ece6',
//   author: '5f3bf1c32985de618597be53',
//   content: 'JavaScript是前端开发的基础，一切的开始，vue只会表象是不可以的，还要精通源码，现在vue3.0也是要懂一些的哦哦'
// })
// 文章表、分类表、用户表关联
// Article.find({}).populate('cate').populate('author', 'username').then(res => {
//   console.log(res);
// })
module.exports = {
  Article
}
