var express = require('express');
var router = express.Router();
var multer = require('multer')
var path = require('path')
var upload = multer({ dest: path.join(__dirname, '../../uploadImg') })

router.post('/', upload.single('file'), (req, res) => {
  res.send('http://localhost:3000/uploadImg/' + req.file.filename)
})

module.exports = router;