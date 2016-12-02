const tap = require('tap')
const {
  searchRequest,
  searchFailure
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
