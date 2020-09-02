var express = require('express');
var router = express.Router();
var menu = require('../../model/menu')

router.get('/', async (req, res) => {
  const menuInfo = await menu.find({})
  res.send(menuInfo)
})

module.exports = router;
