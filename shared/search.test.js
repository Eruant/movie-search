const tap = require('tap')
const dataStore = require('./dataStore')
const search = require('./search')

tap.test('search', test => {
  try {
    search()
    test.fail('Search requires a value to be supplied')
  } catch (error) {
    test.equal(error.message, '[search] The property "value" is required')
  }

  test.end()
})

tap.test('search: dataStore updates', test => {
  dataStore.subscribe(() => {
    test.pass('searching should trigger an action to be dispatched')
    test.end()
  })

  search('fantastic')
})

// TODO test that all actions are dispatched
