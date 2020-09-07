var express = require('express');
var router = express.Router();
var Categories = require('../../model/categories')
var stringRandom = require('string-random')

// 添加文章
router.post('/create', async (req, res) => {
  let formInfo = req.body
  formInfo._id = stringRandom(22)
  let findRes = await Categories.findOne({'children._id': formInfo.parent})
  let pushRes = findRes.children.filter(item => {
    return item._id == formInfo.parent
  })
  pushRes[0].children.push(formInfo)
  pushRes = pushRes[0]
  let childrenArr = await Categories.findOne({_id: pushRes.parent})
  childrenArr = childrenArr.children
  childrenArr = childrenArr.filter(item => {
    return item._id !== pushRes._id
  })
  childrenArr.push(pushRes)
  Categories.updateOne({'children._id': formInfo.parent}, {children: childrenArr}).then(() => {
    res.send('保存成功！')
  }).catch(err => {
    res.status(500)
    res.send(err)
  })
  
})
// 获取文章列表
router.get('/list', async (req, res) => {
  let dbRes = await Categories.findOne({name: '新闻资讯'},  'children')
  dbRes = dbRes.children
  let articles = []
  dbRes.forEach(item => {
    articles = [
      ...articles,
      ...item.children
    ]
  })
  res.send(articles)
})
// 保存文章编辑
router.post('/edit/:id', async (req, res) => {
  const id = req.params.id
  const formInfo = req.body
  let dbRes = await Categories.findOne({ 'children._id': formInfo.parent })
  dbRes = dbRes.children
  let newsChildren = dbRes
  dbRes = dbRes.filter(item => {
    return item._id == formInfo.parent
  })
  let cateInfo = dbRes[0]
  cateInfo.children = cateInfo.children.map(item => {
    if(item._id == id) {
      return item = formInfo
    } else {
      return item
    }
  })
  // 重置英雄分类
  newsChildren = newsChildren.filter(item => {
    return item._id !== cateInfo._id
  })
  newsChildren.push(cateInfo)
  Categories.updateOne({'children._id': formInfo.parent}, {children: newsChildren}).then(upRes => {
    res.send('编辑成功')
  }).catch(err => {
    res.status(500)
    console.log(err)
  })
})
// 删除文章
router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  let dbRes = await Categories.findOne({ 'children.children._id': id })
  dbRes.children.forEach((item1, index1) => {
    item1.children.forEach((item2, index2) => {
      if(item2._id == id) {
        item1.children.splice(index2, 1)
      }
    })
  })
  console.log(dbRes.children)
  Categories.updateOne({_id: dbRes._id}, {children: dbRes.children}).then(() => {
    res.send('删除成功')
  }).catch(err => {
    console.log(err)
    res.status(500)
  })
  console.log(dbRes)
  let res11 = await Categories.findOne({_id: dbRes._id})
  console.log(res11)
})

module.exports = router;
