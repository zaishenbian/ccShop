/**
 * 商家模块业务逻辑代码
 */
const validate = require('../../utils/validate')

const sellerService = {
  // 数据库写入商家信息前验证
  validateSeller (sellerInfo) {
    const rules = {
      name: {
        required: true
      },
      describe: {
        required: true,
        regExp: /^[\w\W]{1,50}$/g
      },
      telePhone: {
        required: true,
        regExp: /^1[34578]\d{9}$/g
      },
      weixin: {
        required: true
      }
    }
    return validate(sellerInfo, rules, 'seller')
  },
  // 更新商家信息时排除_id, name字段
  formatSellerInfo (sellerInfo) {
    const seller = Object.assign({}, sellerInfo)
    delete seller._id
    delete seller.name
    return seller
  }
}

module.exports = sellerService
