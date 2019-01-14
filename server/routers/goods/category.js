/**
 * 商品分类模块路由
 */
const router = require('koa-router')()
const categoryController = require('../../controllers/goods/category')

router
  .get('/allCategories', categoryController.getAllCategories)
  .get('/', categoryController.getCategoryById)
  .post('/', categoryController.addCategory)

module.exports = router
