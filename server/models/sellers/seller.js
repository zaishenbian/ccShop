const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SellerSchema = new Schema({
  // 店铺名称
  name: String,
  // 店铺描述
  describe: String,
  // 商家手机号
  telePhone: Number,
  // 商家微信：
  weixin: String
})

const Seller = mongoose.model('Seller', SellerSchema)

module.exports = Seller
