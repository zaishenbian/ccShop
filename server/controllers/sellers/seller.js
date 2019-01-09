/**
 * 商户模块接口的实现
 */
const sellerService = require('../../services/sellers/seller')
const sellerModel = require('../../models/sellers/seller')

const sellerController = {
  async addSeller (ctx, next) {
    console.log(1)
    const sellerInfo = ctx.request.body
    const result = sellerService.validateSeller(sellerInfo)
    if (result) {
      ctx.body = result
    } else {
      const sellers = await sellerModel.findSellerByName(sellerInfo.name)
      if (sellers.length > 0) {
        ctx.body = {
          code: 0,
          message: '商户名已存在'
        }
      } else {
        try {
          await sellerModel.addSeller(sellerInfo)
          ctx.body = { code: 0 }
        } catch (error) {
          ctx.body = { code: 2 }
        }
      }
    }
  }
}

module.exports = sellerController
