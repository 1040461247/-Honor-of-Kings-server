let express = require('express');
let router = express.Router();
var Categories = require('../../../model/categories')

// 获取新闻数据
router.get('/', async (req, res) => {
  let docs = await Categories.find()
  // 过滤
  docs = docs.filter(item => {
    return item.name === '新闻资讯' || item._id == '5f55adef9d42d10c34e0cab1'
  })[0].children
  res.send(docs)
})

module.exports = router;
