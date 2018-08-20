'use strict'

const Config = util('config')
const User = require('./user')
const Mongoose = require('mongoose')
const { username, password, host, port, database, options } = Config.get('database.mongodb')

Mongoose.Promise = global.Promise

Mongoose.connection.on('error', err => {
  console.error(`⚡️ 🚨 ⚡️ 🚨 ⚡️ 🚨  → ${err.message}`)
})

// NOT FINAL: this is just a quick fix
function getAuth() {
  if (!username) {
    return ''
  }

  if (!password) {
    return ''
  }

  return `${username}:${password}@`
}

Mongoose.connect(
  `mongodb://${getAuth()}${host}:${port}/${database}`,
  {
    ...options,
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
