'use strict'

const Env = util('env')

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
  },

  /**
   * --------------------------------------------------------------------------
   * Mongoose Configurations
   * --------------------------------------------------------------------------
   *
   * Mongoose is a MongoDB ODM for object modeling. You create
   * a schema-based model to interact with data in MongoDB.
   * Customize Mongoose with the options below.
   *
   */
  mongoose: {
    set: {
      useCreateIndex: true
    },
    Promise: global.Promise
  }
}
