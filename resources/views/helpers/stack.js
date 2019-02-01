'use strict'

/**
 * Stacks are like portals and allow to inject
 * content into a section in a layout or view
 * from a different view (like a partial).
 *
 * @param {String} name
 * @param {Object} context
 *
 * @returns {String} the stack's content
 */
function stack (name, context) {
  if (!context) {
    throw new Error('Provide a name when using the "stack" handlebars helper.')
  }

  const stacks = context.data.root.stacks || {}
  const stackContent = stacks[name] || []

  const content = stackContent
    .reduce(
      (stack, { mode, data }) => {
        if (mode === 'append') {
          stack.push(data)
        }

        if (mode === 'prepend') {
          stack.unshift(data)
        }

        return stack
      },
      [context.fn(this)]
    )
    .join('\n')

  return content
}

module.exports = stack
