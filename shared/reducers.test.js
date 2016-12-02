const tap = require('tap')
const {
  reducerTypes,
  reducers
} = require('./reducers')

tap.test('reducerTypes', test => {
  test.equal(reducerTypes.SEARCH_REQUEST, 'SEARCH_REQUEST')
  test.equal(reducerTypes.SEARCH_ERROR, 'SEARCH_ERROR')
  test.equal(reducerTypes.SEARCH_SUCCESS, 'SEARCH_SUCCESS')

  test.end()
})

tap.test('reducers: default state', test => {
  const defaultState = {
    foo: 'bar'
  }
  const action = {}
  const state = reducers(defaultState, action)

  test.equal(state.foo, 'bar', 'should not change state')
  test.equal(state === defaultState, false, 'should return a copy of the state')

  test.end()
})

tap.test('reducers: search request', test => {
  const defaultState = {
    search: {
      isLoading: false,
      data: null,
      error: null
    }
  }

  const action = {
    type: reducerTypes.SEARCH_REQUEST
  }

  const {search} = reducers(defaultState, action)

  test.equal(search.isLoading, true, 'should set isLoading to true')
  test.equal(search.data === null, true, 'data should remain null')
  test.equal(search.error === null, true, 'error, should remain null')

  test.end()
})

tap.test('reducers: search error', test => {
  const defaultState = {
    search: {
      isLoading: true,
      data: null,
      error: null
    }
  }

  const action = {
    type: reducerTypes.SEARCH_ERROR,
    error: new Error('foo')
  }

  const {search} = reducers(defaultState, action)

  test.equal(search.isLoading, false, 'should set isLoading to false')
  test.equal(search.data === null, true, 'data should remain null')
  test.equal(search.error.message, 'foo', 'should set error message')

  test.end()
})
