var express = require('express');
var router = express.Router();

var menuRouter = require('./menu')
var uploadRouter = require('./upload')
var categoriesRouter = require('./categories')
var itemsRouter = require('./items')
var heroesRouter = require('./heroes')
var articlesRouter = require('./articles')

router.use('/menu', menuRouter)
router.use('/categories', categoriesRouter)
router.use('/items', itemsRouter)
router.use('/upload', uploadRouter)
router.use('/heroes', heroesRouter)
router.use('/articles', articlesRouter)

module.exports = router;
