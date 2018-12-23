const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoodsAttrValSchema = new Schema({
  //所属规格（如：颜色、大小）
  goodsAttrKey: {
    type: Schema.Types.ObjectId,
    ref: 'GoodsAttrKey'
  },
  //规格属性值（如：红色、XXL）
  attrVal: String
})

const GoodsAttrVal = mongoose.model('GoodsAttrVal', GoodsAttrValSchema);

module.exports = GoodsAttrVal;