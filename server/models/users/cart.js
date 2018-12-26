const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  //所属用户
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  //购物车中商品的SKU
  goodsSKU: {
    type: Schema.Types.ObjectId,
    ref: 'GoodsSKU'
  },
  //商品数量
  amount: Number
})

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;