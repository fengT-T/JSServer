const mongoose = require('mongoose')
let Schema = mongoose.Schema

let goodsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    reqiure: true
  },
  memory: {
    type: Number,
    reqiure: true
  },
  agent: {
    type: String,
    reqiure: true
  },
  pic: {
    type: String,
    reqiure: true
  },
  salesNum: {
    type: Number,
    default: 0
  },
  disable: {
    type: Boolean,
    default: false
  }
})

goodsSchema.statics.getFirstId = async function () {
  let id = (await this.findOne().sort({ _id: -1 }).exec())._id
  return id
}
let Goods = mongoose.model('goods', goodsSchema)

module.exports = Goods
