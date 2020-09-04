var express = require('express');
var router = express.Router();
var Items = require('../../model/items')
var fs = require('fs')
var path = require('path')

// 添加物品
router.post('/create', async (req, res) => {
  let formInfo = req.body
  let dbRes = await Items.create(formInfo)
  dbRes && res.send('添加成功')
})
// 获取物品列表
router.get('/list', async (req, res) => {
  let docs = await Items.find()
  res.send(docs)
})
// 获取物品原数据
router.get('/edit/:id', async (req, res) => {
  let id = req.params.id
  let dbRes = await Items.findOne({_id: id})
  dbRes && res.send(dbRes)
})
// 保存编辑信息
router.put('/edit/:id', async (req, res) => {
  let id = req.params.id
  let formInfo = req.body
  let dbRes = await Items.update({_id: id}, formInfo)
  dbRes && res.send('编辑成功')
})
// 删除物品
router.delete('/delete/:id', async (req, res) => {
  let id = req.params.id
  let imgUrl = await Items.findOne({_id: id}, 'icon')
  let imgName = path.parse(imgUrl.icon).name
  fs.unlink(path.join(__dirname, `../../uploadImg/${imgName}`), err => {
    if(err) {
      console.log(err)
      res.status(500)
      res.send(err)
    } else {
      Items.remove({_id: id}).then(dbRes => {
        res.send(dbRes)
      }).catch(err => {
        res.send(err)
      })
    }
  })
})


module.exports = router;