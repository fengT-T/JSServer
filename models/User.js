const mongoose = require('mongoose')
const cryptoTools = require('../bin/crypto')
let Schema = mongoose.Schema

let userSchema = new Schema({
  name: {
    // name是唯一的,但是通过id来标识用户
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
    index: true,
    unique: true
  },
  password: {
    // 密码使用hash摘要
    type: String,
    required: true
  },
  address: {
    type: String
  },
  headImgUrl: {
    type: String,
    default: 'http://mixun.magicallu.cn/images/%E5%9F%BA%E6%9C%AC%E8%B5%84%E6%96%99/u354.png'
  },
  desc: {
    type: String,
    default: '这个网站你问我恣辞不恣辞，我当然是恣辞的'
  },
  telephoneNum: {
    type: String
  },
  money: {
    type: Number,
    default: 0
  },
  order: [{
    // 对用户订单的引用
    type: Schema.Types.ObjectId,
    ref: 'order'
  }],
  isAdmin: {
    type: Boolean,
    default: false
  }
})

/**
 * 返回值为数组
 * @param {any} name
 * @param {string} [selectField='name']
 * @returns {Array} users
 */
userSchema.statics.findUsersByName = async function (name) {
  let users = await this.find({
    'name': name
  }).exec()
  return users
}

userSchema.statics.passwordCrypto = (password) => {
  return cryptoTools.passwordCrypto(password)
}

userSchema.statics.passwordCheck = (password) => {
  return typeof password === 'string' && password.length >= 6
}

let User = mongoose.model('users', userSchema)

module.exports = User
