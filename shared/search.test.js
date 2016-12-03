const tap = require('tap')
// const {createBus} = require('./bus')
// const {reducers} = require('./reducers')
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

// TODO cannot do this until we have a store to test
/*
tap.test('search', test => {
  const bus = createBus({reducers})

  bus.subscribe(() => {
    test.pass('searching should trigger an action to be dispatched')
  })

  search('fantastic')
})
*/
