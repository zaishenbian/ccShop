const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  //评论内容
  content: String,
  //评论图片
  commentImages: [{
    type: String
  }],
  //评论用户
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  //评论商品
  goods: {
    type: Schema.Types.ObjectId,
    ref: 'Goods'
  },
  //入口订单
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }
})

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;