'use strict'

const Joi = require('joi')
const Boom = require('boom')
const Path = require('path')
const JWT = require('jsonwebtoken')
const User = require(Path.resolve(__dirname, '..', '..', 'models')).User

const Handler = {
  login: {
    auth: 'basic',
    handler: (request, h) => {
      const user = request.user

      const token = JWT.sign({ user }, process.env.JWT_SECRET_KEY, {
        algorithm: 'HS256',
        expiresIn: '14d'
      })

      return { authToken: token }
    }
  },

  me: {
    auth: 'jwt',
    handler: (request, h) => {
      return request.user
    }
  },

  show: {
    auth: 'jwt',
    handler: async (request, h) => {
      const username = request.params.username
      const user = await User.findOne({ username })

      if (!user) {
        throw Boom.notFound(`No user available with username »${username}«`)
      }

      return user
    },
    validate: {
      params: {
        username: Joi.string()
          .label('Username')
          .trim()
          .optional()
      }
    }
  }
}

module.exports = Handler
