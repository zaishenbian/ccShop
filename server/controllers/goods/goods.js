/**
 * 商品模块接口的实现
 */
const goodsService = require('../../services/goods/goods')
const goodsModel = require('../../models/goods/goods')
const sellerModel = require('../../models/sellers/seller')
const categoryModel = require('../../models/goods/category')
const goodsSKUModel = require('../../models/goods/goodsSKU')
const goodsAttrKeyModel = require('../../models/goods/goodsAttrKey')
const goodsAttrValModel = require('../../models/goods/goodsAttrVal')
const sellerCode = require('../../codes/seller')
const categoryCode = require('../../codes/category')

const goodsController = {
  async getAllGoods (ctx, next) {
    const allGoodsInfo = await goodsModel.getAllGoods()
    ctx.body = allGoodsInfo
  },
  async getGoods (ctx, next) {
    const query = ctx.request.query
    const _id = query._id
    const goodsInfo = await goodsModel.getGoodsById(_id)
    ctx.body = goodsInfo
  },
  async addGoods (ctx, next) {
    const goodsInfo = ctx.request.body
    const res = await validateGoodsInfo(ctx, goodsInfo)
    if (res) {
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

async function validateGoodsInfo (ctx, goodsInfo) {
  const result = goodsService.validateGoods(goodsInfo)
  if (result) {
    console.log(result)
    ctx.body = {
      code: 1,
      message: result
    }
    return false
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
    // 获取goodsSKU数据
    const goodsSKU = goodsInfo.goodsSKU
    const goodsSKUIdArr = []
    if (goodsSKU.length > 0) {
      goodsSKU.forEach(async (SKU, SKUIndex, SKUArr) => {
        // 获取SKUAttrKey和SKUAttrVal
        const attrMatch = SKU.attrMatch
        let attrMatchIdArr = []
        const attrKeyName = attrMatch.attrKey
        const attrKey = await goodsAttrKeyModel.addAttrKey(attrKeyName)
        const attrKeyId = attrKey._id
        const attrValNames = attrMatch.attrVal
        attrValNames.forEach(async (val, valIndex, valArr) => {
          const attrVal = await goodsAttrValModel.addAttrVal(attrKeyId, val)
          attrMatchIdArr.push(attrVal._id)
          if (valIndex === valArr.length - 1) {
            SKU.attrMatch = attrMatchIdArr
            SKU = await goodsSKUModel.addGoodsSKU(SKU)
            goodsSKUIdArr.push(SKU._id)
            console.log('87', goodsSKUIdArr)
          }
        })
        if (SKUIndex === SKUArr.length - 1) {
          console.log('89', goodsSKUIdArr)
          goodsInfo.goodsSKU = goodsSKUIdArr
        }
      })
    }
    return true
  }
}

function iterator (cb, finish) {
  cb()
  
}

module.exports = goodsController
