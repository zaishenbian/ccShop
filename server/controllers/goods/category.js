/**
 * 商品分类接口的实现
 */
const categoryModel = require('../../models/goods/category')
const categoryCode = require('../../codes/category')

const categoryController = {
  async getAllCategories (ctx, next) {
    try {
      const categories = await categoryModel.getAllCategories()
      ctx.body = {
        code: 0,
        data: categories
      }
    } catch (error) {
      ctx.body = { code: 3 }
    }
  },
  async getCategoryById (ctx, next) {
    const _id = ctx.request.query._id
    try {
      const categoryInfo = await categoryModel.getCategoryById(_id)
      ctx.body = {
        code: 0,
        data: categoryInfo
      }
    } catch (error) {
      ctx.body = { code: 3 }
    }
  },
  async addCategory (ctx, next) {
    const categoryInfo = ctx.request.body
    const category = await categoryModel.getCategory(categoryInfo.name, categoryInfo.seller)
    if (category.length > 0) {
      ctx.body = {
        code: 1,
        message: categoryCode.ERROR_EXEIST_NAME
      }
    } else {
      try {
        await categoryModel.addCategory(categoryInfo)
        ctx.body = { code: 0 }
      } catch (error) {
        ctx.body = { code: 3 }
      }
    }
  }
}

module.exports = categoryController
