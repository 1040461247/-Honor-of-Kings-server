var express = require('express');
var router = express.Router();

var menuRouter = require('./menu')
var uploadRouter = require('./upload')
var categoriesRouter = require('./categories')
var itemsRouter = require('./items')
var heroesRouter = require('./heroes')
var articlesRouter = require('./articles')
var adsRouter = require('./ads')

router.use('/menu', menuRouter)
router.use('/categories', categoriesRouter)
router.use('/items', itemsRouter)
router.use('/upload', uploadRouter)
router.use('/heroes', heroesRouter)
router.use('/articles', articlesRouter)
router.use('/ads', adsRouter)

module.exports = router;
