'use strict'

const Mongoose = require('mongoose')
const User = require('./user')

// tell Mongoose to use Node.js promises
Mongoose.Promise = global.Promise

// Connect to your database
Mongoose.connect(process.env.DATABASE, {
  // see http://mongoosejs.com/docs/guide.html#indexes
  // Mongoose tries to create indexes on startup
  // while nice for development, it is recommended this
  // behavior be disabled in production since index
  // creation can cause a significant performance impact
  // -> auto index only outside production
  autoIndex: process.env.NODE_ENV !== 'production'
})

// listen for connection errors and print the message
Mongoose.connection.on('error', err => {
  console.error(`⚡️ 🚨 ⚡️ 🚨 ⚡️ 🚨 ⚡️ 🚨 ⚡️ 🚨  → ${err.message}`)
})

// use ES6 shorthands: "propertyName: variableName" equals "propertyName"
module.exports = {
  User
}
