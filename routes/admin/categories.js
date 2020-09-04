var express = require('express');
var router = express.Router();
var Categories = require('../../model/categories')
var stringRandom = require('string-random')

// 提交新建表单
router.post('/create', async (req, res) => {
  const formInfo = req.body
  if(formInfo.parent) {
    // 子分类的保存
    formInfo._id = stringRandom(22)
    console.log(formInfo)
    const model = await Categories.updateOne({_id: formInfo.parent}, {$push: {children: formInfo}})
    model && res.send('添加成功')
  } else {
    // 父分类的保存
    const model = await Categories.create(formInfo)
    model && res.send('添加成功')
  }
})
// 获取分类数据
router.get('/list', async (req, res) => {
  const docs = await Categories.find()
  res.send(docs)
})
// 获取父分类原信息
router.get('/edit/:id', async (req, res) => {
  const id = req.params.id
  const doc = await Categories.findOne({_id: id})
  res.send(doc)
})
// 获取子分类原信息
router.get('/edit/:id/:parent', async (req, res) => {
  const id = req.params.id
  const parent = req.params.parent
  let doc = await Categories.findOne({_id: parent, children: {$elemMatch: {_id: id}}}, {children: 1, _id: 0})
  doc = doc.children.filter(item => {
    return item._id == id
  })
  res.send(doc[0])
})
// 编辑父文档
router.put('/edit/:id', async (req, res) => {
  const formInfo = req.body
  const id = req.params.id
  const doc = await Categories.update({_id: id}, formInfo)
  res.send('编辑成功')
})
// 编辑子文档
router.put('/edit/:id/:parent', async (req, res) => {
  let formInfo = req.body
  let id = req.params.id
  let parent = req.params.parent
  let doc = await Categories.findOne({_id: parent})
  let child = doc.children.filter(item => {
    return item._id !== id
  })
  child.push(formInfo)
  doc = await Categories.update({_id: parent}, {children: child})
  doc && res.send('编辑成功')
})
// 删除一条父文档
router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  const doc = await Categories.remove({_id: id})
  doc && res.send('删除成功')
})
// 删除一条子文档
router.delete('/delete/:id/:parent', async (req, res) => {
  const id = req.params.id
  const parent = req.params.parent
  const doc = await Categories.update({_id: parent}, {$pull:{ children: {_id: id}}})
  doc && res.send('删除成功')
})

module.exports = router;
