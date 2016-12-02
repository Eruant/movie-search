const tap = require('tap')
const {
  searchRequest,
  searchFailure,
  searchSuccess
} = require('./actions')
const {reducerTypes} = require('./reducers')

tap.test('searchRequest', test => {
  const action = searchRequest()

  test.equal(action.type, reducerTypes.SEARCH_REQUEST, 'should set the correct type')
  test.end()
})

tap.test('searchFailure', test => {
  let action = searchFailure()

  test.equal(action.type, reducerTypes.SEARCH_FAILURE, 'should set the correct type')
  test.equal(action.error.message, 'Unknown search error', 'should set default error')

  action = searchFailure('foo')

  test.equal(action.type, reducerTypes.SEARCH_FAILURE, 'should set the correct type')
  test.equal(action.error.message, 'foo', 'should set error from string input')

  action = searchFailure(new Error('bar'))

  test.equal(action.type, reducerTypes.SEARCH_FAILURE, 'should set the correct type')
  test.equal(action.error.message, 'bar', 'should set error from error object')

  test.end()
})

tap.test('searchSuccess', test => {
  try {
    searchSuccess()
    test.fail('no data entered warning not shown')
  } catch (error) {
    test.equal(error.message, '[searchSuccess] The property "data" is required')
  }

  const action = searchSuccess({foo: 'bar'})

  test.equal(action.type, reducerTypes.SEARCH_SUCCESS, 'should set the correct type')
  test.equal(action.data.foo, 'bar', 'should set correct data')

  test.end()
})
