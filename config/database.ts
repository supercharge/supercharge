'use strict'

import { App, Env } from '@supercharge/facades'
import { DatabaseConfig } from '@supercharge/contracts'

const databaseConfig: DatabaseConfig = {
  /**
   * --------------------------------------------------------------------------
   * Default Database Connection
   * --------------------------------------------------------------------------
   *
   * This configuration defines the database connection you’ll use as the
   * default for all database interactions.
   *
   * Supported connections: `sqlite`, `mysql`, `pg`, `mssql`
   *
   * Every connection supported by knex.js is supported as well. Notice, we
   * only provide presets for connection configurations for a subset of
   * the supported database engines because we don’t use the others.
   *
   */
  connection: Env.get('DB_CONNECTION', 'sqlite'),

  /**
   * --------------------------------------------------------------------------
   * Database Connections
   * --------------------------------------------------------------------------
   * This section lists database connections and their configurations. You can
   * extend and customize each connection to your needs. The default `sqlite`
   * connection uses a file-based database. Others require seperate engines.
   *
   * Please notice: only the `sqlite` connection works out of the box. For every
   * other connection, you must seperately install the given `client` of your
   * chosen connection yourself. For example, before using MySQL, you must
   * install the client yourself using `npm install mysql`.
   *
   */
  connections: {
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: Env.get('DB_DATABASE_FILE', App.databasePath('database.sqlite'))
      },
      useNullAsDefault: true,
    },

    mysql: {
      client: 'mysql',
      connection: {
        host: Env.get('DB_HOST', 'localhost'),
        port: Env.number('DB_PORT', 3306),
        database: Env.get('DB_DATABASE', 'supercharge'),
        user: Env.get('DB_USERNAME', 'supercharge'),
        password: Env.get('DB_PASSWORD', ''),
        charset: Env.get('DB_CHARSET', 'utf8mb4'),
        // collation: Env.get('DB_COLLATION', 'utf8mb4_unicode_ci'),
      },
    },

    pg: {
      client: 'pg',
      connection: {
        host: Env.get('DB_HOST', 'localhost'),
        port: Env.number('DB_PORT', 5432),
        database: Env.get('DB_DATABASE', 'supercharge'),
        user: Env.get('DB_USERNAME', 'supercharge'),
        password: Env.get('DB_PASSWORD', '')
      },
    },

    mssql: {
      client: 'mssql',
      connection: {
        server: Env.get('DB_HOST', 'localhost'),
        port: Env.number('DB_PORT', 1433),
        user: Env.get('DB_USERNAME', 'supercharge'),
        password: Env.get('MYSQL_PASSWORD', 'supercharge'),
        database: Env.get('DB_DATABASE', ''),
      },
    },
  }
}

export default databaseConfig
