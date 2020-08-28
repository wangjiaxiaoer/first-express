const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  create_time: {
    type: Date,
    default: Date.now()
  }
})

const Category = mongoose.model('Category', CategorySchema)

// const create = async () => {
//   const cate = await Category.create({
//     name: 'javascript'
//   })
//   console.log(cate);
// }
// create()

// Category.find().then(res => {
//   console.log(res);
// })
module.exports = Category
