let express = require('express');
let router = express.Router();
let loginRouter = require('./login')
let assert = require('http-assert')
let AdminUser = require('../../model/adminUser')
let jwt = require('jsonwebtoken')

// 密钥
global.secret = 'Tianruoxi'

router.use('/login', loginRouter)

// 判断是否有token
router.use(async (req, res, next) => {
  try {
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录')
    const { id } = jwt.verify(token, global.secret)
    assert(id, 401, '请先登录')
    req.user = await AdminUser.findById(id)
    next()
  }catch(err) {
    res.status(err.status || 500).send(err.message)
    console.log(err)
  }
})

let menuRouter = require('./menu')
let uploadRouter = require('./upload')
let categoriesRouter = require('./categories')
let itemsRouter = require('./items')
let heroesRouter = require('./heroes')
let articlesRouter = require('./articles')
let adsRouter = require('./ads')
let adminUserRouter = require('./adminUser')


router.use('/menu', menuRouter)
router.use('/categories', categoriesRouter)
router.use('/items', itemsRouter)
router.use('/upload', uploadRouter)
router.use('/heroes', heroesRouter)
router.use('/articles', articlesRouter)
router.use('/ads', adsRouter)
router.use('/adminUser', adminUserRouter)

module.exports = router;
