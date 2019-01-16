const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GoodsSKUSchema = new Schema({
  // 这一个SKU的价格
  price: Number,
  // 这一个SKU的库存
  stockAmount: Number,
  // 这一个SKU的图片
  goodsImages: [
    {
      type: String
    }
  ],
  // 这一个SKU的已售数量
  sellerAmount: Number,
  // 这一个SKU的属性搭配方式
  attrMatch: [
    {
      type: Schema.Types.ObjectId,
      ref: 'GoosAttrVal'
    }
  ]
})

const GoodsSKU = mongoose.model('GoodsSKU', GoodsSKUSchema)

module.exports = GoodsSKU
