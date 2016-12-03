const tap = require('tap')
const nock = require('nock')

const dataStore = require('./dataStore')
const search = require('./search')

tap.test('search', test => {
  try {
    search()
    test.fail('Search requires a value to be supplied')
  } catch (error) {
    test.equal(error.message, '[search] The property "query" is required')
  }

  test.end()
})

tap.test('search: dataStore updates (success)', test => {
  dataStore.reset()

  nock('api.themoviedb.org')
    .get('/3/search/movie')
    .reply(200)

  let counter = 0

  dataStore.subscribe(() => {
    const state = dataStore.getState()

    switch (counter) {
      case 0:
        test.equal(state.search.isLoading, true, 'should start loading')
        break
      case 1:
        test.equal(state.search.isLoading, false, 'should complete loading')
        test.equal(state.search.data !== null, true, 'should set some data')

        nock.cleanAll()
        test.end()
        break
    }

    counter++
  })

  search('fantastic')
})
