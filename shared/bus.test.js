const tap = require('tap')
const {createBus} = require('./bus')

tap.test('bus: create a new bus', test => {
  const bus = createBus()

  test.equal(typeof bus, 'object', 'should be an object')
  test.end()
})

tap.test('bus: should return a default state', test => {
  const bus = createBus()

  test.equal(typeof bus.getState(), 'object', 'getState should return an object')

  test.end()
})

tap.test('bus: create with a starting state', test => {
  const bus = createBus({foo: 'bar'})
  const state = bus.getState()

  test.equal(state.foo, 'bar', 'state should match value passed in')
  test.end()
})
