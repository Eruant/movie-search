const fetch = require('isomorphic-fetch')

const isRequired = require('./isRequired')
const dataStore = require('./dataStore')
const {
  searchRequest,
  searchFailure,
  searchSuccess
} = require('./actions')

module.exports = (query = isRequired({
  category: 'search',
  property: 'query'
})) => {
  dataStore.dispatch(searchRequest())

  const queryString = [
    `api_key=${process.env.MOVIE_DB_API_KEY}`,
    'language=en-UK',
    `query=${query}`,
    'page=1',
    'include_adult=false'
  ].join('&')

  fetch(`https://api.themoviedb.org?${queryString}`)
    .then(response => {
      return {fake: 'response'}
    })
    .then(data => {
      dataStore.dispatch(searchSuccess(data))
    })
    .catch(error => {
      dataStore.dispatch(searchFailure(error))
    })
}
