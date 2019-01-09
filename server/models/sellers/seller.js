const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SellerSchema = new Schema({
  // 店铺名称
  name: {
    type: String,
    unique: true
  },
  // 店铺描述
  describe: String,
  // 商家手机号
  telePhone: Number,
  // 商家微信：
  weixin: String
})

SellerSchema.statics = {
  addSeller (sellerInfo) {
    return this.model('Seller').create(sellerInfo)
  },
  findSellerByName (name) {
    return this.find({ name: name })
  }
}

const Seller = mongoose.model('Seller', SellerSchema)

module.exports = Seller
