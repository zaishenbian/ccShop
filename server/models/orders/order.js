const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  //订单号
  orderId: String,
  //商品SKU(不能存储SKU对应的Id,因为SKU改变之后订单中的商品信息不能变)
  goodsSKU: Object,
  //商品数量
  amount: Number,
  //实付金额
  payMoney: Number,
  //付款方式(0: 微信, 1: 支付宝)
  payWay: Number,
  //收货地址(不能存储地址对应的Id,因为地址改变之后订单中的地址不能变)
  address: Object,
  //订单状态(0: 未付款, 1: 待发货, 2: 待收货, 3: 已完成, 4: 已关闭, 5: 回收站)
  state: Number,
  //下单时间
  oderTime: Date,
  //支付时间
  payTime: Date,
  //发货方式
  deliverWay: String,
  //快递单号
  orderNumber: Number,
  //买家
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  //买家备注
  userRemark: String
})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;