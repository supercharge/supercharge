'use strict'

const Env = util('env')

module.exports = {
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
    username: Env.get('MONGODB_USERNAME'),
    password: Env.get('MONGODB_PASSWORD'),
    options: {
      useNewUrlParser: true
    }
  }
}
