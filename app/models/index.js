'use strict'

const Config = util('config')
const User = require('./user')
const Mongoose = require('mongoose')

Mongoose.Promise = global.Promise

Mongoose.connection.on('error', err => {
  console.error(`⚡️ 🚨 ⚡️ 🚨 ⚡️ 🚨  → ${err.message}`)
})

Mongoose.connect(
  process.env.DATABASE,
  {
    useNewUrlParser: true,
    // Mongoose tries to create indexes on startup.
    // While nice for development, it’s recommended
    // to disable it in production since index
    // creation can cause a significant performance impact
    autoIndex: Config.get('app.env') !== 'production'
  }
)

module.exports = {
  User
}
