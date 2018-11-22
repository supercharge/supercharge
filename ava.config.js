export default {
  require: [ './test/test-setup.js' ],
  files: [
    'test/**/*.js',
    '!**/test-setup.js',
    '!boost/test/**/*.js'
  ] }
