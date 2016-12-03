const isRequired = require('./isRequired')

module.exports = (value = isRequired({
  category: 'search',
  property: 'value'
})) => {}
