const Comment = require('../../model/comment')

// 读取文章评论列表
const getCommentList = async (id) => {
  try {
    const list = await Comment.find({
      'article_id': id
    }).populate('author_id', 'username email -_id')
    return list
  } catch (error) {
    console.log(error);
  }
}
// 根据文章id添加评论
const addComment = async (id) => {
  try {
    await Comment.create({

    })
  } catch (error) {
    console.log(error);
  }
}



module.exports = {
  getCommentList,
  addComment
}
