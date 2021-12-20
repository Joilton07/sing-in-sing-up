require('dotenv').config({
  path: process.env.NODE_ENV === 'development' ? '.env' : '.env.test'
})
const mongoose = require('mongoose')

mongoose.connect(process.env.URL_MONGO)
mongoose.Promise = global.Promise

module.exports = mongoose
