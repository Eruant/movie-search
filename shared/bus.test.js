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

tap.test('bus: subscriptions', test => {
  const bus = createBus()
  const subscription1 = bus.subscribe(() => {})
  const subscription2 = bus.subscribe(() => {})

  test.equal(/[a-z0-9]{12}/.test(subscription1), true, 'should return a valid id')
  test.equal(subscription1 !== subscription2, true, 'subscription ids should be unique')

  test.end()
})

tap.test('bus: dispatching messages', test => {
  const bus = createBus()
  const action = 'bad action'
  const message = 'dispatch requires an object with a property of type set'

  try {
    bus.dispatch(action)
    test.fail(message)
  } catch (error) {
    test.equal(error.message, 'dispatch requires an object with a type property', message)
  }

  test.end()
})
