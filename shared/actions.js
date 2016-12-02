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

module.exports = {
  searchRequest,
  searchFailure
}
