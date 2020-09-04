const Schema = require('./index')
const mongoose = require('mongoose')

const cateSchema = new Schema({
  name: String, 
  children: Array,
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'categories' }
})

const cateModel = mongoose.model('category', cateSchema)

module.exports = cateModel 
