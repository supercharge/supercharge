'use strict'

const User = model('user')
const Test = require('ava')
const Config = util('config')
const Uuid = require('uuid/v4')
const WelcomeMail = mail('welcome')

Test.beforeEach(async ({ context }) => {
  context.user = new User({ email: `user-${Uuid()}@mail.com` })
})

Test('email contains the name of the registered user', async t => {
  const mail = new WelcomeMail(t.context.user)
  const { to, html } = await mail.buildMessage()

  t.true(to.includes(t.context.user.email))
  t.true(html.includes(t.context.user.email))
})

Test('email has the correct subject', async t => {
  const mail = new WelcomeMail(t.context.user)
  const { subject } = await mail.buildMessage()

  t.is(subject, `Welcome to ${Config.get('app.name')}!`)
})
