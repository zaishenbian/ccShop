/**
 * 整合所有子路由
 */
const router = require('koa-router')();
const goodsRouter = require('./goods/goods');

router.use('/api/goods', goodsRouter.routes(), goodsRouter.allowedMethods());

module.exports = router;