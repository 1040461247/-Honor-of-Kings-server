var express = require('express');
var router = express.Router();

var menu = require('./menu')

router.use('/menu', menu)

module.exports = router;
