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

  fetch(`/api/search/${query}`)
    .then(response => response.json())
    .then(data => {
      dataStore.dispatch(searchSuccess(data))
    })
    .catch(error => {
      dataStore.dispatch(searchFailure(error))
    })
}
