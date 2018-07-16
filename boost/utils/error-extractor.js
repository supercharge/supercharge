'use strict'

const errorExtractor = error => {
  let errors = {}

  error.details.forEach(err => {
    const errorKey = err.context.key
    errors[errorKey] = {
      message: err.message.replace(/"/g, '')
    }
  })

  return errors
}

module.exports = errorExtractor
