var express = require('express');
var router = express.Router();

var menuRouter = require('./menu')
var uploadRouter = require('./upload')
var categoriesRouter = require('./categories')
var itemsRouter = require('./items')

router.use('/menu', menuRouter)
router.use('/categories', categoriesRouter)
router.use('/items', itemsRouter)
router.use('/upload', uploadRouter)

module.exports = router;
