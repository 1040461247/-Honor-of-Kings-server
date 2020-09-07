var express = require('express');
var router = express.Router();
var Ads = require('../../model/ads')

// 创建广告位
router.post('/create', (req, res) => {
  const formInfo = req.body
  Ads.create(formInfo).then(createRes => {
    res.send('创建成功')
  }).catch(err => {
    res.status(500).send(err)
  })
})
// 获取广告位列表
router.get('/list', (req, res) => {
  Ads.find().then(findRes => {
    res.send(findRes)
  }).catch(err => {
    console.log(err)
    res.status(500).send(err)
  })
})
// 编辑时请求原数据
router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  Ads.findOne({_id: id}).then(findRes => {
    res.send(findRes)
  }).catch(err => {
    res.status(500).send(err)
  })
})
// 编辑广告位
router.put('/edit/:id', (req, res) => {
  const id = req.params.id
  const formInfo = req.body
  Ads.update({_id: id}, formInfo).then(upRes => {
    res.send('编辑成功')
  }).catch(err => {
    res.status(500).send(err)
  })
})
// 删除广告位
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  Ads.remove({_id: id}).then(reRes => {
    res.send('删除成功')
  }).catch(err => {
    res.status(500).send(err)
  })
})

module.exports = router;
