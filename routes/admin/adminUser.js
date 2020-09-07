var express = require('express');
var router = express.Router();
var AdminUser = require('../../model/adminUser')
var PowerLevel = require('../../model/powerLevel')

// 新建管理员
router.post('/create', (req, res) => {
  const formInfo = req.body
  console.log(formInfo)
  AdminUser.create(formInfo).then(cRes => {
    res.send('创建成功')
  }).catch(err => {
    res.status(500).send(err)
  })
})
// 获取权限列表
router.get('/powerLevel', (req,res) => {
  PowerLevel.find().then(cRes => {
    res.send(cRes)
  }).catch(err => {
    res.status(500).send(err)
  })
})
// 获取管理员列表
router.get('/list', (req, res) => {
  AdminUser.find().then(fRes => {
    res.send(fRes)
  }).catch(err => {
    res.status(500).send(err)
  })
})
// 编辑获取原数据
router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  AdminUser.findOne({_id: id}).then(fRes => {
    res.send(fRes)
  }).catch(err => {
    res.status(500).send(err)
  })
})
// 保存编辑数据
router.put('/edit/:id', (req, res) => {
  const id = req.params.id
  const formInfo = req.body
  AdminUser.update({_id: id}, formInfo).then(upRes => {
    res.send(upRes)
  }).catch(err => {
    res.status(500).send(err)
  })
})
// 删除用户
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  AdminUser.remove({_id: id}).then(reRes => {
    res.send(reRes)
  }).catch(err => {
    res.status(500).send(err)
  })
})

module.exports = router;
