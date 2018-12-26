const mongoose = require('mongoose');
const datetime = require('../utils/datetime');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
  telePhone: {
    type: Number,
    unique: true
  },
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

const User = mongoose.model('User', UserSchema);

module.exports = User;