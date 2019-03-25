/**
 * 后端入口文件
 */
const path = require('path')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const koaLogger = require('koa-logger')
const session = require('koa-session2')
const mongoose = require('mongoose')

const config = require('../config')
const routers = require('./routers/index')
const Store = require('./models/store')
const responseFormatter = require('./utils/response-formatter')

const app = new Koa()

// 配置控制台日志中间件
app.use(koaLogger())

// 配置ctx.body的中间件
app.use(bodyParser())

// 配置静态资源目录
app.use(koaStatic(
  path.join(__dirname, '../static')
))

// 配置session
app.use(session({
  key: 'SESSIONID',
  store: new Store()
}))

// 初始化路由中间件
app.use(responseFormatter)
app.use(routers.routes()).use(routers.allowedMethods())

// 连接mongodb数据库
mongoose.connect(config.mongoUrl, { 
  useNewUrlParser: true,
  auto_reconnect: true,
  poolSize: 10
})
mongoose.connection
  .on('connected', function () {
    console.log('mongodb connected success')
  }).on('error', function () {
    console.log('mongodb connected fail')
  }).on('disconnected', function () {
    console.log('mongodb connected disconnected')
  })

// 监听启动端口
app.listen(config.port)
console.log(`the server is running at localhost:${config.port}`)
