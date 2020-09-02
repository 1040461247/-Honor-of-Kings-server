const Schema = require('./index')
const mongoose = require('mongoose')

const menuSchema = new Schema({
  level1: String,
  children: Array
})

const menuModel = mongoose.model('menu', menuSchema)

module.exports = menuModel 
