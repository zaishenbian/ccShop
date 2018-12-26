/**
 * 商品模块路由
 */
const router = require('koa-router')();

router
  .get('/getGoods', async (ctx, next) => {
    ctx.body = 'hello world';
  })
  .post('/addGoods', async (ctx, next) => {

  })

module.exports = router;