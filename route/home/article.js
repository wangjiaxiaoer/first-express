const {
  Article
} = require('../../model/article')
const Comment = require('../../model/comment')

const {
  getCommentList
} = require('./comment')

const getComments = async (req, res) => {
  const {
    id
  } = req.query
  // 评论列表
  const commontList = await getCommentList(id)
  // 文章详情
  const article = await Article.findOne({
    '_id': id
  }).populate('author', 'username -_id').populate('cate', 'name -_id')
  const data = JSON.stringify(article)
  const list = JSON.stringify(commontList)
  res.render('home/article.art', {
    article: JSON.parse(data),
    list: JSON.parse(list)
  })
}

const addComment = async (req, res) => {
  const {
    content,
    userInfo,
    article_id
  } = req.body
  const author_id = JSON.parse(userInfo)._id
  const result = await Comment.create({
    content,
    article_id,
    author_id
  })
  if (result) {
    res.redirect('/home/article?id=' + article_id)
  }
}

module.exports = {
  getComments,
  addComment
}
