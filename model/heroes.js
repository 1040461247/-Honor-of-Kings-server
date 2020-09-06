const Schema = require('./index')
const mongoose = require('mongoose')

const heroesSchema = new Schema({
  name: String, 
  icon: String,
  // 称号
  title: String,
  // 英雄类型
  categories: Array,
  // 难度、技能、攻击、生存评分
  scores: {
    defficult: Number,
    skills: Number,
    attack: Number,
    survive: Number
  },
  // 英雄技能图标、名称、描述、小提示
  skills: [{
    icon: String,
    name: String,
    description: String,
    tips: String
  }],
  // 出装推荐，顺风出装
  items1: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'item'
  }],
  // 出装推荐，逆风出装
  items2: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'item'
  }],
  // 使用技巧
  usageTips: String,
  // 对抗技巧
  battleTips: String,
  // 团战思路
  teamTips: String,
  // 英雄关系
  partners: [{
    hero: {type: mongoose.SchemaTypes.ObjectId, ref: 'heroe'},
    description: String
  }]

})

const heroesModel = mongoose.model('heroe', heroesSchema)

module.exports = heroesModel
