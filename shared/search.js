const isRequired = require('./isRequired')
const dataStore = require('./dataStore')
const {
  searchRequest
} = require('./actions')

module.exports = (value = isRequired({
  category: 'search',
  property: 'value'
})) => {
  dataStore.dispatch(searchRequest())
}
