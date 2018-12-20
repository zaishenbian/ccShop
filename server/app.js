/**
 * 后端入口文件
 */
const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const koaLogger = require('koa-logger');

const config = require('../config');
const routers = require('./routers/index');

const app = new Koa();

//配置控制台日志中间件
app.use(koaLogger());

//配置ctx.body的中间件
app.use(bodyParser());

//配置静态资源目录
app.use(koaStatic(
  path.join(__dirname, '../static')
));

//初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

//监听启动端口
app.listen(config.port);
console.log(`the server is running at localhost:${config.port}`);