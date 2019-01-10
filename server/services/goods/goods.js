/**
 * 商品模块业务逻辑代码
 */
const validate = require('../../utils/validate')

const goodsService = {
  // 数据库写入商品信息前验证
  validateGoods (goodsInfo) {
    const rules = {
      name: {
        required: true,
        regExp: /^[\w\W]{1,20}$/g
      },
      describe: {
        required: true,
        regExp: /^[\w\W]{1,50}$/g
      },
      detail: {
        required: true
      },
      seller: {
        required: true
      },
      category: {
        required: true
      },
      goodsImages: {
        required: true
      },
      price: {
        required: true,
        regExp: /^[0-9]+$/g
      }
    }
    return validate(goodsInfo, rules, 'goods')
  }
}

module.exports = goodsService
