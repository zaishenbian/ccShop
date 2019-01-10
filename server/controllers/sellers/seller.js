/**
 * 商户模块接口的实现
 */
const sellerService = require('../../services/sellers/seller')
const sellerModel = require('../../models/sellers/seller')
const sellerCode = require('../../codes/seller')

const sellerController = {
  // 新增商户
  async addSeller (ctx, next) {
    const sellerInfo = ctx.request.body
    const result = sellerService.validateSeller(sellerInfo)
    if (result) {
      ctx.body = {
        code: 1,
        message: result
      }
    } else {
      const sellers = await sellerModel.findSellerByName(sellerInfo.name)
      if (sellers.length > 0) {
        ctx.body = {
          code: 1,
          message: sellerCode.ERROR_EXEIST_NAME
        }
      } else {
        try {
          await sellerModel.addSeller(sellerInfo)
          ctx.body = { code: 0 }
        } catch (error) {
          ctx.body = { code: 3 }
        }
      }
    }
  },
  // 更新商户信息
  async updateSeller (ctx, next) {
    let sellerInfo = ctx.request.body
    const result = sellerService.validateSeller(sellerInfo)
    if (result) {
      ctx.body = {
        code: 1,
        message: result
      }
    } else {
      const _id = sellerInfo._id
      sellerInfo = sellerService.formatSellerInfo(sellerInfo)
      try {
        await sellerModel.updateSeller(_id, sellerInfo)
        ctx.body = { code: 0 }
      } catch (error) {
        ctx.body = { code: 3 }
      }
    }
  },
  // 查询商户信息
  async getSeller (ctx, next) {
    const _id = ctx.request.query._id
    try {
      const sellerInfo = await sellerModel.findSellerById(_id)
      ctx.body = {
        code: 0,
        data: sellerInfo
      }
    } catch (error) {
      console.log(error)
      ctx.body = { code: 3 }
    }
  }
}

module.exports = sellerController
