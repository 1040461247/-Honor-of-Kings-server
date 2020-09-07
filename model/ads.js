const Schema = require('./index')
const mongoose = require('mongoose')

const AdsSchema = new Schema({
  name: String,
  items: [{
    image: String,
    url: String
  }]
})

const cateModel = mongoose.model('ad', AdsSchema)

module.exports = cateModel 
