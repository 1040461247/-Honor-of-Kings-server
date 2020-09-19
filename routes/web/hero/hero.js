let express = require('express');
let router = express.Router();
let axios = require('axios')

// 获取单个英雄数据
router.get('/:id', async (req, res) => {
  const id = req.params.id
  let httpRes = await axios.get('http://localhost:3000/web/api/home/heroes')
  let heroesList = httpRes.data
  let targetItem = null
  heroesList.forEach(cateItem => {
    cateItem.children.forEach(heroItem => {
      if(heroItem._id == id) {
        targetItem = heroItem
        return
      }
    })
  })
  res.send(targetItem)
})

module.exports = router;
