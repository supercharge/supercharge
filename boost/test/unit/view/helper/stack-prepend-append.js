'use strict'

const BaseTest = util('base-test')

class StackHelperTest extends BaseTest {
  async createContentStack (t) {
    const name = this.randomId()

    const output = await this.render(`{{#append name}}appended{{/append}}{{#prepend name}}prepended{{/prepend}}{{#stack name}}content{{/stack}}`, { name })

    t.is(output, 'prepended\ncontent\nappended')
  }

  async throwsForStacksWithoutName (t) {
    await t.throwsAsync(this.render('{{#stack}}content{{/stack}}'))
  }

  async prependsToExistingStack (t) {
    const name = this.randomId()

    const output = await this.render('{{#prepend name}}prepended{{/prepend}}{{#stack name}}content{{/stack}}', { stacks: { name }, name })

    t.is(output, 'prepended\ncontent')
  }

  async prependsToNonExistingStack (t) {
    const name = this.randomId()

    const output = await this.render('{{#prepend name}}prepended{{/prepend}}{{#stack name}}content{{/stack}}', { name })

    t.is(output, 'prepended\ncontent')
  }

  async throwsWhenPrependingWithoutName (t) {
    await t.throwsAsync(this.render('{{#prepend}}content{{/prepend}}'))
  }

  async throwsWhenAppendingWithoutName (t) {
    await t.throwsAsync(this.render('{{#append}}content{{/append}}'))
  }
}

module.exports = new StackHelperTest()
