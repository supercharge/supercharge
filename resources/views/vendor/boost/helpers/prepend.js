'use strict'

/**
 * Push content to the beginning of a stack
 * in your layouts. Check out the `stack`
 * helper for more details.
 *
 * @param {String} name
 * @param {Object} context
 */
function prepend(name, context) {
  if (!context) {
    throw new Error('Provide a name when using the "append" handlebars helper.')
  }

  const stacks = context.data.root.stacks || {}
  const stack = stacks[name] || []

  stack.unshift({
    mode: 'prepend',
    data: context.fn(this)
  })

  stacks[name] = stack
  context.data.root.stacks = stacks
}

module.exports = prepend
