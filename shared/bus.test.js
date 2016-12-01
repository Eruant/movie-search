const tap = require('tap')
const {createBus} = require('./bus')

tap.test('bus: create a new bus', test => {
  const bus = createBus()

  test.equal(typeof bus, 'object', 'should be an object')
  test.end()
})
