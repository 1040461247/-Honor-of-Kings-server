const Schema = require('./index')
const mongoose = require('mongoose')

const itemsSchema = new Schema({
  name: String, 
  icon: String
})

const itemsModel = mongoose.model('item', itemsSchema)

module.exports = itemsModel
