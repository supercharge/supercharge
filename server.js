'use strict'

const Hapi = require('hapi')
const Path = require('path')
const Laabr = require('laabr')
const Dotenv = require('dotenv')
const Inert = require('inert')
const Vision = require('vision')
const Handlebars = require('handlebars')
const HandlebarsRepeatHelper = require('handlebars-helper-repeat')
const Caches = require(Path.resolve(__dirname, 'cache'))

// extend handlebars instance
Handlebars.registerHelper('repeat', HandlebarsRepeatHelper)

// import environment variables from local secrets.env file
Dotenv.config()

// configure logger
Laabr.format('log', ':time :level :message')

// create new web instance
// add web’s connection information
const web = new Hapi.Server({
  host: 'localhost',
  port: process.env.PORT_WEB || 3000
})

// register plugins, configure views and start the web instance
async function startWeb() {
  // register plugins to web instance
  await web.register([
    Inert,
    Vision,
    {
      plugin: require('crumb'),
      options: {
        key: 'keepMeSafeFromCsrf',
        cookieOptions: {
          isSecure: process.env.NODE_ENV === 'production'
        }
      }
    },
    {
      plugin: require('hapi-dev-errors'),
      options: {
        showErrors: process.env.NODE_ENV !== 'production',
        useYouch: true
      }
    },
    {
      plugin: Laabr.plugin,
      options: {
        colored: true,
        hapiPino: {
          logPayload: false
        }
      }
    },
    {
      plugin: require('hapi-request-user')
    },
    {
      plugin: require('./web/authentication')
    },
    {
      plugin: require('./web/base')
    },
    {
      plugin: require('./web/add-user-to-views')
    },
    {
      plugin: require('./web/user-signup-login')
    },
    {
      plugin: require('./web/user-profile')
    }
  ])

  // view configuration
  const viewsPath = Path.resolve(__dirname, 'resources', 'views')

  web.views({
    engines: {
      hbs: Handlebars
    },
    path: viewsPath,
    layoutPath: Path.resolve(viewsPath, 'layouts'),
    layout: 'default',
    helpersPath: Path.resolve(viewsPath, 'helpers'),
    partialsPath: Path.resolve(viewsPath, 'partials'),
    isCached: process.env.NODE_ENV === 'production',
    context: {
      title: 'Future Studio Boost'
    }
  })

  await web.start()
}

const api = new Hapi.Server({
  host: 'localhost',
  port: process.env.PORT_API || 3001,
  routes: {
    validate: {
      failAction(request, h, error) {
        // hapi v17 generates a default error response hiding all validation error details
        // this will always throw the validation error
        // the thrown validation error will be transformed within the `error-interceptor` plugin
        throw error
      }
    }
  }
})

// register plugins and start the API web instance
async function startAPI() {
  // register plugins to API instance
  await api.register([
    {
      plugin: require('hapi-dev-errors'),
      options: {
        showErrors: process.env.NODE_ENV !== 'production',
        useYouch: true
      }
    },
    {
      plugin: Laabr.plugin,
      options: {
        colored: true,
        hapiPino: {
          logPayload: false
        }
      }
    },
    {
      plugin: require('hapi-request-user')
    },
    {
      plugin: require('./api/authentication')
    },
    {
      plugin: require('./api/error-interceptors')
    },
    {
      plugin: require('./api/users')
    }
  ])

  await api.start()
}

async function start() {
  try {
    // connect the cache clients
    await Caches.start()

    // start hapi instances
    await Promise.all([startWeb(), startAPI()])
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()

process.on('unhandledRejection', error => {
  console.log(error)
  process.exit(1)
})
