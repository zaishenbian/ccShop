/**
 * 商家模块业务逻辑代码
 */
const validator = require('validator')
const sellerCode = require('../../codes/seller')

const sellerService = {
  // 数据库写入商家信息前验证
  validateSeller (sellerInfo) {
    let result = ''
    let defaultSellerInfo = {
      name: '',
      describe: '',
      telePhone: '',
      weixin: ''
    }
    sellerInfo = Object.assign(defaultSellerInfo, sellerInfo)
    const regExp = {
      telePhone: /^1[34578]\d{9}$/g,
      describe: /^[\w\W]{1,50}$/g
    }
    for (const key of Object.keys(sellerInfo)) {
      if (regExp.hasOwnProperty(key)) {
        let valid = validator.matches(sellerInfo[key], regExp[key])
        if (!valid) {
          let codeKey = `ERROR_${key.toUpperCase()}`
          result = sellerCode[codeKey]
          break
        }
      } else {
        let empty = validator.isEmpty(sellerInfo[key])
        if (empty) {
          let codeKey = `ERROR_${key.toUpperCase()}`
          result = sellerCode[codeKey]
          break
        }
      }
    }
    return result
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
