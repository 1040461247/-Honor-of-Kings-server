const Schema = require('./index')
const mongoose = require('mongoose')
const crypto = require('crypto')

const AdminUserSchema = new Schema({
  username: String,
  password: {
    type: String,
    set(oldValue) {
      const obj = crypto.createHash('md5')
      const text = obj.update(oldValue).digest('hex')
      return text
    }
  },
  level: Number
})

const cateModel = mongoose.model('adminUser', AdminUserSchema)

module.exports = cateModel 
