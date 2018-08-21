'use strict'

const Env = util('env')

module.exports = {
  /**
   * --------------------------------------------------------------------------
   * Default Database Connection
   * --------------------------------------------------------------------------
   *
   * tba.
   *
   */
  default: Env.get('DB_CONNECTION', 'mongodb'),

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
  mongodb: {
    host: Env.get('MONGODB_HOST', 'localhost'),
    port: Env.get('MONGODB_PORT', 27017),
    database: Env.get('MONGODB_DATABASE', 'boost'),
    options: {
      // auth: {
      //   user: Env.get('MONGODB_USERNAME'),
      //   password: Env.get('MONGODB_PASSWORD')
      // },
      useNewUrlParser: true
    }
  }
}
