const mongoose = require('mongoose')
let Schema = mongoose.Schema

let orderSchema = new Schema({
  goods: {
    type: Schema.Types.ObjectId,
    ref: 'goods'
  },
  num: {
    // 件数
    type: Number,
    required: true
  },
  address: {
    // 收货地址
    type: String,
    required: true
  },
  status: {
    // 代表订单的状态
    type: Number,
    default: 0
  },
  cost: {
    // 总价值
    type: Number,
    required: true
  },
  express: {
    // 快递
    type: String,
    default: ''
  },
  expressId: {
    // 快递号
    type: String,
    default: ''
  }
})
// orderSchema.statics.
let Order = mongoose.model('orders', orderSchema)

module.exports = Order
