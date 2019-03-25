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
const goodsCode = require('../../codes/goods')

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
  },
  async deleteGoods (ctx, next) {
    const query = ctx.request.query
    const _id = query._id
    const result = await goodsModel.deleteGoods(_id)
    if (result) {
      ctx.body = { code: 0 }
    } else {
      ctx.body = {
        code: 1,
        message: goodsCode.ERROR_NOWXEIST_GOODS
      }
    }
  }
}

async function validateGoodsInfo (ctx, goodsInfo) {
  const result = goodsService.validateGoods(goodsInfo)
  if (result) {
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
    // 获取规格分组
    const attrMatch = goodsInfo.attrMatch
    let tempAttrMatch = new Map() // 缓存规格分组
    await Promise.all(attrMatch.map(async match => {
      let attrKey = await goodsAttrKeyModel.addAttrKey(match.attrKey)
      let attrKeyId = attrKey._id
      let attrVals = match.attrVal
      await Promise.all(attrVals.map(async val => {
        let attrVal = await goodsAttrValModel.addAttrVal(attrKeyId, val)
        tempAttrMatch.set(val, attrVal._id)
      }))
    }))
    // 获取goodsSKU数据
    const goodsSKU = goodsInfo.goodsSKU
    const goodsSKUsId = await Promise.all(goodsSKU.map(async SKU => {
      // let attrMatch = SKU.attrMatch
      // let attrKey = await goodsAttrKeyModel.addAttrKey(attrMatch.attrKey)
      // let attrKeyId = attrKey._id
      // let attrValsId = await Promise.all(attrMatch.attrVal.map(val => {
      //   return goodsAttrValModel.addAttrVal(attrKeyId, val)
      // }))
      // SKU.attrMatch = attrValsId
      // return goodsSKUModel.addGoodsSKU(SKU)
      SKU.attrVals = SKU.attrVals.map(val => {
        return tempAttrMatch.get(val)
      })
      return goodsSKUModel.addGoodsSKU(SKU)
    }))
    goodsInfo.goodsSKU = goodsSKUsId
    return true
  }
}

module.exports = goodsController
