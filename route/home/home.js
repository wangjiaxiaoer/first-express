const {
  Article
} = require('../../model/article')

const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
  const {
    page
  } = req.query
  const list = await pagination(Article).find().page(page).size(4).display(3).populate("cate", "name -_id").populate("author", "username -_id").exec()
  // res.send(list)
  const data = JSON.stringify(list)
  // console.log(data);
  res.render('home/default', {
    list: JSON.parse(data)
  })
}

// module.exports = async (req, res) => {
//   const {
//     page
//   } = req.query
//   const list = await pagination(Article).find().page(page).size(2).display(3).populate("cate", "name -_id").populate("author", "username -_id").exec()
//   const data = JSON.stringify(list)
//   res.render('home/default', {
//     list: JSON.parse(data)
//   })
// }
