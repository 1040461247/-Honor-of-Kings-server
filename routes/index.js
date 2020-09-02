var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('请跳转至接口界面：http://127.0.0.1:3000/admin/api')
});

module.exports = router;
