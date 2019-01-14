/**
 * 商品模块接口的实现
 */
const goodsService = require('../../services/goods/goods')
const goodsModel = require('../../models/goods/goods')
const sellerModel = require('../../models/sellers/seller')
const categoryModel = require('../../models/goods/category')
const sellerCode = require('../../codes/seller')
const categoryCode = require('../../codes/category')

const goodsController = {
  async getAllGoods (ctx, next) {

  },
  async getGoods (ctx, next) {

  },
  async addGoods (ctx, next) {
    const goodsInfo = ctx.request.body
    const result = goodsService.validateGoods(goodsInfo)
    console.log(result)
    if (result) {
      ctx.body = {
        code: 1,
        message: result
      }
    } else {
      // 判断商家是否存在
      const sellerId = goodsInfo.seller
      const seller = await sellerModel.findSellerById(sellerId)
      if (!seller) {
        ctx.body = {
          code: 1,
          message: sellerCode.ERROR_NOEXEIST_SELLER
        }
      }
      // 判断分类是否存在
      const categoryId = goodsInfo.category
      const category = await categoryModel.getCategoryById(categoryId)
      if (!category) {
        ctx.body = {
          code: 1,
          message: categoryCode.ERROR_NOEXEIST_CATEGORY
        }
      }
      console.log(goodsInfo)
      // 添加商品
      try {
        await goodsModel.addGoods(goodsInfo)
        ctx.body = { code: 0 }
      } catch (error) {
        ctx.body = { code: 3 }
      }
    }
  }
}

module.exports = goodsController
