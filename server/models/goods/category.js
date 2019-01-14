const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  // 分类名称
  name: String,
  // 所属商家
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'Seller'
  }
})

CategorySchema.statics = {
  getAllCategories () {
    return this.model('Category').find({})
  },
  getSellerCategories (sellerId) {
    return this.model('Category').find({ seller: sellerId })
  },
  getCategoryById (_id) {
    return this.model('Category').findOne({ _id: _id })
  },
  getCategory (name, seller) {
    return this.model('Category').find({ name: name, seller: seller })
  },
  addCategory (category) {
    return this.model('Category').create(category)
  }
}

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
