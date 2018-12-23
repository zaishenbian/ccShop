const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoodsAttrKeySchema = new Schema({
  //商品规格的名称（如: 颜色、大小）
  name: String
})

const GoodsAttrKey = mongoose.model('GoodsAttrKey', GoodsAttrKeySchema);

module.exports = GoodsAttrKey;