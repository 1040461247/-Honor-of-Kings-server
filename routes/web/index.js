let express = require('express');
let router = express.Router();

// router
let HomeNews = require('./home/news')
let HomeHeroes = require('./home/heroes')
let Articles = require('./article/article')
let Hero = require('./hero/hero')

router.use('/home/news', HomeNews)
router.use('/home/heroes', HomeHeroes)
router.use('/articles', Articles)
router.use('/hero', Hero)

module.exports = router;
