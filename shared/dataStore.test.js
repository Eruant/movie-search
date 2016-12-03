const tap = require('tap')
const dataStore = require('./dataStore')

tap.test('dataStore', test => {
  test.equal(typeof dataStore, 'object', 'dataStore should be an object')

  test.end()
})
