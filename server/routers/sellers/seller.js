/**
 * 商家模块路由
 */
const router = require('koa-router')()
const sellerController = require('../../controllers/sellers/seller')

router
  .post('/', sellerController.addSeller)

module.exports = router
