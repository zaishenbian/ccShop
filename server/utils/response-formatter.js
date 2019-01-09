/**
 * 统一接口返回格式，在app.use(router)之前调用
 */
const API_SUCCESS_CODE = 'success'
const API_FAILED_CODE = '服务端错误，请稍后重试'
const API_AUTH_FAILED_CODE = '无操作权限'

const responseFomatter = async (ctx, next) => {
  // 先去执行路由
  await next()

  // 根据返回值统一返回数据格式
  if (ctx.body) {
    const body = ctx.body
    if (body.code === 0) {
      ctx.response.status = 200
      ctx.response.body = Object.assign({
        code: 0,
        message: API_SUCCESS_CODE
      }, body)
    } else if (body.code === 1) {
      ctx.response.status = 401
      ctx.response.body = Object.assign({
        code: 1,
        message: API_AUTH_FAILED_CODE
      }, body)
    } else if (body.code === 2) {
      ctx.response.status = 500
      ctx.response.body = Object.assign({
        code: 2,
        message: API_FAILED_CODE
      }, body)
    }
  } else {
    ctx.response.status = 500
    ctx.response.body = {
      code: 2,
      message: API_FAILED_CODE
    }
  }
}

module.exports = responseFomatter
