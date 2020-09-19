let express = require('express');
let router = express.Router();
var Categories = require('../../../model/categories')
var Heroes = require('../../../model/heroes')

// 获取英雄列表(包含分类)
router.get('/', async (req, res) => {
  let heroesList = await Heroes.find().populate('items1 items2 partners.hero')
  let cateList = await Categories.find()
  cateList = cateList.filter(item => {
    return item.name === '英雄列表' || item._id == '5f6411affa18376048679636'
  })[0].children
  cateList.forEach(cateItem => {
    heroesList.forEach(heroItem => {
      heroItem.categories.forEach((parentItem, index) => {
        if(cateItem._id === parentItem) {
          heroItem.categories[index] = cateItem.name
          cateItem.children.push(heroItem)
        }
      })
    })
  })
  res.send(cateList)
})

module.exports = router;
