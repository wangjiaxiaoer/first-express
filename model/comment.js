const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  article_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    required: true,
  },
  create_time: {
    type: Date,
    default: Date.now()
  }
})

const Comment = mongoose.model('comment', CommentSchema)

// Comment.create({
//   article_id: '5f4139279e9568828424377d',
//   author_id: '5f3bf1c32985de618597be53',
//   content: '这篇文章是真的真的非常好啊'
// })

// Comment.find({
//   'article_id': '5f4139279e9568828424377d'
// })

module.exports = Comment
