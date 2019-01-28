/**
 * 商品模块路由
 */
const router = require('koa-router')()
const goodsController = require('../../controllers/goods/goods')

router
  .get('/allGoods', goodsController.getAllGoods)
  .get('/', goodsController.getGoods)
  .post('/', goodsController.addGoods)
  .delete('/', goodsController.deleteGoods)

module.exports = router
