/**
 * 商户模块接口的实现
 */
const sellerService = require('../../services/sellers/seller')

const sellerController = {
  async addSeller (ctx, next) {
    const sellerInfo = ctx.request.body
    const result = sellerService.validateSeller(sellerInfo)
    console.log(result)
    if (result) {
      ctx.body = result
    } else {
      ctx.body = '验证成功'
    }
  }
}

module.exports = sellerController
