/**
 * 商家模块路由
 */
const router = require('koa-router')()
const sellerController = require('../../controllers/sellers/seller')

router
  .get('/', sellerController.querySeller)
  .post('/', sellerController.addSeller)
  .put('/', sellerController.updateSeller)

module.exports = router
