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
    const SKUIterator = createIterator(goodsSKU)
    let SKU = SKUIterator.next()
    let SKUDone = SKU.done
    while (!SKUDone) {
      let SKUValue = SKU.value
      const attrMatch = SKUValue.attrMatch
      const attrKeyName = attrMatch.attrKey
      const attrKey = await goodsAttrKeyModel.addAttrKey(attrKeyName)
      const attrKeyId = attrKey._id
      const attrValNames = attrMatch.attrVal
      const valNamesIterator = createIterator(attrValNames)
      let valName = valNamesIterator.next()
      let attrValDone = valName.done
      let attrMatchIdArr = []
      while (!attrValDone) {
        const attrVal = await goodsAttrValModel.addAttrVal(attrKeyId, valName.value)
        attrMatchIdArr.push(attrVal._id)
        valName = valNamesIterator.next()
        attrValDone = valName.done
      }
      SKUValue.attrMatch = attrMatchIdArr
      SKUValue = await goodsSKUModel.addGoodsSKU(SKUValue)
      goodsSKUIdArr.push(SKUValue._id)
      SKU = SKUIterator.next()
      SKUDone = SKU.done
    }
    goodsInfo.goodsSKU = goodsSKUIdArr
    return true
  }
}

function createIterator (iterms) {
  let i = 0
  return {
    next () {
      let done = (i >= iterms.length)
      let value = !done ? iterms[i++] : undefined
      return {
        done,
        value
      }
    }
  }
}

module.exports = goodsController
