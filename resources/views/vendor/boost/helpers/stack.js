'use strict'

/**
 * Stacks are like portals and allow to inject
 * content into a section in a layout or view
 * from a different view (like a partial).
 *
 * @param {String} name
 * @param {Object} context
 */
function stack(name, context) {
  const stacks = context.data.root.stacks || {}
  const contentStack = stacks[name] || []

  const content = contentStack
    .reduce(
      (stack, { mode, data }) => {
        if (mode === 'replace') {
          stack = data
        } else if (mode === 'append') {
          stack.push(data)
        } else if (mode === 'prepend') {
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
