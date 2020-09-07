const Schema = require('./index')
const mongoose = require('mongoose')

const AdminUserSchema = new Schema({
  name: String,
  level: Number
})

const cateModel = mongoose.model('powerLevel', AdminUserSchema)

module.exports = cateModel 
