/**
 * 商品模块路由
 */
const router = require('koa-router')()

router
  .get('/addGoods', async (ctx, next) => {
    let reqQuery = ctx.query
    ctx.body = reqQuery
  })
  .post('/goods', async (ctx, next) => {

  })

module.exports = router
