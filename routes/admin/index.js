var express = require('express');
var router = express.Router();

var menu = require('./menu')
var categories = require('./categories')

router.use('/menu', menu)
router.use('/categories', categories)

module.exports = router;
