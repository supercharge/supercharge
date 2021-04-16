'use strict'

import { App, Env } from '@supercharge/facades'

export default {
  /**
   * --------------------------------------------------------------------------
   * Default Database Driver
   * --------------------------------------------------------------------------
   *
   * Tba.
   *
   * Supported drivers: `sqlite`, `mysql`, `pgsql`, `sqlsrv`
   *
   */
  driver: Env.get('DB_DRIVER', 'mysql'),

  /**
   * --------------------------------------------------------------------------
   * Database Connections
   * --------------------------------------------------------------------------
   *
   * Tba.
   *
   */
  connections: {
    sqlite: {
      url: Env.get('DATABASE_URL'),
      database_file: Env.get('DB_DATABASE_FILE', App.databasePath('database.sqlite')),
      prefix: '',
      foreign_key_constraints: Env.get('DB_FOREIGN_KEYS', true),
    },


    mysql: {
      driver: 'mysql',
      url: Env.get('DATABASE_URL'),
      host: Env.get('DB_HOST', '127.0.0.1'),
      port: Env.get('DB_PORT', '3306'),
      database: Env.get('DB_DATABASE', 'supercharge'),
      username: Env.get('DB_USERNAME', 'supercharge'),
      password: Env.get('DB_PASSWORD', ''),
      socketPath: Env.get('DB_SOCKET_PATH'),
      charset: 'utf8mb4',
      collation: 'utf8mb4_unicode_ci',
    },
  },

  /**
   * --------------------------------------------------------------------------
   * Database Migrations Table
   * --------------------------------------------------------------------------
   *
   * Tba.
   */
   migrations: {
    table: Env.get('DB_MIGRATIONS_TABLE', 'migrations'),
  },
}
