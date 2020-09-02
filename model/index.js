const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/honer_admin', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open', () => {
  console.log('数据库已连接')
})

module.exports = mongoose.Schema 
