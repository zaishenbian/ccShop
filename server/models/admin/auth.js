const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
  //权限名称
  name: String,
  //权限的Url
  authUrl: String,
  //权限的父级
  authParent: {
    type: Schema.Types.ObjectId,
    ref: 'Auth'
  },
  //权限的级别
  authLevel: Number
})

const Auth = mongoose.model('Auth', AuthSchema);

module.exports = Auth;