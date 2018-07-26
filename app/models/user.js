'use strict'

const Boom = require('boom')
const Hash = util('hashinator')
const Crypto = require('crypto')
const Mongoose = require('mongoose')
const Validator = require('validator')
const Schema = Mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      validate: {
        isAsync: true,
        validator: Validator.isEmail,
        message: 'Invalid email address'
      }
    },
    password: String,
    name: String,
    passwordResetToken: {
      type: String,
      trim: true,
      unique: true,
      sparse: true // this makes sure the unique index applies to not null values only (= unique if not null)
    },
    passwordResetDeadline: Date,
    scope: { type: [String], default: ['user'] }
  },
  {
    toJSON: {
      virtuals: true,
      transform: function(doc, ret, options) {
        delete ret._id
        delete ret.password

        return ret
      },
      versionKey: false // remove the __v property from JSON response
    },
    toObject: { virtuals: true }
  }
)

/**
 * Statics
 *
 * use the “User” model in your app and static methods to find documents
 * like: const user = await User.findByEmail('marcus@futurestud.io')
 */
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email })
}

/**
 * Instance Methods
 */
userSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await Hash.check(candidatePassword, this.password)

  if (isMatch) {
    return this
  }

  const message = 'The entered password is incorrect'
  throw new Boom(message, {
    statusCode: 400,
    data: { password: { message } }
  })
}

userSchema.methods.hashPassword = async function() {
  const hash = await Hash.make(this.password)

  this.password = hash
  return this
}

userSchema.methods.generateAuthToken = async function() {
  this.authToken = Crypto.randomBytes(20).toString('hex')
  return this
}

userSchema.methods.resetPassword = async function() {
  try {
    const passwordResetToken = Crypto.randomBytes(20).toString('hex')
    const hash = await Hash.make(passwordResetToken)

    this.passwordResetToken = hash
    this.passwordResetDeadline = Date.now() + 1000 * 60 * 60 // 1 hour from now

    await this.save()

    return passwordResetToken
  } catch (ignoreError) {
    const message = 'An error occurred while hashing your password reset token.'

    throw new Boom(message, {
      statusCode: 400,
      data: { password: { message } }
    })
  }
}

userSchema.methods.comparePasswordResetToken = async function(resetToken) {
  const isMatch = await Hash.check(resetToken, this.passwordResetToken)

  if (isMatch) {
    return this
  }

  const message = 'Your password reset token is invalid, please request a new one.'

  throw new Boom(message, {
    statusCode: 400,
    data: { password: { message } }
  })
}

/**
 * Virtuals
 */
userSchema.virtual('gravatar').get(function() {
  const hash = Hash.md5(this.email)

  return `https://gravatar.com/avatar/${hash}?s=200`
})

module.exports = Mongoose.model('User', userSchema)
