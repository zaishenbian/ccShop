/**
 * 商品模块接口的实现
 */
const goodsService = require('../../services/goods/goods')
const goodsModel = require('../../models/goods/goods')
const sellerModel = require('../../models/sellers/seller')
const goodsCode = require('../../codes/goods')

const goodsController = {
  async getAllGoods (ctx, next) {

  },
  async getGoods (ctx, next) {

  },
  async addGoods (ctx, next) {
    const goodsInfo = ctx.request.body
    const result = goodsService.validateGoods(goodsInfo)
    if (result) {
      ctx.body = {
        code: 1,
        message: result
      }
    } else {
      const sellerId = goodsInfo.seller
      const seller = await sellerModel.findSellerById(sellerId)
      if (!seller) {
        ctx.body = {
          code: 1,
          message: goodsCode.ERROR_NOEXEIST_SELLER
        }
      }
    }
  }
}

module.exports = goodsController
