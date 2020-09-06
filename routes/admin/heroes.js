var express = require('express');
var router = express.Router();
var Heroes = require('../../model/heroes')
var fs = require('fs')
var path = require('path');
const { RSA_NO_PADDING } = require('constants');

// 添加物品
router.post('/create', async (req, res) => {
  let formInfo = req.body
  let dbRes = await Heroes.create(formInfo)
  dbRes && res.send('添加成功')
})
// 获取物品列表
router.get('/list', async (req, res) => {
  let docs = await Heroes.find()
  res.send(docs)
})
// 获取物品原数据
router.get('/edit/:id', async (req, res) => {
  let id = req.params.id
  let dbRes = await Heroes.findOne({_id: id})
  dbRes && res.send(dbRes)
})
// 保存编辑信息
router.put('/edit/:id', async (req, res) => {
  let id = req.params.id
  let formInfo = req.body
  Heroes.update({_id: id}, formInfo).then(dbRes => {
    res.send('保存成功')
  }).catch(err => {
    console.log(err)
    res.send(err)
  })
})
// 删除物品
router.delete('/delete/:id', async (req, res) => {
  let id = req.params.id
  let imgUrl = await Heroes.findOne({_id: id}, 'icon')
  if(imgUrl) {
    let imgName = path.parse(imgUrl.icon).name
    fs.unlink(path.join(__dirname, `../../uploadImg/${imgName}`), err => {
      err && console.log(err)
    })
  }
  Heroes.remove({_id: id}).then(dbRes => {
    res.send(dbRes)
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router;
