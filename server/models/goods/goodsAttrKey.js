const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GoodsAttrKeySchema = new Schema({
  // 商品规格的名称（如: 颜色、大小）
  name: {
    type: String,
    unique: true
  }
})

GoodsAttrKeySchema.statics = {
  // 获取attrKey
  getAttrKeyByName (name) {
    return this.model('GoodsAttrKey').find({ name: name })
  },
  // 添加attrKey(避免重复添加)
  async addAttrKey (name) {
    const result = await this.getAttrKeyByName(name)
    if (result.length > 0) {
      return result[0]
    } else {
      return this.model('GoodsAttrKey').create({ name: name })
    }
  }
}

const GoodsAttrKey = mongoose.model('GoodsAttrKey', GoodsAttrKeySchema)

module.exports = GoodsAttrKey
