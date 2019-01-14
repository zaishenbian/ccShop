/**
 * 整合所有子路由
 */
const router = require('koa-router')()
const goodsRouter = require('./goods/goods')
const sellerRouter = require('./sellers/seller')
const categoryRouter = require('./goods/category')

router.use('/api/goods', goodsRouter.routes(), goodsRouter.allowedMethods())
router.use('/api/category', categoryRouter.routes(), categoryRouter.allowedMethods())
router.use('/api/seller', sellerRouter.routes(), sellerRouter.allowedMethods())

module.exports = router
