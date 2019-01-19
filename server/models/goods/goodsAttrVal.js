const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GoodsAttrValSchema = new Schema({
  // 所属规格（如：颜色、大小）
  goodsAttrKey: {
    type: Schema.Types.ObjectId,
    ref: 'GoodsAttrKey'
  },
  // 规格属性值（如：红色、XXL）
  attrVal: String
})

GoodsAttrValSchema.statics = {
  // 获取attrVal
  getAttrVal (attrKeyId, name) {
    return this.model('GoodsAttrVal').find({ goodsAttrKey: attrKeyId, attrVal: name })
  },
  // 添加attrVal(避免重复添加)
  async addAttrVal (attrKeyId, name) {
    const result = await this.getAttrVal(attrKeyId, name)
    if (result.length > 0) {
      return result[0]
    } else {
      return this.model('GoodsAttrVal').create({ goodsAttrKey: attrKeyId, attrVal: name })
    }
  }
}

const GoodsAttrVal = mongoose.model('GoodsAttrVal', GoodsAttrValSchema)

module.exports = GoodsAttrVal
