const reducerTypes = {
  SEARCH_REQUEST: 'SEARCH_REQUEST',
  SEARCH_ERROR: 'SEARCH_ERROR',
  SEARCH_SUCCESS: 'SEARCH_SUCCESS'
}

const reducers = (state, action) => {
  switch (action.type) {
    case reducerTypes.SEARCH_REQUEST:
      return Object.assign({}, state, {
        search: Object.assign({}, state.search, {
          isLoading: true
        })
      })

    case reducerTypes.SEARCH_ERROR:
      return Object.assign({}, state, {
        search: Object.assign({}, state.search, {
          isLoading: false,
          error: action.error
        })
      })

    default:
      return Object.assign({}, state)
  }
}

module.exports = {
  reducerTypes,
  reducers
}
