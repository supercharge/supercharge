'use strict'

const Env = require('@supercharge/framework/env')

module.exports = {
  /**
   * --------------------------------------------------------------------------
   * Default Database Connection
   * --------------------------------------------------------------------------
   *
   * This option specifies which of the below defined database
   * connections you wish to use as your default connection.
   *
   */
  default: Env.get('DB_CONNECTION', 'mongoose'),

  /**
   * --------------------------------------------------------------------------
   * MongoDB Connection Details
   * --------------------------------------------------------------------------
   *
   * MongoDB is a document database. It provides a rich set
   * of data querying and indexing. MongoDB is easy to
   * scale with support for multi-node clusters.
   *
   */
  connections: {
    mongoose: {
      url: Env.get('MONGODB_URL'),
      host: Env.get('MONGODB_HOST', 'localhost'),
      port: Env.get('MONGODB_PORT', 27017),
      protocol: Env.get('MONGODB_PROTOCOL', 'mongodb'),
      database: Env.get('MONGODB_DATABASE', 'supercharge'),
      options: {
        // auth: {
        //   user: Env.get('MONGODB_USERNAME'),
        //   password: Env.get('MONGODB_PASSWORD')
        // },
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
    }
  }
}
