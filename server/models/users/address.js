const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  //收货地址
  address: String,
  //所属用户
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  //收货人电话
  receiverPhone: Number,
  //是否为默认收货地址
  status: Boolean,
  //收货人姓名
  receiverName: String
})

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;