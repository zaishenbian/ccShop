const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GoodsSchema = new Schema({
  // 商品名称
  name: String,
  // 商品描述
  describe: String,
  // 商品详情
  detail: String,
  // 所属商家
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'Seller'
  },
  // 所属分类
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  // 商品图片
  goodsImages: [
    {
      type: String
    }
  ],
  // 商品价格
  price: Number,
  // 商品SKU
  goodsSKU: [
    {
      type: Schema.Types.ObjectId,
      ref: 'GoodsSKU'
    }
  ]
}, { virtual: true })

// 虚拟属性定义商品的库存和销量
GoodsSchema.virtual('stockAmount').get(function () {
  let goodsSKU = this.goodsSKU
  let stockAmount = 0
  goodsSKU.forEach(SKU => {
    stockAmount += SKU.stockAmount
  })
  return stockAmount
})

GoodsSchema.statics = {
  // 根据_id查询商品
}

const Goods = mongoose.model('Goods', GoodsSchema)

module.exports = Goods
