let express = require('express');
let router = express.Router();
var Categories = require('../../../model/categories')

// 获取新闻文章
router.get('/:id', async (req, res) => {
  let docs = await Categories.find()
  // 过滤
  docs = docs.filter(item => {
    return item.name === '新闻资讯' || item._id == '5f55adef9d42d10c34e0cab1'
  })[0].children
  docs.forEach(docsItem => {
    docsItem.children.forEach(childItem => {
      req.params.id === childItem._id && res.send(childItem)
    })
  })
})
// 获取相同种类的两条文章
router.get('/resemble/:id', async (req, res) => {
  const id = req.params.id
  let docs = await Categories.find()
  docs = docs.filter(item => {
    return item.name === '新闻资讯' || item._id == '5f55adef9d42d10c34e0cab1'
  })[0].children
  let category = {}
  docs.forEach(docsItem => {
    docsItem.children.forEach(childItem => {
      if (req.params.id === childItem._id) category = docsItem
    })
  })
  category = category.children.filter(item => {
    return item._id !== id
  })
  category = [
    category[0],
    category[1]
  ]
  res.send(category)
})

module.exports = router;
