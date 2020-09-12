var express = require('express');
var router = express.Router();
const crypto = require('crypto')
const AdminUser = require('../../model/adminUser')
const jwt = require('jsonwebtoken')

router.post('/', (req, res) => {
  const { username, password } = req.body
  // 寻找用户
  AdminUser.findOne({ username }).then(findRes => {
    if(findRes) {
      const obj = crypto.createHash('md5')
      const text = obj.update(password).digest('hex')
      const cryptograph = findRes.password
      if(text === cryptograph) {
        // 账号密码通过，返回token
        const token = jwt.sign({id: findRes._id}, global.secret)
        res.send(token)
      } else {
        res.status(422).send('密码错误')
      }
    } else {
      res.status(422).send('用户名错误')
    }
  }).catch(err => {
    res.status(500).send('服务端错误，请稍后重试')
    console.log(err)
  })
})

module.exports = router;
