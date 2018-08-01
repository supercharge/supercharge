'use strict'

/**
 * Push content to the end of a stack in your
 * layouts. Check out the `stack` helper for
 * more details.
 *
 * @param {String} name
 * @param {Object} context
 */
function append(name, context) {
  if (!context) {
    throw new Error('Provide a name when using the "append" handlebars helper.')
  }

  const stacks = context.data.root.stacks || {}
  const stack = stacks[name] || []

  stack.push({
    mode: 'append',
    data: context.fn(this)
  })

  stacks[name] = stack
  context.data.root.stacks = stacks
}

module.exports = append
