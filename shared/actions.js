const isRequired = require('./isRequired')
const {reducerTypes} = require('./reducers')

const searchRequest = () => ({
  type: reducerTypes.SEARCH_REQUEST
})

const searchFailure = (error = 'Unknown search error') => {
  if (typeof error === 'string') {
    error = new Error(error)
  }

  return {
    error,
    type: reducerTypes.SEARCH_FAILURE
  }
}

const searchSuccess = (data = isRequired({
  category: 'searchSuccess',
  property: 'data'
})) => ({
  data,
  type: reducerTypes.SEARCH_SUCCESS
})

module.exports = {
  searchRequest,
  searchFailure,
  searchSuccess
}
