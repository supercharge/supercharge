'use strict'

const Boom = require('boom')
const Hash = util('hashinator')
const Encryptor = util('encryptor')
const Mongoose = require('mongoose')
const Validator = require('validator')

const userSchema = new Mongoose.Schema(
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
      transform: function (_, ret) {
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
 * like `const user = await User.findByEmail('marcus@futurestud.io')`
 */
userSchema.statics.findByEmail = async function (email) {
  return this.findOne({ email })
}

userSchema.statics.findByEmailOrFail = async function (email) {
  return this
    .findOne({ email })
    .orFail(Boom.notFound(null, { email: 'Email address is not registered' }))
}

userSchema.statics.attemptLogin = async function ({ email, password }) {
  const user = await this.findByEmailOrFail(email)
  await user.comparePassword(password)

  return user
}

userSchema.statics.createFrom = async function ({ email, password }) {
  if (await this.findByEmail(email)) {
    // create an error object that matches the views error handling structure
    const message = 'Email address is already registered'
    throw Boom.conflict(message, { email: message })
  }

  const user = new this({ email, password })
  await user.hashPassword()

  return user.save()
}

/**
 * Instance Methods
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await Hash.check(candidatePassword, this.password)

  if (isMatch) {
    return this
  }

  const message = 'The entered password is incorrect'
  throw Boom.badRequest(message, { password: message })
}

userSchema.methods.hashPassword = async function () {
  const hash = await Hash.make(this.password)
  this.password = hash
  return this
}

userSchema.methods.resetPassword = async function () {
  const passwordResetToken = Encryptor.randomKey(20)
  const hash = await Hash.make(passwordResetToken)

  this.passwordResetToken = hash
  this.passwordResetDeadline = Date.now() + 1000 * 60 * 60 // 1 hour

  await this.save()

  return passwordResetToken
}

userSchema.methods.comparePasswordResetToken = async function (resetToken) {
  if (this.passwordResetDeadline < Date.now()) {
    throw Boom.badRequest('Your password reset token is invalid, please request a new one.')
  }

  const isMatch = await Hash.check(resetToken, this.passwordResetToken)

  if (isMatch) {
    return this
  }

  const message = 'Your password reset token is invalid, please request a new one.'
  throw Boom.badRequest(message, { resetToken: message })
}

/**
 * Virtuals
 */
userSchema.virtual('gravatar').get(function () {
  const hash = Hash.md5(this.email)
  return `https://gravatar.com/avatar/${hash}?s=200`
})

module.exports = Mongoose.model('User', userSchema)
