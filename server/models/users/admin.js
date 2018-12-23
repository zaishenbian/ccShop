const mongoose = require('mongoose');
const datetime = require('../utils/datetime');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  userName: {
    type: String,
    unique: true
  },
  password: String,
  //头像图片地址
  avator: String,
  //昵称
  nickName: String,
  //手机号
  telePhone: Number,
  //注册时间
  createTime: {
    type: Date,
    default: datetime.localDate()
  },
  email: String,
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }
})

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
